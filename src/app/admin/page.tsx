import type { Metadata } from 'next'
import AdminCliente from './AdminCliente'

export const metadata: Metadata = {
  title: 'Painel administrativo — Porta de Volta',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminCliente />
}
