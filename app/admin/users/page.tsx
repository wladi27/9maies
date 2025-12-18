"use client"

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog'

type User = { _id: string; username: string; role?: string; createdAt?: string }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ username: '', password: '', role: 'user' })

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data)
    } catch (err) { console.error(err); setUsers([]) } finally { setLoading(false) }
  }

  async function create() {
    try {
      const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Error creating')
      setForm({ username: '', password: '', role: 'user' })
      setOpen(false)
      await load()
      setMessage('Usuario creado')
    } catch (err) { setMessage('Error creando usuario') }
  }

  async function remove(id: string) {
    if (!confirm('Eliminar usuario?')) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (!res.ok && res.status !== 204) throw new Error('Error eliminando')
      await load()
      setMessage('Eliminado')
    } catch (err) { setMessage('Error eliminando') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Crear Usuario</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Usuario</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Usuario" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              <Input placeholder="Contraseña" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <Input placeholder="Rol (admin|user)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <DialogFooter>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button onClick={create}>Crear</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-sm text-muted-foreground">
                <th className="p-2 text-left">Usuario</th>
                <th className="p-2 text-left">Rol</th>
                <th className="p-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users?.map(u => (
                <tr key={u._id} className="border-t">
                  <td className="p-2">{u.username}</td>
                  <td className="p-2">{u.role || 'user'}</td>
                  <td className="p-2 text-right">
                    <div className="inline-flex gap-2">
                      <Button variant="destructive" size="sm" onClick={() => remove(u._id)}>Eliminar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {message && <div className="mt-3 text-sm text-muted-foreground">{message}</div>}
    </div>
  )
}
