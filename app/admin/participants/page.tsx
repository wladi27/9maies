"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminParticipantsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Exportar CSV</Button>
          <Button>Nuevo</Button>
        </div>
      </div>

      <Card className="p-4 admin-card mt-4">
        <p className="text-muted-foreground">Listado de participantes (placeholder). Implementa búsqueda, paginación y exportación según tu necesidad.</p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-muted-foreground">
                <th className="p-2">Email</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Evento</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">—</td>
                <td className="p-2">—</td>
                <td className="p-2">—</td>
                <td className="p-2">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
