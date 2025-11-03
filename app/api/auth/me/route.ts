import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const users = await sql`
      SELECT id, email, name, role
      FROM users
      WHERE id = ${session.userId}
      LIMIT 1
    `

    const user = users[0]

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 })
  }
}
