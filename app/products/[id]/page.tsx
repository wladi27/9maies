"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const params = useParams() as { id?: string }
  const id = params?.id
  const defaultProducts: Record<string, Product> = {
    "tarjeta-visa": {
      _id: "tarjeta-visa",
      name: "Tarjeta Visa",
      description: "Tarjeta Visa co‑brandeada con 9M AI para pagos globales seguros, recompensas exclusivas y control total desde la app; soporte 24/7 y protección avanzada contra fraudes.",
      price: 0,

      image: "/images/visa.png",
    },
    "novamind": {
      _id: "novamind",
      name: "NovaMind™",
      description: "Motor de IA financiera de 9M AI que analiza mercados en tiempo real, genera estrategias y señales automatizadas con transparencia, métricas claras y control total desde la app.",
      price: 0,

      image: "/images/novamind.png",
    },
    "exchange": {
      _id: "exchange",
      name: "Intercambio",
      description: "Plataforma Exchange de 9M AI para intercambio de cripto‑activos con alta liquidez, seguridad de nivel institucional, tarifas competitivas y órdenes avanzadas integradas con tu cartera.",
      price: 0,

      image: "/images/intercambio.png",
    },
  }

  useEffect(() => {
    let cancelled = false
    async function fetchProduct() {
      if (!id) return
      try {
        const res = await fetch(`/api/products/${id}`)
        if (res.ok) {
          const data = await res.json()
          if (!cancelled) setProduct(data as Product)
          return
        }
      } catch (_err) {
        // ignore and fallback below
      }
      // fallback to defaultProducts if available
      const key = String(id)
      if (!cancelled) setProduct(defaultProducts[key] ?? null)
    }
    fetchProduct()
    return () => { cancelled = true }
  }, [id])

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-24 px-4">
          <p className="text-muted-foreground">Producto no encontrado.</p>
          <div className="mt-6">
            <Link href="/#products">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a productos
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // add-to-cart removed per request

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-24 px-4">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/#products">Productos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-3 mb-6">
          <Link href="/#products">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a productos
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
        <div>
            <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary rounded-2xl overflow-hidden p-4 flex items-center justify-center shadow-lg shadow-primary/20">
  <div className="relative w-[300px] h-[300px]">
    <Image
      src={product.image || "/placeholder.svg"}
      alt={product.name}
      fill
      className="object-cover" // Cambiado de object-contain a object-cover
      
      priority
    />
  </div>
</div>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-muted-foreground text-lg mb-6">{product.description}</p>
          {/* Precio ocultado por solicitud */}
             {/* Add to Cart removed */}
        </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
