'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SITE, WHATSAPP_URL } from '@/lib/constants'
import styles from './quem-somos.module.css'

export default function QuemSomosCliente() {
  return (
    <main className={styles.main}>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.tag}>Quem somos</span>
          <h1 className={styles.heroTitulo}>
            Um lugar onde você
            <br />
            pode ser honesto.
          </h1>
          <p className={styles.heroSubtitulo}>
            A Porta de Volta nasceu da convicção de que toda pessoa merece ser ouvida
            antes de receber qualquer orientação. Sem formulários frios. Sem termos técnicos.
            Sem julgamento.
          </p>
        </div>
      </section>

      <section className={styles.secao}>
        <div className={styles.container}>
          <div className={styles.blocoTexto}>
            <h2 className={styles.secaoTitulo}>Por que a Porta de Volta existe</h2>
            <p className={styles.paragrafo}>
              A dependência química isola. Ela afasta quem sofre da própria família,
              do trabalho, dos sonhos. E muitas vezes a maior barreira para buscar ajuda
              não é a falta de vontade — é não saber por onde começar.
            </p>
            <p className={styles.paragrafo}>
              Criamos este espaço para ser exatamente esse primeiro passo: um lugar seguro,
              acolhedor e humano, onde você conta o que está vivendo e recebe orientação
              personalizada — não uma lista de links.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.secaoDestaque}>
        <div className={styles.container}>
          <h2 className={styles.secaoTitulo}>O que nos guia</h2>
          <div className={styles.valoresGrid}>
            <div className={styles.valorCard}>
              <span className={styles.valorIcone} aria-hidden="true">ð¤</span>
              <h3 className={styles.valorTitulo}>Acolhimento</h3>
              <p className={styles.valorTexto}>
                Você chega como está. Não existe momento errado para pedir ajuda.
              </p>
            </div>
            <div className={styles.valorCard}>
              <span className={styles.valorIcone} aria-hidden="true">ð</span>
              <h3 className={styles.valorTitulo}>Confiança</h3>
              <p className={styles.valorTexto}>
                Tudo que você compartilha fica entre você e o terapeuta. Sempre.
              </p>
            </div>
            <div className={styles.valorCard}>
              <span className={styles.valorIcone} aria-hidden="true">ð¿</span>
              <h3 className={styles.valorTitulo}>Serenidade</h3>
              <p className={styles.valorTexto}>
                Sem pressa, sem pressão. O ritmo é sempre o seu.
              </p>
            </div>
            <div className={styles.valorCard}>
              <span className={styles.valorIcone} aria-hidden="true">ð¬</span>
              <h3 className={styles.valorTitulo}>Diálogo simples</h3>
              <p className={styles.valorTexto}>
                Falamos como gente. Sem diagnósticos prematuros, sem termos que assustam.
              </p>
            </div>
            <div className={styles.valorCard}>
              <span className={styles.valorIcone} aria-hidden="true">🧠</span>
              <h3 className={styles.valorTitulo}>Equipes multidisciplinares</h3>
              <p className={styles.valorTexto}>
                Contamos com profissionais de diferentes áreas — psicologia, terapia,
                assistência social e saúde mental — altamente capacitados e trabalhando
                juntos pelo mesmo objetivo: a sua recuperação.
              </p>
            </div>
            <div className={styles.valorCard}>
              <span className={styles.valorIcone} aria-hidden="true">🏡</span>
              <h3 className={styles.valorTitulo}>Internação com suporte completo</h3>
              <p className={styles.valorTexto}>
                Quando necessário, encaminhamos para clínicas com psicólogos, terapeutas
                e monitores treinados — presentes 24 horas para garantir segurança,
                acolhimento e evolução contínua no tratamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.secao}>
        <div className={styles.container}>
          <div className={styles.terapeutaCard}>

            <div className={styles.terapeutaInfo}>
              <span className={styles.tag}>Quem está aqui por você</span>
              <h2 className={styles.terapeutaNome}>Uma equipe preparada para acolher</h2>
              <p className={styles.paragrafo}>
                Somos um grupo de profissionais especializados em dependência química
                e saúde mental, com formação em Entrevista Motivacional e anos de
                experiência acompanhando pessoas e famílias em processo de recuperação.
              </p>
              <p className={styles.paragrafo}>
                Acreditamos que a mudança começa quando a pessoa se sente segura o
                suficiente para falar a verdade — e encontra alguém disposto a ouvir
                sem julgar. Estamos aqui para ser esse espaço.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.secaoCta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitulo}>Pronto para dar o primeiro passo?</h2>
          <p className={styles.ctaTexto}>
            Não precisa ter certeza. Não precisa ter todas as respostas.
            Só precisa estar disposto a contar o que está vivendo.
          </p>
          <div className={styles.ctaBotoes}>
            <Link href="/quero-ajuda" className={styles.btnPrimario}>
              Quero ajuda para mim
            </Link>
            <Link href="/quero-ajudar" className={styles.btnSecundario}>
              Quero ajudar alguém
            </Link>
            <a
              href={WHATSAPP_URL('Olá, vim pelo site Porta de Volta e gostaria de conversar.')}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWhatsapp}
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
