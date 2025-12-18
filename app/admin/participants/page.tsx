"use client"

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type Event = { _id: string; title: string }
type Participant = { _id: string; email: string; name?: string; createdAt: string }

export default function AdminParticipantsPage() {
  const [events, setEvents] = useState<Event[] | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [participants, setParticipants] = useState<Participant[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState<Participant | null>(null)

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((data) => setEvents(data.map((e: any) => ({ _id: e._id, title: e.title }))))
      .catch((err) => console.error(err))

    try {
      const params = new URLSearchParams(window.location.search)
      const eventId = params.get('eventId')
      if (eventId) loadParticipants(eventId)
    } catch (e) {
      // ignore if SSR
    }
  }, [])

  async function loadParticipants(eventId: string) {
    setSelected(eventId)
    setLoading(true)
    try {
      const res = await fetch(`/api/events/${eventId}/participants`)
      const data = await res.json()
      setParticipants(data)
    } catch (err) {
      console.error(err)
      setParticipants([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Participantes (Admin)</h1>
        <div>
          <Button variant="outline" onClick={() => { setParticipants(null); setSelected(null); }}>Reiniciar</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="p-4">
            <h2 className="font-semibold mb-2">Events</h2>
            <ul className="space-y-2">
              {events?.map((ev) => (
                <li key={ev._id}>
                  <button
                    className={`text-left w-full block p-2 rounded-md ${selected === ev._id ? 'bg-muted font-semibold' : 'hover:bg-muted/50'}`}
                    onClick={() => loadParticipants(ev._id)}
                  >
                    {ev.title}
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Participantes</h2>
                <div className="text-sm text-muted-foreground">{selected ? `Evento: ${events?.find(e => e._id === selected)?.title ?? ''}` : 'Selecciona un evento'}</div>
            </div>

            {loading && <div>Cargando participantes...</div>}
            {!loading && !participants && <div>Selecciona un evento para ver participantes</div>}

            {!loading && participants && (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-sm text-muted-foreground">
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Registered</th>
                      <th className="text-right p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((p) => (
                      <tr key={p._id} className="border-t">
                        <td className="p-2 align-top">{p.email}</td>
                        <td className="p-2 align-top">{p.name || '-'}</td>
                        <td className="p-2 align-top">{new Date(p.createdAt).toLocaleString()}</td>
                        <td className="p-2 text-right">
                          <Button variant="ghost" size="sm" onClick={() => setDetail(p)}>Ver</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>

      <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Participant</DialogTitle>
          </DialogHeader>
          {detail && (
            <div className="space-y-2">
              <div><strong>Email:</strong> {detail.email}</div>
              <div><strong>Name:</strong> {detail.name || '-'}</div>
              <div><strong>Registered:</strong> {new Date(detail.createdAt).toLocaleString()}</div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetail(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
