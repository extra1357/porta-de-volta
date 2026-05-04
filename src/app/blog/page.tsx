import type { Metadata } from 'next'
import BlogCliente from './BlogCliente'

export const metadata: Metadata = {
  title: 'Conteúdo sobre dependência química — Porta de Volta',
  description: 'Artigos, metodologias e orientações sobre tratamento para dependência química e apoio familiar. Conteúdo produzido por profissionais especializados.',
  alternates: { canonical: 'https://portadevolta.com.br/blog' },
}

export default function BlogPage() {
  return <BlogCliente />
}
