import Link from 'next/link'
import { SITE } from '@/lib/constants'
import styles from './Footer.module.css'

export function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>

        <div className={styles.colMarca}>
          <span className={styles.marcaNome}>{SITE.nome}</span>
          <p className={styles.marcaDesc}>{SITE.subtitulo}</p>
          <p className={styles.marcaDesc} style={{ marginTop: '.5rem' }}>
            Este site não realiza diagnósticos clínicos. Somos um serviço de
            escuta humanizada e encaminhamento para tratamento especializado.
          </p>
        </div>

        <div className={styles.colLinks}>
          <h3 className={styles.colTitulo}>Navegação</h3>
          <nav aria-label="Links do rodapé">
            <Link href="/quero-ajuda" className={styles.link}>Preciso de ajuda</Link>
            <Link href="/quero-ajudar" className={styles.link}>Quero ajudar alguém</Link>
            <Link href="/sobre" className={styles.link}>Quem somos</Link>
            <Link href="/blog" className={styles.link}>Conteúdo</Link>
            <Link href="/contato" className={styles.link}>Contato</Link>
          </nav>
        </div>

        <div className={styles.colLgpd}>
          <h3 className={styles.colTitulo}>Privacidade e dados</h3>
          <Link href="/privacidade" className={styles.link}>Política de privacidade</Link>
          <p className={styles.lgpdTexto}>
            Seus dados são protegidos pela{' '}
            <strong>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.
            Tratamos dados sensíveis de saúde com máxima confidencialidade.
          </p>
          <p className={styles.lgpdTexto} style={{ marginTop: '.75rem' }}>
            <strong>Encarregado de Dados (DPO):</strong><br />
            {SITE.dpo.nome}<br />
            <a href={`mailto:${SITE.dpo.email}`} className={styles.link}>
              {SITE.dpo.email}
            </a>
          </p>
        </div>

      </div>

      <div className={styles.base}>
        <div className="container">
          <p className={styles.baseTxt}>
            © {ano} {SITE.nome}. Todos os direitos reservados.
            As informações deste site têm caráter informativo e não substituem
            avaliação médica ou psicológica profissional.
          </p>
          <p className={styles.baseTxt} style={{ marginTop: '.75rem' }}>
            <Link href="/admin/login" className={styles.linkRestrito}>
              Acesso restrito
            </Link>
          </p>
          <p className={styles.baseTxt} style={{ marginTop: '.375rem' }}>
            Desenvolvido por{' '}
            <a
              href={SITE.desenvolvedora.url}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE.desenvolvedora.nome}
            </a>{' '}
            — {SITE.desenvolvedora.grupo}
          </p>
        </div>
      </div>
    </footer>
  )
}
