"use client"

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Trash2, Edit2, Users } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type EventItem = {
  _id: string
  title: string
  description: string
  date?: string | null
  location?: string | null
  featuredImage?: string | null
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<Partial<EventItem>>({})
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [participantsDialog, setParticipantsDialog] = useState<{ open: boolean; id?: string; title?: string }>({ open: false })

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/events')
      const data = await res.json()
      setEvents(data)
    } catch (err) {
      console.error(err)
      setEvents([])
    } finally { setLoading(false) }
  }

  function openCreate() {
    setEditingId(null)
    setForm({})
    setOpen(true)
  }

  function edit(ev: EventItem) {
    setEditingId(ev._id)
    setForm({
      title: ev.title,
      description: ev.description,
      date: ev.date ? new Date(ev.date).toISOString().slice(0, 16) : undefined,
      location: ev.location || undefined,
      featuredImage: ev.featuredImage || undefined,
    })
    setOpen(true)
  }

  async function save() {
    setMessage(null)
    try {
      const payload = {
        title: form.title,
        description: form.description,
        date: form.date,
        location: form.location,
        featuredImage: form.featuredImage,
      }

      let res
      if (editingId) {
        res = await fetch(`/api/events/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      } else {
        res = await fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err?.error || 'Error saving')
      }

      setForm({})
      setEditingId(null)
      setOpen(false)
      await load()
      setMessage('Guardado correctamente')
    } catch (err: any) {
      setMessage(err.message || 'Error')
    }
  }

  async function remove(id: string) {
    if (!confirm('Eliminar evento y participantes?')) return
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' })
      if (!res.ok && res.status !== 204) throw new Error('Error eliminando')
      await load()
      setMessage('Eliminado')
    } catch (err) { setMessage('Error eliminando') }
  }

  function openParticipants(id: string, title?: string) {
    setParticipantsDialog({ open: true, id, title })
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Administración — Eventos</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={load}>Actualizar</Button>
          <Button onClick={openCreate}>Crear Evento</Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] table-auto">
            <thead>
              <tr className="text-sm text-muted-foreground">
                <th className="text-left p-3">Título</th>
                <th className="text-left p-3">Ubicación</th>
                <th className="text-left p-3">Fecha</th>
                <th className="text-left p-3">Imagen</th>
                <th className="text-right p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {events?.map((ev) => (
                <tr key={ev._id} className="border-t">
                  <td className="p-3 align-top">
                    <div className="font-medium">{ev.title}</div>
                    <div className="text-sm text-muted-foreground">{ev.description}</div>
                  </td>
                  <td className="p-3 align-top">{ev.location || '—'}</td>
                  <td className="p-3 align-top">{ev.date ? new Date(ev.date).toLocaleString() : '—'}</td>
                  <td className="p-3 align-top">
                    {ev.featuredImage ? (
                      <div className="w-28 h-16 relative rounded-md overflow-hidden border">
                        <Image src={ev.featuredImage} alt={ev.title} fill className="object-cover" />
                      </div>
                    ) : '—'}
                  </td>
                  <td className="p-3 text-right align-top">
                    <div className="inline-flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => edit(ev)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openParticipants(ev._id, ev.title)}>
                        <Users className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => remove(ev._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Evento' : 'Crear Evento'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-w-2xl">
            <Input placeholder="Título" value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Ubicación" value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <Input type="datetime-local" value={form.date || ''} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <Input placeholder="Imagen (URL)" value={form.featuredImage || ''} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} />
            {form.featuredImage && (
              <div className="w-full h-40 relative rounded-md overflow-hidden border">
                <Image src={form.featuredImage} alt="preview" fill className="object-cover" />
              </div>
            )}
            <Textarea placeholder="Descripción" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <DialogFooter>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setOpen(false); setForm({}); setEditingId(null); }}>Cancelar</Button>
              <Button onClick={save}>{editingId ? 'Actualizar' : 'Crear'}</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={participantsDialog.open} onOpenChange={(v) => setParticipantsDialog({ ...participantsDialog, open: v })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Asistentes — {participantsDialog.title}</DialogTitle>
          </DialogHeader>
          <div>
            <iframe src={`/admin/participants?eventId=${participantsDialog.id}`} className="w-full h-[60vh] border-0" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setParticipantsDialog({ open: false })}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
