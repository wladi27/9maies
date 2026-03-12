"use client"

import { Card } from "@/components/ui/card"

export function VideosGrid({ videos }:{ videos?: { id: string, title: string, url: string }[] }) {
  const defaultVideos = [
    { id: 'v1', title: 'Evento: Lanzamiento 9mx', url: 'https://www.youtube.com/embed/DkFQcLzVvMs' },
    { id: 'v2', title: 'Panel: Estrategias IA', url: 'https://www.youtube.com/embed/DkFQcLzVvMs' },
    { id: 'v3', title: 'Webinar: Fondo 9mx', url: 'https://www.youtube.com/embed/DkFQcLzVvMs' }
  ]

  const list = videos ?? defaultVideos

  return (
    <div className="mt-8 pt-20">
      <h4 className="text-lg font-semibold text-foreground mb-4">Videos informativos</h4>

      <div className="grid md:grid-cols-3 gap-6">
        {list.map(v => (
          <Card key={v.id} className="p-0 border-2 border-primary overflow-hidden bg-black">
            <div className="w-full h-full" style={{ aspectRatio: '16/9', minHeight: 0 }}>
              <iframe
                src={v.url}
                title={v.title}
                className="w-full h-full block"
                style={{ border: 0, display: 'block' }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default VideosGrid
