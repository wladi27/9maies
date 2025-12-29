"use client"

import Image from "next/image"
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
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Text content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
                9M AI
              </span>
              <br />
              <span className="text-foreground">La IA que sabe cómo hacer crecer tu dinero</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Empoderar a los usuarios para lograr el crecimiento financiero a través de la inteligencia artificial
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="https://mzy4zmy3.chugewujin.com/TisCdi82IFuS7JN3?5c2f43=218ee5288dff190e7846e90271317d50" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 flex items-center">
                  <Apple className="w-5 h-5 mr-2" />
                  App Store
                </Button>
              </a>

              <a href="https://9m-download.s3.ap-southeast-1.amazonaws.com/Android/apk/9M-Release-1.0.18(26).apk" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Google Play
                </Button>
              </a>
            </div>
          </div>

          {/* Right: App image */}
          <div className="relative h-80 md:h-[500px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="relative w-full h-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden p-6">
                <Image 
                  src="/images/kv-402x.png" 
                  alt="9M AI Mobile App" 
                  fill 
                  className="object-contain p-4" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}