'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SITE, WHATSAPP_URL } from '@/lib/constants'
import styles from './quero-ajudar.module.css'

type Etapa = 0 | 1 | 2 | 3 | 4 | 5 | 6

interface Respostas {
  vinculo: string
  oQueObserva: string[]
  tempoSituacao: string
  impactoFamilia: string[]
  jaAjudou: string
  oQueEspera: string
  nome: string
  contato: string
  contatoTipo: 'whatsapp' | 'email' | ''
  livre: string
}

const VINCULOS = [
  { id: 'conjuge', label: 'Cônjuge / Parceiro(a)' },
  { id: 'filho', label: 'Filho(a)' },
  { id: 'pai_mae', label: 'Pai ou Mãe' },
  { id: 'irmao', label: 'Irmão ou Irmã' },
  { id: 'amigo', label: 'Amigo(a) próximo(a)' },
  { id: 'outro', label: 'Outro vínculo' },
]

const OBSERVACOES = [
  { id: 'uso_frequente', label: 'Uso frequente de substâncias' },
  { id: 'mudanca_humor', label: 'Mudanças bruscas de humor' },
  { id: 'isolamento', label: 'Isolamento e afastamento da família' },
  { id: 'agressividade', label: 'Agressividade ou irritabilidade' },
  { id: 'problemas_trabalho', label: 'Problemas no trabalho ou estudos' },
  { id: 'financeiro', label: 'Dificuldades financeiras por causa do uso' },
  { id: 'saude', label: 'Problemas de saúde visíveis' },
  { id: 'negacao', label: 'Nega que tem um problema' },
]

const TEMPOS = [
  { id: 'menos_6m', label: 'Menos de 6 meses' },
  { id: '6m_1a', label: 'Entre 6 meses e 1 ano' },
  { id: '1a_3a', label: 'Entre 1 e 3 anos' },
  { id: 'mais_3a', label: 'Mais de 3 anos' },
]

const IMPACTOS = [
  { id: 'estresse', label: 'Estresse e ansiedade constantes' },
  { id: 'conflitos', label: 'Conflitos e brigas frequentes' },
  { id: 'financeiro', label: 'Impacto financeiro na família' },
  { id: 'filhos', label: 'Preocupação com filhos ou outros familiares' },
  { id: 'saude_mental', label: 'Minha própria saúde mental foi afetada' },
  { id: 'isolamento', label: 'Me isolei para esconder a situação' },
]

const O_QUE_ESPERA = [
  { id: 'orientacao', label: 'Orientação sobre como abordar a situação' },
  { id: 'encaminhamento', label: 'Encaminhamento para tratamento especializado' },
  { id: 'apoio', label: 'Apoio para mim também, não só para ele(a)' },
  { id: 'entender', label: 'Entender melhor o que está acontecendo' },
  { id: 'conversar', label: 'Só preciso conversar com alguém que entenda' },
]

const etapaTotal = 6

export default function QueroAjudarCliente() {
  const [etapa, setEtapa] = useState<Etapa>(0)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')
  const [respostas, setRespostas] = useState<Respostas>({
    vinculo: '',
    oQueObserva: [],
    tempoSituacao: '',
    impactoFamilia: [],
    jaAjudou: '',
    oQueEspera: '',
    nome: '',
    contato: '',
    contatoTipo: '',
    livre: '',
  })

  function setSingle<K extends keyof Respostas>(campo: K, valor: Respostas[K]) {
    setRespostas((prev) => ({ ...prev, [campo]: valor }))
  }

  function toggleArray(campo: 'oQueObserva' | 'impactoFamilia', id: string) {
    setRespostas((prev) => {
      const lista = prev[campo] as string[]
      const existe = lista.includes(id)
      return { ...prev, [campo]: existe ? lista.filter((x) => x !== id) : [...lista, id] }
    })
  }

  function avancar() {
    setEtapa((e) => (e + 1) as Etapa)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function voltar() {
    setEtapa((e) => (e - 1) as Etapa)
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
        body: JSON.stringify({ tipo: 'familiar', ...respostas }),
      })
      if (!res.ok) throw new Error()
      setEnviado(true)
      setEtapa(6)
    } catch {
      setErro('Algo deu errado. Tente novamente ou use o WhatsApp.')
    } finally {
      setEnviando(false)
    }
  }

  const progresso = etapa === 0 ? 0 : Math.round((etapa / etapaTotal) * 100)

  return (
    <main className={styles.main}>
      <div className={styles.card}>

        {etapa > 0 && etapa < 6 && (
          <div className={styles.progressoWrap}>
            <div className={styles.progressoBarra}>
              <div className={styles.progressoFill} style={{ width: progresso + '%' }} />
            </div>
            <span className={styles.progressoLabel}>{etapa} de {etapaTotal}</span>
          </div>
        )}

        {etapa === 0 && (
          <div className={styles.etapa}>
            <div className={styles.iconeWrap} aria-hidden="true">ð</div>
            <h1 className={styles.titulo}>Você está aqui porque se importa.</h1>
            <p className={styles.texto}>
              Ver alguém que amamos sofrer com a dependência é uma das experiências
              mais dolorosas que existem. Você não precisa carregar isso sozinho.
            </p>
            <p className={styles.texto}>
              Vou te fazer algumas perguntas para que{' '}
              <strong>{SITE.terapeuta}</strong> entenda melhor a situação e possa
              te orientar sobre como ajudar — e como cuidar de você também.
            </p>
            <p className={styles.textoDestaque}>
              Leva cerca de 5 minutos. Tudo que compartilhar é confidencial.
            </p>
            <button className={styles.btnPrimario} onClick={avancar}>
              Quero contar o que está acontecendo
            </button>
            <Link href="/" className={styles.linkVoltar}>
              Voltar para o início
            </Link>
          </div>
        )}

        {etapa === 1 && (
          <div className={styles.etapa}>
            <p className={styles.etapaLabel}>Para começar</p>
            <h2 className={styles.titulo}>Qual é o seu vínculo com a pessoa?</h2>
            <div className={styles.radioStack}>
              {VINCULOS.map((v) => (
                <button
                  key={v.id}
                  className={styles.radioItem + (respostas.vinculo === v.id ? ' ' + styles.radioItemAtivo : '')}
                  onClick={() => setSingle('vinculo', v.id)}
                  aria-pressed={respostas.vinculo === v.id}
                >
                  {v.label}
                </button>
              ))}
            </div>
            <div className={styles.acoes}>
              <button className={styles.btnSecundario} onClick={voltar}>Voltar</button>
              <button className={styles.btnPrimario} onClick={avancar} disabled={!respostas.vinculo}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {etapa === 2 && (
          <div className={styles.etapa}>
            <p className={styles.etapaLabel}>O que você está vendo</p>
            <h2 className={styles.titulo}>O que você tem observado nela?</h2>
            <p className={styles.texto}>Pode marcar mais de uma opção.</p>
            <div className={styles.checkGrid}>
              {OBSERVACOES.map((o) => (
                <button
                  key={o.id}
                  className={styles.checkItem + (respostas.oQueObserva.includes(o.id) ? ' ' + styles.checkItemAtivo : '')}
                  onClick={() => toggleArray('oQueObserva', o.id)}
                  aria-pressed={respostas.oQueObserva.includes(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <div className={styles.acoes}>
              <button className={styles.btnSecundario} onClick={voltar}>Voltar</button>
              <button className={styles.btnPrimario} onClick={avancar} disabled={respostas.oQueObserva.length === 0}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {etapa === 3 && (
          <div className={styles.etapa}>
            <p className={styles.etapaLabel}>A duração</p>
            <h2 className={styles.titulo}>Há quanto tempo você percebe essa situação?</h2>
            <div className={styles.radioStack}>
              {TEMPOS.map((t) => (
                <button
                  key={t.id}
                  className={styles.radioItem + (respostas.tempoSituacao === t.id ? ' ' + styles.radioItemAtivo : '')}
                  onClick={() => setSingle('tempoSituacao', t.id)}
                  aria-pressed={respostas.tempoSituacao === t.id}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className={styles.acoes}>
              <button className={styles.btnSecundario} onClick={voltar}>Voltar</button>
              <button className={styles.btnPrimario} onClick={avancar} disabled={!respostas.tempoSituacao}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {etapa === 4 && (
          <div className={styles.etapa}>
            <p className={styles.etapaLabel}>O impacto em você</p>
            <h2 className={styles.titulo}>Como essa situação tem afetado sua vida?</h2>
            <p className={styles.texto}>Pode marcar mais de uma opção.</p>
            <div className={styles.checkGrid}>
              {IMPACTOS.map((i) => (
                <button
                  key={i.id}
                  className={styles.checkItem + (respostas.impactoFamilia.includes(i.id) ? ' ' + styles.checkItemAtivo : '')}
                  onClick={() => toggleArray('impactoFamilia', i.id)}
                  aria-pressed={respostas.impactoFamilia.includes(i.id)}
                >
                  {i.label}
                </button>
              ))}
            </div>
            <div className={styles.acoes}>
              <button className={styles.btnSecundario} onClick={voltar}>Voltar</button>
              <button className={styles.btnPrimario} onClick={avancar} disabled={respostas.impactoFamilia.length === 0}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {etapa === 5 && (
          <div className={styles.etapa}>
            <p className={styles.etapaLabel}>Quase lá</p>
            <h2 className={styles.titulo}>O que você espera do atendimento?</h2>
            <div className={styles.radioStack}>
              {O_QUE_ESPERA.map((o) => (
                <button
                  key={o.id}
                  className={styles.radioItem + (respostas.oQueEspera === o.id ? ' ' + styles.radioItemAtivo : '')}
                  onClick={() => setSingle('oQueEspera', o.id)}
                  aria-pressed={respostas.oQueEspera === o.id}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <p className={styles.subPergunta}>Seu primeiro nome</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Como podemos te chamar?"
              value={respostas.nome}
              onChange={(e) => setSingle('nome', e.target.value)}
            />
            <p className={styles.subPergunta}>Como prefere ser contactado?</p>
            <div className={styles.radioStack}>
              <button
                className={styles.radioItem + (respostas.contatoTipo === 'whatsapp' ? ' ' + styles.radioItemAtivo : '')}
                onClick={() => setSingle('contatoTipo', 'whatsapp')}
              >
                WhatsApp
              </button>
              <button
                className={styles.radioItem + (respostas.contatoTipo === 'email' ? ' ' + styles.radioItemAtivo : '')}
                onClick={() => setSingle('contatoTipo', 'email')}
              >
                E-mail
              </button>
            </div>
            {respostas.contatoTipo && (
              <input
                className={styles.input}
                type={respostas.contatoTipo === 'email' ? 'email' : 'tel'}
                placeholder={respostas.contatoTipo === 'whatsapp' ? 'Seu WhatsApp com DDD' : 'Seu e-mail'}
                value={respostas.contato}
                onChange={(e) => setSingle('contato', e.target.value)}
              />
            )}
            <p className={styles.subPergunta}>Quer adicionar mais alguma coisa? (opcional)</p>
            <textarea
              className={styles.textarea}
              placeholder="Qualquer detalhe que achar importante..."
              rows={4}
              value={respostas.livre}
              onChange={(e) => setSingle('livre', e.target.value)}
            />
            {erro && <p className={styles.erroMsg}>{erro}</p>}
            <div className={styles.acoes}>
              <button className={styles.btnSecundario} onClick={voltar}>Voltar</button>
              <button className={styles.btnPrimario} onClick={enviar} disabled={enviando}>
                {enviando ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </div>
        )}

        {etapa === 6 && enviado && (
          <div className={styles.etapa}>
            <div className={styles.iconeWrap} aria-hidden="true">ð</div>
            <h2 className={styles.titulo}>Recebemos sua mensagem.</h2>
            <p className={styles.texto}>
              <strong>{SITE.terapeuta}</strong> vai entrar em contato em breve.
              O que você fez hoje já é um passo enorme.
            </p>
            <a
              href={WHATSAPP_URL('Olá, vim pelo site Porta de Volta e gostaria de conversar.')}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWhatsapp}
            >
              Falar agora pelo WhatsApp
            </a>
            <Link href="/" className={styles.linkVoltar}>
              Voltar para o início
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}
