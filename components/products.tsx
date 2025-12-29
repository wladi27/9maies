"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export function Products() {
  const defaultProducts: Product[] = [
    {
      _id: 'tarjeta-visa',
      name: 'Tarjeta Visa',
      description: 'Tarjeta Visa co‑brandeada con 9M AI para pagos globales seguros, recompensas exclusivas y control total desde la app; soporte 24/7 y protección avanzada contra fraudes.',
      price: 9.99,
      image: '/visa.png'
    },
    {
      _id: 'novamind',
      name: 'NovaMind™',
      description: 'Motor de IA financiera de 9M AI que analiza mercados en tiempo real, genera estrategias y señales automatizadas con transparencia, métricas claras y control total desde la app.',
      price: 49.99,
      image: '/nova.png'
    },
    {
      _id: 'exchange',
      name: 'Exchange',
      description: 'Plataforma Exchange de 9M AI para intercambio de cripto‑activos con alta liquidez, seguridad de nivel institucional, tarifas competitivas y órdenes avanzadas integradas con tu cartera.',
      price: 0.0,
      image: '/exchange.png'
    },
  ]

  const [products, setProducts] = useState<Product[]>(defaultProducts)

  // add-to-cart removed per request

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Productos <span className="text-primary">9M AI</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Productos exclusivos de la marca 9M AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product._id}
                className="bg-card border-border overflow-hidden hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                <Link href={`/products/${product._id}`}>
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center p-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </Link>
                <div className="p-6 space-y-4">
                  <div>
                    <Link href={`/products/${product._id}`}>
                      <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                    </Link>
                    <p className="text-muted-foreground text-sm">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-end pt-4 border-t border-border">
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
