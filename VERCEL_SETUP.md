# Configuração do Deploy na Vercel

## Passo 1: Remover comando customizado de install

Na configuração do projeto na Vercel:
1. Vá em **Settings** → **General** → **Build & Development Settings**
2. Em **Install Command**, certifique-se que está usando o padrão (deixe vazio ou use `npm install`)
3. **NÃO** use `--force` ou comandos customizados

## Passo 2: Adicionar variáveis de ambiente

No sidebar esquerdo do v0, clique em **"Vars"** e adicione:

### Obrigatório:
- `JWT_SECRET`: String aleatória de 32+ caracteres
  - Gere com: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Já configuradas (Neon):
- `DATABASE_URL`: Sua connection string do Neon (já configurada)

## Passo 3: Deploy

1. Faça commit e push das mudanças
2. A Vercel vai automaticamente:
   - Instalar dependências
   - Gerar o Prisma Client (via postinstall)
   - Fazer push do schema para o banco (via vercel.json)
   - Buildar o Next.js

## Passo 4: Inicializar o banco

Após o primeiro deploy bem-sucedido, acesse:
\`\`\`
https://seu-app.vercel.app/api/init
\`\`\`

Isso vai criar o usuário admin padrão:
- Email: `admin@example.com`
- Senha: `admin123`

**IMPORTANTE**: Mude a senha após o primeiro login!

## Troubleshooting

### Erro de build com Prisma
Se o build falhar com erro do Prisma, verifique:
- A `DATABASE_URL` está correta nas variáveis de ambiente
- O banco Neon está ativo e acessível
- Não há comandos customizados de install configurados

### Erro de autenticação
- Verifique se `JWT_SECRET` está configurado
- Limpe os cookies do navegador
- Tente fazer logout e login novamente
