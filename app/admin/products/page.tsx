import Header from '@/components/admin/Header'
import Link from 'next/link'
import ProductsAdminList from '@/components/admin/ProductsAdminList'

export default function ProductsAdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Productos</h2>
            <p className="text-muted-foreground mt-1">Lista de productos (vista client)</p>
          </div>
          <div>
            <Link href="/admin/products/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Nuevo producto</Link>
          </div>
        </div>

        <ProductsAdminList />
      </main>
    </div>
  )
}
