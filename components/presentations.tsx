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

  const PRESENTATION_EMBED = "https://www.youtube.com/embed/oyYnTz_k3Zo"
  const PRESENTATION_WATCH = "https://www.youtube.com/watch?v=oyYnTz_k3Zo"
  const COMP_PLAN_EMBED = "https://www.youtube.com/embed/p2mxYs_7auc"
  const COMP_PLAN_WATCH = "https://www.youtube.com/watch?v=p2mxYs_7auc"

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
              <span className="text-purple-500">Presentaciones</span> y Recursos
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-purple-300 max-w-3xl mx-auto">
              Accede a nuestras presentaciones oficiales y materiales educativos sobre 9M AI
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Hero Presentation */}
            <Card className="bg-gradient-to-br from-purple-900/30 via-black to-purple-950/50 border-purple-700/50 overflow-hidden h-full">
              <div className="p-6 md:p-8 h-full">
                <div className="flex flex-col gap-6 lg:gap-10 h-full">
                  {/* Contenedor de imagen con diseño mejorado */}
                  <div className="relative">
                    <div className="aspect-video rounded-2xl overflow-hidden border-4 border-purple-800 shadow-2xl shadow-purple-900/50">
                      <div className="relative h-full w-full bg-black">
                        <Image
                          src="/images/whatsapp-20image-202025-12-07-20at-2012.jpeg"
                          alt="9M AI Presentacion"
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      </div>
                    </div>
                    {/* Elementos decorativos */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-purple-600 rounded-full shadow-lg shadow-purple-700"></div>
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-purple-400 rounded-full shadow-lg shadow-purple-500"></div>
                  </div>

                  {/* Contenido */}
                  <div className="space-y-4 lg:space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white">9M AI Presentación Oficial</h3>
                      <p className="text-lg text-purple-400 font-semibold mt-2">
                        Cómo navegar el futuro de las finanzas
                      </p>
                    </div>

                    <p className="text-purple-300">
                      Descubre cómo NovaMind™ está revolucionando la gestión de activos digitales con nuestra
                      tecnología de inteligencia artificial de última generación.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-purple-900/70 to-purple-800/50 p-3 rounded-lg border border-purple-700/30">
                        <div className="text-sm font-semibold text-purple-300">IA Predictiva</div>
                        <div className="text-xs text-purple-400">Análisis de mercados</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-900/70 to-purple-800/50 p-3 rounded-lg border border-purple-700/30">
                        <div className="text-sm font-semibold text-purple-300">Gestión Automatizada</div>
                        <div className="text-xs text-purple-400">Portafolios inteligentes</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => openVideo(PRESENTATION_EMBED, PRESENTATION_WATCH, "Presentación 9M AI")} className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 px-6 shadow-lg shadow-purple-900/30">
                        <Play className="w-4 h-4 mr-2" />
                        Ver presentación
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-purple-600 text-purple-400 hover:bg-purple-900/30 px-6"
                      >
                        <a
                          href="/pdf/9M AI - La AI que sabe cómo hacer crecer tu dinero - Español.pdf"
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Descargar PDF
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Plan de compensación */}
            <Card className="bg-gradient-to-br from-fuchsia-900/30 via-black to-fuchsia-950/50 border-fuchsia-700/50 overflow-hidden h-full">
              <div className="p-6 md:p-8 h-full">
                <div className="flex flex-col gap-6 lg:gap-10 h-full">
                  <div className="relative">
                    <div className="aspect-video rounded-2xl overflow-hidden border-4 border-fuchsia-800 shadow-2xl shadow-fuchsia-900/50">
                      <div className="relative h-full w-full bg-black">
                        <Image
                          src="/plan-1.png"
                          alt="Plan de compensación 9M AI"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={false}
                        />
                      </div>
                    </div>
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-fuchsia-600 rounded-full shadow-lg shadow-fuchsia-700"></div>
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-fuchsia-400 rounded-full shadow-lg shadow-fuchsia-500"></div>
                  </div>

                  <div className="space-y-4 lg:space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white">Plan de Compensación 9M AI</h3>
                      <p className="text-lg text-fuchsia-200 font-semibold mt-2">
                        Cómo participas y qué puedes ganar
                      </p>
                    </div>

                    <p className="text-fuchsia-100">
                      Un resumen claro de los niveles, bonos y requisitos para que compartas la oportunidad con tu equipo.
                      Incluye ejemplos de pagos y la estructura de progreso para cada rango.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-fuchsia-900/70 to-fuchsia-800/50 p-3 rounded-lg border border-fuchsia-700/30">
                        <div className="text-sm font-semibold text-fuchsia-100">Bonos directos</div>
                        <div className="text-xs text-fuchsia-200">Comisiones por referidos</div>
                      </div>
                      <div className="bg-gradient-to-br from-fuchsia-900/70 to-fuchsia-800/50 p-3 rounded-lg border border-fuchsia-700/30">
                        <div className="text-sm font-semibold text-fuchsia-100">Rangos y tiers</div>
                        <div className="text-xs text-fuchsia-200">Metas claras y acumulables</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => openVideo(COMP_PLAN_EMBED, COMP_PLAN_WATCH, "Plan de compensación 9M AI")} className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white hover:from-fuchsia-700 hover:to-fuchsia-800 px-6 shadow-lg shadow-fuchsia-900/30">
                        <Play className="w-4 h-4 mr-2" />
                        Ver plan
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-fuchsia-600 text-fuchsia-200 hover:bg-fuchsia-900/30 px-6"
                      >
                        <a
                          href="https://drive.google.com/file/d/1TjmnDbbo_6WdfSF1bGvqTWTXHVqHZU6W/view"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="w-4 h-4 mr-2" />
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