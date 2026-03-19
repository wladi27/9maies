"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

export default function Header({ title = 'Panel Admin' }: { title?: string }) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/login/logout')
    router.push('/admin/login')
  }

  return (
    <header className="flex items-center justify-between p-4 border-b border-muted bg-card">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <nav className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/dashboard')} className="text-sm px-2 py-1 rounded hover:bg-primary/10">Dashboard</button>
          <button onClick={() => router.push('/admin/events')} className="text-sm px-2 py-1 rounded hover:bg-primary/10">Eventos</button>
          <button onClick={() => router.push('/admin/products')} className="text-sm px-2 py-1 rounded hover:bg-primary/10">Productos</button>
          <button onClick={() => router.push('/admin/users')} className="text-sm px-2 py-1 rounded hover:bg-primary/10">Usuarios</button>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => router.push('/')} className="px-3 py-1 rounded bg-primary text-primary-foreground">Sitio</button>
        <button onClick={handleLogout} className="px-3 py-1 rounded border border-muted">Cerrar sesión</button>
      </div>
    </header>
  )
}
