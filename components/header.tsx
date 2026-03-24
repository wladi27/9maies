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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button onClick={scrollToTop} aria-label="Ir al inicio" className="focus:outline-none">
              <Image
                src="/logo-new.png"
                alt="9MX Logo"
                width={120}
                height={120}
                className="object-contain"
                style={{ background: 'transparent' }}
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Button size="sm" onClick={() => scrollToSection("about")}>Nosotros</Button>
            <Button size="sm" onClick={() => scrollToSection("products")}>Productos</Button>
            <Button size="sm" onClick={() => scrollToSection("events")}>Eventos</Button>
            <Button size="sm" onClick={() => scrollToSection("presentations")}>Presentaciones</Button>
            <div className="flex items-center gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => scrollToSection('products')}>Comenzar</Button>
              <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="https://www.9mc.org/es-ES/" target="_blank" rel="noopener noreferrer">Iniciar sesión</a>
              </Button>
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
            <Button className="text-left w-full" size="sm" onClick={() => scrollToSection("about")}>Nosotros</Button>
            <Button className="text-left w-full" size="sm" onClick={() => scrollToSection("products")}>Productos</Button>
            <Button className="text-left w-full" size="sm" onClick={() => scrollToSection("events")}>Eventos</Button>
            <Button className="text-left w-full" size="sm" onClick={() => scrollToSection("presentations")}>Presentaciones</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full" onClick={() => scrollToSection('products')}>Comenzar</Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 w-full" size="sm">
              <a href="https://www.9mc.org/es-ES/" target="_blank" rel="noopener noreferrer">Iniciar sesión</a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
