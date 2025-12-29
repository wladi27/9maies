import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="9M AI Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                  style={{ background: 'transparent' }}
                />
                <div className="flex flex-col text-sm text-muted-foreground leading-tight">
                  <div>Agente autorizado</div>
                  <div>Equipo el proximo nivel</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                La IA que sabe cómo hacer crecer tu dinero. Empoderar a los usuarios para lograr el crecimiento
                financiero.
              </p>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-bold text-foreground">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    Nosotros
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="font-bold text-foreground">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#presentations" className="hover:text-primary transition-colors">
                    Presentaciones
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-bold text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Términos
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">© 2025 9M AI. Todos los derechos reservados.</div>

            {/* Social Links: only Facebook & Instagram */}
            <div className="flex items-center gap-4">
              <a aria-label="Facebook - 9M AI" href="https://www.facebook.com/profile.php?id=61581678449984" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a aria-label="Instagram - 9M AI" href="https://www.instagram.com/9maienespanol/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
