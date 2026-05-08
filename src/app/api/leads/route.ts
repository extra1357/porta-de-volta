import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { LeadSchema } from '@/lib/schemas';
import { requireAdmin } from '@/lib/auth-guard';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;

  const lead = await prisma.lead.create({
    data: {
      perfil: data.perfil,
      primeiroNome: data.primeiroNome,
      contatoWhatsapp: data.contatoWhatsapp,
      contatoEmail: data.contatoEmail || null,
      comoEstaHoje: data.comoEstaHoje,
      tempoSituacao: data.tempoSituacao,
      jaTeveAjuda: data.jaTeveAjuda,
      relatoLivre: data.relatoLivre,
      lgpdConsentimento: data.lgpdConsentimento,
      lgpdDataConsent: new Date(),
      ip: req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? null,
      userAgent: req.headers.get('user-agent') ?? null,
    },
  });

  return NextResponse.json({ id: lead.id }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') ?? undefined;
  const page = Math.max(1, Number(searchParams.get('page') ?? '1'));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? '20')));

  const where = status ? { status: status as never } : {};

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { criadoEm: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        criadoEm: true,
        perfil: true,
        primeiroNome: true,
        contatoWhatsapp: true,
        contatoEmail: true,
        status: true,
        notaInterna: true,
      },
    }),
    prisma.lead.count({ where }),
  ]);

  return NextResponse.json({ leads, total, page, pages: Math.ceil(total / limit) });
}
