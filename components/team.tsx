import Image from 'next/image'
import { Card } from '@/components/ui/card'

export function Team() {
  return (
    <section id="team" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold section-title">Nuestro equipo de instructores</h2>
          <p className="text-muted-foreground mt-2">Profesionales con amplia experiencia en IA, finanzas y trading, comprometidos con tu aprendizaje y resultados.</p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden flex flex-col md:flex-row items-center gap-6 p-0">
          <div className="w-full md:w-1/2 h-64 md:h-80 relative">
            <Image src="/team.jpeg" alt="Equipo de instructores" fill className="object-cover" />
          </div>
          <div className="p-6 md:w-1/2">
            <h3 className="text-2xl font-semibold">Equipo 9M AI</h3>
            <p className="mt-3 text-muted-foreground">Nuestro equipo combina experiencia en inteligencia artificial aplicada a mercados financieros, estrategias cuantitativas y formación práctica. Trabajamos con un enfoque personalizado para ayudarte a diseñar y aplicar estrategias que funcionen en el mundo real.</p>
            <p className="mt-4 text-sm text-muted-foreground">Participa en nuestros cursos, eventos y sesiones en vivo para aprender de la experiencia directa de los instructores.</p>
          </div>
        </Card>
      </div>
    </section>
  )
}
