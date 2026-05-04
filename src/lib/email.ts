import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export async function notificarNovoLead(dados: {
  id: string
  primeiroNome: string
  perfil: string
  comoEstaHoje: string
  contatoWhatsapp: string
}) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_USER,
    subject: `[Porta de Volta] Novo lead — ${dados.primeiroNome} (${dados.perfil})`,
    html: `
      <h2>Novo contato recebido</h2>
      <p><strong>Nome:</strong> ${dados.primeiroNome}</p>
      <p><strong>Perfil:</strong> ${dados.perfil === 'PACIENTE' ? 'Paciente' : 'Familiar'}</p>
      <p><strong>WhatsApp:</strong> ${dados.contatoWhatsapp}</p>
      <p><strong>Como está hoje:</strong></p>
      <blockquote>${dados.comoEstaHoje}</blockquote>
      <p>
        <a href="${process.env.NEXTAUTH_URL}/admin">
          Acessar painel de atendimento
        </a>
      </p>
      <hr/>
      <small>ID do lead: ${dados.id}</small>
    `
  })
}
