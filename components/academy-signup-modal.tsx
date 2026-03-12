"use client"

import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useForm } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'

type FormValues = {
  name: string
  email: string
  whatsappCode?: string
  whatsappNumber?: string
  telegram?: string
  country?: string
  heardFrom?: string
  message?: string
  montoInversion: string
  codigoInvitacion: string
  codigoPatrocinador: string
}

export default function AcademySignupModal({ productId = 'academia' }: { productId?: string }) {
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      whatsappCode: '+1',
      whatsappNumber: '',
      telegram: '',
      country: '',
      heardFrom: '',
      message: '',
      montoInversion: '',
      codigoInvitacion: '',
        codigoPatrocinador: '',
    },
  })

  const { toast } = useToast()

  async function onSubmit(values: FormValues) {
    try {
      const whatsappFull = values.whatsappNumber ? `${values.whatsappCode || ''}${values.whatsappNumber}` : undefined
      const payload = {
        productId,
        name: values.name,
        email: values.email,
        whatsapp: whatsappFull,
        telegram: values.telegram || null,
        country: values.country || null,
        heardFrom: values.heardFrom || null,
        message: values.message || null,
        montoInversion: values.montoInversion,
        codigoInvitacion: values.codigoInvitacion,
        codigoPatrocinador: values.codigoPatrocinador,
      }

      const res = await fetch('/api/academy/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Error')

      toast({ title: 'Inscripción enviada', description: 'Te contactaremos pronto.' })
      form.reset()
    } catch (err: any) {
      toast({ title: 'Error', description: String(err?.message || err) })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Regístrate hoy</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inscripción Academia 9mx</DialogTitle>
          <DialogDescription>Rellena el formulario para comenzar hoy. Todos los campos con * son obligatorios.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-3 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo *</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-2 items-start">
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="whatsappCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="h-9 w-full rounded-md border bg-transparent px-2 text-sm"
                        >
                          <option value="+1">+1 (US/CA)</option>
                          <option value="+34">+34 (ES)</option>
                          <option value="+52">+52 (MX)</option>
                          <option value="+57">+57 (CO)</option>
                          <option value="+507">+507 (PA)</option>
                          <option value="+504">+504 (HN)</option>
                          <option value="+55">+55 (BR)</option>
                          <option value="+54">+54 (AR)</option>
                          <option value="+58">+58 (VE)</option>
                          <option value="+33">+33 (FR)</option>
                          <option value="+49">+49 (DE)</option>
                          <option value="+39">+39 (IT)</option>
                          <option value="+7">+7 (RU)</option>
                          <option value="+91">+91 (IN)</option>
                          <option value="+86">+86 (CN)</option>
                          <option value="+61">+61 (AU)</option>
                          <option value="+65">+65 (SG)</option>
                          <option value="+351">+351 (PT)</option>
                          <option value="+971">+971 (AE)</option>
                          <option value="+44">+44 (UK)</option>
                          <option value="+90">+90 (TR)</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Número sin espacios" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="telegram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telegram</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="montoInversion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu monto de inversión inicial *</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="codigoInvitacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu código de invitación *</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="codigoPatrocinador"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de tu patrocinador *</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DialogClose>
              <Button type="submit">Enviar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
