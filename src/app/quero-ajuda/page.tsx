import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import QueroAjudaCliente from './QueroAjudaCliente'

export const metadata: Metadata = {
  title: 'Preciso de ajuda — ' + SITE.nome,
  description: 'Conte como você está. Sem julgamentos, sem pressa. Nosso terapeuta vai ouvir você com cuidado e encontrar juntos o próximo passo.',
  robots: { index: false, follow: false },
}

export default function QueroAjudaPage() {
  return <QueroAjudaCliente />
}
