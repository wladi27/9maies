"use client"

import React, { useState } from 'react'
import Header from '@/components/admin/Header'
import { useRouter } from 'next/navigation'

export default function NewUserPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      })
      if (!res.ok) throw new Error('Error creando usuario')
      router.push('/admin/users')
    } catch (err) {
      console.error(err)
      alert('Error creando usuario')
    } finally { setSaving(false) }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Nuevo usuario</h2>
        <form onSubmit={handleSubmit} className="bg-card border p-6 rounded space-y-4">
          <div>
            <label className="text-sm">Usuario</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
          </div>
          <div>
            <label className="text-sm">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
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
            <button type="submit" disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground rounded">{saving ? 'Creando...' : 'Crear usuario'}</button>
          </div>
        </form>
      </main>
    </div>
  )
}
