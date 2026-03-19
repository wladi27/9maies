import React from 'react'
import Header from '@/components/admin/Header'
import StatsCard from '@/components/admin/StatsCard'
import LineChart from '@/components/admin/LineChart'
import BarChart from '@/components/admin/BarChart'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import clientPromise from '@/lib/mongodb'

type RecentItem = { _id: any; title?: string; name?: string; createdAt?: string }

async function getData() {
  const client = await clientPromise
  // products are stored in the '9m-ai-store' database, other collections use the default DB
  const dbDefault = client.db()
  const dbStore = client.db('9m-ai-store')
  const events = dbDefault.collection('events')
  const users = dbDefault.collection('users')
  const products = dbStore.collection('products')

  const [eventsCount, productsCount, usersCount] = await Promise.all([
    events.countDocuments(),
    products.countDocuments(),
    users.countDocuments(),
  ])

  const inventoryAgg = await products.aggregate([
    { $match: { price: { $exists: true, $ne: null } } },
    { $group: { _id: null, total: { $sum: '$price' } } }
  ]).toArray()
  const inventoryValue = (inventoryAgg[0] && inventoryAgg[0].total) ? inventoryAgg[0].total : 0

  const recentEventsRaw: any[] = await events.find({}).sort({ createdAt: -1 }).limit(50).toArray()
  const recentProductsRaw: any[] = await products.find({}).sort({ createdAt: -1 }).limit(50).toArray()
  const recentUsersRaw: any[] = await users.find({}).sort({ createdAt: -1 }).limit(50).toArray()

  // normalize documents to plain JS objects with safe fields
  const normalizeDate = (doc: any) => {
    if (!doc) return null
    if (doc.createdAt) {
      try {
        return typeof doc.createdAt === 'string' ? doc.createdAt : doc.createdAt.toISOString()
      } catch (e) {
        try { return new Date(doc.createdAt).toISOString() } catch (e) { /* fallthrough */ }
      }
    }
    if (doc._id && typeof doc._id.getTimestamp === 'function') {
      try { return doc._id.getTimestamp().toISOString() } catch (e) { /* fallthrough */ }
    }
    return null
  }

  const recentEvents: any[] = recentEventsRaw.map((d) => ({
    _id: String(d._id),
    title: d.title || d.name || '',
    date: d.date || null,
    location: d.location || null,
    createdAt: normalizeDate(d)
  }))

  const recentProducts: any[] = recentProductsRaw.map((d) => ({
    _id: String(d._id),
    name: d.name || d.title || '',
    price: typeof d.price === 'number' ? d.price : (d.price ? Number(d.price) : null),
    stock: d.stock ?? d.quantity ?? null,
    featuredImage: d.featuredImage || d.image || null,
    createdAt: normalizeDate(d)
  }))

  const recentUsers: any[] = recentUsersRaw.map((d) => ({
    _id: String(d._id),
    name: d.name || d.fullName || d.username || '',
    email: d.email || '',
    role: d.role || d.type || '',
    createdAt: normalizeDate(d)
  }))

  // build simple last-11-days counts for events and products
  const days = 11
  const now = new Date()
  const start = new Date(now)
  start.setDate(start.getDate() - (days - 1))

  const evs = await events.find({ createdAt: { $gte: start } }).toArray()
  const prods = await products.find({ createdAt: { $gte: start } }).toArray()

  const eventsPerDay: number[] = []
  const productsPerDay: number[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const dayStart = new Date(d)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(d)
    dayEnd.setHours(23, 59, 59, 999)

    const evCount = evs.filter((e) => e.createdAt && new Date(e.createdAt) >= dayStart && new Date(e.createdAt) <= dayEnd).length
    const pdCount = prods.filter((p) => p.createdAt && new Date(p.createdAt) >= dayStart && new Date(p.createdAt) <= dayEnd).length
    eventsPerDay.push(evCount)
    productsPerDay.push(pdCount)
  }

  return { eventsCount, productsCount, usersCount, inventoryValue, recentEvents, recentProducts, recentUsers, eventsPerDay, productsPerDay }
}

export default async function DashboardPage() {
  const { eventsCount, productsCount, usersCount, inventoryValue, recentEvents, recentProducts, recentUsers, eventsPerDay, productsPerDay } = await getData()

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-6 max-w-7xl mx-auto space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard title="Usuarios totales" value={usersCount} />
          <StatsCard title="Productos" value={productsCount} />
          <StatsCard title="Eventos" value={eventsCount} />
          <StatsCard title="Valor inventario" value={`$${Number(inventoryValue).toFixed(2)}`} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Eventos (últimos 11 días)</h3>
            <LineChart data={eventsPerDay} />
          </div>
          <div className="bg-card p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Productos añadidos (últimos 11 días)</h3>
            <BarChart data={productsPerDay} color="#7c3aed" />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Eventos recientes</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              {recentEvents.map((ev) => (
                <li key={String(ev._id)}>{ev.title || 'Sin título'} <span className="text-xs text-muted-foreground">— {ev.createdAt ? new Date(ev.createdAt).toLocaleString() : '—'}</span></li>
              ))}
            </ul>
          </div>

          <div className="bg-card p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Productos recientes</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              {recentProducts.map((p) => (
                <li key={String(p._id)}>{p.name || p.title || 'Sin nombre'} <span className="text-xs text-muted-foreground">— {p.createdAt ? new Date(p.createdAt).toLocaleString() : '—'}</span></li>
              ))}
            </ul>
          </div>
        </section>

        {/* Full lists */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-card p-4 rounded shadow overflow-hidden">
            <h3 className="font-semibold mb-2">Usuarios (recientes)</h3>
            <Table>
              <TableHeader>
                <tr>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Creado</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {recentUsers.map((u) => (
                  <TableRow key={String(u._id)}>
                    <TableCell>{u.name || u.fullName || '—'}</TableCell>
                    <TableCell>{u.email || '—'}</TableCell>
                    <TableCell>{u.role || u.type || '—'}</TableCell>
                    <TableCell>{u.createdAt ? new Date(u.createdAt).toLocaleString() : '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-card p-4 rounded shadow overflow-hidden">
            <h3 className="font-semibold mb-2">Productos (recientes)</h3>
            <Table>
              <TableHeader>
                <tr>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Creado</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {recentProducts.map((p) => (
                  <TableRow key={String(p._id)}>
                    <TableCell>{p.name || p.title || '—'}</TableCell>
                    <TableCell>{typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : (p.price ? `$${Number(p.price).toFixed(2)}` : '—')}</TableCell>
                    <TableCell>{p.stock ?? p.quantity ?? '—'}</TableCell>
                    <TableCell>{p.createdAt ? new Date(p.createdAt).toLocaleString() : '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-card p-4 rounded shadow overflow-hidden">
            <h3 className="font-semibold mb-2">Eventos (recientes)</h3>
            <Table>
              <TableHeader>
                <tr>
                  <TableHead>Título</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Creado</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {recentEvents.map((e) => (
                  <TableRow key={String(e._id)}>
                    <TableCell>{e.title || '—'}</TableCell>
                    <TableCell>{e.date ? new Date(e.date).toLocaleString() : '—'}</TableCell>
                    <TableCell>{e.location || '—'}</TableCell>
                    <TableCell>{e.createdAt ? new Date(e.createdAt).toLocaleString() : '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </div>
  )
}
