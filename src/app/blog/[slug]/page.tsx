import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { artigos } from '../artigos'
import ArtigoCliente from './ArtigoCliente'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const artigo = artigos.find(a => a.slug === slug)
  if (!artigo) return {}
  return {
    title: artigo.titulo + ' — Porta de Volta',
    description: artigo.resumo,
    alternates: { canonical: 'https://portadevolta.com.br/blog/' + artigo.slug },
    openGraph: { title: artigo.titulo, description: artigo.resumo, images: [artigo.imagem] },
  }
}

export function generateStaticParams() {
  return artigos.map(a => ({ slug: a.slug }))
}

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artigo = artigos.find(a => a.slug === slug)
  if (!artigo) notFound()
  return <ArtigoCliente artigo={artigo!} />
}
