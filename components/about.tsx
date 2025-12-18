import { Card } from "@/components/ui/card"
import { Brain, Target, Shield } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Sobre <span className="text-primary">9M AI</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fundada en Nueva York por ex ejecutivos de Goldman Sachs, científicos de IA de la Universidad de Columbia
              e ingenieros cuantitativos de primer nivel
            </p>
          </div>

          {/* Mission, Vision, Commitment Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card border-border p-8 hover:border-primary transition-colors">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Nuestra Misión</h3>
                <p className="text-muted-foreground">Redefinir las relaciones individuales-capital a través de la IA</p>
              </div>
            </Card>

            <Card className="bg-card border-border p-8 hover:border-primary transition-colors">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Nuestra Visión</h3>
                <p className="text-muted-foreground">No seguimos tendencias, creamos el futuro de las finanzas</p>
              </div>
            </Card>

            <Card className="bg-card border-border p-8 hover:border-primary transition-colors">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Nuestro Compromiso</h3>
                <p className="text-muted-foreground">Agente financiero inteligente 24/7, haciendo crecer tu riqueza</p>
              </div>
            </Card>
          </div>

          {/* NovaMind Section */}
          <div className="bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl p-8 md:p-12 border border-primary/30">
            <div className="max-w-4xl mx-auto space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-center text-foreground">
                NovaMind™ - La mente detrás del dinero
              </h3>
              <p className="text-lg text-center text-muted-foreground">
                El motor de IA propio de 9M, entrenado en el ámbito financiero real, que toma decisiones autónomas de
                inversión
              </p>

              <div className="grid md:grid-cols-2 gap-6 pt-8">
                <div className="bg-background/50 backdrop-blur rounded-lg p-6 space-y-2">
                  <div className="text-3xl font-bold text-primary">3,000</div>
                  <div className="text-muted-foreground">Noticias procesadas por segundo</div>
                </div>
                <div className="bg-background/50 backdrop-blur rounded-lg p-6 space-y-2">
                  <div className="text-3xl font-bold text-primary">1,000+</div>
                  <div className="text-muted-foreground">Cripto-activos gestionados</div>
                </div>
                <div className="bg-background/50 backdrop-blur rounded-lg p-6 space-y-2">
                  <div className="text-3xl font-bold text-primary">40M</div>
                  <div className="text-muted-foreground">Artículos académicos recopilados</div>
                </div>
                <div className="bg-background/50 backdrop-blur rounded-lg p-6 space-y-2">
                  <div className="text-3xl font-bold text-primary">100,000x</div>
                  <div className="text-muted-foreground">Más rápido que operadores humanos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
