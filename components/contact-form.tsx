"use client"

import { useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, Mail, Phone, User } from 'lucide-react'

export function ContactForm({ id }: { id?: string }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [telegram, setTelegram] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const firstInputRef = useRef<HTMLInputElement | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    if (!firstName || !lastName || !email) {
      return setMessage('Por favor completa nombre, apellido y correo')
    }
    try {
      setLoading(true)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, country, birthdate, email, whatsapp, telegram }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Error enviando')
      setMessage('Gracias — tu mensaje fue recibido')
      setFirstName('')
      setLastName('')
      setCountry('')
      setBirthdate('')
      setEmail('')
      setWhatsapp('')
      setTelegram('')
    } catch (err: any) {
      setMessage(err.message || 'Error enviando')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id={id || 'contact'} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Card className="p-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Left: Marketing / CTA */}
            <div className="flex flex-col justify-center p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-md">
              <h2 className="text-3xl md:text-4xl font-extrabold">Comienza ahora</h2>
              <p className="mt-3 text-lg text-muted-foreground">Únete a cientos de usuarios que ya están aprovechando la IA para optimizar sus finanzas. Deja tus datos y nos pondremos en contacto contigo con una guía personalizada.</p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-primary"><Check className="w-5 h-5" /></span>
                  <span>Asesoría personalizada según tu perfil</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-primary"><Mail className="w-5 h-5" /></span>
                  <span>Acceso a eventos y demostraciones exclusivas</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-primary"><Phone className="w-5 h-5" /></span>
                  <span>Soporte vía WhatsApp / Telegram</span>
                </li>
              </ul>

              <div className="mt-6">
                <Button
                  className="px-6 py-3 bg-gradient-to-r from-primary to-purple-500 text-primary-foreground shadow-lg"
                  onClick={() => { firstInputRef.current?.focus(); window.scrollTo({ top: window.scrollY + 0, behavior: 'smooth' }) }}
                >
                  Comienza ahora
                </Button>
              </div>
            </div>

            {/* Right: Form */}
            <div className="p-6">
              <h3 className="text-2xl font-bold">Déjanos tus datos</h3>
              <p className="text-sm text-muted-foreground mb-4">Completa el formulario y te contactaremos con los siguientes pasos.</p>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1">Nombre</Label>
                  <Input ref={firstInputRef} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Nombre" />
                </div>

                <div>
                  <Label className="mb-1">Apellido</Label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellido" />
                </div>

                <div>
                  <Label className="mb-1">País</Label>
                  <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="País" />
                </div>

                <div>
                  <Label className="mb-1">Fecha de nacimiento</Label>
                  <Input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-1">Email</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" />
                </div>

                <div>
                  <Label className="mb-1">WhatsApp (opcional)</Label>
                  <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+123456789" />
                </div>

                <div>
                  <Label className="mb-1">Telegram (opcional)</Label>
                  <Input value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="@usuario" />
                </div>

                <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <Button type="submit" className="px-8 py-3 text-lg bg-gradient-to-r from-primary to-purple-500 text-primary-foreground shadow-lg" disabled={loading}>
                      {loading ? 'Enviando...' : 'Quiero comenzar'}
                    </Button>
                  </div>

                  <div className="text-sm text-muted-foreground text-center md:text-right">
                    <div className="font-medium">¿Listo para empezar?</div>
                    <div>Al hacer clic aceptas que guardemos tus datos para contactarte.</div>
                    {message && <div className="pt-2">{message}</div>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
