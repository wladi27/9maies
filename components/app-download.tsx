"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from '@/hooks/use-toast'

export function AppDownload() {
  const { toast } = useToast()
  return (
    <section id="download" className="">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary overflow-hidden shadow-lg shadow-primary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Support form (Soporte 24/7) */}
              <div className="p-4 md:p-6 lg:p-8">
                <div className="bg-[color:var(--primary)]/10 border border-primary/30 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-foreground mb-2">Soporte 24/7</h3>
                  <p className="text-sm text-muted-foreground mb-4">Déjanos tus datos y nuestro equipo te contactará.</p>
                  <form id="support-form" className="space-y-3" onSubmit={async (e) => {
                    e.preventDefault()
                    const form = e.currentTarget as HTMLFormElement
                    const data = Object.fromEntries(new FormData(form) as any)
                    try {
                      const res = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                      const json = await res.json().catch(() => ({ message: res.statusText }))
                      if (res.ok) {
                        form.reset()
                        toast({ title: 'Correo enviado', description: 'Tu mensaje fue enviado correctamente. Te contactaremos pronto.' })
                      } else {
                        toast({ title: 'Error', description: json.error || 'No se pudo enviar el mensaje' })
                      }
                    } catch (err) {
                      toast({ title: 'Error', description: 'Error al enviar, inténtalo más tarde.' })
                    }
                  }}>
                    <div>
                      <label className="block text-sm text-foreground">ID de cuenta</label>
                      <input name="accountId" required className="w-full mt-1 px-3 py-2 rounded-md border bg-background/50" />
                    </div>
                    <div>
                      <label className="block text-sm text-foreground">Nombre completo</label>
                      <input name="fullName" required className="w-full mt-1 px-3 py-2 rounded-md border bg-background/50" />
                    </div>
                    <div>
                      <label className="block text-sm text-foreground">Email</label>
                      <input name="email" type="email" required className="w-full mt-1 px-3 py-2 rounded-md border bg-background/50" />
                    </div>
                    <div className="pt-2">
                      <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--primary)] text-white px-4 py-2">Enviar</button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right: App download content + image */}
              <div className="p-8 md:p-12 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground section-title">9mx Corporation</h2>
                <p className="text-lg text-muted-foreground">
                  Somos una empresa fintech pionera que redefine la gestión patrimonial mediante inteligencia artificial de próxima generación.
                </p>

                <p className="text-lg text-muted-foreground">Soluciones Clave:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <span className="text-foreground font-semibold">Fondo 9mx:</span> Vehículo de inversión cuantitativa que asigna activos
                    de manera adaptativa en múltiples clases.
                  </li>
                  <li>
                    <span className="text-foreground font-semibold">Plataforma Institucional:</span> Motores de estrategia y control de riesgo
                    para clientes profesionales.
                  </li>
                  <li>
                    <span className="text-foreground font-semibold">Academia 9mx:</span> Programa formativo de élite para inversores.
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="https://www.9mc.ai/wp-content/uploads/2025/05/9M_License_0519.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
                      <Download className="w-5 h-5 mr-2" />
                      Descargar licencias
                    </Button>
                  </a>
                </div>

                <div className="relative h-72 md:h-full min-h-[300px] rounded-2xl overflow-hidden">
                  <Image 
                    src="/corpo2.png" 
                    alt="9mx Corporation" 
                    fill 
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Videos relacionados: moved to About section below licenses */}
      </div>
    </section>
  )
}