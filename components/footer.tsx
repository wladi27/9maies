import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6">
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
                <div className="flex flex-col text-[10px] md:text-xs text-muted-foreground leading-tight">
                  <div className="text-foreground font-semibold text-xs md:text-sm">Agente autorizado<br /> Romio Santiago (Mr. G)</div>
                  <div className="text-[10px] md:text-[11px]">Equipo el proximo nivel</div>
                  <div className="text-[10px] md:text-[11px]">Socio y mentor 100 de 9M AI</div>
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
            <div className="flex items-center gap-3 md:gap-4">
              <a
                aria-label="Facebook - 9M AI"
                href="https://www.facebook.com/profile.php?id=61581678449984"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm shadow-black/10 hover:scale-[1.03] transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                aria-label="Instagram - 9M AI"
                href="https://www.instagram.com/9maienespanol/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-sm shadow-black/10 hover:scale-[1.03] transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                aria-label="YouTube - 9M AI"
                href="https://www.youtube.com/@9M_AI_en_Español"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FF0000] text-white shadow-sm shadow-black/10 hover:scale-[1.03] transition-all"
              >
                {/* Cambio aquí: SVG con icono blanco */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}