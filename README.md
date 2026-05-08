# Porta de Volta

> Plataforma de triagem digital e captação de leads para clínica especializada em dependência química. Desenvolvida com foco em acolhimento humanizado, sigilo, segurança de dados sensíveis de saúde e conversão orgânica via SEO.

**Produção:** [porta-de-volta.vercel.app](https://porta-de-volta.vercel.app)

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura](#arquitetura)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Banco de Dados](#banco-de-dados)
- [Autenticação e Segurança](#autenticação-e-segurança)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Páginas e Rotas](#páginas-e-rotas)
- [API Routes](#api-routes)
- [Deploy na Vercel](#deploy-na-vercel)
- [Performance](#performance)
- [Próximas Iterações](#próximas-iterações)
- [Licença](#licença)

---

## Sobre o Projeto

O **Porta de Volta** é uma plataforma digital que conecta pessoas em situação de dependência química — ou familiares — a um terapeuta especializado. O objetivo é substituir o contato frio por uma triagem empática, estruturada e sigilosa que qualifica o lead antes do primeiro atendimento humano.

O sistema possui duas frentes principais:

- **Pública:** formulários de triagem multietapas, blog clínico, apresentação institucional e integração direta com WhatsApp do terapeuta.
- **Administrativa:** painel protegido por autenticação onde o terapeuta gerencia, filtra e acompanha cada lead recebido.

---

## Funcionalidades

### Públicas

- Formulário de triagem multietapas para **pacientes** (`/quero-ajuda`) — 7 etapas guiadas cobrindo motivação, substâncias, frequência, contexto, impactos, tentativas anteriores e contato
- Formulário de triagem multietapas para **familiares** (`/quero-ajudar`) — fluxo adaptado para quem busca ajuda para outra pessoa
- Envio de e-mail automático ao terapeuta via **Resend** ao receber cada lead
- Blog com 6 artigos clínicos sobre dependência química com fontes científicas
- Hero animado com efeito **Ken Burns** (zoom-out + fade entre 3 imagens)
- Botão WhatsApp fixo com mensagem pré-preenchida em todas as páginas estratégicas
- Página institucional (`/quem-somos`)
- Consentimento LGPD explícito antes do envio do formulário

### Administrativas

- Painel de leads com listagem, métricas resumidas e filtros por status e perfil
- Busca por nome, WhatsApp ou e-mail
- Ficha completa do lead com todos os dados da triagem
- Alteração de status do atendimento (Novo → Em atendimento → Encaminhado → Finalizado → Arquivado)
- Nota interna privada por lead
- AuditLog de alterações
- Impressão da ficha do lead

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript 5 |
| Estilização | CSS Modules |
| Banco de dados | PostgreSQL via Neon (serverless) |
| ORM | Prisma 5 |
| Autenticação | NextAuth.js 4 com CredentialsProvider |
| Hash de senha | bcryptjs (salt 12) |
| Validação | Zod v4 |
| E-mail | Resend |
| Deploy | Vercel |
| Animações | CSS Keyframes (Ken Burns) |

---

## Arquitetura

```
Browser
  │
  ├── Páginas públicas (SSG/SSR — Next.js App Router)
  │     ├── Formulários → POST /api/triagem → Resend (e-mail) + Prisma (banco)
  │     └── Blog → artigos estáticos em TypeScript
  │
  ├── Middleware (next-auth/middleware)
  │     └── Protege todas as rotas /admin/* server-side
  │
  └── Painel Admin (Client Components com useSession)
        ├── GET /api/leads — lista leads (protegida)
        ├── GET /api/leads/[id] — detalhe do lead (protegida)
        └── PATCH /api/leads/[id] — atualiza status/nota (protegida)

Autenticação:
  POST /api/auth/callback/credentials
    → bcrypt.compare(senha, hash do banco)
    → JWT session via NextAuth
    → Cookie de sessão httpOnly
```

---

## Estrutura de Pastas

```
porta-de-volta/
├── prisma/
│   ├── schema.prisma          # Modelos: Lead, AuditLog, AdminUser, AdminSession
│   └── migrations/            # Migrations versionadas
├── scripts/
│   └── criar-admin.mjs        # CLI para cadastrar novos admins
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── AdminCliente.tsx       # Painel de leads
│   │   │   ├── lead/[id]/             # Ficha do lead
│   │   │   └── login/                 # Página de login
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/    # Handler NextAuth
│   │   │   ├── leads/                 # GET + POST leads
│   │   │   ├── leads/[id]/            # GET + PATCH lead individual
│   │   │   └── triagem/               # POST público do formulário
│   │   ├── blog/                      # Listagem e artigos
│   │   ├── quem-somos/
│   │   ├── quero-ajuda/               # Formulário paciente
│   │   ├── quero-ajudar/              # Formulário familiar
│   │   ├── layout.tsx                 # Layout raiz + SessionWrapper
│   │   └── page.tsx                   # Home
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx                 # Inclui link "Acesso restrito"
│   │   ├── BotaoWhatsApp.tsx
│   │   └── SessionWrapper.tsx         # Provider NextAuth client-side
│   ├── lib/
│   │   ├── auth.ts                    # authOptions + rate limit
│   │   ├── auth-guard.ts              # requireAdmin() para route handlers
│   │   ├── prisma.ts                  # Singleton PrismaClient
│   │   ├── schemas.ts                 # Schemas Zod (LeadSchema, LeadUpdateSchema)
│   │   ├── email.ts                   # Helper Resend
│   │   └── constants.ts               # SITE, WHATSAPP_URL
│   ├── middleware.ts                  # Proteção /admin/* via withAuth
│   └── styles/
│       └── globals.css                # Variáveis CSS globais + aliases semânticos
├── .npmrc                             # legacy-peer-deps=true
├── next.config.js                     # Headers de segurança (CSP, X-Frame-Options)
└── tailwind.config.ts
```

---

## Como Rodar Localmente

**Pré-requisitos:** Node.js 18+ e conta no [Neon](https://neon.tech)

```bash
# 1. Clonar o repositório
git clone https://github.com/extra1357/porta-de-volta.git
cd porta-de-volta

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com seus valores reais

# 4. Gerar o Prisma Client e rodar as migrations
npx prisma generate
npx prisma migrate dev

# 5. Criar o primeiro admin
npm run criar-admin

# 6. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## Variáveis de Ambiente

Crie `.env.local` na raiz do projeto:

```env
# Banco de dados Neon (PostgreSQL serverless)
DATABASE_URL="postgresql://usuario:senha@host/banco?sslmode=require"
DIRECT_URL="postgresql://usuario:senha@host/banco?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="string-aleatoria-minimo-32-caracteres"
NEXTAUTH_URL="http://localhost:3000"  # Em produção: URL real do site

# Resend (envio de e-mail)
RESEND_API_KEY="re_xxxxxxxxxxxx"
```

> ⚠️ O arquivo `.env.local` está no `.gitignore` e **nunca deve ser commitado**.

---

## Banco de Dados

### Modelos principais

**Lead** — registro de cada triagem recebida
```
id, criadoEm, atualizadoEm
perfil (PACIENTE | FAMILIAR)
primeiroNome, contatoWhatsapp, contatoEmail
comoEstaHoje, tempoSituacao, jaTeveAjuda, relatoLivre
status (NOVO | EM_ATENDIMENTO | ENCAMINHADO | FINALIZADO | ARQUIVADO)
notaInterna, ip, userAgent
lgpdConsentimento, lgpdDataConsent
```

**AdminUser** — credenciais do administrador
```
id, email, hash (bcrypt salt 12), criadoEm
```

**AuditLog** — histórico de alterações por lead
```
id, criadoEm, leadId, acao, detalhes
```

### Migrations

As migrations estão versionadas em `prisma/migrations/` e rodam automaticamente no deploy via `prisma generate && next build`.

---

## Autenticação e Segurança

### Autenticação
- **NextAuth.js** com `CredentialsProvider` — email + senha
- Senha armazenada como hash **bcrypt** (salt 12) — nunca em texto plano
- Sessão via **JWT** (httpOnly cookie)
- `authOptions` centralizado em `src/lib/auth.ts`

### Proteção de rotas
- **Middleware server-side** (`src/middleware.ts`) via `withAuth` do NextAuth — bloqueia qualquer acesso a `/admin/*` sem sessão válida, antes de qualquer renderização
- **`requireAdmin()`** (`src/lib/auth-guard.ts`) — proteção adicional em todos os route handlers administrativos

### Rate limit
- Máximo **5 tentativas de login** por IP em janela de **15 minutos**
- Implementado em memória no `authorize` do NextAuth
- Mensagem de erro em português exibida na tela de login

### Headers HTTP
Configurados em `next.config.js` para todas as rotas:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; connect-src 'self' https://*.neon.tech wss://*.neon.tech https://api.resend.com; frame-ancestors 'none'
```

### LGPD
- Consentimento explícito obrigatório antes do envio
- Dados de saúde tratados como sensíveis
- IP coletado apenas para fins de segurança
- Política de privacidade disponível em `/privacidade`

---

## Scripts Disponíveis

```bash
npm run dev           # Servidor de desenvolvimento (localhost:3000)
npm run build         # Build de produção (prisma generate + next build)
npm run start         # Servidor de produção local
npm run lint          # Linting com ESLint
npm run criar-admin   # CLI interativo para cadastrar novo administrador
npm run db:generate   # Gerar Prisma Client
npm run db:push       # Sincronizar schema sem migration
npm run db:studio     # Abrir Prisma Studio (visualizador do banco)
```

### Criar novo administrador

```bash
npm run criar-admin
```

O script solicita interativamente:
- E-mail (validado)
- Senha (mínimo 12 caracteres)
- Confirmação da senha

Gera o hash bcrypt e insere diretamente no banco. Nunca expõe uma interface web para criação de admins.

---

## Páginas e Rotas

| Rota | Tipo | Descrição |
|---|---|---|
| `/` | Static | Home com hero Ken Burns e seções de conversão |
| `/quero-ajuda` | Static | Formulário de triagem — paciente (7 etapas) |
| `/quero-ajudar` | Static | Formulário de triagem — familiar (7 etapas) |
| `/quem-somos` | Static | Página institucional |
| `/blog` | Static | Listagem de artigos clínicos |
| `/blog/[slug]` | SSG | Artigo individual |
| `/admin` | Dynamic* | Painel de leads (requer autenticação) |
| `/admin/lead/[id]` | Dynamic* | Ficha e gestão do lead (requer autenticação) |
| `/admin/login` | Static | Página de login |

*Protegidas pelo middleware — redirecionam para `/admin/login` sem sessão.

### Acesso ao painel admin

O link de acesso está discretamente disponível no **rodapé do site** como "Acesso restrito", otimizado para acesso via celular.

---

## API Routes

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/api/triagem` | Público | Recebe dados do formulário, salva lead, envia e-mail |
| GET | `/api/leads` | Admin | Lista leads com filtros e paginação |
| GET | `/api/leads/[id]` | Admin | Retorna dados completos de um lead |
| PATCH | `/api/leads/[id]` | Admin | Atualiza status e/ou nota interna |
| * | `/api/auth/[...nextauth]` | Público | Handler de autenticação NextAuth |

Todas as rotas admin validam a sessão via `requireAdmin()` antes de qualquer operação.

---

## Deploy na Vercel

### Primeiro deploy

```bash
vercel --prod
```

### Variáveis de ambiente na Vercel

```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL      # URL real de produção
vercel env add RESEND_API_KEY
```

Marque todas como **sensíveis** e aplique ao ambiente **Production**.

### Redeploy após adicionar variáveis

```bash
vercel --prod
```

### Nota sobre dependências

O arquivo `.npmrc` na raiz contém `legacy-peer-deps=true` para resolver o conflito de peer dependency entre `nodemailer@6` e `next-auth@4.24.14`. Não atualizar o nodemailer para v7 sem revisar as mudanças de API.

---

## Performance

Resultados **PageSpeed Insights — Desktop** em produção:

| Métrica | Resultado |
|---|---|
| Desempenho | 100 |
| Acessibilidade | 96 |
| Práticas recomendadas | 100 |
| SEO | 100 |

---

## Próximas Iterações

| Funcionalidade | Prioridade |
|---|---|
| Domínio customizado (configurar na Vercel) | Alta |
| Rate limit persistente com Upstash Redis | Média |
| reCAPTCHA no formulário público | Média |
| Gestão de admins via interface (`/admin/usuarios`) | Média |
| Vercel Analytics ou Google Analytics | Baixa |
| Integração WhatsApp Business API (mensagens automáticas) | Baixa |
| Agendamento online | Baixa |

---

## Licença

Projeto desenvolvido sob encomenda. Todos os direitos reservados ao cliente.

---

## Desenvolvido por

**Edson** — Desenvolvimento full-stack  
Contextos 1–10 — do zero ao deploy em produção.
