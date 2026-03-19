"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Error')
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Error en el login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Acceso Administrador</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm">Usuario</label>
            <input className="w-full mt-1 p-2 border rounded" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label className="text-sm">Contraseña</label>
            <input type="password" className="w-full mt-1 p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
