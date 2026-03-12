"use client"

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminIndex() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Nuevo</Button>
        </div>
      </div>

      <Card className="p-4 admin-card">
        <p className="text-muted-foreground">Bienvenido al panel de administración. Selecciona una sección desde la barra lateral.</p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/admin/events" className="block p-3 rounded border hover:shadow-sm">Eventos</Link>
          <Link href="/admin/participants" className="block p-3 rounded border hover:shadow-sm">Participantes</Link>
          <Link href="/admin/products" className="block p-3 rounded border hover:shadow-sm">Productos</Link>
          <Link href="/admin/training" className="block p-3 rounded border hover:shadow-sm">Entrenamiento</Link>
          <Link href="/admin/contacts" className="block p-3 rounded border hover:shadow-sm">Contactos</Link>
          <Link href="/admin/users" className="block p-3 rounded border hover:shadow-sm">Usuarios</Link>
        </div>
      </Card>
    </div>
  )
}