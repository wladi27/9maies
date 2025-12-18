"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Users } from "lucide-react"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from "react"

type Event = {
  _id: string
  title: string
  description: string
  date: string | null
  location: string | null
  featuredImage?: string | null
}

export function Events() {
  const [events, setEvents] = useState<Event[] | null>(null)
  const [loading, setLoading] = useState(false)
  // per-event form state so multiple cards work independently
  const [emails, setEmails] = useState<Record<string, string>>({})
  const [sendingStates, setSendingStates] = useState<Record<string, boolean>>({})
  const [messages, setMessages] = useState<Record<string, string | null>>({})

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch('/api/events')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        setEvents(data.map((e: any) => ({ ...e, _id: e._id })) )
      })
      .catch((err) => console.error(err))
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [])

  async function handleRsvp(eventId: string) {
    setMessages((s) => ({ ...s, [eventId]: null }))
    const email = emails[eventId]
    if (!email) return setMessages((s) => ({ ...s, [eventId]: 'Introduce un correo válido' }))
    try {
      setSendingStates((s) => ({ ...s, [eventId]: true }))
      const res = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Error')
      setMessages((s) => ({ ...s, [eventId]: 'Registro confirmado — gracias!' }))
      setEmails((s) => ({ ...s, [eventId]: '' }))
    } catch (err: any) {
      setMessages((s) => ({ ...s, [eventId]: err.message || 'Error registrando' }))
    } finally {
      setSendingStates((s) => ({ ...s, [eventId]: false }))
    }
  }

  return (
    <section id="events" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              <span className="text-primary">Eventos</span> Globales
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Participa en nuestros eventos internacionales y confirma tu asistencia dejando tu correo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading && <div>Cargando eventos...</div>}
            {!loading && events && events.length === 0 && <div>No hay eventos disponibles.</div>}
            {events && events.map((ev) => (
              <Card key={ev._id} className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  {ev.featuredImage ? (
                    <div className="md:w-1/3 h-48 md:h-auto relative flex-shrink-0">
                      <Image
                        src={ev.featuredImage}
                        alt={ev.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  )}

                  <div className="p-6 md:w-2/3 space-y-4 min-w-0">
                    <h3 className="text-2xl font-bold text-foreground truncate">{ev.title}</h3>
                    <div className="text-sm text-muted-foreground max-h-20 overflow-hidden">
                      {ev.description}
                    </div>

                    <div className="pt-2 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" aria-hidden />
                        <span className="truncate">{ev.location || 'Online'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" aria-hidden />
                        <span>{ev.date ? new Date(ev.date).toLocaleString() : 'Fecha por definir'}</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="flex gap-2 items-start">
                        <Input
                          aria-label={`Correo para ${ev.title}`}
                          className="flex-1 min-w-0"
                          placeholder="Tu correo electrónico"
                          value={emails[ev._id] || ''}
                          onChange={(e) => setEmails((s) => ({ ...s, [ev._id]: e.target.value }))}
                          type="email"
                        />
                        <Button onClick={() => handleRsvp(ev._id)} disabled={!!sendingStates[ev._id]}>
                          {sendingStates[ev._id] ? 'Enviando...' : 'Confirmar'}
                        </Button>
                      </div>
                      {messages[ev._id] && <div className="text-sm text-muted-foreground pt-2" role="status" aria-live="polite">{messages[ev._id]}</div>}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
