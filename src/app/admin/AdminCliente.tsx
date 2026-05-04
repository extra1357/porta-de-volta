'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import styles from './admin.module.css'

const SENHA_ADMIN = process.env.NEXT_PUBLIC_ADMIN_SENHA ?? 'portadevolta2025'

interface Lead {
  id: string
  criadoEm: string
  perfil: 'PACIENTE' | 'FAMILIAR'
  primeiroNome: string
  contatoWhatsapp: string
  contatoEmail: string | null
  comoEstaHoje: string
  tempoSituacao: string
  jaTeveAjuda: boolean
  relatoLivre: string
  status: 'NOVO' | 'EM_ATENDIMENTO' | 'ENCAMINHADO' | 'FINALIZADO' | 'ARQUIVADO'
  ip: string | null
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
  const [autenticado, setAutenticado] = useState(false)
  const [senha, setSenha] = useState('')
  const [erroSenha, setErroSenha] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [carregando, setCarregando] = useState(false)
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState<Lead['status'] | 'TODOS'>('TODOS')
  const [filtroPerfil, setFiltroPerfil] = useState<'TODOS' | 'PACIENTE' | 'FAMILIAR'>('TODOS')

  const carregarLeads = useCallback(async () => {
    setCarregando(true)
    try {
      const res = await fetch('/api/admin/leads', { headers: { 'x-admin-token': SENHA_ADMIN } })
      const data = await res.json()
      setLeads(data.leads ?? [])
    } catch {
      console.error('Erro ao carregar leads')
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    const ok = sessionStorage.getItem('admin_ok')
    if (ok === '1') { setAutenticado(true); carregarLeads() }
  }, [carregarLeads])

  function login() {
    if (senha === SENHA_ADMIN) {
      sessionStorage.setItem('admin_ok', '1')
      setAutenticado(true)
      carregarLeads()
    } else {
      setErroSenha(true)
    }
  }

  const leadsFiltrados = leads.filter((l) => {
    const buscaOk = busca === '' || l.primeiroNome.toLowerCase().includes(busca.toLowerCase()) || l.contatoWhatsapp.includes(busca) || (l.contatoEmail ?? '').toLowerCase().includes(busca.toLowerCase())
    const statusOk = filtroStatus === 'TODOS' || l.status === filtroStatus
    const perfilOk = filtroPerfil === 'TODOS' || l.perfil === filtroPerfil
    return buscaOk && statusOk && perfilOk
  })

  const totalNovos = leads.filter((l) => l.status === 'NOVO').length
  const totalPacientes = leads.filter((l) => l.perfil === 'PACIENTE').length
  const totalFamiliares = leads.filter((l) => l.perfil === 'FAMILIAR').length

  function imprimirRelatorio() { window.print() }

  if (!autenticado) {
    return (
      <main className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <div className={styles.loginIcone} aria-hidden="true">ð</div>
          <h1 className={styles.loginTitulo}>Painel administrativo</h1>
          <p className={styles.loginSubtitulo}>Porta de Volta — acesso restrito</p>
          <input
            className={styles.loginInput + (erroSenha ? ' ' + styles.loginInputErro : '')}
            type="password"
            placeholder="Senha de acesso"
            value={senha}
            onChange={(e) => { setSenha(e.target.value); setErroSenha(false) }}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            autoFocus
          />
          {erroSenha && <p className={styles.loginErro}>Senha incorreta. Tente novamente.</p>}
          <button className={styles.loginBtn} onClick={login}>Entrar</button>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.topbar}>
        <div>
          <h1 className={styles.titulo}>Painel de leads</h1>
          <p className={styles.subtitulo}>Porta de Volta — visão geral dos contatos recebidos</p>
        </div>
        <button className={styles.btnImprimir} onClick={imprimirRelatorio}>
          ð¨️ Imprimir relatório
        </button>
      </div>

      <div className={styles.metricas}>
        <div className={styles.metricaCard}>
          <span className={styles.metricaValor}>{leads.length}</span>
          <span className={styles.metricaLabel}>Total de leads</span>
        </div>
        <div className={styles.metricaCard + ' ' + styles.metricaDestaque}>
          <span className={styles.metricaValor}>{totalNovos}</span>
          <span className={styles.metricaLabel}>Novos (aguardando)</span>
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
        <input
          className={styles.busca}
          type="search"
          placeholder="Buscar por nome, WhatsApp ou e-mail..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select className={styles.select} value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value as Lead['status'] | 'TODOS')}>
          <option value="TODOS">Todos os status</option>
          {(Object.keys(STATUS_LABEL) as Lead['status'][]).map((s) => (
            <option key={s} value={s}>{STATUS_LABEL[s]}</option>
          ))}
        </select>
        <select className={styles.select} value={filtroPerfil} onChange={(e) => setFiltroPerfil(e.target.value as 'TODOS' | 'PACIENTE' | 'FAMILIAR')}>
          <option value="TODOS">Pacientes e familiares</option>
          <option value="PACIENTE">Só pacientes</option>
          <option value="FAMILIAR">Só familiares</option>
        </select>
      </div>

      {carregando ? (
        <div className={styles.loading}>Carregando leads...</div>
      ) : leadsFiltrados.length === 0 ? (
        <div className={styles.vazio}>Nenhum lead encontrado.</div>
      ) : (
        <div className={styles.tabela}>
          <div className={styles.tabelaHeader}>
            <span>Nome</span>
            <span>Perfil</span>
            <span>Contato</span>
            <span>Status</span>
            <span>Data</span>
            <span></span>
          </div>
          {leadsFiltrados.map((lead) => (
            <div key={lead.id} className={styles.tabelaLinha}>
              <span className={styles.nome}>{lead.primeiroNome}</span>
              <span>
                <span className={styles.perfilBadge + ' ' + (lead.perfil === 'PACIENTE' ? styles.perfilPaciente : styles.perfilFamiliar)}>
                  {lead.perfil === 'PACIENTE' ? 'Paciente' : 'Familiar'}
                </span>
              </span>
              <span className={styles.contato}>
                {lead.contatoWhatsapp || lead.contatoEmail || '—'}
              </span>
              <span>
                <span className={styles.statusBadge} style={{ background: STATUS_COR[lead.status] + '22', color: STATUS_COR[lead.status], borderColor: STATUS_COR[lead.status] + '44' }}>
                  {STATUS_LABEL[lead.status]}
                </span>
              </span>
              <span className={styles.data}>
                {new Date(lead.criadoEm).toLocaleDateString('pt-BR')}
              </span>
              <span>
                <Link href={'/admin/lead/' + lead.id} className={styles.btnVer}>
                  Ver ficha
                </Link>
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
