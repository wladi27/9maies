"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Productos
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Eventos
            </button>
            <button
              onClick={() => scrollToSection("presentations")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Presentaciones
            </button>
            <div className="flex items-center gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => scrollToSection('download')}>Comenzar</Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button className="text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4 border-t border-border">
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-primary transition-colors text-left"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="text-muted-foreground hover:text-primary transition-colors text-left"
            >
              Productos
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-muted-foreground hover:text-primary transition-colors text-left"
            >
              Eventos
            </button>
            <button
              onClick={() => scrollToSection("presentations")}
              className="text-muted-foreground hover:text-primary transition-colors text-left"
            >
              Presentaciones
            </button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full" onClick={() => scrollToSection('download')}>Comenzar</Button>
          </nav>
        )}
      </div>
    </header>
  )
}
