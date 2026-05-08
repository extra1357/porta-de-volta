'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './admin.module.css'

interface Lead {
  id: string
  criadoEm: string
  perfil: 'PACIENTE' | 'FAMILIAR'
  primeiroNome: string
  contatoWhatsapp: string
  contatoEmail: string | null
  status: 'NOVO' | 'EM_ATENDIMENTO' | 'ENCAMINHADO' | 'FINALIZADO' | 'ARQUIVADO'
  notaInterna: string | null
}

const STATUS_LABEL: Record<Lead['status'], string> = {
  NOVO: 'Novo',
  EM_ATENDIMENTO: 'Em atendimento',
  ENCAMINHADO: 'Encaminhado',
  FINALIZADO: 'Finalizado',
  ARQUIVADO: 'Arquivado',
}

const STATUS_COR: Record<Lead['status'], string> = {
  NOVO: '#10b981',
  EM_ATENDIMENTO: '#f59e0b',
  ENCAMINHADO: '#3b82f6',
  FINALIZADO: '#6b7280',
  ARQUIVADO: '#d1d5db',
}

export default function AdminCliente() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [carregando, setCarregando] = useState(false)
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState<Lead['status'] | 'TODOS'>('TODOS')
  const [filtroPerfil, setFiltroPerfil] = useState<'TODOS' | 'PACIENTE' | 'FAMILIAR'>('TODOS')

  const carregarLeads = useCallback(async () => {
    setCarregando(true)
    try {
      const params = new URLSearchParams({ limit: '100' })
      if (filtroStatus !== 'TODOS') params.set('status', filtroStatus)
      const res = await fetch('/api/leads?' + params.toString())
      if (res.status === 401) { router.push('/admin/login'); return }
      const data = await res.json()
      setLeads(data.leads ?? [])
      setTotal(data.total ?? 0)
    } catch {
      console.error('Erro ao carregar leads')
    } finally {
      setCarregando(false)
    }
  }, [filtroStatus, router])

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login')
    if (status === 'authenticated') carregarLeads()
  }, [status, carregarLeads, router])

  const leadsFiltrados = leads.filter((l) => {
    const buscaOk = busca === '' ||
      l.primeiroNome.toLowerCase().includes(busca.toLowerCase()) ||
      l.contatoWhatsapp.includes(busca) ||
      (l.contatoEmail ?? '').toLowerCase().includes(busca.toLowerCase())
    const perfilOk = filtroPerfil === 'TODOS' || l.perfil === filtroPerfil
    return buscaOk && perfilOk
  })

  const totalNovos = leads.filter((l) => l.status === 'NOVO').length
  const totalPacientes = leads.filter((l) => l.perfil === 'PACIENTE').length
  const totalFamiliares = leads.filter((l) => l.perfil === 'FAMILIAR').length

  if (status === 'loading') return <div className={styles.loading}>Carregando...</div>
  if (!session) return null

  return (
    <main className={styles.main}>
      <div className={styles.topbar}>
        <div>
          <h1 className={styles.titulo}>Painel de leads</h1>
          <p className={styles.subtitulo}>Porta de Volta — {session.user?.email}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className={styles.btnImprimir} onClick={() => window.print()}>Imprimir</button>
          <button className={styles.btnImprimir} onClick={() => signOut({ callbackUrl: '/admin/login' })}>Sair</button>
        </div>
      </div>

      <div className={styles.metricas}>
        <div className={styles.metricaCard}>
          <span className={styles.metricaValor}>{total}</span>
          <span className={styles.metricaLabel}>Total de leads</span>
        </div>
        <div className={styles.metricaCard + ' ' + styles.metricaDestaque}>
          <span className={styles.metricaValor}>{totalNovos}</span>
          <span className={styles.metricaLabel}>Novos</span>
        </div>
        <div className={styles.metricaCard}>
          <span className={styles.metricaValor}>{totalPacientes}</span>
          <span className={styles.metricaLabel}>Pacientes</span>
        </div>
        <div className={styles.metricaCard}>
          <span className={styles.metricaValor}>{totalFamiliares}</span>
          <span className={styles.metricaLabel}>Familiares</span>
        </div>
      </div>

      <div className={styles.filtros}>
        <input className={styles.busca} type="search" placeholder="Buscar por nome, WhatsApp ou e-mail..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        <select className={styles.select} value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value as Lead['status'] | 'TODOS')}>
          <option value="TODOS">Todos os status</option>
          {(Object.keys(STATUS_LABEL) as Lead['status'][]).map((s) => (
            <option key={s} value={s}>{STATUS_LABEL[s]}</option>
          ))}
        </select>
        <select className={styles.select} value={filtroPerfil} onChange={(e) => setFiltroPerfil(e.target.value as 'TODOS' | 'PACIENTE' | 'FAMILIAR')}>
          <option value="TODOS">Todos</option>
          <option value="PACIENTE">Pacientes</option>
          <option value="FAMILIAR">Familiares</option>
        </select>
      </div>

      {carregando ? (
        <div className={styles.loading}>Carregando leads...</div>
      ) : leadsFiltrados.length === 0 ? (
        <div className={styles.vazio}>Nenhum lead encontrado.</div>
      ) : (
        <div className={styles.tabela}>
          <div className={styles.tabelaHeader}>
            <span>Nome</span><span>Perfil</span><span>Contato</span><span>Status</span><span>Data</span><span></span>
          </div>
          {leadsFiltrados.map((lead) => (
            <div key={lead.id} className={styles.tabelaLinha}>
              <span className={styles.nome}>{lead.primeiroNome}</span>
              <span><span className={styles.perfilBadge + ' ' + (lead.perfil === 'PACIENTE' ? styles.perfilPaciente : styles.perfilFamiliar)}>{lead.perfil === 'PACIENTE' ? 'Paciente' : 'Familiar'}</span></span>
              <span className={styles.contato}>{lead.contatoWhatsapp || lead.contatoEmail || '—'}</span>
              <span><span className={styles.statusBadge} style={{ background: STATUS_COR[lead.status] + '22', color: STATUS_COR[lead.status], borderColor: STATUS_COR[lead.status] + '44' }}>{STATUS_LABEL[lead.status]}</span></span>
              <span className={styles.data}>{new Date(lead.criadoEm).toLocaleDateString('pt-BR')}</span>
              <span><Link href={'/admin/lead/' + lead.id} className={styles.btnVer}>Ver ficha</Link></span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
