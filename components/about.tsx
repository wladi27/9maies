import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Brain, Target, Shield, TrendingUp, Users, Award } from "lucide-react"
import VideosGrid from "@/components/videos-grid"

export function About() {
  const solutions = [
    {
      title: "Fondo 9mx",
      description: "Vehículo de inversión cuantitativa que asigna activos de manera adaptativa en múltiples clases.",
      icon: TrendingUp
    },
    {
      title: "Plataforma Institucional",
      description: "Motores de estrategia y control de riesgo para clientes profesionales.",
      icon: Users
    },
    {
      title: "Academia 9mx",
      description: "Programa formativo de élite para inversores.",
      icon: Award
    }
  ]

  const values = [
    {
      title: "Nuestra Misión",
      description: "Redefinir las relaciones individuales-capital a través de la IA",
      icon: Target,
      gradient: "from-blue-600/20 to-cyan-600/20"
    },
    {
      title: "Nuestra Visión",
      description: "No seguimos tendencias, creamos el futuro de las finanzas",
      icon: Brain,
      gradient: "from-purple-600/20 to-pink-600/20"
    },
    {
      title: "Nuestro Compromiso",
      description: "Agente financiero inteligente 24/7, haciendo crecer tu riqueza",
      icon: Shield,
      gradient: "from-emerald-600/20 to-teal-600/20"
    }
  ]

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-secondary to-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Innovación Financiera
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
              Sobre <span className="text-primary relative">
                9mx
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              9MX fue fundada en Nueva York como una empresa de tecnología financiera, establecida por un grupo de profesionales experimentados provenientes de los mercados financieros globales, la investigación cuantitativa y la ingeniería tecnológica.
            </p>
          </div>

          {/* Hero Card with Stats */}
          <Card className="bg-gradient-to-br from-primary/5 via-transparent to-primary/5 border-primary/20 p-8 mb-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <p className="text-2xl text-foreground mb-6 font-light leading-relaxed">
                <span className="font-semibold text-primary">9mx</span> es una empresa fintech pionera que redefine la 
                gestión patrimonial mediante generación financiera de próxima generación.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {[
                  { value: "$2.5B+", label: "Activos Gestionados" },
                  { value: "15+", label: "Años de Experiencia" },
                  { value: "50K+", label: "Clientes Activos" },
                  { value: "99.9%", label: "Precisión IA" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Key Solutions */}
          

          {/* Mission, Vision, Commitment Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {values.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="group relative bg-card border-border overflow-hidden hover:border-primary/30 transition-all duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10 p-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Licenses Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold text-foreground">
                Licencias y <span className="text-primary">certificaciones</span>
              </h3>
              <div className="h-px flex-1 bg-border ml-6"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['1.png','2.png','3.png','4.jpg'].map((file, idx) => (
                  <Card
                    key={file}
                    className="group bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 p-0 overflow-hidden rounded-md cursor-pointer"
                  >
                    <a href={`/licencias/${file}`} target="_blank" rel="noopener noreferrer" className="block w-full h-40 sm:h-44 md:h-48 relative">
                      <Image
                        src={`/licencias/${file}`}
                        alt={`Licencia ${idx + 1}`}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                  </Card>
                ))}
            </div>
          </div>

          {/* Videos Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl"></div>
            <div className="relative z-10 p-8">
              <VideosGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}