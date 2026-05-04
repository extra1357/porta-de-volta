'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SITE, WHATSAPP_URL } from '@/lib/constants'
import styles from './quero-ajuda.module.css'

type Etapa = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

interface Respostas {
  motivacao: string
  substancias: string[]
  frequencia: string
  contexto: string
  impactoVida: string[]
  impactoRelacoes: string[]
  tentativas: string
  oQueQuer: string
  nome: string
  contato: string
  contatoTipo: 'whatsapp' | 'email' | ''
  livre: string
}

const SUBSTANCIAS = [
  { id: 'alcool',       label: 'Álcool' },
  { id: 'crack',        label: 'Crack' },
  { id: 'cocaina',      label: 'Cocaína' },
  { id: 'maconha',      label: 'Maconha' },
  { id: 'ansioliticos', label: 'Ansiolíticos / Remédios para dormir' },
  { id: 'anfetaminas',  label: 'Anfetaminas / Estimulantes' },
  { id: 'heroina',      label: 'Heroína / Opioides' },
  { id: 'inalantes',    label: 'Inalantes / Solventes' },
  { id: 'outros',       label: 'Outra substância' },
]

const FREQUENCIAS = [
  { id: 'diario',    label: 'Todo dia ou quase todo dia' },
  { id: 'semanal',   label: 'Algumas vezes por semana' },
  { id: 'mensal',    label: 'Algumas vezes por mês' },
  { id: 'ocasional', label: 'Raramente / em ocasiões específicas' },
  { id: 'parei',     label: 'Parei, mas me preocupo com recaída' },
]

const CONTEXTOS = [
  { id: 'sozinho',  label: 'Quando estou sozinho' },
  { id: 'estresse', label: 'Para lidar com estresse ou ansiedade' },
  { id: 'dor',      label: 'Para aliviar dor física ou emocional' },
  { id: 'social',   label: 'Em situações sociais' },
  { id: 'habito',   label: 'Já virou hábito automático' },
  { id: 'nao_sei',  label: 'Não sei bem explicar' },
]

const IMPACTOS_VIDA = [
  { id: 'trabalho',   label: 'Trabalho ou estudos' },
  { id: 'saude',      label: 'Saúde física' },
  { id: 'sono',       label: 'Sono e energia' },
  { id: 'financeiro', label: 'Situação financeira' },
  { id: 'autoestima', label: 'Autoestima e autoimagem' },
  { id: 'nenhum',     label: 'Ainda não percebi impacto direto' },
]

const IMPACTOS_RELACOES = [
  { id: 'familia',      label: 'Família' },
  { id: 'parceiro',     label: 'Parceiro(a) / relacionamento afetivo' },
  { id: 'amigos',       label: 'Amizades' },
  { id: 'trabalho_rel', label: 'Colegas de trabalho' },
  { id: 'isolamento',   label: 'Me isolei de quase todos' },
  { id: 'nenhum_rel',   label: 'Não percebi impacto nos relacionamentos' },
]

const TENTATIVAS = [
  { id: 'nunca',      label: 'Nunca tentei parar formalmente' },
  { id: 'sozinho',    label: 'Já tentei sozinho mas não consegui manter' },
  { id: 'tratamento', label: 'Já fiz algum tipo de tratamento' },
  { id: 'internacao', label: 'Já fui internado' },
  { id: 'multiplas',  label: 'Tentei muitas vezes, sempre recaio' },
]

const O_QUE_QUER = [
  { id: 'parar',     label: 'Parar completamente' },
  { id: 'reduzir',   label: 'Reduzir e ter mais controle' },
  { id: 'entender',  label: 'Entender melhor minha situação primeiro' },
  { id: 'clinica',   label: 'Ser encaminhado para tratamento especializado' },
  { id: 'conversar', label: 'Só quero conversar com alguém que entenda' },
]

const ETAPA_TOTAL = 7

function toggle(arr: string[], id: string): string[] {
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]
}

export default function QueroAjudaCliente() {
  const [etapa, setEtapa] = useState<Etapa>(0)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [respostas, setRespostas] = useState<Respostas>({
    motivacao: '',
    substancias: [],
    frequencia: '',
    contexto: '',
    impactoVida: [],
    impactoRelacoes: [],
    tentativas: '',
    oQueQuer: '',
    nome: '',
    contato: '',
    contatoTipo: '',
    livre: '',
  })

  function set<K extends keyof Respostas>(campo: K, valor: Respostas[K]) {
    setRespostas((prev) => ({ ...prev, [campo]: valor }))
  }

  function avancar() {
    setEtapa((e) => Math.min(e + 1, ETAPA_TOTAL) as Etapa)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function voltar() {
    setEtapa((e) => Math.max(e - 1, 0) as Etapa)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function enviar() {
    if (!respostas.nome.trim() || !respostas.contato.trim() || !respostas.contatoTipo) {
      setErro('Por favor, preencha seu nome e como podemos te contatar.')
      return
    }
    setErro('')
    setEnviando(true)
    try {
      const res = await fetch('/api/triagem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: 'paciente', ...respostas }),
      })
      if (!res.ok) throw new Error('erro')
      avancar()
    } catch {
      setErro('Algo deu errado. Tente novamente ou nos chame pelo WhatsApp.')
    } finally {
      setEnviando(false)
    }
  }

  const progresso = etapa === 0 ? 0 : Math.round((etapa / ETAPA_TOTAL) * 100)

  return (
    <main className={styles.main}>
      <div className={styles.card}>

        {etapa > 0 && etapa < ETAPA_TOTAL && (
          <div className={styles.progressoWrap} aria-label={'Etapa ' + etapa + ' de ' + ETAPA_TOTAL}>
            <div className={styles.progressoBarra}>
              <div className={styles.progressoFill} style={{ width: progresso + '%' }} />
            </div>
            <span className={styles.progressoLabel}>{etapa} de {ETAPA_TOTAL}</span>
          </div>
        )}

        {etapa === 0 && (
          <div className={styles.etapa}>
            <div className={styles.iconeWrap} aria-hidden="true">🌱</div>
            <h1 className={styles.titulo}>Você fez algo difícil ao chegar até aqui.</h1>
            <p className={styles.texto}>
              Este espaço é seu. Não há respostas certas ou erradas,
              não há julgamentos e nada do que você compartilhar será exposto.
            </p>
            <p className={styles.texto}>
              Vou te fazer algumas perguntas simples para que{' '}
              <strong>{SITE.terapeuta}</strong> entenda melhor a sua situação
              antes de entrar em contato com você.
            </p>
            <p className={styles.textoDestaque}>
              Leva cerca de 5 minutos. Você pode parar quando quiser.
            </p>
            <button className={styles.btnPrimario} onClick={avancar}>
              Estou pronto para começar
            </button>
            <Link href="/" className={styles.linkVoltar}>Voltar para o início</Link>
          </div>
        )}

        {etapa === 1 && (
          <div className={styles.etapa}>
            <p className={styles.etapaLabel}>Para começar</p>
            <h2 className={styles.titulo}>O que te trouxe aqui hoje?</h2>
            <p className={styles.texto}>
              Não precisa ser perfeito. Pode ser uma frase curta —
              o que está pesando mais neste momento.
            </p>
            <textarea
              className={styles.textarea}
              placeholder="Pode escrever do seu jeito..."
              rows={5}
              value={respostas.motivacao}
              onChange={(e) => set('motivacao', e.target.value)}
              aria-label="O que te trouxe aqui hoje"
            />
            <div className={styles.acoes}>
              <button className={styles.btnSecundario} onClick={voltar}>Voltar</button>
              <button
                className={styles.btnPrimario}
                onClick={avancar}
                disabled={!respostas.motivacao.trim()}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {etapa === 2 && (
          <div className={styles.etapa}>
            <p className={styles.etapaLabel}>Sobre o uso</p>
            <h2 className={styles.titulo}>Com qual substância você tem tido dificuldade?</h2>
            <p className={styles.texto}>Pode marcar mais de uma.</p>
            <div className={styles.checkGrid}>
              {SUBSTANCIAS.map((s) => (
                <button
                  key={s.id}
                  className={styles.checkItem + (respostas.substancias.includes(s.id) ? ' ' + styles.checkItemAtivo : '')}
                  onClick={() => set('substancias', toggle(respostas.substancias, s.id))}
                  aria-pressed={respostas.substancias.includes(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className={styles.subPergunta}>Com que frequência acontece?</p>
            <div className={styles.radioStack}>
              {FREQUENCIAS.map((f) => (
                <button
                  key={f.id}
                  className={styles.radioItem + (respostas.frequencia === f.id ? ' ' + styles.radioItemAtivo : '')}
                  onClick={() => set('frequencia', f.id)}
                  aria-pressed={respostas.frequencia === f.id}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className={styles.acoes}>
              <button className={styles.btnSecundario} onClick={voltar}>Voltar</button>
              <button
                className={styles.btnPrimario}
                onClick={avancar}
                disabled={respostas.substancias.length === 0 || !respostas.frequencia}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {etapa === 3 && (
          <div className={styles.etapa}>
            <p className={styles.etapaLabel}>Entendendo melhor</p>
            <h2 className={styles.titulo}>Em que situações isso costuma acontecer?</h2>
            <p className={styles.texto}>
              Isso ajuda o terapeuta a entender o que pode estar por trás do uso.
            </p>
            <div className={styles.radioStack}>
              {CONTEXTOS.map((c) => (
                <button
                  key={c.id}
                  className={styles.radioItem + (respostas.contexto === c.id ? ' ' + styles.radioItemAtivo : '')}
                  onClick={() => set('contexto', c.id)}
                  aria-pressed={respostas.contexto === c.id}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className={styles.acoes}>
              <button className={styles.btnSecundario} onClick={voltar}>Voltar</button>
              <button
                className={styles.btnPrimario}
                onClick={avancar}
                disabled={!respostas.contexto}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {etapa === 4 && (
          <div className={styles.etapa}>
            <p className={styles.etapaLabel}>O impacto na sua vida</p>
            <h2 className={styles.titulo}>Em quais áreas você tem sentido mais dificuldade?</h2>
            <p className={styles.texto}>Escolha quantas fizerem sentido.</p>
            <div className={styles.checkGrid}>
              {IMPACTOS_VIDA.map((item) => (
                <button
                  key={item.id}
                  className={styles.checkItem + (respostas.impactoVida.includes(item.id) ? ' ' + styles.checkItemAtivo : '')}
                  onClick={() => set('impactoVida', toggle(respostas.impactoVida, item.id))}
                  aria-pressed={respostas.impactoVida.includes(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className={styles.subPergunta}>E nos seus relacionamentos?</p>
            <div className={styles.checkGrid}>
              {IMPACTOS_RELACOES.map((item) => (
                <button
                  key={item.id}
                  className={styles.checkItem + (respostas.impactoRelacoes.includes(item.id) ? ' ' + styles.checkItemAtivo : '')}
                  onClick={() => set('impactoRelacoes', toggle(respostas.impactoRelacoes, item.id))}
                  aria-pressed={respostas.impactoRelacoes.includes(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className={styles.acoes}>
              <button className={styles.btnSecundario} onClick={voltar}>Voltar</button>
              <button className={styles.btnPrimario} onClick={avancar}>Continuar</button>
            </div>
          </div>
        )}

        {etapa === 5 && (
          <div className={styles.etapa}>
            <p className={styles.etapaLabel}>Sua jornada até aqui</p>
            <h2 className={styles.titulo}>Você já tentou parar ou reduzir antes?</h2>
            <p className={styles.texto}>
              Não existe resposta certa. Saber o que você já viveu ajuda
              o terapeuta a encontrar o melhor caminho com você.
            </p>
            <div className={styles.radioStack}>
              {TENTATIVAS.map((t) => (
                <button
                  key={t.id}
                  className={styles.radioItem + (respostas.tentativas === t.id ? ' ' + styles.radioItemAtivo : '')}
                  onClick={() => set('tentativas', t.id)}
                  aria-pressed={respostas.tentativas === t.id}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className={styles.acoes}>
              <button className={styles.btnSecundario} onClick={voltar}>Voltar</button>
              <button
                className={styles.btnPrimario}
                onClick={avancar}
                disabled={!respostas.tentativas}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {etapa === 6 && (
          <div className={styles.etapa}>
            <p className={styles.etapaLabel}>Quase lá</p>
            <h2 className={styles.titulo}>O que você gostaria que mudasse?</h2>
            <p className={styles.texto}>
              Escolha o que mais ressoa agora — pode ser diferente amanhã, e tudo bem.
            </p>
            <div className={styles.radioStack}>
              {O_QUE_QUER.map((o) => (
                <button
                  key={o.id}
                  className={styles.radioItem + (respostas.oQueQuer === o.id ? ' ' + styles.radioItemAtivo : '')}
                  onClick={() => set('oQueQuer', o.id)}
                  aria-pressed={respostas.oQueQuer === o.id}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <p className={styles.subPergunta}>Quer deixar mais alguma coisa para o terapeuta saber?</p>
            <textarea
              className={styles.textarea}
              placeholder="Opcional — escreva o que quiser..."
              rows={4}
              value={respostas.livre}
              onChange={(e) => set('livre', e.target.value)}
              aria-label="Mensagem livre"
            />
            <div className={styles.separador} />
            <p className={styles.subPergunta}>Como podemos te chamar?</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Seu nome (pode ser só o primeiro)"
              value={respostas.nome}
              onChange={(e) => set('nome', e.target.value)}
              aria-label="Seu nome"
            />
            <p className={styles.subPergunta}>Como prefere receber o retorno?</p>
            <div className={styles.contatoOpcoes}>
              <button
                className={styles.contatoOpcao + (respostas.contatoTipo === 'whatsapp' ? ' ' + styles.contatoAtivo : '')}
                onClick={() => set('contatoTipo', 'whatsapp')}
                aria-pressed={respostas.contatoTipo === 'whatsapp'}
              >
                WhatsApp
              </button>
              <button
                className={styles.contatoOpcao + (respostas.contatoTipo === 'email' ? ' ' + styles.contatoAtivo : '')}
                onClick={() => set('contatoTipo', 'email')}
                aria-pressed={respostas.contatoTipo === 'email'}
              >
                E-mail
              </button>
            </div>
            {respostas.contatoTipo !== '' && (
              <input
                className={styles.input}
                type={respostas.contatoTipo === 'email' ? 'email' : 'tel'}
                placeholder={respostas.contatoTipo === 'whatsapp' ? 'Seu número com DDD' : 'Seu e-mail'}
                value={respostas.contato}
                onChange={(e) => set('contato', e.target.value)}
                aria-label="Seu contato"
              />
            )}
            <p className={styles.lgpdAviso}>
              🔒 Seus dados são tratados como informação sensível de saúde, conforme a LGPD.
              Jamais serão compartilhados sem sua autorização.
            </p>
            {erro && <p className={styles.erroMsg} role="alert">{erro}</p>}
            <div className={styles.acoes}>
              <button className={styles.btnSecundario} onClick={voltar} disabled={enviando}>Voltar</button>
              <button
                className={styles.btnPrimario}
                onClick={enviar}
                disabled={enviando || !respostas.nome.trim() || !respostas.contato.trim() || !respostas.contatoTipo}
              >
                {enviando ? 'Enviando...' : 'Enviar para o terapeuta'}
              </button>
            </div>
          </div>
        )}

        {etapa === 7 && (
          <div className={styles.etapa}>
            <div className={styles.iconeWrap} aria-hidden="true">💚</div>
            <h2 className={styles.titulo}>
              {respostas.nome ? respostas.nome + ', recebemos sua mensagem.' : 'Recebemos sua mensagem.'}
            </h2>
            <p className={styles.texto}>
              {SITE.terapeuta} vai ler o que você compartilhou com atenção e cuidado,
              e vai entrar em contato em breve.
            </p>
            <p className={styles.texto}>Se quiser conversar agora:</p>
            <a
              href={WHATSAPP_URL('Olá ' + SITE.terapeuta + ', acabei de preencher o questionário no site Porta de Volta.')}
              className={styles.btnWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chamar no WhatsApp agora
            </a>
            <Link href="/" className={styles.linkVoltar}>Voltar para o início</Link>
          </div>
        )}

      </div>
    </main>
  )
}
