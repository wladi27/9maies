"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/context/CartContext"

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    const productToAdd = { ...product, id: product._id, quantity: 1 };
    addToCart(productToAdd)
  }

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Tienda <span className="text-primary">9M AI</span>
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
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Agregar al carrito
                    </Button>
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
