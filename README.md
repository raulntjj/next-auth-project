# Aplicativo Next.js com Banco de Dados Serverless

Este aplicativo usa Next.js 16 com banco de dados serverless (Neon/Postgres) para funcionar tanto em desenvolvimento quanto em produção.

## Configuração do Banco de Dados

### 1. Criar Banco de Dados

Você precisa de uma URL de conexão PostgreSQL. Opções recomendadas:
- **Neon** (https://neon.tech) - Serverless Postgres gratuito
- **Vercel Postgres** (https://vercel.com/storage/postgres)
- **Supabase** (https://supabase.com)

### 2. Configurar Variável de Ambiente

Adicione a variável `DATABASE_URL` no seu projeto:

**Para desenvolvimento local:**
Crie um arquivo `.env.local`:
\`\`\`
DATABASE_URL=postgresql://user:password@host/database
\`\`\`

**Para produção (Vercel):**
Adicione a variável de ambiente no dashboard da Vercel ou use:
\`\`\`bash
vercel env add DATABASE_URL
\`\`\`

### 3. Executar Scripts SQL

Os scripts SQL estão na pasta `scripts/`:
- `001-create-tables.sql` - Cria a tabela de usuários
- `002-seed-admin.sql` - Adiciona usuários iniciais

**Opção 1: Executar via v0 (recomendado)**
Os scripts podem ser executados diretamente no v0.

**Opção 2: Executar manualmente**
Use o console SQL do seu provedor de banco de dados (Neon, Supabase, etc.) para executar os scripts na ordem.

### 4. Usuários Padrão

Após executar os scripts, você terá:
- **Admin**: admin@example.com / admin123
- **Usuário**: user@example.com / user123

## Desenvolvimento

\`\`\`bash
npm install
npm run dev
\`\`\`

## Deploy na Vercel

1. Conecte seu repositório GitHub à Vercel
2. Adicione a variável `DATABASE_URL` nas configurações do projeto
3. Deploy automático!

## Tecnologias

- Next.js 16 (App Router)
- @neondatabase/serverless (SQL direto, sem ORM)
- TypeScript
- Tailwind CSS
- shadcn/ui
