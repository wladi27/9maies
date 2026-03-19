"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'

type Product = {
  _id: string
  name?: string
  description?: string
  price?: number | null
  sku?: string | null
  featuredImage?: string | null
}

export default function ProductsAdminList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      const items = Array.isArray(data) ? data : (data.items || data)
      const normalized = items.map((it: any) => ({
        _id: String(it._id || it._id?.toString?.()),
        name: it.name || it.title || '',
        description: it.description || '',
        price: typeof it.price === 'number' ? it.price : (it.price ? Number(it.price) : null),
        sku: it.sku || it.sku || '',
        featuredImage: it.featuredImage || it.image || null,
      }))
      setProducts(normalized)
    } catch (err) {
      console.error('Failed to load products', err)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('delete failed')
      setProducts((p) => p.filter((x) => x._id !== id))
    } catch (err) {
      console.error(err)
      alert('Error al eliminar el producto')
    }
  }

  return (
    <div>
      {loading ? (
        <div className="text-muted-foreground">Cargando productos...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p._id} className="bg-card border border-border rounded overflow-hidden">
              <div className="relative bg-muted">
                <AspectRatio ratio={1 / 1}>
                  {p.featuredImage ? (
                    <div className="relative w-full h-full">
                      <Image src={p.featuredImage} alt={p.name || 'Producto'} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground bg-muted/50">
                      <span className="text-sm">Sin imagen</span>
                    </div>
                  )}
                </AspectRatio>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{p.name || 'Sin nombre'}</h3>
                <p className="text-sm text-muted-foreground mb-2">{p.description || ''}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">{p.sku || ''}</div>
                  <div className="font-semibold">{typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : ''}</div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link href={`/admin/products/${p._id}`} className="px-3 py-2 border rounded text-sm">Editar</Link>
                  <button onClick={() => handleDelete(p._id)} className="px-3 py-2 bg-destructive/10 text-destructive rounded text-sm">Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
