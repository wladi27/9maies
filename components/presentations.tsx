import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Play } from "lucide-react"

export function Presentations() {
  return (
    <section id="presentations" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-purple-500">Presentaciones</span> y Recursos
            </h2>
            <p className="text-xl text-purple-300 max-w-3xl mx-auto">
              Accede a nuestras presentaciones oficiales y materiales educativos sobre 9M AI
            </p>
          </div>

          {/* Hero Presentation */}
          <Card className="bg-gradient-to-br from-purple-900/30 via-black to-purple-950/50 border-purple-700/50 overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
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
                <div className="space-y-6">
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
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-purple-900/70 to-purple-800/50 p-3 rounded-lg border border-purple-700/30">
                      <div className="text-sm font-semibold text-purple-300">IA Predictiva</div>
                      <div className="text-xs text-purple-400">Análisis de mercados</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900/70 to-purple-800/50 p-3 rounded-lg border border-purple-700/30">
                      <div className="text-sm font-semibold text-purple-300">Gestión Automatizada</div>
                      <div className="text-xs text-purple-400">Portafolios inteligentes</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 px-6 shadow-lg shadow-purple-900/30">
                      <Play className="w-4 h-4 mr-2" />
                      Ver presentación
                    </Button>
                    <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-900/30 px-6">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Presentation Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-b from-purple-950/40 to-black border-purple-800/40 p-6 hover:border-purple-600 transition-colors hover:shadow-lg hover:shadow-purple-900/20">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="text-xl font-bold text-white">Presentación Parte 1</h3>
                <p className="text-sm text-purple-300">
                  Introducción a 9M AI, nuestra misión, visión y el equipo detrás de la tecnología.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-purple-600 text-purple-400 hover:bg-purple-900/30 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </Card>

            <Card className="bg-gradient-to-b from-purple-950/40 to-black border-purple-800/40 p-6 hover:border-purple-600 transition-colors hover:shadow-lg hover:shadow-purple-900/20">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="text-xl font-bold text-white">Presentación Parte 2</h3>
                <p className="text-sm text-purple-300">
                  Sistema de recompensas, fondos de estrategia y detalles del programa VIP.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-purple-600 text-purple-400 hover:bg-purple-900/30 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </Card>

            <Card className="bg-gradient-to-b from-purple-950/40 to-black border-purple-800/40 p-6 hover:border-purple-600 transition-colors hover:shadow-lg hover:shadow-purple-900/20">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="text-xl font-bold text-white">Whitepaper Técnico</h3>
                <p className="text-sm text-purple-300">
                  Documentación técnica completa sobre NovaMind™ y nuestra arquitectura de IA.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-purple-600 text-purple-400 hover:bg-purple-900/30 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}