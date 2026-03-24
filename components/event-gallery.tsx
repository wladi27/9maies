"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export function EventGallery() {
  const eventImages = [
    's1.jpeg',
    's2.png',
    's3.png',
    's4.png',
    's5.png',
    's6.png',
    's7.png',
    's8.png',
    's9.png',
    's10.png',
    's11.png',
    's12.png',
    's13.png',
    's14.png',
    's15.png',
    's16.png',
    's17.png',
    's18.png',
    's19.png',
    's20.png',
    's21.png',
    's22.png',
    's23.png',
    's24.png',
    's25.png',
    's26.png',
    's27.png',
    's28.png',
  ]

  const videos = [
    { id: 'v1', title: 'Evento: Lanzamiento 9MX', url: 'https://www.youtube.com/embed/DkFQcLzVvMs' },
    { id: 'v2', title: 'Panel: Estrategias IA', url: 'https://www.youtube.com/embed/DkFQcLzVvMs' },
    { id: 'v3', title: 'Webinar: Fondo 9MX', url: 'https://www.youtube.com/embed/DkFQcLzVvMs' }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(s => (s + 1) % eventImages.length), 5000)
    return () => clearInterval(t)
  }, [])

  const prev = () => setCurrentSlide(s => (s - 1 + eventImages.length) % eventImages.length)
  const next = () => setCurrentSlide(s => (s + 1) % eventImages.length)
  // Ocultar esta sección en la web: devolver null.
  // Para reactivarla, reemplazar `return null` por el contenido JSX anterior.
  return null
}

export default EventGallery
