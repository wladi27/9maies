"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Play } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function Presentations() {
  const [video, setVideo] = useState<{
    embed: string
    watch: string
    title: string
  } | null>(null)

  const PRESENTATION_EMBED = "https://www.youtube.com/embed/Q7Aro1Vv6aU"
  const PRESENTATION_WATCH = "https://www.youtube.com/watch?v=Q7Aro1Vv6aU"
  const COMP_PLAN_EMBED = "https://www.youtube.com/embed/z7lWV-EVWAg"
  const COMP_PLAN_WATCH = "https://www.youtube.com/watch?v=z7lWV-EVWAg"

  function openVideo(embed: string, watch: string, title: string) {
    const withParams = `${embed}?autoplay=1&rel=0&modestbranding=1`
    setVideo({ embed: withParams, watch, title })
  }
  return (
    <>
    <section id="presentations" className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white section-title">
              <span className="text-[color:var(--primary)]">Presentaciones</span> y Recursos
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[rgba(212,175,55,0.7)] max-w-3xl mx-auto">
              Accede a nuestras presentaciones oficiales y materiales educativos sobre 9MX
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Hero Presentation */}
            <Card className="bg-gradient-to-br from-primary/30 via-black to-primary/50 border-primary/50 overflow-hidden h-full">
              <div className="p-6 md:p-8 h-full">
                <div className="flex flex-col gap-6 lg:gap-10 h-full">
                  {/* Contenedor de imagen con diseño mejorado */}
                  <div className="relative">
                    <div className="aspect-video rounded-2xl overflow-hidden border-4 border-primary/50 shadow-2xl">
                      <div className="relative h-full w-full bg-black">
                        <Image
                          src="/presentacio_9mx.png"
                          alt="9MX Presentación"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={false}
                        />
                      </div>
                    </div>
                    {/* Elementos decorativos */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-[color:var(--primary)] rounded-full shadow-lg" />
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[rgba(212,175,55,0.65)] rounded-full shadow-lg" />
                  </div>

                  {/* Contenido */}
                  <div className="space-y-4 lg:space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white">9MX Presentación Oficial</h3>
                      <p className="text-lg text-white font-semibold mt-2">
                        Cómo navegar el futuro de las finanzas
                      </p>
                    </div>

                    <p className="text-white">
                      Descubre cómo NovaMind™ está revolucionando la gestión de activos digitales con nuestra
                      tecnología de inteligencia artificial de última generación.
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Button 
                        size="lg" 
                        onClick={() => openVideo(PRESENTATION_EMBED, PRESENTATION_WATCH, "Presentación 9MX")} 
                        className="bg-[color:var(--primary)] text-white hover:brightness-90 text-lg px-8 py-6 shadow-lg"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Ver presentación
                      </Button>
                      <Button 
                        size="lg" 
                        asChild 
                        variant="outline" 
                        className="border-[color:var(--primary)] text-white hover:bg-[rgb(214,209,209)] text-lg px-8 py-6"
                      >
                        <a
                          href="/pdf/9MX PRESENTACION General.pdf"
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Descargar PDF
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Plan de compensación */}
            <Card className="bg-gradient-to-br from-primary/30 via-black to-primary/50 border-primary/50 overflow-hidden h-full">
              <div className="p-6 md:p-8 h-full">
                <div className="flex flex-col gap-6 lg:gap-10 h-full">
                  <div className="relative">
                    <div className="aspect-video rounded-2xl overflow-hidden border-4 border-primary/50 shadow-2xl">
                      <div className="relative h-full w-full bg-black">
                        <Image
                          src="/plan_9mx.png"
                            alt="Plan de compensación 9MX"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={false}
                        />
                      </div>
                    </div>
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-[color:var(--primary)] rounded-full shadow-lg" />
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[rgba(212,175,55,0.65)] rounded-full shadow-lg" />
                  </div>

                  <div className="space-y-4 lg:space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white">Plan de Compensación 9MX</h3>
                      <p className="text-lg text-white font-semibold mt-2">
                        Cómo participas y qué puedes ganar
                      </p>
                    </div>

                    <p className="text-white">
                      Un resumen claro de los niveles, bonos y requisitos para que compartas la oportunidad con tu equipo.
                      Incluye ejemplos de pagos y la estructura de progreso para cada rango.
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Button 
                        size="lg" 
                        onClick={() => openVideo(COMP_PLAN_EMBED, COMP_PLAN_WATCH, "Plan de compensación 9MX")} 
                        className="bg-[color:var(--primary)] text-white hover:brightness-90 text-lg px-8 py-6 shadow-lg"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Ver plan
                      </Button>
                      <Button 
                        size="lg" 
                        asChild 
                        variant="outline" 
                        className="border-[color:var(--primary)] text-white hover:bg-[rgb(214,209,209)] text-lg px-8 py-6"
                      >
                        <a
                          href="/pdf/Plan de Compensacion 9MX - Completa.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="w-5 h-5 mr-2" />
                          Descargar PDF
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
    {/* Video Modal */}
    <Dialog open={!!video} onOpenChange={(o) => { if (!o) setVideo(null) }}>
      <DialogContent className="max-w-3xl w-[92vw]">
        <DialogHeader>
          <DialogTitle>{video?.title || "Video"}</DialogTitle>
        </DialogHeader>
        <AspectRatio ratio={16 / 9}>
          {video && (
            <iframe
              src={video.embed}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-md border-0"
            />
          )}
        </AspectRatio>
        {video && (
          <div className="flex justify-end pt-2">
            <a
              href={video.watch}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Ver en YouTube
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
    </>
  )
}