"use client"

import React, { useEffect, useState } from 'react'
import Header from '@/components/admin/Header'
import { usePathname, useRouter } from 'next/navigation'

export default function EditUserPage() {
  const pathname = usePathname()
  const id = pathname?.split('/').pop() || ''
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('user')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setUsername(data.username || '')
        setRole(data.role || 'user')
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const body: any = { username, role }
      if (password) body.password = password
      const res = await fetch(`/api/users/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error('Error')
      router.push('/admin/users')
    } catch (err) {
      console.error(err)
      alert('Error al guardar')
    } finally { setSaving(false) }
  }

  async function handleDelete() {
    if (!confirm('Eliminar usuario?')) return
    await fetch(`/api/users/${id}`, { method: 'DELETE' })
    router.push('/admin/users')
  }

  if (loading) return (<div className="min-h-screen"><Header /><main className="p-6">Cargando...</main></div>)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Editar usuario</h2>
        <form onSubmit={handleSave} className="bg-card border p-6 rounded space-y-4">
          <div>
            <label className="text-sm">Usuario</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
          </div>
          <div>
            <label className="text-sm">Nueva contraseña (opcional)</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded" />
          </div>
          <div>
            <label className="text-sm">Rol</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full mt-1 p-2 border rounded">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => router.push('/admin/users')} className="px-4 py-2 border rounded">Cancelar</button>
            <button type="button" onClick={handleDelete} className="px-4 py-2 bg-destructive text-destructive-foreground rounded">Eliminar</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground rounded">{saving ? 'Guardando...' : 'Guardar'}</button>
          </div>
        </form>
      </main>
    </div>
  )
}
