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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

type Event = {
  _id: string
  title: string
  description: string
  date: string | null
  location: string | null
  featuredImage?: string | null
}

// Fixed locale/timezone formatters to avoid SSR/CSR hydration mismatches
const DATE_FORMAT = new Intl.DateTimeFormat('es-ES', {
  timeZone: 'UTC',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const TIME_FORMAT = new Intl.DateTimeFormat('es-ES', {
  timeZone: 'UTC',
  hour: '2-digit',
  minute: '2-digit',
})

const DATE_TIME_FORMAT = new Intl.DateTimeFormat('es-ES', {
  timeZone: 'UTC',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

function formatDate(dateStr: string | null) {
  if (!dateStr) return null
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? null : DATE_FORMAT.format(date)
}

function formatTime(dateStr: string | null) {
  if (!dateStr) return null
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? null : TIME_FORMAT.format(date)
}

function formatDateTime(dateStr: string | null) {
  if (!dateStr) return null
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? null : DATE_TIME_FORMAT.format(date)
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
  featuredImage: '/images/panama-evento.png',
    },
    {
      _id: 'evt-2',
      title: 'Evento en Dubái EAU',
      description: 'Casos reales de automatización de carteras. Del 6 al 9 de febrero de 2026.',
      date: new Date(2026, 1, 6, 10, 0, 0).toISOString(), // inicio 06 febrero 2026
      location: 'Dubái, EAU',
  featuredImage: '/images/dubai-evento.png',
    },
    {
      _id: 'evt-3',
      title: 'Evento en México',
      description: 'Arquitectura de datos, señales y ejecución autónoma en múltiples mercados.',
  date: new Date(2025, 11, 17, 16, 0, 0).toISOString(), // 17 diciembre 2025
      location: 'Ciudad de México, México',
  featuredImage: '/images/mexico-evento.png',
    },
  ]
  // Modal state
  const [openEventId, setOpenEventId] = useState<string | null>(null)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formWhatsapp, setFormWhatsapp] = useState('')
  const [formTelegram, setFormTelegram] = useState('')
  const [formCountry, setFormCountry] = useState('')
  const [formMessageValue, setFormMessageValue] = useState('')
  const [formHeardFrom, setFormHeardFrom] = useState('')
  const [sending, setSending] = useState(false)
  const [formMessage, setFormMessage] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  // Mantener la proporción real del flyer para que se vea en su tamaño normal
  const [ratios, setRatios] = useState<Record<string, number>>({})
  const { toast } = useToast()

  function openModal(id: string) {
    setOpenEventId(id)
    // Resetear estado del formulario y mensajes al abrir
    setFormName('')
    setFormEmail('')
    setFormWhatsapp('')
    setFormTelegram('')
    setFormCountry('')
    setFormMessageValue('')
    setFormHeardFrom('')
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
        body: JSON.stringify({
          email: formEmail,
          name: formName,
          whatsapp: formWhatsapp,
          telegram: formTelegram,
          country: formCountry,
          heardFrom: formHeardFrom,
          message: formMessageValue,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Error')
      // Toast de éxito (3s) y cerrar modal
      toast({ title: 'Registro enviado', description: '¡Gracias por confirmar tu asistencia!', duration: 3000 })
      setSent(true)
      setFormName('')
      setFormEmail('')
      setFormWhatsapp('')
      setFormTelegram('')
      setFormCountry('')
      setFormHeardFrom('')
      setFormMessageValue('')
      setOpenEventId(null)
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
    <section id="events" className="bg-secondary pb-24 pt-0">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 pt-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              <span className="text-primary">Eventos</span> Globales
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Participa en nuestros eventos internacionales y confirma tu asistencia dejando tu correo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {threeEvents && threeEvents.length === 0 && <div>No hay eventos disponibles.</div>}
            {threeEvents && threeEvents.map((ev) => (
              <Card
                key={ev._id}
                className="bg-card border-border overflow-hidden hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 flex flex-col p-0"
              >
                <div>
                  <div className="relative bg-gradient-to-br from-primary/20 via-purple-400/15 to-secondary/20">
                    <AspectRatio ratio={9 / 16}>
                      {ev.featuredImage ? (
                        <Image
                          src={ev.featuredImage}
                          alt={ev.title}
                          fill
                          className="object-contain object-center"
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                          priority={false}
                          onLoadingComplete={(img) => {
                            // Ya no ajustamos la relación: todos usan 3:4 fijo para uniformidad
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
                            {formatDate(ev.date)} • {formatTime(ev.date)}
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
          setFormTelegram('')
          setFormHeardFrom('')
          setFormWhatsapp('')
          setFormCountry('')
          setFormMessageValue('')
          setFormName('')
          setFormEmail('')
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
                <>Fecha/Hora: {formatDateTime(selectedEvent.date)} • Lugar: {selectedEvent.location || 'Online'}</>
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
              <Label htmlFor="telegram">Telegram</Label>
              <Input id="telegram" value={formTelegram} onChange={(e) => setFormTelegram(e.target.value)} placeholder="Tu usuario o número en Telegram" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">País</Label>
              <Input id="country" value={formCountry} onChange={(e) => setFormCountry(e.target.value)} placeholder="Tu país" />
            </div>
            <div className="grid gap-2">
              <Label>¿Cómo nos conociste?</Label>
              <Select value={formHeardFrom} onValueChange={setFormHeardFrom}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="referido">Referencia/Amigo</SelectItem>
                  <SelectItem value="evento">Evento anterior</SelectItem>
                  <SelectItem value="busqueda">Búsqueda en Google</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
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
