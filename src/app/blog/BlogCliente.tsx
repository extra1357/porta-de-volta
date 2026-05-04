'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './blog.module.css'

const artigos = [
  { slug: 'internacao-voluntaria-involuntaria-compulsoria', titulo: 'Como funciona a internação voluntária, involuntária e compulsória', resumo: 'Entenda as diferenças legais e clínicas entre os tipos de internação, quando cada uma é indicada e quais são os direitos do paciente em cada situação.', imagem: '/images/blog/internacao.jpg', tag: 'Internação' },
  { slug: 'quanto-tempo-dura-tratamento', titulo: 'Quanto tempo dura o tratamento para dependência química?', resumo: 'A recuperação não tem prazo fixo. Entenda as fases do tratamento, o papel da desintoxicação e por que o acompanhamento contínuo faz toda a diferença.', imagem: '/images/blog/tratamento.jpg', tag: 'Tratamento' },
  { slug: 'sinais-familiar-precisa-ajuda', titulo: 'Sinais de que seu familiar precisa de ajuda profissional', resumo: 'Isolamento, mudanças de comportamento, faltas no trabalho. Aprenda a identificar os sinais de alerta e como agir com cuidado e sem confronto.', imagem: '/images/blog/familia.jpg', tag: 'Família' },
  { slug: 'como-apoiar-dependente-sem-se-destruir', titulo: 'Como apoiar um dependente químico sem se destruir', resumo: 'Quem cuida também precisa de cuidado. Veja como estabelecer limites saudáveis, preservar sua saúde mental e ajudar de forma efetiva.', imagem: '/images/blog/apoio.jpg', tag: 'Família' },
  { slug: 'o-que-e-entrevista-motivacional', titulo: 'O que é Entrevista Motivacional e como ela ajuda na recuperação', resumo: 'Uma das abordagens mais eficazes no tratamento da dependência. Entenda como funciona e por que respeitar o ritmo do paciente é fundamental.', imagem: '/images/blog/metodologia.jpg', tag: 'Metodologia' },
  { slug: 'diferenca-clinica-comunidade-terapeutica', titulo: 'Diferença entre clínica de reabilitação e comunidade terapêutica', resumo: 'Duas abordagens distintas, cada uma com seus benefícios. Saiba qual é a mais indicada para cada perfil e como escolher com segurança.', imagem: '/images/blog/recuperacao.jpg', tag: 'Tratamento' },
]

const clinicas = [
  { nome: 'Instituto Serenidade', cidade: 'Sorocaba — SP', especialidade: 'Masculina e Feminina', imagem: '/images/clinicas/clinica1.jpg' },
  { nome: 'Casa Nova Vida', cidade: 'Campinas — SP', especialidade: 'Feminina e Adolescentes', imagem: '/images/clinicas/clinica2.jpg' },
  { nome: 'Centro Recomeço', cidade: 'São Paulo — SP', especialidade: 'Masculina', imagem: '/images/clinicas/clinica3.jpg' },
  { nome: 'Clínica Renascer', cidade: 'Jundiaí — SP', especialidade: 'Masculina e Feminina', imagem: '/images/clinicas/clinica4.jpg' },
]

const metodologias = [
  { icone: '🧠', titulo: 'Entrevista Motivacional', texto: 'Técnica que respeita o tempo do paciente, fortalece a motivação interna e reduz resistências ao tratamento. Amplamente utilizada na admissão e no acompanhamento.' },
  { icone: '🔄', titulo: 'Terapia Cognitivo-Comportamental', texto: 'Trabalha os padrões de pensamento que levam ao uso de substâncias. Ajuda o paciente a identificar gatilhos e desenvolver novas respostas comportamentais.' },
  { icone: '👨‍👩‍👧', titulo: 'Terapia Familiar', texto: 'A família é parte essencial da recuperação. Sessões estruturadas que restauram vínculos, estabelecem comunicação saudável e preparam todos para o pós-tratamento.' },
  { icone: '12', titulo: 'Programa dos 12 Passos', texto: 'Abordagem baseada em princípios espirituais e de grupo, amplamente reconhecida mundialmente. Complementa o tratamento clínico e fortalece a rede de apoio.' },
  { icone: '🏃', titulo: 'Terapia Ocupacional', texto: 'Reintegra o paciente à rotina por meio de atividades estruturadas — esporte, arte, trabalho. Essencial para a reinserção social após o período de internação.' },
  { icone: '💊', titulo: 'Suporte Psiquiátrico', texto: 'Acompanhamento médico especializado para manejo da abstinência, comorbidades e uso criterioso de medicação. Presente 24h nas clínicas credenciadas.' },
]

const faqs = [
  { pergunta: 'Posso internar alguém sem que ela queira?', resposta: 'Sim, em situações específicas. A internação involuntária é legal no Brasil quando há risco à saúde ou à vida do paciente, mediante avaliação médica. A internação compulsória é determinada judicialmente. Em ambos os casos, orientamos as famílias durante todo o processo.' },
  { pergunta: 'Quanto custa uma internação em clínica particular?', resposta: 'Os valores variam conforme a clínica, o tipo de acomodação e o tempo de internação. O período mínimo recomendado é de 30 dias, com custo médio a partir de R$ 3.500/mês. Trabalhamos com diversas opções para diferentes perfis e orçamentos.' },
  { pergunta: 'O plano de saúde cobre o tratamento?', resposta: 'Alguns planos cobrem parcialmente — especialmente psiquiatria e desintoxicação. A cobertura completa da internação em clínica de reabilitação ainda é limitada no Brasil. Nossa equipe orienta sobre as melhores alternativas para cada caso.' },
  { pergunta: 'Qual é o tempo mínimo de tratamento?', resposta: 'O tempo mínimo recomendado é de 30 dias, mas a maioria dos especialistas indica 90 dias para resultados consistentes. O tratamento é individual: depende da substância, do tempo de uso e das condições clínicas de cada pessoa.' },
  { pergunta: 'O paciente pode receber visitas durante a internação?', resposta: 'Sim, mas com regras específicas que variam por clínica. Geralmente as visitas são liberadas após um período inicial de adaptação (7 a 15 dias). O objetivo é proteger o processo terapêutico nas fases mais delicadas.' },
  { pergunta: 'Como funciona o encaminhamento pela Porta de Volta?', resposta: 'Você nos conta a situação pelo questionário ou WhatsApp. Nossa equipe analisa o perfil e indica a clínica ou profissional mais adequado — gratuitamente e sem compromisso. O sigilo é total.' },
  { pergunta: 'O que é recaída e como lidar com ela?', resposta: 'Recaída é parte do processo de recuperação para muitas pessoas — não é fracasso. É um sinal de que o tratamento precisa ser ajustado. A abordagem correta é retomar o acompanhamento imediatamente, sem culpa.' },
  { pergunta: 'Existe tratamento para familiares também?', resposta: 'Sim. A codependência é real e precisa ser tratada. Oferecemos orientação para familiares e indicamos grupos de apoio como Al-Anon e Nar-Anon, além de terapia familiar nas clínicas credenciadas.' },
]

const TAGS = ['Todos', 'Internação', 'Tratamento', 'Família', 'Metodologia']

export default function BlogCliente() {
  const [tagAtiva, setTagAtiva] = useState('Todos')
  const [faqAberta, setFaqAberta] = useState<number | null>(null)

  const artigosFiltrados = tagAtiva === 'Todos' ? artigos : artigos.filter(a => a.tag === tagAtiva)

  return (
    <main className={styles.main}>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.tag}>Conteúdo</span>
          <h1 className={styles.heroTitulo}>Informação que acolhe.<br />Conteúdo que orienta.</h1>
          <p className={styles.heroSubtitulo}>Artigos, metodologias e orientações produzidos por profissionais especializados em dependência química. Sem jargões. Sem julgamento.</p>
        </div>
      </section>

      <section className={styles.secao}>
        <div className={styles.container}>
          <h2 className={styles.secTitulo}>Artigos e orientações</h2>
          <p className={styles.secSubtitulo}>Leitura essencial para quem busca entender a dependência química com mais clareza.</p>
          <div className={styles.tags}>
            {TAGS.map(t => (
              <button key={t} className={styles.tagBtn + (tagAtiva === t ? ' ' + styles.tagBtnAtiva : '')} onClick={() => setTagAtiva(t)}>{t}</button>
            ))}
          </div>
          <div className={styles.artigosGrid}>
            {artigosFiltrados.map(a => (
              <article key={a.slug} className={styles.artigoCard}>
                <div className={styles.artigoImgWrap}>
                  <Image src={a.imagem} alt={a.titulo} width={400} height={220} className={styles.artigoImg} />
                  <span className={styles.artigoTag}>{a.tag}</span>
                </div>
                <div className={styles.artigoBody}>
                  <h3 className={styles.artigoTitulo}>{a.titulo}</h3>
                  <p className={styles.artigoResumo}>{a.resumo}</p>
                  <Link href={'/blog/' + a.slug} className={styles.artigoLink}>Ler artigo →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.secaoDestaque}>
        <div className={styles.container}>
          <h2 className={styles.secTitulo}>Espaços de acolhimento credenciados</h2>
          <p className={styles.secSubtitulo}>Clínicas parceiras com estrutura humanizada, equipe multidisciplinar e metodologias reconhecidas.</p>
          <div className={styles.clinicasGrid}>
            {clinicas.map(c => (
              <div key={c.nome} className={styles.clinicaCard}>
                <div className={styles.clinicaImgWrap}>
                  <Image src={c.imagem} alt={c.nome} width={320} height={200} className={styles.clinicaImg} />
                </div>
                <div className={styles.clinicaBody}>
                  <h3 className={styles.clinicaNome}>{c.nome}</h3>
                  <p className={styles.clinicaCidade}>📍 {c.cidade}</p>
                  <p className={styles.clinicaEsp}>👥 {c.especialidade}</p>
                  <Link href='/quero-ajuda' className={styles.clinicaBtn}>Quero ser encaminhado →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.secao}>
        <div className={styles.container}>
          <h2 className={styles.secTitulo}>Metodologias empregadas na recuperação</h2>
          <p className={styles.secSubtitulo}>Abordagens baseadas em evidências, aplicadas pelas clínicas que indicamos.</p>
          <div className={styles.metodGrid}>
            {metodologias.map(m => (
              <div key={m.titulo} className={styles.metodCard}>
                <span className={styles.metodIcone} aria-hidden='true'>{m.icone}</span>
                <h3 className={styles.metodTitulo}>{m.titulo}</h3>
                <p className={styles.metodTexto}>{m.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.secaoDestaque}>
        <div className={styles.container}>
          <h2 className={styles.secTitulo}>Perguntas frequentes</h2>
          <p className={styles.secSubtitulo}>As dúvidas mais comuns de quem busca ajuda pela primeira vez.</p>
          <div className={styles.faqLista}>
            {faqs.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <button className={styles.faqPergunta} onClick={() => setFaqAberta(faqAberta === i ? null : i)}>
                  <span>{faq.pergunta}</span>
                  <span className={styles.faqIcone}>{faqAberta === i ? '−' : '+'}</span>
                </button>
                {faqAberta === i && <p className={styles.faqResposta}>{faq.resposta}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitulo}>Pronto para dar o próximo passo?</h2>
          <p className={styles.ctaTexto}>Nossa equipe está aqui para ouvir, orientar e encaminhar — de forma gratuita, sigilosa e humanizada.</p>
          <div className={styles.ctaBotoes}>
            <Link href='/quero-ajuda' className={styles.btnPrimario}>Preciso de ajuda para mim</Link>
            <Link href='/quero-ajudar' className={styles.btnSecundario}>Quero ajudar alguém</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
