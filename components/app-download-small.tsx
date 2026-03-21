"use client"

import { Button } from "@/components/ui/button"
import { Smartphone, Download, Sparkles, Shield, Zap, Clock, Mail, User, Key, CheckCircle, ArrowRight } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import { useState } from "react"

export function AppDownloadSmall() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    accountId: '',
    fullName: '',
    email: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const res = await fetch('/api/support', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(formData) 
      })
      
      const json = await res.json().catch(() => ({ message: res.statusText }))
      
      if (res.ok) {
        setFormData({ accountId: '', fullName: '', email: '' })
        toast({ 
          title: '✅ Correo enviado', 
          description: 'Tu mensaje fue enviado correctamente. Te contactaremos pronto.',
          duration: 5000
        })
      } else {
        toast({ 
          title: '❌ Error', 
          description: json.error || 'No se pudo enviar el mensaje',
          variant: 'destructive'
        })
      }
    } catch (err) {
      toast({ 
        title: '❌ Error', 
        description: 'Error al enviar, inténtalo más tarde.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="download" className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid de fondo */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,175,55,0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Líneas de luz animadas */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/5 to-transparent"></div>
        
        {/* Círculos de neón */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Líneas de conexión dinámicas */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#f5e56b" />
            </linearGradient>
          </defs>
          <path d="M0,200 Q300,100 600,200 T1200,200" stroke="url(#grad)" fill="none" strokeWidth="1" strokeDasharray="5 5" />
          <path d="M0,400 Q300,300 600,400 T1200,400" stroke="url(#grad)" fill="none" strokeWidth="1" strokeDasharray="5 5" />
        </svg>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Badge superior */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Nueva versión 2.2.1</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Columna Izquierda - App Info */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-24 space-y-6">
                {/* Título principal */}
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      9mx
                    </span>
                    <span className="text-white"> App</span>
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Análisis financiero con IA avanzada. Estrategias en tiempo real y decisiones inteligentes al alcance de tu mano.
                  </p>
                </div>

                {/* Características */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 group">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">IA Predictiva</h4>
                      <p className="text-xs text-gray-400">Análisis en tiempo real</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 group">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Seguridad AES-256</h4>
                      <p className="text-xs text-gray-400">Protección avanzada</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 group">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Soporte 24/7</h4>
                      <p className="text-xs text-gray-400">Asistencia inmediata</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 group">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Smartphone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Multiplataforma</h4>
                      <p className="text-xs text-gray-400">iOS y Android</p>
                    </div>
                  </div>
                </div>

                {/* Botones de descarga */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a href="https://zta4y.lahuafa.com/5dUj/1BvqDkOpT1APl7kx3" className="group flex-1">
                    <Button className="w-full gap-3 h-14 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white border border-gray-700 hover:border-primary/50 transition-all duration-300 shadow-lg">
                      <svg className="w-6 h-6" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M349.6 69.6c-30.6 1.2-67.6 20.2-89.6 45.7-19.6 23.1-36.6 59-30.2 93.1 31 .9 63.5-17.2 84-41.9 21.4-25.8 37.7-61 36-92.9zM407 176.2c-1.9-40.4-21.5-71.4-45.1-95.2-23.3-23.3-56.3-39.2-92.8-39.6-36.3-.4-68 17.6-90 44.4-26.4 32-37.2 78.8-21.9 121.5 20.1 51.7 72.7 88.6 130.1 88.6 25.8 0 51.1-6.6 72.3-18.6 24.6-13.7 45.8-36.6 47.4-76.3 1.1-31.1-11.1-64.3-99.9-124.8 0 0 62.2 69.9 58.9 143.2z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-gray-400">Descargar para</div>
                        <div className="text-base font-semibold">iOS</div>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                  
                  <a href="https://9m-download.s3.ap-southeast-1.amazonaws.com/Android/apk/9MX-Release-2.2.1(33).apk" className="group flex-1">
                    <Button className="w-full gap-3 h-14 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white transition-all duration-300 shadow-lg shadow-primary/20">
                      <svg className="w-6 h-6" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M325.3 234.3c-6.8-4.5-15.2-7.2-26.1-7.2-10.8 0-19.8 2.7-26.4 7.2-6.8 4.6-13 12.5-18.7 23.8-5.9 11.7-8.9 22.3-8.9 31.6 0 9.5 3.1 19.9 9.3 32 6.2 12.1 13.9 20 22.9 23.6 9 3.7 18.6 5.6 29.2 5.6 11.1 0 19.7-1.9 26.1-5.6 6.4-3.6 12-11.6 16.8-23.7 4.9-12.4 7.4-23 7.4-32.6 0-9.4-2.5-20.1-7.5-31.8-5.1-11.8-11.2-20-17.6-24.5z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-white/80">Descargar para</div>
                        <div className="text-base font-semibold">Android APK</div>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                </div>

                {/* Estadísticas */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">10K+</div>
                    <div className="text-xs text-gray-400">Descargas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">4.8</div>
                    <div className="text-xs text-gray-400">Calificación</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-xs text-gray-400">Soporte</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha - Formulario de Soporte */}
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative">
                  {/* Cabecera decorativa */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl"></div>
                  
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-primary/10">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Soporte Técnico 24/7</h3>
                        <p className="text-sm text-gray-400">Déjanos tus datos y te contactamos</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                          <Key className="w-4 h-4 text-primary" />
                          ID de cuenta
                        </label>
                        <input 
                          name="accountId" 
                          value={formData.accountId}
                          onChange={handleChange}
                          required 
                          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 text-white placeholder-gray-500 transition-all duration-200"
                          placeholder="Ingresa tu ID de cuenta"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                          <User className="w-4 h-4 text-primary" />
                          Nombre completo
                        </label>
                        <input 
                          name="fullName" 
                          value={formData.fullName}
                          onChange={handleChange}
                          required 
                          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 text-white placeholder-gray-500 transition-all duration-200"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                          <Mail className="w-4 h-4 text-primary" />
                          Correo electrónico
                        </label>
                        <input 
                          name="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleChange}
                          required 
                          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 text-white placeholder-gray-500 transition-all duration-200"
                          placeholder="tu@email.com"
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold py-3 px-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Enviando...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              Enviar solicitud
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0"></div>
                      </button>
                    </form>

                    {/* Mensaje de confianza */}
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Shield className="w-3 h-3" />
                        <span>Tus datos están seguros con encriptación AES-256</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppDownloadSmall