import clientPromise from '@/lib/mongodb'
import Header from '@/components/admin/Header'
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

async function getProducts(): Promise<Product[]> {
  const client = await clientPromise
  const db = client.db('9m-ai-store')
  const col = db.collection('products')
  const items = await col.find({}).toArray()
  return items.map((it: any) => ({
    _id: String(it._id),
    name: it.name,
    description: it.description,
    price: it.price,
    sku: it.sku,
    featuredImage: it.featuredImage,
  }))
}

export default async function ProductsAdminPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Productos</h2>
            <p className="text-muted-foreground mt-1">Lista de productos (vista server)</p>
          </div>
          <div>
            <Link href="/admin/products/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Nuevo producto</Link>
          </div>
        </div>

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
                  <form action={`/api/products/${p._id}`} method="post">
                    <input type="hidden" name="_method" value="DELETE" />
                    <button type="submit" className="px-3 py-2 bg-destructive/10 text-destructive rounded text-sm">Eliminar</button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
