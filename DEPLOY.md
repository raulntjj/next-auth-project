# Guia de Deploy para Produção

## Pré-requisitos

1. Conta no Neon (banco de dados PostgreSQL)
2. Conta na Vercel

## Passos para Deploy

### 1. Configurar Banco de Dados Neon

Você já tem o Neon configurado. Certifique-se de que a variável `DATABASE_URL` está configurada na Vercel.

### 2. Configurar Variáveis de Ambiente na Vercel

Adicione as seguintes variáveis de ambiente no painel da Vercel:

\`\`\`
DATABASE_URL=sua_url_do_neon
JWT_SECRET=uma_string_aleatoria_segura_minimo_32_caracteres
\`\`\`

**IMPORTANTE**: Gere um JWT_SECRET seguro. Você pode usar:
\`\`\`bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

### 3. Remover o Comando de Install Customizado

Na Vercel, vá em:
- Settings → General → Build & Development Settings
- **REMOVA** o comando customizado de install
- Deixe em branco ou use apenas: `npm install`

### 4. Inicializar o Banco de Dados

Após o primeiro deploy, acesse:
\`\`\`
https://seu-app.vercel.app/api/init
\`\`\`

Faça uma requisição POST para criar o usuário admin inicial:
\`\`\`bash
curl -X POST https://seu-app.vercel.app/api/init
\`\`\`

Ou use o Postman/Insomnia para fazer um POST request.

### 5. Login

Use as credenciais:
- Email: `admin@example.com`
- Senha: `admin123`

**IMPORTANTE**: Altere a senha do admin após o primeiro login!

## Comandos Úteis

### Desenvolvimento Local
\`\`\`bash
# Instalar dependências
npm install

# Gerar Prisma Client
npx prisma generate

# Criar banco de dados local
npx prisma db push

# Seed do banco (criar admin)
npm run db:seed

# Rodar em desenvolvimento
npm run dev
\`\`\`

### Produção
\`\`\`bash
# Build
npm run build

# Iniciar servidor
npm start
\`\`\`

## Troubleshooting

### Erro: "JWT_SECRET environment variable is not set"
- Adicione a variável `JWT_SECRET` nas configurações da Vercel

### Erro: "Cannot connect to database"
- Verifique se `DATABASE_URL` está correta
- Certifique-se de que o banco Neon está ativo

### Não consigo fazer login
- Execute o endpoint `/api/init` para criar o usuário admin
- Verifique se o banco de dados foi inicializado corretamente
