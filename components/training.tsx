"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Calendar, Clock, MapPin, Video } from "lucide-react"
import { AspectRatio } from '@/components/ui/aspect-ratio'

export function Training() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [remote, setRemote] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  // load dynamic training content (slug=entrenamiento)
  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/training?slug=entrenamiento')
      if (!res.ok) throw new Error('Fetch failed')
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) setRemote(data[0])
    } catch (err) {
      console.warn('Could not load remote training, using local fallback')
    } finally {
      setLoading(false)
    }
  }

  useState(() => { load() })

  const content = remote || null

  return (
    <>
      <section id="training" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground section-title">
                <span className="text-primary">Entrenamiento</span> y Educación
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Programas estructurados de liderazgo para impulsar tu crecimiento en el ecosistema 9M AI
              </p>
            </div>

            <Card
              className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/30 overflow-hidden cursor-pointer hover:border-primary transition-all h-64 md:h-80 p-5 rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="grid md:grid-cols-2 gap-4 items-stretch h-full">
                <div className="space-y-6 self-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">{content?.title || '9M AI ENTRENAMIENTO'}</h3>
                  <p className="text-lg text-muted-foreground">{content?.subtitle || 'Cómo navegar el futuro de las finanzas: comprender la IA de 9M'}</p>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setIsModalOpen(true)}>
                    {loading ? 'Cargando...' : 'Ver información completa'}
                  </Button>
                </div>
                <div className="self-stretch justify-self-end w-auto md:w-auto p-[2px]">
                  <div className="relative rounded-lg overflow-hidden h-full w-auto">
                    <div className="relative h-full w-auto min-w-[300px]">
                      <Image
                        src="/images/whatsapp-20image-202025-12-07-20at-2011.jpeg"
                        alt={content?.title ? `${content.title} - imagen` : '9M AI Entrenamiento'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    {content?.subtitle && (
                      <div className="absolute right-4 bottom-4 text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded">
                        {content.subtitle}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">{content?.title || '9M AI Entrenamiento'}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="horarios" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="horarios">Horarios</TabsTrigger>
              <TabsTrigger value="informacion">Información</TabsTrigger>
              <TabsTrigger value="temas">Temas</TabsTrigger>
            </TabsList>

            <TabsContent value="horarios" className="space-y-6">
              <Card className="bg-card p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Sesiones Semanales
                </h3>
                <div className="space-y-4">
                  {(content?.schedules && content.schedules.length > 0) ? (
                    content.schedules.map((s: any, idx: number) => (
                      <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                        <h4 className="font-bold text-lg mb-2">{s.title || 'Sesión'}</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {s.day && (
                            <p className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span className="font-semibold">Día:</span> {s.day}</p>
                          )}
                          {s.time && (
                            <p className="flex items-center gap-2"><Clock className="w-4 h-4" /><span className="font-semibold">Hora:</span> {s.time}</p>
                          )}
                          {s.speaker && <p><span className="font-semibold">Orador:</span> {s.speaker}</p>}
                          {s.regional && (
                            <>
                              <p className="mt-2 font-semibold">Horarios por región:</p>
                              <ul className="ml-4 space-y-1">{s.regional.map((r: any, i: number) => <li key={i}>{r}</li>)}</ul>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">Información de horarios no disponible.</div>
                  )}
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/30 p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  Acceso Zoom
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Meeting ID:</span> 843 3091 2680
                  </p>
                  <p>
                    <span className="font-semibold">Passcode:</span> 070889
                  </p>
                  <Button
                    className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() =>
                      window.open(
                        "https://us06web.zoom.us/j/84330912680?pwd=3Qvil8xibowlIbs1xwv7x5QlspOVD4.1",
                        "_blank",
                      )
                    }
                  >
                    Unirse a Zoom
                  </Button>
                </div>
              </Card>

              <Card className="bg-card p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Horarios Globales
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">América</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>3:00 p.m. - California</li>
                      <li>4:00 p.m. - Utah, México, Costa Rica</li>
                      <li>5:00 p.m. - Texas, Chicago, Colombia</li>
                      <li>6:00 p.m. - Nueva York, Florida</li>
                      <li>8:00 p.m. - Chile, Argentina</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Europa y Asia</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>10:00 p.m. - Portugal, Reino Unido</li>
                      <li>11:00 p.m. - España, Francia, Italia</li>
                      <li>6:00 a.m. - Singapur (día siguiente)</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="informacion" className="space-y-6">
              <Card className="bg-card p-6">
                <h3 className="text-xl font-bold mb-4">Sobre el Programa</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div dangerouslySetInnerHTML={{ __html: content?.info || `
                    <p>Nuestro programa de entrenamiento está diseñado para ayudarte a comprender y dominar el futuro de
                    las finanzas a través de la inteligencia artificial de 9M.</p>
                    <p>Con sesiones semanales dirigidas por expertos de la industria, aprenderás estrategias avanzadas de
                    inversión, liderazgo de equipos y construcción de redes exitosas.</p>` }} />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="temas" className="space-y-6">
              <Card className="bg-card p-6">
                <h3 className="text-xl font-bold mb-4">Temas del Programa</h3>
                <div className="space-y-4">
                  {(content?.modules && content.modules.length > 0) ? (
                    content.modules.map((m: any, idx: number) => (
                      <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                        <h4 className="font-bold mb-2">{m.title}</h4>
                        {m.points ? (
                          <ul className="space-y-1 text-sm text-muted-foreground">{m.points.map((p: string, i: number) => <li key={i}>• {p}</li>)}</ul>
                        ) : (
                          <div className="text-sm text-muted-foreground">Sin puntos definidos</div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">Temario no disponible.</div>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
