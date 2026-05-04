import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'porta2024'

function autorizado(req: NextRequest) {
  const token = req.headers.get('x-admin-token')
  return token === ADMIN_SECRET
}

export async function GET(req: NextRequest) {
  if (!autorizado(req)) return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
  const leads = await prisma.lead.findMany({
    orderBy: { criadoEm: 'desc' },
    select: {
      id: true,
      criadoEm: true,
      perfil: true,
      primeiroNome: true,
      contatoWhatsapp: true,
      contatoEmail: true,
      status: true,
      comoEstaHoje: true,
      tempoSituacao: true,
    },
  })
  return NextResponse.json({ leads })
}
