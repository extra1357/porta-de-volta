export const SITE = {
  nome: 'Porta de Volta',
  subtitulo: 'Escuta, triagem e encaminhamento para tratamento de dependência química',
  descricao:
    'Você não está sozinho. A Porta de Volta oferece escuta humanizada e encaminhamento especializado para quem enfrenta a dependência química — para você ou para alguém que você ama.',
  url: 'https://portadevolta.com.br',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '5515991161993',
  whatsappFormatado: '(15) 99116-1993',
  email: 'gustavogomes.terapeuta@gmail.com',
  terapeuta: 'Gustavo Craneiro',
  dpo: {
    nome: 'Gustavo Craneiro',
    email: 'gustavogomes.terapeuta@gmail.com'
  },
  desenvolvedora: {
    nome: 'STR Software',
    url: 'https://strsoftware.com.br',
    grupo: 'uma marca da Cotaweb Seguros'
  }
} as const

export const WHATSAPP_URL = (mensagem?: string) => {
  const base = `https://wa.me/${SITE.whatsapp}`
  if (!mensagem) return base
  return `${base}?text=${encodeURIComponent(mensagem)}`
}
