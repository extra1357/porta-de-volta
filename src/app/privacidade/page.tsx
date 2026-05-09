import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Política de Privacidade — ' + SITE.nome,
  description: 'Política de privacidade e proteção de dados do ' + SITE.nome + ', em conformidade com a LGPD (Lei nº 13.709/2018).',
}

export default function PrivacidadePage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--areia)', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <p style={{ fontSize: '.875rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--verde-medio)', marginBottom: '1rem' }}>
          Transparência e proteção
        </p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--verde-escuro)', lineHeight: 1.25, marginBottom: '.75rem' }}>
          Política de Privacidade
        </h1>
        <p style={{ fontSize: '.875rem', color: 'var(--texto-suave)', marginBottom: '3rem' }}>
          Última atualização: maio de 2026 · Em conformidade com a Lei nº 13.709/2018 (LGPD)
        </p>

        {[
          {
            titulo: '1. Quem somos',
            texto: `O ${SITE.nome} é um serviço de escuta humanizada e encaminhamento para tratamento especializado em dependência química, operado por ${SITE.terapeuta}. Não somos uma clínica e não realizamos diagnósticos clínicos.`
          },
          {
            titulo: '2. Quais dados coletamos',
            texto: `Coletamos apenas os dados necessários para prestar o serviço de triagem e encaminhamento: nome (pode ser apenas o primeiro nome), número de WhatsApp ou e-mail, respostas ao formulário de triagem (substâncias, frequência, contexto, impactos e relato livre), consentimento LGPD com data e hora, e endereço IP para fins de segurança.`
          },
          {
            titulo: '3. Como usamos seus dados',
            texto: `Seus dados são usados exclusivamente para: (a) entrar em contato e oferecer orientação especializada; (b) encaminhar para tratamento adequado quando necessário; (c) manter registro do atendimento para continuidade do cuidado. Não utilizamos seus dados para fins comerciais, publicidade ou venda.`
          },
          {
            titulo: '4. Dados sensíveis de saúde',
            texto: `As informações sobre uso de substâncias e saúde mental que você compartilha são classificadas como dados sensíveis de saúde, conforme o Art. 11 da LGPD. Recebem tratamento diferenciado: acesso restrito ao terapeuta responsável, armazenamento em banco de dados criptografado, sem compartilhamento com terceiros sem sua autorização expressa.`
          },
          {
            titulo: '5. Base legal para o tratamento',
            texto: `Tratamos seus dados com base no seu consentimento explícito (Art. 7º, I da LGPD), obtido no momento do preenchimento do formulário. Para dados sensíveis de saúde, a base legal é o consentimento específico para finalidade de saúde (Art. 11, I da LGPD). Você pode revogar seu consentimento a qualquer momento.`
          },
          {
            titulo: '6. Com quem compartilhamos',
            texto: `Seus dados NÃO são vendidos, alugados ou compartilhados com terceiros para fins comerciais. Compartilhamos apenas com: provedores de infraestrutura técnica (Vercel para hospedagem, Neon para banco de dados, Resend para envio de e-mail) — todos sob contrato de confidencialidade e conformidade com a LGPD.`
          },
          {
            titulo: '7. Por quanto tempo guardamos',
            texto: `Mantemos seus dados pelo tempo necessário para o atendimento e acompanhamento, ou até que você solicite a exclusão. Em caso de encaminhamento para tratamento, podemos manter o registro por até 5 anos para fins de continuidade do cuidado, conforme práticas éticas em saúde mental.`
          },
          {
            titulo: '8. Seus direitos (LGPD)',
            texto: `Você tem direito a: confirmar a existência de tratamento dos seus dados; acessar seus dados; corrigir dados incompletos ou desatualizados; solicitar a exclusão dos seus dados; revogar o consentimento a qualquer momento; obter informações sobre o compartilhamento dos seus dados. Para exercer qualquer direito, entre em contato com nosso DPO.`
          },
          {
            titulo: '9. Encarregado de Dados (DPO)',
            texto: `Nosso Encarregado de Proteção de Dados é ${SITE.dpo.nome}, disponível pelo e-mail ${SITE.dpo.email}. Respondemos a todas as solicitações em até 15 dias úteis.`
          },
          {
            titulo: '10. Segurança dos dados',
            texto: `Adotamos medidas técnicas e organizacionais para proteger seus dados: conexão HTTPS em todo o site, banco de dados com acesso restrito e criptografia em trânsito, autenticação segura com hash bcrypt para o painel administrativo, headers de segurança HTTP (CSP, X-Frame-Options), e controle de acesso por sessão autenticada.`
          },
          {
            titulo: '11. Cookies',
            texto: `Utilizamos apenas cookies estritamente necessários para o funcionamento do site: cookie de sessão autenticada para o painel administrativo (httpOnly, seguro). Não utilizamos cookies de rastreamento, publicidade ou analytics de terceiros.`
          },
          {
            titulo: '12. Alterações nesta política',
            texto: `Podemos atualizar esta política periodicamente. Alterações significativas serão comunicadas no próprio site. A data da última atualização está sempre indicada no topo desta página.`
          },
          {
            titulo: '13. Contato',
            texto: `Para dúvidas sobre esta política ou para exercer seus direitos, entre em contato: E-mail: ${SITE.dpo.email} · WhatsApp: ${SITE.whatsappFormatado}`
          },
        ].map((secao, i) => (
          <div key={i} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--verde-escuro)', marginBottom: '.75rem' }}>
              {secao.titulo}
            </h2>
            <p style={{ fontSize: '.9375rem', lineHeight: 1.75, color: 'var(--texto-secundario)', margin: 0 }}>
              {secao.texto}
            </p>
          </div>
        ))}

        <div style={{ background: 'var(--verde-claro)', borderRadius: '1rem', padding: '1.5rem', marginTop: '1rem' }}>
          <p style={{ fontWeight: 700, color: 'var(--verde-escuro)', margin: '0 0 .5rem' }}>
            🔒 Compromisso com o sigilo
          </p>
          <p style={{ color: 'var(--texto-secundario)', margin: 0, fontSize: '.9375rem', lineHeight: 1.6 }}>
            Tudo que você compartilha conosco é tratado com a mesma confidencialidade
            de uma consulta clínica. O sigilo é um valor inegociável do {SITE.nome}.
          </p>
        </div>

      </div>
    </main>
  )
}
