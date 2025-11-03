import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🚀 Inicializando banco de dados...")

  // Verificar se já existe um admin
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "admin" },
  })

  if (existingAdmin) {
    console.log("✅ Admin já existe:", existingAdmin.email)
    return
  }

  // Criar admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)

  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      password: hashedPassword,
      role: "admin",
    },
  })

  console.log("✅ Admin user criado:", admin.email)
  console.log("📧 Email: admin@example.com")
  console.log("🔑 Password: admin123")
}

main()
  .catch((e) => {
    console.error("❌ Erro ao inicializar banco:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
