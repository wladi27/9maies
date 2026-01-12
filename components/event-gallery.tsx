"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export function EventGallery() {
  const eventImages = [
    's1.jpeg',
    's2.png',
    's3.png',
    's4.png',
    's5.png',
    's6.png',
    's7.png',
    's8.png',
    's9.png',
    's10.png',
    's11.png',
    's12.png',
    's13.png',
    's14.png',
    's15.png',
    's16.png',
    's17.png',
    's18.png',
    's19.png',
    's20.png',
    's21.png',
    's22.png',
    's23.png',
    's24.png',
    's25.png',
    's26.png',
    's27.png',
    's28.png',
  ]

  const videos = [
    { id: 'v1', title: 'Evento: Lanzamiento 9M', url: 'https://www.youtube.com/embed/DkFQcLzVvMs' },
    { id: 'v2', title: 'Panel: Estrategias IA', url: 'https://www.youtube.com/embed/DkFQcLzVvMs' },
    { id: 'v3', title: 'Webinar: Fondo 9M', url: 'https://www.youtube.com/embed/DkFQcLzVvMs' }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(s => (s + 1) % eventImages.length), 5000)
    return () => clearInterval(t)
  }, [])

  const prev = () => setCurrentSlide(s => (s - 1 + eventImages.length) % eventImages.length)
  const next = () => setCurrentSlide(s => (s + 1) % eventImages.length)

  return (
    <section aria-label="Galería de eventos" className="relative -mt-16 md:-mt-24 pb-12 bg-gradient-to-br from-gray-900/75 via-purple-900/5 to-black/60">
      {/* Fondo gráfico decorativo (encima del degradado de la sección) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `linear-gradient(to right, rgba(120,119,198,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,119,198,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px'}}></div>
        <div className="absolute top-8 -left-10 w-96 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform rotate-12 opacity-60"></div>
        <div className="absolute bottom-12 -right-20 w-80 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform -rotate-20 opacity-60"></div>
        <div className="absolute top-12 right-12 w-56 h-56 border border-primary/20 rounded-full blur-sm opacity-40"></div>
        <div className="absolute bottom-12 left-12 w-36 h-36 border border-purple-500/20 transform rotate-45 opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold text-foreground pt-20">Eventos</h3>
            <p className="text-sm text-muted-foreground">Galería y videos recientes</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-primary">
            <div className="w-full" style={{ aspectRatio: '16/9' }}>
              <img src={eventImages[currentSlide]} alt={`Evento ${currentSlide + 1}`} className="w-full h-full object-cover block" />
            </div>

            <button onClick={prev} aria-label="Anterior" className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full">
              ‹
            </button>
            <button onClick={next} aria-label="Siguiente" className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full">
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {eventImages.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-primary' : 'bg-white/50'}`}></button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6 pb-30 pt-10">
            {videos.map(v => (
              <Card key={v.id} className="p-0 border-2 border-primary overflow-hidden bg-black">
                <div className="w-full h-full" style={{ aspectRatio: '16/9', minHeight: 0 }}>
                  <iframe
                    src={v.url}
                    title={v.title}
                    className="w-full h-full block"
                    style={{ border: 0, display: 'block' }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventGallery
