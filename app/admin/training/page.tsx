"use client"

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import Image from 'next/image'

type TrainingItem = {
  _id: string
  slug?: string
  title?: string
  subtitle?: string
  featuredImage?: string
  info?: string
  schedules?: any[]
  modules?: any[]
}

export default function AdminTrainingPage() {
  const [items, setItems] = useState<TrainingItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<any>({})
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/training')
      const data = await res.json()
      setItems(data)
    } catch (err) {
      console.error(err)
      setItems([])
    } finally { setLoading(false) }
  }

  function openCreate() {
    setEditingId(null)
    setForm({ slug: 'entrenamiento', title: '', subtitle: '', featuredImage: '', info: '', schedules: [], modules: [] })
    setOpen(true)
  }

  function edit(item: TrainingItem) {
    setEditingId(item._id)
    setForm({ ...item })
    setOpen(true)
  }

  async function save() {
    setMessage(null)
    try {
      const payload = { ...form }
      let res
      if (editingId) {
        res = await fetch(`/api/training/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      } else {
        res = await fetch('/api/training', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err?.error || 'Error saving')
      }
      setOpen(false)
      setForm({})
      setEditingId(null)
      await load()
      setMessage('Guardado correctamente')
    } catch (err: any) {
      setMessage(err.message || 'Error')
    }
  }

  async function remove(id: string) {
    if (!confirm('Eliminar item de entrenamiento?')) return
    try {
      const res = await fetch(`/api/training/${id}`, { method: 'DELETE' })
      if (!res.ok && res.status !== 204) throw new Error('Error eliminando')
      await load()
      setMessage('Eliminado')
    } catch (err) { setMessage('Error eliminando') }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Admin - Training</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={load}>Refresh</Button>
          <Button onClick={openCreate}>Crear</Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] table-auto">
            <thead>
              <tr className="text-sm text-muted-foreground">
                <th className="text-left p-3">Slug</th>
                <th className="text-left p-3">Título</th>
                <th className="text-left p-3">Imagen</th>
                <th className="text-right p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((it) => (
                <tr key={it._id} className="border-t">
                  <td className="p-3 align-top">{it.slug || '—'}</td>
                  <td className="p-3 align-top">
                    <div className="font-medium">{it.title}</div>
                    <div className="text-sm text-muted-foreground">{it.subtitle}</div>
                  </td>
                  <td className="p-3 align-top">
                    {it.featuredImage ? (
                      <div className="w-28 h-16 relative rounded-md overflow-hidden border">
                        <Image src={it.featuredImage} alt={it.title || 'img'} fill className="object-cover" />
                      </div>
                    ) : '—'}
                  </td>
                  <td className="p-3 text-right align-top">
                    <div className="inline-flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => edit(it)}>Editar</Button>
                      <Button variant="destructive" size="sm" onClick={() => remove(it._id)}>Eliminar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Training' : 'Crear Training'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 max-w-3xl">
            <input className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="slug (entrenamiento)" value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <input className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Título" value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Subtítulo" value={form.subtitle || ''} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            <input className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Imagen (URL)" value={form.featuredImage || ''} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} />
            <textarea className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Info (HTML)" value={form.info || ''} onChange={(e) => setForm({ ...form, info: e.target.value })} />

            <div>
              <label className="text-sm font-medium">Horarios</label>
              <div className="space-y-3 mt-2">
                {(form.schedules || []).map((s: any, idx: number) => (
                  <div key={idx} className="border p-3 rounded min-w-0">
                    <div className="flex flex-wrap gap-2 items-center">
                      <input className="flex-1 min-w-0 px-2 py-1" placeholder="Título" value={s.title || ''} onChange={(e) => {
                        const arr = [...(form.schedules || [])]
                        arr[idx] = { ...arr[idx], title: e.target.value }
                        setForm({ ...form, schedules: arr })
                      }} />
                      <input className="flex-none w-28 sm:w-40 px-2 py-1" placeholder="Día" value={s.day || ''} onChange={(e) => {
                        const arr = [...(form.schedules || [])]
                        arr[idx] = { ...arr[idx], day: e.target.value }
                        setForm({ ...form, schedules: arr })
                      }} />
                      <input className="flex-none w-20 sm:w-36 px-2 py-1" type="time" value={s.time || ''} onChange={(e) => {
                        const arr = [...(form.schedules || [])]
                        arr[idx] = { ...arr[idx], time: e.target.value }
                        setForm({ ...form, schedules: arr })
                      }} />
                      <button className="text-sm text-destructive ml-auto" onClick={() => {
                        const arr = [...(form.schedules || [])]
                        arr.splice(idx, 1)
                        setForm({ ...form, schedules: arr })
                      }}>Eliminar</button>
                    </div>

                    <div className="mt-2">
                      <input className="w-full px-2 py-1" placeholder="Orador" value={s.speaker || ''} onChange={(e) => {
                        const arr = [...(form.schedules || [])]
                        arr[idx] = { ...arr[idx], speaker: e.target.value }
                        setForm({ ...form, schedules: arr })
                      }} />
                    </div>

                    <div className="mt-2">
                      <label className="text-sm">Horarios por región (coma-separado)</label>
                      <input className="w-full px-2 py-1" placeholder="España: 23:00, UK: 22:00" value={(s.regional || []).join(', ')} onChange={(e) => {
                        const arr = [...(form.schedules || [])]
                        const parts = e.target.value.split(',').map((p) => p.trim()).filter(Boolean)
                        arr[idx] = { ...arr[idx], regional: parts }
                        setForm({ ...form, schedules: arr })
                      }} />
                    </div>
                  </div>
                ))}

                <div>
                  <button className="px-3 py-1 bg-primary text-white rounded" onClick={() => {
                    const arr = [...(form.schedules || [])]
                    arr.push({ title: '', day: '', time: '', speaker: '', regional: [] })
                    setForm({ ...form, schedules: arr })
                  }}>Añadir Horarios</button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Modules</label>
              <div className="space-y-3 mt-2">
                {(form.modules || []).map((m: any, midx: number) => (
                  <div key={midx} className="border p-3 rounded">
                    <div className="flex gap-2 items-center">
                      <input className="flex-1 px-2 py-1" placeholder="Título del módulo" value={m.title || ''} onChange={(e) => {
                        const arr = [...(form.modules || [])]
                        arr[midx] = { ...arr[midx], title: e.target.value }
                        setForm({ ...form, modules: arr })
                      }} />
                      <button className="text-sm text-destructive" onClick={() => {
                        const arr = [...(form.modules || [])]
                        arr.splice(midx, 1)
                        setForm({ ...form, modules: arr })
                      }}>Eliminar</button>
                    </div>

                    <div className="mt-2 space-y-2">
                      <label className="text-sm">Puntos</label>
                      {(m.points || []).map((p: string, pidx: number) => (
                        <div key={pidx} className="flex gap-2">
                          <input className="flex-1 px-2 py-1" value={p} onChange={(e) => {
                            const arr = [...(form.modules || [])]
                            const mod = { ...(arr[midx] || {}), points: [...(arr[midx]?.points || [])] }
                            mod.points[pidx] = e.target.value
                            arr[midx] = mod
                            setForm({ ...form, modules: arr })
                          }} />
                          <button className="text-sm text-destructive" onClick={() => {
                            const arr = [...(form.modules || [])]
                            const mod = { ...(arr[midx] || {}), points: [...(arr[midx]?.points || [])] }
                            mod.points.splice(pidx, 1)
                            arr[midx] = mod
                            setForm({ ...form, modules: arr })
                          }}>Eliminar</button>
                        </div>
                      ))}

                      <div>
                        <button className="px-2 py-1 bg-primary text-white rounded" onClick={() => {
                          const arr = [...(form.modules || [])]
                          const mod = { ...(arr[midx] || {}), points: [...(arr[midx]?.points || [])] }
                          mod.points.push('')
                          arr[midx] = mod
                          setForm({ ...form, modules: arr })
                        }}>Añadir Punto</button>
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <button className="px-3 py-1 bg-primary text-white rounded" onClick={() => {
                    const arr = [...(form.modules || [])]
                    arr.push({ title: '', points: [] })
                    setForm({ ...form, modules: arr })
                  }}>Añadir Módulo</button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setOpen(false); setForm({}); setEditingId(null) }}>Cancelar</Button>
              <Button onClick={save}>{editingId ? 'Actualizar' : 'Crear'}</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {message && <div className="mt-3 text-sm text-muted-foreground">{message}</div>}
    </div>
  )
}
