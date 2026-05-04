import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_DESTINO = 'gustavogomes.terapeuta@gmail.com'
const EMAIL_REMETENTE = 'Porta de Volta <noreply@vibecarros.com.br>'

function label(map: Record<string, string>, key: string): string {
  return map[key] ?? key
}

const FREQ: Record<string, string> = {
  diario:    'Todo dia ou quase todo dia',
  semanal:   'Algumas vezes por semana',
  mensal:    'Algumas vezes por mes',
  ocasional: 'Raramente / em ocasioes especificas',
  parei:     'Parou, mas se preocupa com recaida',
}

const CTX: Record<string, string> = {
  sozinho:  'Quando esta sozinho',
  estresse: 'Para lidar com estresse ou ansiedade',
  dor:      'Para aliviar dor fisica ou emocional',
  social:   'Em situacoes sociais',
  habito:   'Ja virou habito automatico',
  nao_sei:  'Nao sabe explicar bem',
}

const TENT: Record<string, string> = {
  nunca:      'Nunca tentou parar formalmente',
  sozinho:    'Ja tentou sozinho mas nao conseguiu manter',
  tratamento: 'Ja fez algum tipo de tratamento',
  internacao: 'Ja foi internado',
  multiplas:  'Tentou muitas vezes, sempre recai',
}

const OQ: Record<string, string> = {
  parar:     'Parar completamente',
  reduzir:   'Reduzir e ter mais controle',
  entender:  'Entender melhor a situacao primeiro',
  clinica:   'Ser encaminhado para tratamento especializado',
  conversar: 'So quer conversar com alguem que entenda',
}

function gerarHtml(dados: Record<string, unknown>): string {
  const {
    nome, contatoTipo, contato, motivacao,
    substancias, frequencia, contexto,
    impactoVida, impactoRelacoes, tentativas,
    oQueQuer, livre,
  } = dados

  const linhaContato = contatoTipo === 'whatsapp'
    ? 'WhatsApp: ' + String(contato)
    : 'E-mail: ' + String(contato)

  const subs    = Array.isArray(substancias)    ? substancias.join(', ')     : ''
  const impVida = Array.isArray(impactoVida)     ? impactoVida.join(', ')     : ''
  const impRel  = Array.isArray(impactoRelacoes) ? impactoRelacoes.join(', ') : ''

  function bloco(titulo: string, valor: string): string {
    if (!valor) return ''
    return '<div style="margin-bottom:24px;"><p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7a7a7a;">' + titulo + '</p><p style="margin:0;font-size:15px;color:#1a1a1a;line-height:1.65;">' + valor + '</p></div>'
  }

  function blocoDestaque(titulo: string, valor: string): string {
    if (!valor) return ''
    return '<div style="margin-bottom:24px;"><p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7a7a7a;">' + titulo + '</p><p style="margin:0;font-size:15px;color:#1a1a1a;line-height:1.65;background:#f5f0e8;border-left:3px solid #4a8f72;padding:12px 16px;border-radius:0 8px 8px 0;">' + valor + '</p></div>'
  }

  return '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#f5f0e8;font-family:system-ui,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:32px 16px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;"><tr><td style="background:#1a4a3a;padding:32px 40px;"><p style="margin:0;color:#c8e6d8;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;">Porta de Volta</p><h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;line-height:1.3;">Novo lead recebido</h1></td></tr><tr><td style="padding:32px 40px 0;"><table width="100%" cellpadding="16" cellspacing="0" style="background:#e8f5ef;border-radius:10px;"><tr><td><p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#4a8f72;">Paciente</p><p style="margin:0;font-size:20px;font-weight:700;color:#1a4a3a;">' + String(nome) + '</p><p style="margin:8px 0 0;font-size:14px;color:#2d6a54;">' + linhaContato + '</p></td></tr></table></td></tr><tr><td style="padding:28px 40px;">' + blocoDestaque('O que trouxe ao site', String(motivacao ?? '')) + bloco('Substancias relatadas', subs) + bloco('Frequencia de uso', label(FREQ, String(frequencia ?? ''))) + bloco('Contexto de uso', label(CTX, String(contexto ?? ''))) + bloco('Impacto na vida', impVida) + bloco('Impacto nos relacionamentos', impRel) + bloco('Tentativas anteriores', label(TENT, String(tentativas ?? ''))) + bloco('O que deseja', label(OQ, String(oQueQuer ?? ''))) + blocoDestaque('Mensagem livre', String(livre ?? '')) + '</td></tr><tr><td style="padding:0 40px 32px;"><hr style="border:none;border-top:1px solid #e8dfc8;margin:0 0 24px;"><p style="margin:0;font-size:12px;color:#7a7a7a;line-height:1.6;">Gerado automaticamente pelo site <strong>Porta de Volta</strong>. Dados protegidos conforme a LGPD.</p></td></tr></table></td></tr></table></body></html>'
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      tipo, nome, contato, contatoTipo,
      motivacao, substancias, frequencia, contexto,
      impactoVida, impactoRelacoes, tentativas, oQueQuer, livre,
    } = body

    if (!nome || !contato || !contatoTipo) {
      return NextResponse.json(
        { erro: 'Nome e contato sao obrigatorios.' },
        { status: 400 }
      )
    }

    const contatoWhatsapp = contatoTipo === 'whatsapp' ? contato : ''
    const contatoEmail    = contatoTipo === 'email'    ? contato : null
    const ip              = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''
    const userAgent       = req.headers.get('user-agent') ?? ''

    const partes: string[] = []
    if (motivacao)               partes.push('O QUE TROUXE AO SITE:\n' + motivacao)
    if (substancias?.length)     partes.push('SUBSTANCIAS:\n' + substancias.join(', '))
    if (frequencia)              partes.push('FREQUENCIA:\n' + label(FREQ, frequencia))
    if (contexto)                partes.push('CONTEXTO:\n' + label(CTX, contexto))
    if (impactoVida?.length)     partes.push('IMPACTO NA VIDA:\n' + impactoVida.join(', '))
    if (impactoRelacoes?.length) partes.push('IMPACTO NOS RELACIONAMENTOS:\n' + impactoRelacoes.join(', '))
    if (tentativas)              partes.push('TENTATIVAS:\n' + label(TENT, tentativas))
    if (oQueQuer)                partes.push('O QUE DESEJA:\n' + label(OQ, oQueQuer))
    if (livre?.trim())           partes.push('MENSAGEM LIVRE:\n' + livre.trim())

    const lead = await prisma.lead.create({
      data: {
        perfil:            tipo === 'familiar' ? 'FAMILIAR' : 'PACIENTE',
        primeiroNome:      String(nome).trim(),
        contatoWhatsapp,
        contatoEmail,
        comoEstaHoje:      motivacao ?? '',
        tempoSituacao:     frequencia ?? 'nao_informado',
        jaTeveAjuda:       tentativas !== 'nunca' && Boolean(tentativas),
        relatoLivre:       partes.join('\n\n---\n\n'),
        ip,
        userAgent,
        lgpdConsentimento: true,
        lgpdDataConsent:   new Date(),
        auditLog: {
          create: {
            acao:     'LEAD_CRIADO',
            detalhes: 'Questionario /quero-ajuda preenchido via site',
          },
        },
      },
    })

    resend.emails.send({
      from:    EMAIL_REMETENTE,
      to:      [EMAIL_DESTINO, 'edson.uni9@gmail.com'],
      subject: 'Novo lead — ' + String(nome).trim() + ' quer ajuda',
      html:    gerarHtml(body),
    }).catch((err: unknown) => {
      console.error('[resend] falha ao enviar email:', err)
    })

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 })
  } catch (err) {
    console.error('[/api/triagem]', err)
    return NextResponse.json(
      { erro: 'Erro interno. Tente novamente.' },
      { status: 500 }
    )
  }
}