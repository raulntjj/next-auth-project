import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST() {
  try {
    // Verificar se já existe um admin
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "admin" },
    })

    if (existingAdmin) {
      return NextResponse.json({ message: "Admin já existe", email: existingAdmin.email })
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

    return NextResponse.json({
      message: "Admin criado com sucesso",
      email: admin.email,
      defaultPassword: "admin123",
    })
  } catch (error) {
    console.error("Erro ao criar admin:", error)
    return NextResponse.json({ error: "Erro ao criar admin" }, { status: 500 })
  }
}
