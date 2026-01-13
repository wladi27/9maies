"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import EventGallery from "@/components/event-gallery"

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export function Products() {
  const eventImages = [
    '/images/event1.jpg',
    '/images/event2.jpg',
    '/images/event3.jpg'
  ]

  const videos = [
    { id: 'v1', title: 'Evento: Lanzamiento 9M', thumbnail: '/images/event1-thumb.jpg', url: 'https://www.youtube.com/embed/DkFQcLzVvMs' },
    { id: 'v2', title: 'Panel: Estrategias IA', thumbnail: '/images/event2-thumb.jpg', url: 'https://www.youtube.com/embed/DkFQcLzVvMs' },
    { id: 'v3', title: 'Webinar: Fondo 9M', thumbnail: '/images/event3-thumb.jpg', url: 'https://www.youtube.com/embed/DkFQcLzVvMs' }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % eventImages.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const prevSlide = () => setCurrentSlide((s) => (s - 1 + eventImages.length) % eventImages.length)
  const nextSlide = () => setCurrentSlide((s) => (s + 1) % eventImages.length)

  const defaultProducts: Product[] = [
    {
      _id: 'academia',
      name: 'Academia 9M AI',
      description: 'Programa formativo de élite para inversores: cursos, certificaciones y casos prácticos para dominar la inversión con IA.',
      price: 0.0,
      image: '/academy.png'
    },
    {
      _id: 'novamind',
      name: 'NovaMind™',
      description: 'Motor de IA financiera de 9M AI que analiza mercados en tiempo real, genera estrategias y señales automatizadas con transparencia, métricas claras y control total desde la app.',
      price: 49.99,
      image: '/images/novamind.png'
    },
    {
      _id: 'tarjeta-visa',
      name: 'Tarjeta Visa',
      description: 'Tarjeta Visa co‑brandeada con 9M AI para pagos globales seguros, recompensas exclusivas y control total desde la app; soporte 24/7 y protección avanzada contra fraudes.',
      price: 9.99,
      image: '/images/visa.png'
    },
    {
      _id: 'exchange',
      name: 'Intercambio',
      description: 'Plataforma Exchange de 9M AI para intercambio de cripto‑activos con alta liquidez, seguridad de nivel institucional, tarifas competitivas y órdenes avanzadas integradas con tu cartera.',
      price: 0.0,
      image: '/images/intercambio.png'
    },
  ]

  const [products, setProducts] = useState<Product[]>(defaultProducts)

  // add-to-cart removed per request

  return (
    <section id="products" className="py-24 bg-background">
      <EventGallery />

      <div className="container pt-25 mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground section-title">
              Productos <span className="text-primary">9M AI</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">Productos exclusivos de la marca 9M AI</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <Card
                key={product._id}
                className="bg-card border border-primary overflow-hidden shadow-lg shadow-primary/20 transition-all flex flex-col p-0"
              >
                <Link href={`/products/${product._id}`} className="block">
                  <div className="w-full overflow-hidden bg-black" style={{ aspectRatio: '1/1' }}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover block"
                    />
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex-1">
                    <Link href={`/products/${product._id}`}>
                      <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                    </Link>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-end pt-4 border-t border-border">
                    <Link href={`/products/${product._id}`}>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Ver detalle
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
