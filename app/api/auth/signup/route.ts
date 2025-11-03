import { sql } from "@/lib/db"
import { createUserSchema } from "@/lib/validations"
import { type NextRequest, NextResponse } from "next/server"
import { hashPassword } from "@/lib/auth" 

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createUserSchema.parse(body)

    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${validatedData.email} LIMIT 1
    `

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 })
    }

    const hashedPassword = await hashPassword(validatedData.password)

    const newUser = await sql`
      INSERT INTO users (email, name, password, role)
      VALUES (${validatedData.email}, ${validatedData.name}, ${hashedPassword}, ${validatedData.role})
      RETURNING id, email, name, role
    `

    return NextResponse.json({ user: newUser[0] }, { status: 201 })    
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }

    return NextResponse.json({ error: "Erro ao criar usuário", details: error }, { status: 500 })
  }
}