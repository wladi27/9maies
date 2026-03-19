import clientPromise from '@/lib/mongodb'
import Header from '@/components/admin/Header'
import Link from 'next/link'

type User = {
  _id: string
  username?: string
  role?: string
  createdAt?: string
}

async function getUsers(): Promise<User[]> {
  const client = await clientPromise
  const db = client.db()
  const col = db.collection('users')
  const items = await col.find({}, { projection: { password: 0 } }).sort({ createdAt: -1 }).toArray()
  return items.map((u: any) => ({ _id: String(u._id), username: u.username, role: u.role, createdAt: u.createdAt?.toString() }))
}

export default async function UsersAdminPage() {
  const users = await getUsers()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Usuarios</h2>
            <p className="text-muted-foreground mt-1">Gestiona usuarios y roles</p>
          </div>
          <div>
            <Link href="/admin/users/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Nuevo usuario</Link>
          </div>
        </div>

        <div className="space-y-3">
          {users.map((u) => (
            <div key={u._id} className="bg-card border border-border rounded p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">{u.username}</div>
                <div className="text-sm text-muted-foreground">{u.role || 'user'}</div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/users/${u._id}`} className="px-3 py-1 border rounded text-sm">Editar</Link>
                <form action={`/api/users/${u._id}`} method="post">
                  <input type="hidden" name="_method" value="DELETE" />
                  <button type="submit" className="px-3 py-1 bg-destructive/10 text-destructive rounded text-sm">Eliminar</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
