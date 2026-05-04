# Porta de Volta

Site institucional de triagem e encaminhamento para dependencia quimica.
Desenvolvido com foco em acolhimento, sigilo e conversao humanizada.

## Sobre o Projeto

O Porta de Volta e uma plataforma de triagem digital para pessoas que buscam ajuda com dependencia quimica - seja para si mesmas ou para um familiar. O site coleta informacoes de forma empatica, sigilosa e estruturada, encaminhando os leads para atendimento especializado via WhatsApp ou painel administrativo.

## Funcionalidades

- Formulario de triagem multi-etapa com 6 etapas guiadas para pacientes e familiares
- Painel administrativo com listagem, filtro por status e gestao completa de leads
- Blog com 6 artigos clinicos sobre dependencia quimica com fontes cientificas
- Hero animado Ken Burns com 3 imagens, efeito zoom-out e transicao por fade
- WhatsApp integrado com botao de contato direto em todas as etapas criticas
- SEO tecnico completo com Schema.org, sitemap, canonical e meta tags
- LGPD implementada com consentimento explicito e dados sensiveis protegidos
- 100/100 PageSpeed em desempenho, SEO e praticas recomendadas (desktop)

## Stack Tecnologica

- Framework: Next.js 14 com App Router
- Linguagem: TypeScript 5
- Estilizacao: CSS Modules
- Banco de dados: PostgreSQL via Neon
- ORM: Prisma 5
- Deploy: Vercel
- Animacoes: CSS Keyframes Ken Burns

## Como Rodar Localmente

Prerequisitos: Node.js 18+ e PostgreSQL ou conta no Neon.

    git clone https://github.com/seu-usuario/porta-de-volta.git
    cd porta-de-volta
    npm install
    npx prisma generate
    npx prisma migrate dev
    npm run dev

Acesse http://localhost:3000

## Variaveis de Ambiente

Crie um arquivo .env.local na raiz com:

    DATABASE_URL="postgresql://usuario:senha@host/banco"
    NEXT_PUBLIC_ADMIN_SENHA="sua-senha-admin"

## Scripts Disponiveis

    npm run dev        # Servidor de desenvolvimento
    npm run build      # Build de producao (prisma generate + next build)
    npm run start      # Servidor de producao local
    npm run lint       # Linting com ESLint

## Paginas

- /                  Home com hero animado e secoes de conversao
- /quero-ajuda       Formulario de triagem para paciente (6 etapas)
- /quero-ajudar      Formulario de triagem para familiar (6 etapas)
- /quem-somos        Pagina institucional da equipe
- /blog              Listagem de artigos
- /blog/[slug]       Artigo individual
- /admin             Painel de leads protegido por senha
- /admin/lead/[id]   Detalhe e gestao de lead individual

## Seguranca e LGPD

- Consentimento LGPD explicito no formulario antes do envio
- Dados de saude tratados como sensiveis
- Painel admin protegido por token via variavel de ambiente
- Nenhum dado pessoal exposto publicamente
- IP coletado apenas para fins de seguranca

## Performance PageSpeed Insights desktop

- Desempenho: 100
- Acessibilidade: 96
- Praticas recomendadas: 100
- SEO: 100

## Licenca

Projeto desenvolvido sob encomenda. Todos os direitos reservados ao cliente.

## Desenvolvido por

Edson - Desenvolvimento full-stack
