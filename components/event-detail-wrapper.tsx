"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import EventDetailClient from './event-detail-client'

type Props = {
  eventId: string
  eventTitle?: string
  eventDate?: string | null
  eventLocation?: string | null
}

export function EventDetailWrapper({ eventId, eventTitle, eventDate, eventLocation }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
          Asistir
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{eventTitle ? `Asistir a: ${eventTitle}` : 'Confirmar asistencia'}</DialogTitle>
            <DialogDescription>
              {eventDate ? `${eventDate} • ${eventLocation ?? 'Lugar por definir'}` : 'Deja tus datos para confirmar tu asistencia al evento.'}
            </DialogDescription>
          </DialogHeader>

          <div>
            <EventDetailClient eventId={eventId} eventTitle={eventTitle} eventDate={eventDate} eventLocation={eventLocation} />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EventDetailWrapper
