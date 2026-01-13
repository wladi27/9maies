"use client"

import { Button } from "@/components/ui/button"
import { Smartphone, Download, Sparkles } from "lucide-react"

export function AppDownloadSmall() {
  return (
    <section id="download" className="relative py-10 overflow-hidden bg-gray-950">
      {/* Líneas gráficas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Líneas diagonales */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(30deg, transparent 49%, #8b5cf6 49%, #8b5cf6 51%, transparent 51%)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Líneas de conexión */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>
        
        {/* Luces neón */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        {/* Puntos de conexión */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-indigo-500 rounded-full"></div>
        <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-purple-500 rounded-full"></div>
      </div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Columna izquierda - Icono e imagen */}
                <div className="relative">
                  {/* Efecto de anillo */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-md"></div>
                  
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700 shadow-lg">
                    {/* Mockup móvil pequeño */}
                    <div className="relative w-40 h-40">
                      {/* Dispositivo */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 p-2 shadow-inner">
                        {/* Pantalla con imagen */}
                        <div className="h-full rounded-lg overflow-hidden bg-gray-950">
                          <div className="relative h-full">
                            <div 
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                backgroundImage: `url('/images/kv-402x.png')`,
                                filter: 'brightness(0.8) saturate(1.2)'
                              }}
                            ></div>
                            
                            {/* Overlay degradado */}
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent"></div>
                            
                            {/* Icono de app */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Smartphone className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Elementos decorativos */}
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                        <Download className="w-3 h-3 text-white" />
                      </div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
                    </div>
                    
                    {/* Partículas flotantes */}
                    <Sparkles className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-5 text-purple-400/60" />
                  </div>
                </div>

                {/* Columna derecha - Contenido */}
                <div className="flex-1">
                  <div className="space-y-4">
                    {/* Header */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 text-purple-300 rounded-lg text-sm font-medium mb-3 border border-purple-700/30">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-pulse"></div>
                        <span>APP DISPONIBLE</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">
                        Descarga <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">9M AI</span>
                      </h3>
                      
                      <p className="text-sm text-gray-400">
                        Análisis financiero con IA en tu móvil. Estrategias en tiempo real y decisiones inteligentes.
                      </p>
                    </div>

                    {/* Plataformas */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-300">iOS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-300">Android</span>
                      </div>
                    </div>

                    {/* Botones */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <a href="https://mzy4zmy3.chugewujin.com/TisCdi82IFuS7JN3?5c2f43=218ee5288dff190e7846e90271317d50" className="group">
                        <Button className="w-full gap-2 h-10 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 hover:border-purple-600 hover:text-white transition-all duration-300">
                          <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor">
                            <path d="M349.6 69.6c-30.6 1.2-67.6 20.2-89.6 45.7-19.6 23.1-36.6 59-30.2 93.1 31 .9 63.5-17.2 84-41.9 21.4-25.8 37.7-61 36-92.9zM407 176.2c-1.9-40.4-21.5-71.4-45.1-95.2-23.3-23.3-56.3-39.2-92.8-39.6-36.3-.4-68 17.6-90 44.4-26.4 32-37.2 78.8-21.9 121.5 20.1 51.7 72.7 88.6 130.1 88.6 25.8 0 51.1-6.6 72.3-18.6 24.6-13.7 45.8-36.6 47.4-76.3 1.1-31.1-11.1-64.3-99.9-124.8 0 0 62.2 69.9 58.9 143.2z"/>
                          </svg>
                          <span className="text-sm font-medium">App Store</span>
                        </Button>
                      </a>
                      
                      <a href="https://9m-download.s3.ap-southeast-1.amazonaws.com/Android/apk/9M-Release-1.0.18(26).apk" className="group">
                        <Button className="w-full gap-2 h-10 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
                          <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor">
                            <path d="M325.3 234.3c-6.8-4.5-15.2-7.2-26.1-7.2-10.8 0-19.8 2.7-26.4 7.2-6.8 4.6-13 12.5-18.7 23.8-5.9 11.7-8.9 22.3-8.9 31.6 0 9.5 3.1 19.9 9.3 32 6.2 12.1 13.9 20 22.9 23.6 9 3.7 18.6 5.6 29.2 5.6 11.1 0 19.7-1.9 26.1-5.6 6.4-3.6 12-11.6 16.8-23.7 4.9-12.4 7.4-23 7.4-32.6 0-9.4-2.5-20.1-7.5-31.8-5.1-11.8-11.2-20-17.6-24.5z"/>
                          </svg>
                          <span className="text-sm font-medium">Google Play</span>
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pie de sección */}
              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                    <span>Conectado 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Seguridad AES-256</span>
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