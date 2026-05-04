'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Artigo } from '../tipos'
import styles from './artigo.module.css'

export default function ArtigoCliente({ artigo }: { artigo: Artigo }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artigo.titulo,
    description: artigo.resumo,
    image: 'https://portadevolta.com.br' + artigo.imagem,
    author: { '@type': 'Organization', name: 'Equipe Porta de Volta' },
    publisher: { '@type': 'Organization', name: 'Porta de Volta', url: 'https://portadevolta.com.br' },
    datePublished: artigo.dataPublicacao,
    url: 'https://portadevolta.com.br/blog/' + artigo.slug,
  }

  return (
    <main className={styles.main}>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className={styles.container}>

        <div className={styles.breadcrumb}>
          <Link href='/blog'>← Voltar para Conteúdo</Link>
        </div>

        <header className={styles.header}>
          <span className={styles.tag}>{artigo.tag}</span>
          <h1 className={styles.titulo}>{artigo.titulo}</h1>
          <div className={styles.meta}>
            <span>✍️ {artigo.autor}</span>
            <span>📅 {new Date(artigo.dataPublicacao).toLocaleDateString('pt-BR')}</span>
            <span>⏱️ {artigo.tempoLeitura} de leitura</span>
          </div>
        </header>

        <div className={styles.imagemWrap}>
          <Image src={artigo.imagem} alt={artigo.titulo} width={900} height={420} className={styles.imagem} />
        </div>

        <article className={styles.artigo}>
          {artigo.conteudo.map((bloco, i) => {
            if (bloco.tipo === 'intro') return <p key={i} className={styles.intro}>{bloco.texto}</p>
            if (bloco.tipo === 'h2') return <h2 key={i} className={styles.h2}>{bloco.texto}</h2>
            if (bloco.tipo === 'paragrafo') return <p key={i} className={styles.paragrafo}>{bloco.texto}</p>
            if (bloco.tipo === 'destaque') return (
              <blockquote key={i} className={styles.destaque}>
                <p>{bloco.texto}</p>
              </blockquote>
            )
            if (bloco.tipo === 'fontes') return (
              <div key={i} className={styles.fontes}>
                <h3 className={styles.fontesTitle}>📚 Fontes e referências</h3>
                <ul className={styles.fontesList}>
                  {bloco.itens?.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            )
            return null
          })}
        </article>

        <div className={styles.cta}>
          <h2 className={styles.ctaTitulo}>Precisa de orientação personalizada?</h2>
          <p className={styles.ctaTexto}>Nossa equipe está pronta para ouvir sua situação e indicar o melhor caminho — de forma gratuita e sigilosa.</p>
          <div className={styles.ctaBotoes}>
            <Link href='/quero-ajuda' className={styles.btnPrimario}>Preciso de ajuda para mim</Link>
            <Link href='/quero-ajudar' className={styles.btnSecundario}>Quero ajudar alguém</Link>
          </div>
        </div>

        <div className={styles.voltar}>
          <Link href='/blog' className={styles.voltarLink}>← Ver todos os artigos</Link>
        </div>

      </div>
    </main>
  )
}
