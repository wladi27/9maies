"use client"

import Image from "next/image"
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type Event = {
  _id: string
  title: string
  description: string
  date: string | null
  location: string | null
  featuredImage?: string | null
}

export function Events() {
  // Eventos estáticos
  const now = new Date()
  const events: Event[] = [
    {
      _id: 'evt-1',
      title: 'Evento en Panamá',
      description: 'Estrategias cuantitativas, IA aplicada y gestión patrimonial de próxima generación.',
      date: new Date(2026, 0, 8, 18, 0, 0).toISOString(), // 08 enero 2026
      location: 'Panamá',
  featuredImage: '/panama.jpg',
    },
    {
      _id: 'evt-2',
      title: 'Evento en Dubái EAU',
      description: 'Casos reales de automatización de carteras. Del 6 al 9 de febrero de 2026.',
      date: new Date(2026, 1, 6, 10, 0, 0).toISOString(), // inicio 06 febrero 2026
      location: 'Dubái, EAU',
  featuredImage: '/dubai.jpg',
    },
    {
      _id: 'evt-3',
      title: 'Evento en México',
      description: 'Arquitectura de datos, señales y ejecución autónoma en múltiples mercados.',
  date: new Date(2025, 11, 17, 16, 0, 0).toISOString(), // 17 diciembre 2025
      location: 'Ciudad de México, México',
  featuredImage: '/mexico.jpg',
    },
  ]
  // Modal state
  const [openEventId, setOpenEventId] = useState<string | null>(null)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formWhatsapp, setFormWhatsapp] = useState('')
  const [formCountry, setFormCountry] = useState('')
  const [formMessageValue, setFormMessageValue] = useState('')
  const [sending, setSending] = useState(false)
  const [formMessage, setFormMessage] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  // Mantener la proporción real del flyer para que se vea en su tamaño normal
  const [ratios, setRatios] = useState<Record<string, number>>({})

  function openModal(id: string) {
    setOpenEventId(id)
    // Resetear estado del formulario y mensajes al abrir
    setFormName('')
    setFormEmail('')
    setFormWhatsapp('')
    setFormCountry('')
    setFormMessageValue('')
    setFormMessage(null)
    setSending(false)
    setSent(false)
  }

  async function submitRsvp() {
    if (!openEventId) return
    setFormMessage(null)
    if (!formEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) {
      setFormMessage('Introduce un correo válido')
      return
    }
    try {
      setSending(true)
      const res = await fetch(`/api/events/${openEventId}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formEmail, name: formName, whatsapp: formWhatsapp, country: formCountry, message: formMessageValue }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Error')
      setFormMessage('Registro enviado correctamente — ¡gracias!')
      setSent(true)
      setFormName('')
      setFormEmail('')
  setFormWhatsapp('')
  setFormCountry('')
  setFormMessageValue('')
      // Mantener el modal abierto para mostrar el mensaje de éxito
    } catch (err: any) {
      setFormMessage(err?.message || 'Error enviando el registro')
    } finally {
      setSending(false)
    }
  }

  const threeEvents = useMemo(() => events.slice(0, 3), [events])
  const selectedEvent = useMemo(() => {
    if (!openEventId) return null
    return events.find((e) => e._id === openEventId) ?? null
  }, [openEventId])

  function isClosed(dateStr: string | null) {
    if (!dateStr) return false
    const eventDate = new Date(dateStr)
    const now = new Date()
    // Asunción: "Cerrado" si la fecha/hora ya pasó
    return now > eventDate
  }

  return (
    <>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {threeEvents && threeEvents.length === 0 && <div>No hay eventos disponibles.</div>}
            {threeEvents && threeEvents.map((ev) => (
              <Card key={ev._id} className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div>
                  <div className="relative bg-muted">
                    <AspectRatio ratio={Math.max(ratios[ev._id] ?? 16/9, 1)}>
                      {ev.featuredImage ? (
                        <Image
                          src={ev.featuredImage}
                          alt={ev.title}
                          fill
                          className="object-contain object-center origin-center scale-[0.95]"
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                          priority={false}
                          onLoadingComplete={(img) => {
                            // Ajustar la relación de aspecto al tamaño natural del flyer
                            const { naturalWidth, naturalHeight } = img
                            if (naturalWidth && naturalHeight) {
                              setRatios((prev) => ({ ...prev, [ev._id]: naturalWidth / naturalHeight }))
                            }
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                      )}
                    </AspectRatio>
                    {isClosed(ev.date) && (
                      <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                        Cerrado
                      </span>
                    )}
                  </div>

                  <div className="p-3 space-y-3">
                    <h3 className="text-xl font-bold text-foreground">{ev.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{ev.description}</p>

                    <div className="grid grid-cols-1 gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" aria-hidden />
                        <span className="truncate">{ev.location || 'Online'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" aria-hidden />
                        {ev.date ? (
                          <span>
                            {new Date(ev.date).toLocaleDateString()} • {new Date(ev.date).toLocaleTimeString()}
                          </span>
                        ) : (
                          <span>Fecha por definir</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Button onClick={() => openModal(ev._id)} disabled={isClosed(ev.date)}>
                        Asistir
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
      <Dialog open={!!openEventId} onOpenChange={(open) => {
        if (!open) {
          setOpenEventId(null)
          // Reset al cerrar para evitar mensajes persistentes
          setFormMessage(null)
          setSent(false)
          setSending(false)
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? (
                <>Asistir a: <span className="font-semibold">{selectedEvent.title}</span></>
              ) : (
                'Confirmar asistencia'
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedEvent && selectedEvent.date ? (
                <>Fecha/Hora: {new Date(selectedEvent.date).toLocaleString()} • Lugar: {selectedEvent.location || 'Online'}</>
              ) : (
                'Deja tus datos para confirmar tu asistencia al evento.'
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Tu nombre" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="tucorreo@dominio.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" type="tel" value={formWhatsapp} onChange={(e) => setFormWhatsapp(e.target.value)} placeholder="Tu número de WhatsApp" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">País</Label>
              <Input id="country" value={formCountry} onChange={(e) => setFormCountry(e.target.value)} placeholder="Tu país" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea id="message" value={formMessageValue} onChange={(e) => setFormMessageValue(e.target.value)} placeholder="Cuéntanos si tienes alguna preferencia o consulta" />
            </div>
            {formMessage && (
              <p className="text-sm text-muted-foreground" role="status" aria-live="polite">{formMessage}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEventId(null)}>{sent ? 'Cerrar' : 'Cancelar'}</Button>
            <Button onClick={submitRsvp} disabled={sending || sent}>{sending ? 'Enviando...' : (sent ? 'Enviado' : 'Enviar')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
