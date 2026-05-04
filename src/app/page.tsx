import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE, WHATSAPP_URL } from '@/lib/constants'
import styles from './page.module.css'
import HeroBg from './HeroBg'

export const metadata: Metadata = {
  title: `${SITE.nome} — Você não está sozinho`,
  description: SITE.descricao,
  alternates: { canonical: SITE.url },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: SITE.nome,
  description: SITE.descricao,
  url: SITE.url,
  telephone: SITE.whatsappFormatado,
  email: SITE.email,
  medicalSpecialty: 'Psychiatry',
  availableService: {
    '@type': 'MedicalTherapy',
    name: 'Triagem e encaminhamento para dependência química',
  },
}

const passos = [
  {
    num: '01',
    titulo: 'Você nos conta como está',
    texto: 'Responda um breve questionário ou nos envie uma mensagem no WhatsApp. Não há respostas certas ou erradas — só a sua história.',
  },
  {
    num: '02',
    titulo: 'Nosso terapeuta ouve você',
    texto: 'Nossa equipe lê cada relato com atenção e cuidado. Nada é julgado. Nada vaza. Seu sigilo é nossa prioridade absoluta.',
  },
  {
    num: '03',
    titulo: 'Juntos encontramos o caminho',
    texto: 'Com base no seu perfil, indicamos a clínica ou profissional mais adequado para o seu caso — gratuitamente e sem compromisso.',
  },
]

const sinais = [
  'Você tenta parar mas não consegue manter por muito tempo',
  'Sente que precisa da substância para funcionar no dia a dia',
  'Seu trabalho, relacionamentos ou saúde estão sendo afetados',
  'Um familiar está se isolando e mudando de comportamento',
  'Você já perdeu muito e tem medo de perder mais',
  'Não sabe por onde começar e quer falar com alguém que entenda',
]

const sigiloItens = [
  {
    icone: '🔒',
    titulo: 'Dados protegidos por LGPD',
    texto: 'Tratamos seus dados como dados sensíveis de saúde. Nunca compartilhamos sem sua autorização expressa.',
  },
  {
    icone: '👤',
    titulo: 'Atendimento confidencial',
    texto: 'Seu nome e sua história ficam entre você e o terapeuta. Nem nossos sistemas expõem sua identidade desnecessariamente.',
  },
  {
    icone: '🚫',
    titulo: 'Zero exposição pública',
    texto: 'Nenhum relato, nome ou dado pessoal é publicado. Não há comentários, fóruns ou espaços abertos neste site.',
  },
]

export default function HomePage() {
  const waMensagem = WHATSAPP_URL('Olá, vim pelo site Porta de Volta. Gostaria de conversar.')

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <section className={styles.hero} aria-labelledby="titulo-hero">
        <HeroBg />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroConteudo}>
            <span className={styles.heroPretitulo}>Você chegou ao lugar certo</span>
            <h1 id="titulo-hero" className={styles.heroTitulo}>
              Existe saída.<br />
              <em>E ela começa aqui.</em>
            </h1>
            <p className={styles.heroTexto}>
              A dependência química não é fraqueza — é uma condição que precisa
              de cuidado especializado. Estamos aqui para escutar, entender sua
              situação e encontrar juntos o caminho mais adequado para você
              ou para alguém que você ama.
            </p>
            <div className={styles.heroBotoes}>
              <Link href="/quero-ajuda" className="btn-primario">
                Preciso de ajuda para mim
              </Link>
              <Link href="/quero-ajudar" className="btn-secundario">
                Quero ajudar alguém
              </Link>
            </div>
            <p className={styles.heroDisclaimer}>
              Atendimento sigiloso · Sem julgamentos · Gratuito
            </p>
          </div>
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.heroCirculo}>
              <div className={styles.heroCirculoInterno}>
                <span className={styles.heroIcone}>🌱</span>
              </div>
            </div>
            <div className={styles.heroPalavras}>
              <span className={styles.heroPalavra} style={{ top: '10%', left: '5%' }}>esperança</span>
              <span className={styles.heroPalavra} style={{ top: '25%', right: '0%' }}>cuidado</span>
              <span className={styles.heroPalavra} style={{ top: '55%', left: '0%' }}>recomeço</span>
              <span className={styles.heroPalavra} style={{ top: '70%', right: '5%' }}>presença</span>
              <span className={styles.heroPalavra} style={{ bottom: '5%', left: '20%' }}>acolhimento</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.portas} aria-labelledby="titulo-portas">
        <div className="container">
          <h2 id="titulo-portas" className={styles.secTitulo}>
            Por onde você quer começar?
          </h2>
          <p className={styles.secSubtitulo}>
            Cada jornada é única. Escolha o caminho que faz sentido para você agora.
          </p>
          <div className={styles.portasGrid}>
            <Link href="/quero-ajuda" className={styles.portaCard}>
              <div className={styles.portaIcone} aria-hidden="true">🤝</div>
              <h3 className={styles.portaTitulo}>Estou precisando de ajuda</h3>
              <p className={styles.portaTexto}>
                Você sente que a substância está controlando sua vida. Talvez já
                tenha tentado parar antes. Talvez esteja com medo. Estamos aqui
                para ouvir — sem julgamento, sem pressa.
              </p>
              <span className={styles.portaLink}>Quero conversar →</span>
            </Link>
            <Link href="/quero-ajudar" className={styles.portaCard}>
              <div className={styles.portaIcone} aria-hidden="true">💚</div>
              <h3 className={styles.portaTitulo}>Quero ajudar alguém que amo</h3>
              <p className={styles.portaTexto}>
                Ver alguém que você ama se perdendo é uma das dores mais difíceis
                de carregar. Você não precisa resolver isso sozinho. Vamos entender
                juntos o que pode ser feito.
              </p>
              <span className={styles.portaLink}>Quero entender como ajudar →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.comoFunciona} aria-labelledby="titulo-como">
        <div className="container">
          <h2 id="titulo-como" className={styles.secTitulo}>Como funciona</h2>
          <p className={styles.secSubtitulo}>Simples, humano e totalmente sigiloso.</p>
          <div className={styles.passosGrid}>
            {passos.map((passo) => (
              <div key={passo.num} className={styles.passoItem}>
                <span className={styles.passoNum} aria-hidden="true">{passo.num}</span>
                <h3 className={styles.passoTitulo}>{passo.titulo}</h3>
                <p className={styles.passoTexto}>{passo.texto}</p>
              </div>
            ))}
          </div>
          <div className={styles.comoAcao}>
            <a
              href={waMensagem}
              className="btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Começar pelo WhatsApp
            </a>
            <Link href="/quero-ajuda" className="btn-secundario">
              Responder o questionário
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.terapeuta} aria-labelledby="titulo-terapeuta">
        <div className="container">
          <div className={styles.terapeutaWrapper}>

            <div className={styles.cardFlip}>
              <div className={styles.cardFlipInner}>
                <div className={styles.cardFlipFrente}>
                  <Image src="/images/atendimento.jpg" alt="Atendimento humanizado" width={280} height={380} className={styles.cardFlipImg} />
                  <div className={styles.cardFlipGradiente} />
                </div>
                <div className={styles.cardFlipVerso}>
                  <span className={styles.cardFlipIcone}>🤝</span>
                  <h3 className={styles.cardFlipTitulo}>Tratamento humanizado</h3>
                  <p className={styles.cardFlipTexto}>Cada pessoa é acolhida com escuta ativa, sem julgamentos e com todo o cuidado que merece.</p>
                </div>
              </div>
            </div>

            <div className={styles.terapeutaInner}>
              <div className={styles.terapeutaFoto}>
                <Image src="/images/equipe.jpg" alt="Equipe de atendimento Porta de Volta" width={320} height={220} className={styles.terapeutaImg} style={{ objectFit: 'cover', borderRadius: '16px' }} />
              </div>
              <div className={styles.terapeutaTexto}>
                <span className={styles.terapeutaLabel}>Quem está aqui por você</span>
                <h2 id="titulo-terapeuta" className={styles.terapeutaNome}>
                  Uma equipe preparada para acolher
                </h2>
                <p className={styles.terapeutaDesc}>
                  Somos um grupo de profissionais especializados em dependência química
                  e saúde mental. Cada mensagem recebida é lida com atenção e cuidado
                  humano — porque acreditamos que toda história merece ser ouvida de
                  verdade, com presença e sem julgamento.
                </p>
                <p className={styles.terapeutaDesc}>
                  Estamos aqui para escutar, entender e ajudar a encontrar o caminho
                  mais adequado para você ou para quem você ama.
                </p>
                <a href="/sobre" className={styles.terapeutaLink}>
                  Conhecer nossa equipe →
                </a>
              </div>
            </div>

            <div className={styles.cardFlip}>
              <div className={styles.cardFlipInner}>
                <div className={styles.cardFlipFrente}>
                  <Image src="/images/acolhimento.jpg" alt="Acolhimento familiar" width={280} height={380} className={styles.cardFlipImg} />
                  <div className={styles.cardFlipGradiente} />
                </div>
                <div className={styles.cardFlipVerso}>
                  <span className={styles.cardFlipIcone}>💚</span>
                  <h3 className={styles.cardFlipTitulo}>Acolhimento familiar</h3>
                  <p className={styles.cardFlipTexto}>Orientamos famílias inteiras com empatia, clareza e suporte especializado em cada etapa.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className={styles.sinais} aria-labelledby="titulo-sinais">
        <div className="container">
          <h2 id="titulo-sinais" className={styles.secTitulo}>
            Talvez você esteja aqui porque…
          </h2>
          <div className={styles.sinaisGrid}>
            {sinais.map((texto, i) => (
              <div key={i} className={styles.sinaisItem}>
                <span className={styles.sinaisCheck} aria-hidden="true">✓</span>
                <p>{texto}</p>
              </div>
            ))}
          </div>
          <div className={styles.sinaisAcao}>
            <p className={styles.sinaisTextoFinal}>
              Se algum desses cenários ressoa com você, você está no lugar certo.
            </p>
            <Link href="/quero-ajuda" className="btn-primario">
              Quero dar o primeiro passo
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.sigilo} aria-labelledby="titulo-sigilo">
        <div className="container">
          <h2 id="titulo-sigilo" className={styles.secTitulo}>
            Seu sigilo é sagrado aqui
          </h2>
          <div className={styles.sigiloGrid}>
            {sigiloItens.map((item) => (
              <div key={item.titulo} className={styles.sigiloCard}>
                <span className={styles.sigiloIcone} aria-hidden="true">{item.icone}</span>
                <h3 className={styles.sigiloTitulo}>{item.titulo}</h3>
                <p className={styles.sigiloTexto}>{item.texto}</p>
              </div>
            ))}
          </div>
          <p className={styles.sigiloLgpd}>
            Leia nossa{' '}
            <Link href="/privacidade">política de privacidade completa</Link>
            {' '}para entender como seus dados são tratados.
          </p>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="titulo-cta">
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 id="titulo-cta" className={styles.ctaTitulo}>
              A porta está aberta.<br />Você decide quando entrar.
            </h2>
            <p className={styles.ctaTexto}>
              Não há pressa. Não há julgamento. Há apenas uma equipe pronta
              para ouvir você quando você estiver pronto.
            </p>
            <div className={styles.ctaBotoes}>
              <Link href="/quero-ajuda" className="btn-primario">
                Preciso de ajuda para mim
              </Link>
              <Link href="/quero-ajudar" className="btn-secundario">
                Quero ajudar alguém
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
