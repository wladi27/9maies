"use client"

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

type Contact = {
  _id: string
  firstName: string
  lastName: string
  email: string
  country?: string
  whatsapp?: string
  telegram?: string
  createdAt?: string
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()
      setContacts(data)
    } catch (err) { console.error(err); setContacts([]) } finally { setLoading(false) }
  }

  async function remove(id: string) {
    if (!confirm('Eliminar contacto?')) return
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
      if (!res.ok && res.status !== 204) throw new Error('Error eliminando')
      await load()
      setMessage('Eliminado')
    } catch (err) { setMessage('Error eliminando') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Contactos</h1>
        <div>
          <Button variant="outline" onClick={load}>Actualizar</Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-sm text-muted-foreground">
                <th className="p-2 text-left">Nombre</th>
                <th className="p-2 text-left">Correo</th>
                <th className="p-2 text-left">País</th>
                <th className="p-2 text-left">WhatsApp</th>
                <th className="p-2 text-left">Telegram</th>
                <th className="p-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {contacts?.map(c => (
                <tr key={c._id} className="border-t">
                  <td className="p-2">{c.firstName} {c.lastName}</td>
                  <td className="p-2">{c.email}</td>
                  <td className="p-2">{c.country || '—'}</td>
                  <td className="p-2">{c.whatsapp || '—'}</td>
                  <td className="p-2">{c.telegram || '—'}</td>
                  <td className="p-2 text-right">
                    <div className="inline-flex gap-2">
                      <Button variant="destructive" size="sm" onClick={() => remove(c._id)}>Eliminar</Button>
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
