import type { Metadata } from 'next'
import { SITE, WHATSAPP_URL } from '@/lib/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contato — Porta de Volta',
  description: 'Entre em contato com o Porta de Volta. Fale com nosso terapeuta pelo WhatsApp ou e-mail.',
}

export default function ContatoPage() {
  const urlWhats = WHATSAPP_URL('Olá, gostaria de conversar sobre o Porta de Volta.')
  return (
    <main style={{ minHeight: '100vh', background: 'var(--areia)', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ fontSize: '.875rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--verde-medio)', marginBottom: '1rem' }}>
          Fale conosco
        </p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--verde-escuro)', lineHeight: 1.25, marginBottom: '1rem' }}>
          Estamos aqui para ouvir você
        </h1>
        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--texto-secundario)', marginBottom: '2.5rem' }}>
          Se você ou alguém que você ama está enfrentando a dependência química,
          não precisa passar por isso sozinho. Entre em contato — sem julgamentos, sem pressa.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          <a href={urlWhats} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', border: '1.5px solid rgba(0,0,0,0.08)', borderRadius: '1rem', padding: '1.25rem 1.5rem', textDecoration: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '2rem' }}>💬</span>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--verde-escuro)', margin: 0, fontSize: '1rem' }}>WhatsApp</p>
              <p style={{ color: 'var(--texto-secundario)', margin: 0, fontSize: '.9375rem' }}>{SITE.whatsappFormatado}</p>
              <p style={{ color: 'var(--verde-medio)', margin: 0, fontSize: '.8125rem', marginTop: '.25rem' }}>Resposta rápida · Seg–Sex, 8h–20h</p>
            </div>
          </a>
          <a href={'mailto:' + SITE.email}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', border: '1.5px solid rgba(0,0,0,0.08)', borderRadius: '1rem', padding: '1.25rem 1.5rem', textDecoration: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '2rem' }}>✉️</span>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--verde-escuro)', margin: 0, fontSize: '1rem' }}>E-mail</p>
              <p style={{ color: 'var(--texto-secundario)', margin: 0, fontSize: '.9375rem' }}>{SITE.email}</p>
              <p style={{ color: 'var(--verde-medio)', margin: 0, fontSize: '.8125rem', marginTop: '.25rem' }}>Respondemos em até 24h úteis</p>
            </div>
          </a>
        </div>
        <div style={{ background: 'var(--verde-claro)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
          <p style={{ fontWeight: 700, color: 'var(--verde-escuro)', margin: '0 0 .5rem', fontSize: '1rem' }}>
            Prefere preencher um formulário?
          </p>
          <p style={{ color: 'var(--texto-secundario)', margin: '0 0 1rem', fontSize: '.9375rem', lineHeight: 1.6 }}>
            Conte um pouco sobre a situação e {SITE.terapeuta} entrará em contato com atenção e cuidado.
          </p>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
            <Link href="/quero-ajuda" className="btn-primario" style={{ fontSize: '.9375rem', padding: '.75rem 1.25rem' }}>
              Preciso de ajuda
            </Link>
            <Link href="/quero-ajudar" className="btn-secundario" style={{ fontSize: '.9375rem', padding: '.75rem 1.25rem' }}>
              Quero ajudar alguém
            </Link>
          </div>
        </div>
        <p style={{ fontSize: '.8125rem', color: 'var(--texto-suave)', lineHeight: 1.6, textAlign: 'center' }}>
          🔒 Todas as conversas são tratadas com total sigilo e confidencialidade,
          conforme a LGPD e o código de ética profissional.
        </p>
      </div>
    </main>
  )
}
