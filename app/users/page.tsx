import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { sql } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UsersList } from "@/components/users-list"
import { CreateUserDialog } from "@/components/create-user-dialog"

export default async function UsersPage() {
  const session = await getSession()

  if (!session || session.role !== "admin") {
    redirect("/dashboard")
  }

  const users = await sql`
    SELECT id, email, name, role, created_at as "createdAt"
    FROM users
    ORDER BY created_at DESC
  `

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Gerenciar Usuários</h1>
              <p className="text-sm text-slate-600 mt-1">Criar e gerenciar usuários do sistema</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Voltar ao Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Usuários</CardTitle>
                <CardDescription>
                  Total de {users.length} usuário{users.length !== 1 ? "s" : ""} cadastrado
                  {users.length !== 1 ? "s" : ""}
                </CardDescription>
              </div>
              <CreateUserDialog />
            </div>
          </CardHeader>
          <CardContent>
            <UsersList users={users} currentUserId={session.userId} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
