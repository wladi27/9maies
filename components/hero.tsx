"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Apple, Download } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Fondo de degradado oscuro con líneas gráficas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Degradado oscuro principal */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
        
        {/* Líneas gráficas decorativas */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {/* Líneas diagonales */}
          <div className="absolute top-1/4 -left-10 w-96 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform rotate-45"></div>
          <div className="absolute bottom-1/3 -right-20 w-80 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform -rotate-30"></div>
          
          {/* Líneas de cuadrícula sutiles */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(120, 119, 198, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(120, 119, 198, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
          
          {/* Elementos geométricos */}
          <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-primary/20 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/4 w-40 h-40 border border-purple-500/20 transform rotate-45"></div>
          
          {/* Puntos decorativos */}
          <div className="absolute top-20 right-40 w-3 h-3 bg-primary rounded-full"></div>
          <div className="absolute bottom-40 left-32 w-2 h-2 bg-purple-400 rounded-full"></div>
          <div className="absolute top-60 right-80 w-4 h-4 bg-primary/30 rounded-full"></div>
        </div>
        
        {/* Efecto de brillo sutil */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Text content */}
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
                9mx
              </span>
              <br />
              <span className="text-foreground">La IA que sabe cómo hacer crecer tu dinero</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl">
              Empoderar a los usuarios para lograr el crecimiento financiero a través de la inteligencia artificial
            </p>

            
          </div>

          {/* Right: Carousel (replaces the static app image) - now 16/9 horizontal */}
          <div className="relative w-full flex items-center justify-center">
            <div className="relative w-full max-w-3xl lg:max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="relative w-full bg-gray-900/50 backdrop-blur-sm border-4 border-primary rounded-3xl overflow-hidden shadow-lg">
                {/* 16:9 container */}
                <div className="w-full" style={{ aspectRatio: '16/9' }}>
                  <div className="relative w-full h-full">
                    <CarouselInner />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CarouselInner() {
  const eventImages = [
    's1.jpeg','s2.png','s3.png','s4.png','s5.png','s6.png','s7.png','s8.png','s9.png','s10.png', 's11.png','s12.png','s13.png','s14.png','s15.png','s16.png','s17.png','s18.png','s19.png','s20.png', 's21.png','s22.png','s23.png','s24.png','s25.png','s26.png','s27.png','s28.png'
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(s => (s + 1) % eventImages.length), 4500)
    return () => clearInterval(t)
  }, [])

  const prev = () => setCurrentSlide(s => (s - 1 + eventImages.length) % eventImages.length)
  const next = () => setCurrentSlide(s => (s + 1) % eventImages.length)

  return (
    <div className="relative w-full h-full">
      <img
        src={`/${eventImages[currentSlide]}`}
        alt={`Slide ${currentSlide + 1}`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-20 hover:bg-black/60"
      >
        ‹
      </button>

      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-20 hover:bg-black/60"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {eventImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-primary' : 'bg-white/50'}`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}