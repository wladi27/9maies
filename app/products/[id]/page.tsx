"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { ShoppingBag } from "lucide-react"

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const { id } = useParams()
  const { addToCart } = useCart()

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const res = await fetch(`/api/products/${id}`)
        const data = await res.json()
        setProduct(data)
      }
      fetchProduct()
    }
  }, [id])

  if (!product) {
    return <div>Loading...</div>
  }

  const handleAddToCart = () => {
    const productToAdd = { ...product, id: product._id, quantity: 1 };
    addToCart(productToAdd)
  }

  return (
    <div className="container mx-auto py-24 px-4">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-muted-foreground text-lg mb-6">{product.description}</p>
          <div className="flex items-center justify-between mb-8">
            <span className="text-3xl font-bold text-primary">${product.price}</span>
          </div>
          <Button onClick={handleAddToCart} size="lg">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
