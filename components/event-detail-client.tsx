"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

type Props = {
  eventId: string
  eventTitle?: string
  eventDate?: string | null
  eventLocation?: string | null
}

export function EventDetailClient({ eventId, eventTitle, eventDate, eventLocation }: Props) {
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
  const { toast } = useToast()

  async function submitRsvp() {
    setFormMessage(null)
    if (!formEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) {
      setFormMessage('Introduce un correo válido')
      return
    }
    try {
      setSending(true)
      const res = await fetch(`/api/events/${eventId}/rsvp`, {
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
      toast({ title: 'Registro enviado', description: '¡Gracias por confirmar tu asistencia!', duration: 3000 })
      setSent(true)
      setFormName('')
      setFormEmail('')
      setFormWhatsapp('')
      setFormTelegram('')
      setFormCountry('')
      setFormHeardFrom('')
      setFormMessageValue('')
    } catch (err: any) {
      setFormMessage(err?.message || 'Error enviando el registro')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mt-6 bg-card border border-primary rounded-lg p-6">
      <h3 className="text-xl font-semibold">Confirmar asistencia</h3>
      {eventTitle && <p className="text-sm text-muted-foreground">Evento: {eventTitle}</p>}
      {eventDate && <p className="text-sm text-muted-foreground">Fecha: {eventDate}</p>}
      {eventLocation && <p className="text-sm text-muted-foreground">Lugar: {eventLocation}</p>}

      <div className="mt-4 grid grid-cols-1 gap-3">
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
        {formMessage && <p className="text-sm text-muted-foreground">{formMessage}</p>}

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { setSent(false); setFormMessage(null) }}>{sent ? 'Cerrar' : 'Cancelar'}</Button>
          <Button onClick={submitRsvp} disabled={sending || sent}>{sending ? 'Enviando...' : (sent ? 'Enviado' : 'Asistir')}</Button>
        </div>
      </div>
    </div>
  )
}

export default EventDetailClient
