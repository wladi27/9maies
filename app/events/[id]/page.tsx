import { getEventById } from '@/lib/events'
import Image from 'next/image'
import EventDetailClient from '@/components/event-detail-client'
import EventDetailWrapper from '@/components/event-detail-wrapper'
import { notFound } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Clock, Users, Tag, CheckCircle, Mail, Star, ExternalLink } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function Page({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = (params && typeof (params as any).then === 'function') ? await params : params
  const { id } = resolvedParams as { id: string }
  const event = getEventById(id)
  if (!event) return notFound()

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-100">
      <Header />
      <div className="container mx-auto py-24 px-4 max-w-7xl">
        {/* Breadcrumb elegante dark */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                href="/" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Inicio
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-700" />
            <BreadcrumbItem>
              <BreadcrumbLink 
                href="/#events" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Eventos
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-700" />
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate max-w-[300px] font-medium text-white">
                {event.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Botón de volver con glow */}
        <div className="flex items-center gap-3 mb-10">
          <Link 
            href="/#events" 
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver a eventos
          </Link>
          <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 via-transparent to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Columna izquierda - Imagen con efectos dark */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              {/* Imagen con glow effect */}
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl shadow-blue-500/10 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
                
                <AspectRatio ratio={3/4} className="w-full">
                  {event.featuredImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={event.featuredImage}
                        alt={event.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        priority
                      />
                      {/* Overlay con gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-500"></div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="text-center p-8">
                        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                          <Calendar className="w-10 h-10 text-gray-500" />
                        </div>
                        <p className="text-gray-500 text-sm">Imagen no disponible</p>
                      </div>
                    </div>
                  )}
                </AspectRatio>
                
                {/* Badge con glow */}
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 shadow-lg shadow-blue-500/30">
                    <Star className="w-3 h-3 mr-1" />
                    Destacado
                  </Badge>
                </div>

                {/* Efecto de brillo en las esquinas */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full translate-x-1/2 translate-y-1/2"></div>
              </div>

              {/* Información en móvil */}
              <div className="lg:hidden mt-6">
                <Card className="p-4 border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>
                        {event.date ? new Date(event.date).toLocaleString('es-ES', { 
                          timeZone: 'UTC', 
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        }) : 'Fecha por definir'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span>{event.location || 'Online'}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Columna central - Contenido Principal */}
          <div className="lg:col-span-2">
            <Card className="p-6 md:p-8 border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl shadow-black/50 rounded-2xl backdrop-blur-sm">
              {/* Header con efectos */}
              <div className="mb-10">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Badge className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 text-blue-300 border border-blue-800/50 shadow-lg">
                    <Calendar className="w-3 h-3 mr-1" />
                    {event.date ? new Date(event.date).toLocaleDateString('es-ES', { 
                      month: 'short', 
                      day: 'numeric' 
                    }) : 'Próximo'}
                  </Badge>
                  <Badge variant="outline" className="border-gray-700 text-gray-400 bg-gray-900/50">
                    Cumbre Global
                  </Badge>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  {event.title}
                </h1>
                
                <div className="flex items-center gap-6 text-gray-400 mb-8">
                  <div className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center group-hover:bg-blue-900/30 transition-colors">
                      <MapPin className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <span className="group-hover:text-white transition-colors">{event.location || 'Evento Online'}</span>
                  </div>
                  <div className="hidden md:flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center group-hover:bg-purple-900/30 transition-colors">
                      <Clock className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <span className="group-hover:text-white transition-colors">4 días</span>
                  </div>
                </div>

                {/* Línea divisoria con glow */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                </div>
              </div>

              {/* Descripción */}
              <section className="mb-12">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>
                  Descripción
                </h2>
                <div className="prose prose-invert max-w-none">
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-xl p-6 border border-gray-800 backdrop-blur-sm">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {event.description}
                    </p>
                  </div>
                </div>
              </section>

              {/* Contenido especial para 9mx */}
              {event._id === 'evt-2' && (
                <section className="mb-12">
                  <div className="border-t border-gray-800 pt-12">
                    {/* Header del anuncio */}
                    <div className="flex items-center gap-4 mb-10">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-500/30 shadow-lg shadow-blue-500/10">
                          <Tag className="w-7 h-7 text-blue-400" />
                        </div>
                        {/* Efecto de brillo */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl blur-sm"></div>
                      </div>
                      <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    10ª Cumbre Global 9mx
                                  </h3>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 text-blue-300 border border-blue-700/50">
                            OFICIAL
                          </Badge>
                          <span className="text-sm text-gray-400">Ref: 9mx25122701</span>
                        </div>
                      </div>
                    </div>

                        <div className="space-y-8">
                      {/* Tarjeta principal */}
                      <Card className="border border-blue-900/30 bg-gradient-to-br from-gray-900/80 to-blue-900/20 backdrop-blur-sm">
                        <div className="p-6 md:p-8">
                          <div className="mb-6">
                            <p className="text-gray-300 mb-4">
                              Estimados usuarios de 9mx, 9mx anuncia mediante el presente que la 
                              <span className="font-semibold text-blue-300"> Cumbre Global 2026 de 9mx</span>, que marca la 
                              <span className="font-semibold text-blue-300"> 10ª Cumbre Global</span>, se celebrará en 
                              <span className="font-semibold text-blue-300"> Dubái, Emiratos Árabes Unidos, del 6 al 9 de febrero de 2026</span>.
                            </p>
                            
                            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-5 border border-blue-800/30">
                              <p className="text-blue-200 font-medium">
                                La 10ª Cumbre Global representa un hito importante en el desarrollo global de 9mx y servirá 
                                como una plataforma de alto nivel para la alineación de la gestión global, la coordinación 
                                de liderazgo y la planificación estratégica para la próxima fase operativa.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Grid de detalles */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Detalles de la cumbre */}
                        <Card className="border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 group hover:border-blue-800/50 transition-all duration-300">
                          <div className="p-6">
                            <h4 className="font-bold text-white mb-6 flex items-center gap-3">
                              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                              Detalles de la Cumbre
                            </h4>
                            <ul className="space-y-4">
                              {[
                                { label: 'Evento', value: 'Cumbre Global 2026 de 9mx' },
                                { label: 'Edición', value: '10ª Cumbre Global' },
                                { label: 'Ubicación', value: 'Dubái, Emiratos Árabes Unidos' },
                                { label: 'Lugar', value: 'Por anunciar' }
                              ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3 group/item">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-900/40 to-cyan-900/40 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                    <CheckCircle className="w-4 h-4 text-blue-400" />
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-400">{item.label}</p>
                                    <p className="text-gray-300 font-medium">{item.value}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Card>

                        {/* Aviso de participación */}
                        <Card className="border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 group hover:border-green-800/50 transition-all duration-300">
                          <div className="p-6">
                            <h4 className="font-bold text-white mb-6 flex items-center gap-3">
                              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
                              Aviso de Participación
                            </h4>
                            <div className="space-y-6">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-900/40 to-emerald-900/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                  <CheckCircle className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                  <p className="font-medium text-white mb-1">Participantes Calificados</p>
                                  <p className="text-sm text-gray-400">Programa completo (6-9 Feb), incluye agenda yate</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-900/40 to-yellow-900/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                  <Clock className="w-6 h-6 text-amber-400" />
                                </div>
                                <div>
                                  <p className="font-medium text-white mb-1">Otros Participantes</p>
                                  <p className="text-sm text-gray-400">Solo 6-8 Feb (sin agenda yate 9 Feb)</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>

                      {/* Información final */}
                      <Card className="border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-950/80">
                        <div className="p-6 md:p-8">
                          <p className="text-gray-300 mb-6">
                            Se anunciarán más detalles sobre la agenda, el lugar y los arreglos de participación a través 
                            de los canales oficiales de 9mx en el momento oportuno.
                          </p>
                          <div className="pt-6 border-t border-gray-800">
                            <p className="text-xl font-medium text-white mb-4">Gracias por su continua confianza y apoyo.</p>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                <p className="text-gray-300 font-semibold">Equipo de Operaciones de 9mx</p>
                                <p className="text-sm text-gray-500">27 de diciembre de 2025</p>
                              </div>
                              <Badge className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 text-blue-300 border border-blue-700/50 w-fit">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                  9mx OFFICIAL
                                </div>
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </section>
              )}
            </Card>
          </div>

          {/* Columna derecha - Sidebar con efectos lumínicos */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              {/* Formulario con glow fuerte */}
              <Card className="border-2 border-blue-500/30 bg-gradient-to-b from-gray-900 to-black shadow-2xl shadow-blue-500/20 rounded-2xl overflow-hidden relative">
                {/* Efecto de brillo */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 blur-xl opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="bg-gradient-to-r from-blue-900/80 to-cyan-900/80 p-6 text-white border-b border-blue-800/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-400/30 flex items-center justify-center backdrop-blur-sm">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Reserva tu lugar</h3>
                        <p className="text-blue-200 text-sm">Cupos limitados • Confirmación inmediata</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-300">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      Plazas disponibles
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm">
                    <EventDetailWrapper 
                      eventId={event._id} 
                      eventTitle={event.title} 
                      eventDate={event.date} 
                      eventLocation={event.location} 
                    />
                  </div>
                </div>
              </Card>

              {/* Información del evento con efectos */}
              <Card className="border border-gray-800 bg-gradient-to-b from-gray-900/90 to-gray-950/90 shadow-xl shadow-black/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white mb-6 pb-4 border-b border-gray-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <span>Información del Evento</span>
                </h3>
                
                <div className="space-y-5">
                  {[
                    {
                      icon: Calendar,
                      iconColor: 'text-blue-400',
                      label: 'Fecha y Hora',
                      value: event.date ? new Date(event.date).toLocaleString('es-ES', {
                        timeZone: 'UTC',
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Por definir'
                    },
                    {
                      icon: MapPin,
                      iconColor: 'text-red-400',
                      label: 'Ubicación',
                      value: event.location || 'Evento Online'
                    },
                    {
                      icon: Clock,
                      iconColor: 'text-purple-400',
                      label: 'Duración',
                      value: '4 días completos'
                    },
                    {
                      icon: Users,
                      iconColor: 'text-amber-400',
                      label: 'Audiencia',
                      value: 'Ejecutivos y Socios'
                    },
                    {
                      icon: Tag,
                      iconColor: 'text-green-400',
                      label: 'Código',
                      value: event._id,
                      isCode: true
                    }
                  ].map((item, index) => (
                    <div key={index} className="group/item">
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300">
                        <div className={`w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center group-hover/item:scale-110 transition-transform ${item.iconColor.replace('text-', 'bg-')}/10`}>
                          <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">{item.label}</p>
                          {item.isCode ? (
                            <Badge variant="secondary" className="font-mono text-gray-300 bg-gray-800 border-gray-700">
                              {item.value}
                            </Badge>
                          ) : (
                            <p className="font-medium text-white">{item.value}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nota importante */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-900/30 to-yellow-900/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-sm text-gray-400">
                      <span className="font-medium text-amber-300">Importante:</span> La confirmación está sujeta a verificación de elegibilidad.
                    </p>
                  </div>
                </div>
              </Card>

              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}