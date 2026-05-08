import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BotaoWhatsApp } from '@/components/BotaoWhatsApp'
import { SITE } from '@/lib/constants'
import SessionWrapper from '@/components/SessionWrapper'

export const metadata: Metadata = {
  title: {
    default: `${SITE.nome} — ${SITE.subtitulo}`,
    template: `%s | ${SITE.nome}`
  },
  description: SITE.descricao,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE.url,
    siteName: SITE.nome,
    title: `${SITE.nome} — ${SITE.subtitulo}`,
    description: SITE.descricao
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  },
  alternates: { canonical: SITE.url }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <SessionWrapper>
          <a href="#conteudo-principal" className="sr-only">
            Pular para o conteúdo principal
          </a>
          <Header />
          <main id="conteudo-principal">{children}</main>
          <Footer />
          <BotaoWhatsApp />
        </SessionWrapper>
      </body>
    </html>
  )
}
