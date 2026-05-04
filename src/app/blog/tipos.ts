export interface BlocoConteudo {
  tipo: 'intro' | 'h2' | 'paragrafo' | 'destaque' | 'fontes'
  texto?: string
  itens?: string[]
}

export interface Artigo {
  slug: string
  titulo: string
  resumo: string
  imagem: string
  tag: string
  autor: string
  dataPublicacao: string
  tempoLeitura: string
  conteudo: BlocoConteudo[]
}
