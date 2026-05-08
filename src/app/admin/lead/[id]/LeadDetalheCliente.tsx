'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import styles from './lead-detalhe.module.css'

interface Lead {
  id: string
  criadoEm: string
  atualizadoEm: string
  perfil: 'PACIENTE' | 'FAMILIAR'
  primeiroNome: string
  contatoWhatsapp: string
  contatoEmail: string | null
  comoEstaHoje: string
  tempoSituacao: string
  jaTeveAjuda: boolean
  relatoLivre: string
  status: 'NOVO' | 'EM_ATENDIMENTO' | 'ENCAMINHADO' | 'FINALIZADO' | 'ARQUIVADO'
  notaInterna: string | null
  ip: string | null
  lgpdConsentimento: boolean
  lgpdDataConsent: string | null
}

const STATUS_LABEL: Record<Lead['status'], string> = {
  NOVO: 'Novo',
  EM_ATENDIMENTO: 'Em atendimento',
  ENCAMINHADO: 'Encaminhado',
  FINALIZADO: 'Finalizado',
  ARQUIVADO: 'Arquivado',
}

export default function LeadDetalheCliente() {
  const { data: session, status } = useSession()
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [lead, setLead] = useState<Lead | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [nota, setNota] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [salvoOk, setSalvoOk] = useState(false)
  const [novoStatus, setNovoStatus] = useState<Lead['status']>('NOVO')

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/admin/login'); return }
    if (status !== 'authenticated') return
    fetch('/api/leads/' + id)
      .then((r) => {
        if (r.status === 401) { router.push('/admin/login'); return null }
        return r.json()
      })
      .then((data) => {
        if (!data) return
        setLead(data.lead)
        setNota(data.lead?.notaInterna ?? '')
        setNovoStatus(data.lead?.status ?? 'NOVO')
      })
      .finally(() => setCarregando(false))
  }, [id, router, status])

  async function salvar() {
    setSalvando(true)
    try {
      const res = await fetch('/api/leads/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus, notaInterna: nota }),
      })
      if (res.ok) {
        setSalvoOk(true)
        setTimeout(() => setSalvoOk(false), 3000)
      }
    } finally {
      setSalvando(false)
    }
  }

  if (status === 'loading' || carregando) return <div className={styles.loading}>Carregando ficha...</div>
  if (!session) return null
  if (!lead) return <div className={styles.loading}>Lead não encontrado.</div>

  return (
    <main className={styles.main}>
      <div className={styles.topbar}>
        <button className={styles.btnVoltar} onClick={() => router.push('/admin')}>
          ← Voltar ao painel
        </button>
        <button className={styles.btnImprimir} onClick={() => window.print()}>
          Imprimir ficha
        </button>
      </div>

      <div className={styles.fichaHeader}>
        <div>
          <h1 className={styles.fichaNome}>{lead.primeiroNome}</h1>
          <div className={styles.fichaMeta}>
            <span className={styles.perfilBadge + ' ' + (lead.perfil === 'PACIENTE' ? styles.perfilPaciente : styles.perfilFamiliar)}>
              {lead.perfil === 'PACIENTE' ? 'Paciente' : 'Familiar'}
            </span>
            <span className={styles.metaItem}>
              {new Date(lead.criadoEm).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
            {lead.lgpdConsentimento && <span className={styles.metaItem}>LGPD aceita</span>}
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.colEsq}>
          <div className={styles.secao}>
            <h2 className={styles.secaoTitulo}>Contato</h2>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>WhatsApp</span>
              <span className={styles.campoValor}>{lead.contatoWhatsapp || '—'}</span>
            </div>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>E-mail</span>
              <span className={styles.campoValor}>{lead.contatoEmail || '—'}</span>
            </div>
          </div>

          <div className={styles.secao}>
            <h2 className={styles.secaoTitulo}>Triagem</h2>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>Como está hoje</span>
              <span className={styles.campoValor}>{lead.comoEstaHoje || '—'}</span>
            </div>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>Tempo na situação</span>
              <span className={styles.campoValor}>{lead.tempoSituacao}</span>
            </div>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>Já teve ajuda antes</span>
              <span className={styles.campoValor}>{lead.jaTeveAjuda ? 'Sim' : 'Não'}</span>
            </div>
          </div>

          <div className={styles.secao}>
            <h2 className={styles.secaoTitulo}>Relato completo</h2>
            {lead.relatoLivre ? (
              lead.relatoLivre.split('\n').map((linha, i) => (
                <p key={i} className={styles.relatoTexto}>{linha}</p>
              ))
            ) : (
              <p className={styles.relatoTexto}>Nenhum relato registrado.</p>
            )}
          </div>
        </div>

        <div className={styles.colDir}>
          <div className={styles.secao}>
            <h2 className={styles.secaoTitulo}>Status do atendimento</h2>
            <select
              className={styles.select}
              value={novoStatus}
              onChange={(e) => setNovoStatus(e.target.value as Lead['status'])}
            >
              {(Object.keys(STATUS_LABEL) as Lead['status'][]).map((s) => (
                <option key={s} value={s}>{STATUS_LABEL[s]}</option>
              ))}
            </select>
          </div>

          <div className={styles.secao}>
            <h2 className={styles.secaoTitulo}>Nota interna</h2>
            <textarea
              className={styles.textarea}
              rows={6}
              placeholder="Anotações privadas sobre este lead..."
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
          </div>

          <button className={styles.btnSalvar} onClick={salvar} disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </button>
          {salvoOk && <p className={styles.salvoOk}>Alterações salvas com sucesso!</p>}

          <div className={styles.secao}>
            <h2 className={styles.secaoTitulo}>Metadados</h2>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>ID</span>
              <span className={styles.campoValorMono}>{lead.id}</span>
            </div>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>IP</span>
              <span className={styles.campoValorMono}>{lead.ip || '—'}</span>
            </div>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>Atualizado em</span>
              <span className={styles.campoValor}>{new Date(lead.atualizadoEm).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
