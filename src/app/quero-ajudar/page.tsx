import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import QueroAjudarCliente from './QueroAjudarCliente'

export const metadata: Metadata = {
  title: 'Quero ajudar alguém — ' + SITE.nome,
  description: 'Você não precisa enfrentar isso sozinho. Conte o que está vivendo e nosso terapeuta vai orientar você sobre como ajudar quem você ama.',
  robots: { index: false, follow: false },
}

export default function QueroAjudarPage() {
  return <QueroAjudarCliente />
}
