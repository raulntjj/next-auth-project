import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { hashPassword } from "@/lib/auth"
import { createUserSchema } from "@/lib/validations"

export async function GET() {
  try {
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 })
    }

    const users = await sql`
      SELECT id, email, name, role, created_at as "createdAt"
      FROM users
      ORDER BY created_at DESC
    `

    return NextResponse.json({ users })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createUserSchema.parse(body)

    // Check if user already exists
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${validatedData.email} LIMIT 1
    `

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const newUsers = await sql`
      INSERT INTO users (id, email, name, password, role)
      VALUES (gen_random_uuid()::text, ${validatedData.email}, ${validatedData.name}, ${hashedPassword}, ${validatedData.role})
      RETURNING id, email, name, role, created_at as "createdAt"
    `

    const user = newUsers[0]

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }

    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 })
  }
}
