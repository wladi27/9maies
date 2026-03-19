"use client"

import React, { useState, useRef, DragEvent } from 'react'
import Header from '@/components/admin/Header'
import { useRouter } from 'next/navigation'
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react'

export default function NewProductPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [sku, setSku] = useState('')
  const [saving, setSaving] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File | null) {
    if (!file) return
    if (!file.type.startsWith('image/')) return alert('Selecciona una imagen válida')
    if (file.size > 5 * 1024 * 1024) return alert('La imagen no debe superar los 5MB')
    setFile(file)
    const reader = new FileReader()
    reader.onload = () => setPreview(String(reader.result))
    reader.readAsDataURL(file)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null
    handleFile(f)
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) { e.preventDefault(); e.stopPropagation(); setIsDragging(true) }
  function handleDragLeave(e: DragEvent<HTMLDivElement>) { e.preventDefault(); e.stopPropagation(); setIsDragging(false) }
  function handleDrop(e: DragEvent<HTMLDivElement>) { e.preventDefault(); e.stopPropagation(); setIsDragging(false); const f = e.dataTransfer.files?.[0] || null; handleFile(f) }

  function handleRemoveImage() { setFile(null); setPreview(null); if (fileInputRef.current) fileInputRef.current.value = '' }
  function handleSkipImage() { handleRemoveImage() }
  function handleSelectClick() { fileInputRef.current?.click() }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      let featuredImage: string | null = null
      let featuredPublicId: string | null = null
      if (file && preview) {
        const upRes = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: preview, folder: 'products' }),
        })
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
      }

      const body = { name, description, price: price ? Number(price) : null, sku, featuredImage, featuredPublicId }
      const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error('Error creando producto')
      router.push('/admin/products')
    } catch (err) {
      console.error(err)
      alert('Error creando producto')
    } finally { setSaving(false) }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground">Nuevo producto</h2>
          <p className="text-muted-foreground mt-1">Completa los detalles para crear un nuevo producto</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                        <button type="button" onClick={handleSkipImage} className="w-full px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-colors flex items-center justify-center gap-2 text-sm">Continuar sin imagen</button>
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
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => router.push('/admin/products')} className="px-6 py-2.5 border border-border text-foreground rounded-md hover:bg-muted transition-colors font-medium">Cancelar</button>
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">{saving ? 'Guardando...' : 'Crear producto'}</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
