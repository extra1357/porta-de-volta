import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import QuemSomosCliente from './QuemSomosCliente'

export const metadata: Metadata = {
  title: 'Quem somos — ' + SITE.nome,
  description: 'Conheça a Porta de Volta: uma iniciativa de acolhimento e encaminhamento para quem enfrenta a dependência química. Sem jargões, sem julgamentos.',
}

export default function QuemSomosPage() {
  return <QuemSomosCliente />
}
