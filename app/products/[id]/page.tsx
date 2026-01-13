"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import AcademySignupModal from '@/components/academy-signup-modal'
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

      image: "/visa2.png",
    },
    "novamind": {
      _id: "novamind",
      name: "NovaMind™",
      description: "Motor de IA financiera de 9M AI que analiza mercados en tiempo real, genera estrategias y señales automatizadas con transparencia, métricas claras y control total desde la app.",
      price: 0,

      image: "/niva2.png",
    },
    "academia": {
      _id: "academia",
      name: "Academia 9M AI",
      description: "Programa formativo de élite para inversores: cursos, certificaciones y casos prácticos para dominar la inversión con IA. Contenidos on-demand, workshops y material exclusivo para alumnos.",
      price: 0,
      image: "/academy2.png",
    },
    "exchange": {
      _id: "exchange",
      name: "Intercambio",
      description: "Plataforma Exchange de 9M AI para intercambio de cripto‑activos con alta liquidez, seguridad de nivel institucional, tarifas competitivas y órdenes avanzadas integradas con tu cartera.",
      price: 0,

      image: "/exchenge2.png",
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

        <div className="grid grid-cols-1 gap-12">
          <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary rounded-2xl overflow-hidden shadow-lg shadow-primary/20">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 w-full">
                <div className="w-full h-64 md:h-full overflow-hidden bg-black">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={1200}
                    height={800}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                  <p className="text-muted-foreground text-base md:text-lg mb-4">{product.description}</p>

                  <h2 className="text-lg font-semibold text-foreground mt-4 mb-2">Descripción detallada</h2>
                  <p className="text-muted-foreground text-sm mb-3">
                    Información ampliada: esta sección ofrece más contexto sobre el producto, sus funcionalidades y
                    cómo puede integrarse en tus flujos. Incluye características técnicas, beneficios para el usuario
                    y ejemplos de uso práctico.
                  </p>

                  <h3 className="text-sm font-semibold text-foreground mb-2">Características</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm mb-4">
                    <li>Soporte y seguridad de nivel empresarial.</li>
                    <li>Integración con la app 9M AI y control total desde tu panel.</li>
                    <li>Actualizaciones constantes y asistencia dedicada.</li>
                  </ul>

                  <h3 className="text-sm font-semibold text-foreground mb-2">Casos de uso</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                    <li>Usuarios que buscan automatizar decisiones de inversión.</li>
                    <li>Empresas que requieren herramientas de análisis de mercados en tiempo real.</li>
                    <li>Clientes que desean soluciones financieras con alta seguridad.</li>
                  </ul>
                  {product._id === 'academia' && (
                    <div className="mt-6">
                      <AcademySignupModal productId={product._id} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
