'use client'

import { useEffect, useState } from 'react'
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
    const ok = sessionStorage.getItem('admin_ok')
    if (ok !== '1') { router.push('/admin'); return }
    fetch('/api/admin/leads/' + id, { headers: { 'x-admin-token': process.env.NEXT_PUBLIC_ADMIN_SENHA ?? 'portadevolta2025' } })
      .then((r) => r.json())
      .then((data) => {
        setLead(data.lead)
        setNota(data.lead?.notaInterna ?? '')
        setNovoStatus(data.lead?.status ?? 'NOVO')
      })
      .finally(() => setCarregando(false))
  }, [id, router])

  async function salvar() {
    setSalvando(true)
    try {
      await fetch('/api/admin/leads/' + id, {
        method: 'PATCH',
        headers: { 'x-admin-token': process.env.NEXT_PUBLIC_ADMIN_SENHA ?? 'portadevolta2025', 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus, notaInterna: nota }),
      })
      setSalvoOk(true)
      setTimeout(() => setSalvoOk(false), 3000)
    } finally {
      setSalvando(false)
    }
  }

  function imprimir() { window.print() }

  if (carregando) return <div className={styles.loading}>Carregando ficha...</div>
  if (!lead) return <div className={styles.loading}>Lead não encontrado.</div>

  const secoes = lead.relatoLivre ? lead.relatoLivre.split('\n\n---\n\n') : []

  return (
    <main className={styles.main}>

      <div className={styles.topbar + ' ' + styles.semPrint}>
        <button className={styles.btnVoltar} onClick={() => router.push('/admin')}>
          ← Voltar ao painel
        </button>
        <button className={styles.btnImprimir} onClick={imprimir}>
          ð¨️ Imprimir ficha
        </button>
      </div>

      <div className={styles.fichaHeader}>
        <div className={styles.fichaAvatar} aria-hidden="true">
          {lead.perfil === 'PACIENTE' ? 'ð¤' : 'ð¨âð©âð¦'}
        </div>
        <div>
          <h1 className={styles.fichaNome}>{lead.primeiroNome}</h1>
          <div className={styles.fichaMeta}>
            <span className={styles.perfilBadge + ' ' + (lead.perfil === 'PACIENTE' ? styles.perfilPaciente : styles.perfilFamiliar)}>
              {lead.perfil === 'PACIENTE' ? 'Paciente' : 'Familiar'}
            </span>
            <span className={styles.metaItem}>ð {new Date(lead.criadoEm).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            {lead.lgpdConsentimento && <span className={styles.metaItem}>ð LGPD aceita</span>}
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
            {secoes.length > 0 ? secoes.map((s, i) => (
              <div key={i} className={styles.relatoSecao}>
                {s.split('\n').map((linha, j) => (
                  <p key={j} className={linha.toUpperCase() === linha && linha.trim() ? styles.relatoTitulo : styles.relatoTexto}>
                    {linha}
                  </p>
                ))}
              </div>
            )) : <p className={styles.relatoTexto}>Nenhum relato registrado.</p>}
          </div>

        </div>

        <div className={styles.colDir + ' ' + styles.semPrint}>

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
          {salvoOk && <p className={styles.salvoOk}>✓ Alterações salvas com sucesso!</p>}

          <div className={styles.secao + ' ' + styles.secaoInfo}>
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
