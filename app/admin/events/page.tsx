"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminEventsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Eventos</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Nuevo</Button>
        </div>
      </div>

      <Card className="p-4 admin-card mt-4">
        <p className="text-muted-foreground">Listado de eventos (placeholder). Aquí podrás crear/editar eventos y ver participantes asociados.</p>
      </Card>
    </div>
  )
}
