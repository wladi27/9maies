"use client"

import React, { useEffect, useState, useRef, DragEvent } from 'react'
import Header from '@/components/admin/Header'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react'

export default function EditProductPage() {
  const router = useRouter()
  const pathname = usePathname()
  const id = pathname?.split('/').pop() || ''

  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [sku, setSku] = useState('')
  const [saving, setSaving] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [removed, setRemoved] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setName(data.name || '')
        setDescription(data.description || '')
        setPrice(data.price != null ? String(data.price) : '')
        setSku(data.sku || '')
        if (data.featuredImage) setPreview(data.featuredImage)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  function handleFile(f: File | null) {
    if (!f) return
    if (!f.type.startsWith('image/')) return alert('Selecciona una imagen válida')
    if (f.size > 5 * 1024 * 1024) return alert('La imagen no debe superar los 5MB')
    setFile(f)
    const r = new FileReader()
    r.onload = () => setPreview(String(r.result))
    r.readAsDataURL(f)
    setRemoved(false)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0] || null; handleFile(f) }
  function handleDragOver(e: DragEvent<HTMLDivElement>) { e.preventDefault(); e.stopPropagation(); setIsDragging(true) }
  function handleDragLeave(e: DragEvent<HTMLDivElement>) { e.preventDefault(); e.stopPropagation(); setIsDragging(false) }
  function handleDrop(e: DragEvent<HTMLDivElement>) { e.preventDefault(); e.stopPropagation(); setIsDragging(false); const f = e.dataTransfer.files?.[0] || null; handleFile(f) }
  function handleRemoveImage() { setFile(null); setPreview(null); setRemoved(true); if (fileInputRef.current) fileInputRef.current.value = '' }
  function handleSkipImage() { handleRemoveImage() }
  function handleSelectClick() { fileInputRef.current?.click() }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      let featuredImage: string | null = null
      let featuredPublicId: string | null = null
      let uploaded = false

      if (file) {
        const reader = new FileReader()
        const fileDataUrl: Promise<string> = new Promise((resolve, reject) => {
          reader.onload = () => resolve(String(reader.result))
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
        const dataUrl = await fileDataUrl
        const upRes = await fetch('/api/admin/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ file: dataUrl, folder: 'products' }) })
        const text = await upRes.text()
        let upData: any
        try {
          upData = JSON.parse(text)
        } catch (err) {
          console.error('Upload endpoint returned non-JSON:', text)
          throw new Error('Error subiendo imagen (respuesta inválida del servidor)')
        }
        if (!upRes.ok) throw new Error(upData?.error || 'Error subiendo imagen')
        featuredImage = upData.secure_url || upData.url || null
        featuredPublicId = upData.public_id || null
        uploaded = true
      }

      const body: any = { name, description, price: price ? Number(price) : null, sku }
      if (uploaded) {
        body.featuredImage = featuredImage
        body.featuredPublicId = featuredPublicId
      } else if (removed) {
        body.featuredImage = null
        body.featuredPublicId = null
      }

      const res = await fetch(`/api/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error('Error')
      router.push('/admin/products')
    } catch (err) {
      console.error(err)
      alert('Error al guardar')
    } finally { setSaving(false) }
  }

  async function handleDelete() {
    if (!confirm('¿Eliminar producto?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    router.push('/admin/products')
  }

  if (loading) return (<div className="min-h-screen"><Header /><main className="p-6">Cargando...</main></div>)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground">Editar producto</h2>
          <p className="text-muted-foreground mt-1">Modifica los detalles del producto</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card border rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-1">Nombre</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-foreground" placeholder="Nombre del producto" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-1">Precio</label>
                      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" className="w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-foreground" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-1">SKU</label>
                      <input value={sku} onChange={(e) => setSku(e.target.value)} className="w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-foreground" placeholder="SKU (opcional)" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-1">Descripción</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-foreground h-32 resize-none" placeholder="Describe el producto..." />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border rounded-lg p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2"><ImageIcon className="w-5 h-5" />Imagen</h3>

                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />

                {!preview ? (
                  <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ease-in-out ${isDragging ? 'border-primary bg-primary/10' : 'border-border hover:border-muted-foreground/50'}`}>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDragging ? 'bg-primary/20' : 'bg-muted'}`}>
                        <Upload className={`w-8 h-8 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Arrastra una imagen aquí</p>
                        <p className="text-xs text-muted-foreground">o selecciona una opción</p>
                      </div>

                      <div className="flex flex-col w-full gap-2">
                        <button type="button" onClick={handleSelectClick} className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm font-medium"><Camera className="w-4 h-4" />Seleccionar imagen</button>
                        <button type="button" onClick={handleSkipImage} className="w-full px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-colors flex items-center justify-center gap-2 text-sm">Quitar imagen</button>
                      </div>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF hasta 5MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative group">
                      <img src={preview} alt="preview" className="w-full h-48 object-cover rounded-lg border border-border" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <button type="button" onClick={handleRemoveImage} className="p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"><X className="w-5 h-5" /></button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={handleSelectClick} className="flex-1 px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"><Upload className="w-4 h-4" />Cambiar</button>
                      <button type="button" onClick={handleRemoveImage} className="flex-1 px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-colors text-sm">Quitar</button>
                    </div>
                  </div>
                )}

                {/* action buttons moved below to avoid overflow inside card */}
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <button type="button" onClick={() => router.push('/admin/products')} className="w-full sm:w-auto px-6 py-2.5 border border-border text-foreground rounded-md hover:bg-muted transition-colors font-medium">Cancelar</button>
              <button type="button" onClick={handleDelete} className="w-full sm:w-auto px-4 py-2 bg-destructive text-destructive-foreground rounded-md">Eliminar</button>
              <button type="submit" disabled={saving} className="w-full sm:w-auto px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed">{saving ? 'Guardando...' : 'Guardar'}</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
