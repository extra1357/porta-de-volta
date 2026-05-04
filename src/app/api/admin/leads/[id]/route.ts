import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'porta2024'

function autorizado(req: NextRequest) {
  const token = req.headers.get('x-admin-token')
  return token === ADMIN_SECRET
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!autorizado(req)) return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
  const lead = await prisma.lead.findUnique({ where: { id: params.id } })
  if (!lead) return NextResponse.json({ erro: 'Não encontrado' }, { status: 404 })
  return NextResponse.json({ lead })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!autorizado(req)) return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
  const body = await req.json()
  const { status, notaInterna } = body
  const lead = await prisma.lead.update({
    where: { id: params.id },
    data: {
      ...(status ? { status } : {}),
      ...(notaInterna !== undefined ? { notaInterna } : {}),
    },
  })
  return NextResponse.json({ lead })
}
