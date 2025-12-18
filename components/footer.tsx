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
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.jpeg"
                  alt="9M AI Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-xl font-bold text-foreground">9M AI</span>
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
                <li>
                  <a href="#team" className="hover:text-primary transition-colors">
                    Equipo
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">
                    Contacto
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
                <li>
                  <a href="#training" className="hover:text-primary transition-colors">
                    Entrenamiento
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
