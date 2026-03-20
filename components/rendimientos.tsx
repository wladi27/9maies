"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export function Rendimientos() {
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  // Todas las imágenes del componente
  const allImages = [
    { src: '/re/tablero-rendimiento.jpeg', alt: 'Detalle Fondo 1 - Tabla', group: 'Fondo 1' },
    { src: '/re/3.jpg', alt: 'Detalle Fondo 1 - Gráfico', group: 'Fondo 1' },
    { src: '/re/Tabla-de-rendimiento-del-fondo.jpeg', alt: 'Detalle Fondo 2 - Tabla', group: 'Fondo 2' },
    { src: '/re/5.jpg', alt: 'Detalle Fondo 2 - Gráfico', group: 'Fondo 2' }
  ]

  function openImage(src: string, alt: string) {
    const index = allImages.findIndex(img => img.src === src)
    setCurrentIndex(index >= 0 ? index : 0)
    setImage({ src, alt })
  }

  function nextImage() {
    const nextIndex = (currentIndex + 1) % allImages.length
    setCurrentIndex(nextIndex)
    setImage({ 
      src: allImages[nextIndex].src, 
      alt: allImages[nextIndex].alt 
    })
  }

  function prevImage() {
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length
    setCurrentIndex(prevIndex)
    setImage({ 
      src: allImages[prevIndex].src, 
      alt: allImages[prevIndex].alt 
    })
  }

  return (
    <section id="rendimientos" className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white section-title">
              <span className="text-[color:var(--primary)]">Rendimientos potenciales</span> según participación
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[rgba(212,175,55,0.7)] max-w-3xl mx-auto">
              Estimaciones orientativas de rendimiento según nivel de participación y contribución.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* Columna izquierda: un título y dos imágenes apiladas */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Detalles de los ingresos del Fondo 1</h3>
              <p className="text-sm text-[rgba(212,175,55,0.7)] mb-6">Estimación según actividad mínima y referidos directos.</p>
              <Card className="bg-gradient-to-br from-primary/20 via-black to-primary/30 border-primary/40 overflow-hidden p-4">
                <div className="flex flex-col gap-4">
                  <div 
                    onClick={() => openImage('/re/tablero-rendimiento.jpeg', 'Detalle Fondo 1 - Tabla')} 
                    className="aspect-[16/9] rounded-2xl overflow-hidden border-2 border-primary/40 w-full cursor-pointer transition-transform hover:scale-[1.02] duration-300"
                  >
                    <div className="relative h-full w-full bg-black">
                      <Image src="/re/tablero-rendimiento.jpeg" alt="Rendimiento 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                  <div 
                    onClick={() => openImage('/re/3.jpg', 'Detalle Fondo 1 - Gráfico')} 
                    className="aspect-[16/9] rounded-2xl overflow-hidden border-2 border-primary/40 w-full cursor-pointer transition-transform hover:scale-[1.02] duration-300"
                  >
                    <div className="relative h-full w-full bg-black">
                      <Image src="/re/3.jpg" alt="Rendimiento 2" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Columna derecha: un título y dos imágenes apiladas */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Detalles de los ingresos del Fondo 2</h3>
              <p className="text-sm text-[rgba(212,175,55,0.7)] mb-6">Proyecciones para esfuerzos sostenidos y escalamiento internacional.</p>
              <Card className="bg-gradient-to-br from-primary/20 via-black to-primary/30 border-primary/40 overflow-hidden p-4">
                <div className="flex flex-col gap-4">
                  <div 
                    onClick={() => openImage('/re/Tabla-de-rendimiento-del-fondo.jpeg', 'Detalle Fondo 2 - Tabla')} 
                    className="aspect-[16/9] rounded-2xl overflow-hidden border-2 border-primary/40 w-full cursor-pointer transition-transform hover:scale-[1.02] duration-300"
                  >
                    <div className="relative h-full w-full bg-black">
                      <Image src="/re/Tabla-de-rendimiento-del-fondo.jpeg" alt="Rendimiento 3" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                  <div 
                    onClick={() => openImage('/re/5.jpg', 'Detalle Fondo 2 - Gráfico')} 
                    className="aspect-[16/9] rounded-2xl overflow-hidden border-2 border-primary/40 w-full cursor-pointer transition-transform hover:scale-[1.02] duration-300"
                  >
                    <div className="relative h-full w-full bg-black">
                      <Image src="/re/5.jpg" alt="Rendimiento 4" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Modal horizontal - CORREGIDO */}
          <Dialog open={!!image} onOpenChange={(open) => { if (!open) setImage(null) }}>
            <DialogContent className="!max-w-[90vw] !w-[90vw] !h-[85vh] p-0 !rounded-xl overflow-hidden bg-black/95 border-primary/50 !flex !flex-row">
              {/* Botón cerrar */}
              <DialogClose className="absolute right-4 top-4 z-50 p-2 rounded-full bg-black/70 hover:bg-black/90 border border-primary/40 transition-colors">
                <X className="w-5 h-5 text-white" />
              </DialogClose>
              
              {/* Área de imagen - LADO IZQUIERDO */}
              <div className="relative flex-1 bg-black flex items-center justify-center">
                {image && (
                  <div className="relative w-full h-full p-4">
                    <Image 
                      src={image.src} 
                      alt={image.alt} 
                      fill 
                      className="object-contain" 
                      sizes="90vw"
                      priority
                    />
                  </div>
                )}
                
                {/* Botones de navegación */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/60 hover:bg-black/80 border border-primary/40 transition-all backdrop-blur-sm"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/60 hover:bg-black/80 border border-primary/40 transition-all backdrop-blur-sm"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Panel de información - LADO DERECHO */}
              <div className="w-80 bg-gradient-to-b from-primary/5 via-black to-primary/5 border-l border-primary/30 flex flex-col">
                <div className="p-6 border-b border-primary/30">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-white font-bold pr-8">
                      {image?.alt || 'Imagen'}
                    </DialogTitle>
                  </DialogHeader>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wider text-primary/60 mb-2">
                        INFORMACIÓN
                      </p>
                      <p className="text-white text-sm">
                        {image && allImages[currentIndex]?.group}
                      </p>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wider text-primary/60 mb-2">
                        NAVEGACIÓN
                      </p>
                      <p className="text-white text-sm">
                        Imagen {currentIndex + 1} de {allImages.length}
                      </p>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wider text-primary/60 mb-2">
                        DESCRIPCIÓN
                      </p>
                      <p className="text-white text-sm leading-relaxed">
                        {image?.alt === 'Detalle Fondo 1 - Tabla' && 'Tabla detallada de rendimientos para participantes del Fondo 1, mostrando ingresos según actividad mínima y referidos directos.'}
                        {image?.alt === 'Detalle Fondo 1 - Gráfico' && 'Gráfico visual de proyecciones de crecimiento para el Fondo 1, basado en métricas de participación activa.'}
                        {image?.alt === 'Detalle Fondo 2 - Tabla' && 'Tabla de proyecciones para el Fondo 2, enfocada en esfuerzos sostenidos y escalamiento internacional.'}
                        {image?.alt === 'Detalle Fondo 2 - Gráfico' && 'Gráfico de crecimiento exponencial para participantes del Fondo 2 con estrategias de escalamiento.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

export default Rendimientos