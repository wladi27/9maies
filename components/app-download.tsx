import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function AppDownload() {
  return (
    <section id="download" className="">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/30 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12 space-y-6">
                
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">9M AI Corporation</h2>
                <p className="text-lg text-muted-foreground">
                  Somos una empresa fintech pionera que redefine la gestión patrimonial mediante inteligencia artificial de próxima generación.
                </p>
                
                <p className="text-lg text-muted-foreground">Soluciones Clave:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <span className="text-foreground font-semibold">Fondo 9M AI:</span> Vehículo de inversión cuantitativa que asigna activos
                    de manera adaptativa en múltiples clases.
                  </li>
                  <li>
                    <span className="text-foreground font-semibold">Plataforma Institucional:</span> Motores de estrategia y control de riesgo
                    para clientes profesionales.
                  </li>
                  <li>
                    <span className="text-foreground font-semibold">Academia 9M AI:</span> Programa formativo de élite para inversores.
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="/pdf/9M AI - La AI que sabe cómo hacer crecer tu dinero - Español.pdf"
                    download
                  >
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
                      <Download className="w-5 h-5 mr-2" />
                      Descargar PDF
                    </Button>
                  </a>
                </div>
              </div>
              
              {/* CONTENEDOR DE IMAGEN CON PADDING */}
              <div className="p-4 md:p-6 lg:p-8"> {/* Padding en el contenedor */}
                <div className="relative h-96 md:h-full min-h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <Image 
                    src="/oficina.jpg" 
                    alt="9M AI Corporation" 
                    fill 
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}