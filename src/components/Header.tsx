'use client'
import { useState } from 'react'
import Link from 'next/link'
import { SITE, WHATSAPP_URL } from '@/lib/constants'
import styles from './Header.module.css'

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${SITE.nome} — página inicial`}>
          <span className={styles.logoMarca}>{SITE.nome}</span>
        </Link>

        <nav
          className={`${styles.nav} ${menuAberto ? styles.navAberto : ''}`}
          aria-label="Navegação principal"
        >
          <Link href="/quero-ajuda" className={styles.navLink} onClick={() => setMenuAberto(false)}>
            Preciso de ajuda
          </Link>
          <Link href="/quero-ajudar" className={styles.navLink} onClick={() => setMenuAberto(false)}>
            Quero ajudar alguém
          </Link>
          <Link href="/quem-somos" className={styles.navLink} onClick={() => setMenuAberto(false)}>
            Quem somos
          </Link>
          <Link href="/blog" className={styles.navLink} onClick={() => setMenuAberto(false)}>
            Conteúdo
          </Link>
          <a
            href={WHATSAPP_URL('Olá, vim pelo site Porta de Volta e gostaria de conversar.')}
            className={styles.navCta}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuAberto(false)}
          >
            Falar agora
          </a>
        </nav>

        <button
          className={styles.hamburger}
          aria-expanded={menuAberto}
          aria-controls="nav-mobile"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <span className={styles.hamburgerLinha} />
          <span className={styles.hamburgerLinha} />
          <span className={styles.hamburgerLinha} />
        </button>
      </div>
    </header>
  )
}
