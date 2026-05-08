import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { LeadUpdateSchema } from '@/lib/schemas';
import { requireAdmin } from '@/lib/auth-guard';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const lead = await prisma.lead.findUnique({ where: { id: params.id } });
  if (!lead) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });

  return NextResponse.json({ lead });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (auth) return auth;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = LeadUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos', fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const lead = await prisma.lead.update({
    where: { id: params.id },
    data: {
      ...(parsed.data.status && { status: parsed.data.status }),
      ...(parsed.data.notaInterna !== undefined && { notaInterna: parsed.data.notaInterna }),
    },
  });

  await prisma.auditLog.create({
    data: { leadId: params.id, acao: 'UPDATE', detalhes: JSON.stringify(parsed.data) },
  });

  return NextResponse.json({ lead });
}