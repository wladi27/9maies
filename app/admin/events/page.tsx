"use client"

import React, { useEffect, useState, useCallback } from 'react'
import Header from '@/components/admin/Header'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { Calendar, MapPin, ImageOff, Plus, Search, ChevronLeft, ChevronRight, Edit, Trash2, Loader2 } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'

type Event = {
  _id: string
  title: string
  description: string
  date?: string | null
  location?: string | null
  featuredImage?: string | null
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const pageSize = 12
  const [total, setTotal] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [toDelete, setToDelete] = useState<{ id: string; title?: string } | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const fetchEvents = useCallback(async (pageNum = 1) => {
    setLoading(true)
    try {
      const skip = (pageNum - 1) * pageSize
      const res = await fetch(`/api/events?limit=${pageSize}&skip=${skip}`)
      const data = await res.json()
      setEvents(data.items || [])
      setTotal(data.total || 0)
    } catch (err) {
      setEvents([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchEvents(page) }, [fetchEvents, page])

  function handleDelete(id: string, title?: string) {
    setToDelete({ id, title })
  }

  async function doDelete() {
    if (!toDelete) return
    setDeleting(true)
    try {
      await fetch(`/api/events/${toDelete.id}`, { method: 'DELETE' })
      const newTotal = Math.max(0, total - 1)
      const lastPage = Math.max(1, Math.ceil(newTotal / pageSize))
      if (page > lastPage) setPage(lastPage)
      await fetchEvents(page)
    } catch (err) {
      console.error(err)
      alert('Error al eliminar')
    } finally {
      setDeleting(false)
      setToDelete(null)
    }
  }

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Fecha por definir'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-6 max-w-7xl mx-auto">
        {/* Header con título y acciones */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Eventos</h2>
            <p className="text-muted-foreground mt-1">Gestiona todos los eventos de la plataforma</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push('/admin/events/new')} 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Nuevo evento
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Cargando eventos...</p>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <ImageOff className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No hay eventos</h3>
            <p className="text-muted-foreground mb-6">Comienza creando tu primer evento</p>
            <button 
              onClick={() => router.push('/admin/events/new')} 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Crear primer evento
            </button>
          </div>
        ) : (
          <>
            {/* Resultados de búsqueda */}
            {searchTerm && (
              <p className="text-sm text-muted-foreground mb-4">
                Mostrando {filteredEvents.length} de {total} eventos
              </p>
            )}

            {/* Grid de eventos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((ev) => (
                <Card key={ev._id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border-border">
                  <div className="relative w-full bg-muted p-1">
                    <AspectRatio ratio={2 / 3}>
                      {ev.featuredImage ? (
                        <Image 
                          src={ev.featuredImage} 
                          alt={ev.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                      ) : (
                        <div className="flex items-center justify-center text-muted-foreground bg-muted/50">
                          <ImageOff className="w-8 h-8 mb-2" />
                          <span className="text-sm">Sin imagen</span>
                        </div>
                      )}
                    </AspectRatio>

                    {/* Badge de ubicación en la imagen */}
                    {ev.location && ev.featuredImage && (
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[100px]">{ev.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{ev.title}</h3>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{formatDate(ev.date)}</span>
                      </div>
                      
                      {ev.location && !ev.featuredImage && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{ev.location}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {ev.description || 'Sin descripción'}
                    </p>
                    
                    <div className="flex items-center gap-2 pt-3 border-t border-border">
                      <button 
                        onClick={() => router.push(`/admin/events/${ev._id}`)} 
                        className="flex-1 px-3 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2 group"
                      >
                        <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(ev._id, ev.title)} 
                        className="px-3 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Mostrando {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, total)} de {total} eventos
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setPage((p) => Math.max(1, p - 1))} 
                    disabled={page === 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum = page
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (page <= 3) {
                        pageNum = i + 1
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = page - 2 + i
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                            page === pageNum
                              ? 'bg-primary text-primary-foreground'
                              : 'border border-border text-foreground hover:bg-muted'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>
                  
                  <button 
                    className="p-2 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setPage((p) => p + 1)} 
                    disabled={page >= totalPages}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        
        <ConfirmDialog 
          open={!!toDelete} 
          title="Eliminar evento" 
          description={`¿Estás seguro de que quieres eliminar "${toDelete?.title || ''}"? Esta acción no se puede deshacer y se perderán todos los datos asociados.`} 
          onConfirm={doDelete} 
          onClose={() => setToDelete(null)} 
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
      </main>
    </div>
  )
}