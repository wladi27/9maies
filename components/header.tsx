"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Cart } from "@/components/Cart"

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
            <button
              onClick={() => scrollToSection("training")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Entrenamiento
            </button>
            <div className="flex items-center gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => scrollToSection('contact')}>Comenzar</Button>
              <Cart />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <Cart />
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
            <button
              onClick={() => scrollToSection("training")}
              className="text-muted-foreground hover:text-primary transition-colors text-left"
            >
              Entrenamiento
            </button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full" onClick={() => scrollToSection('contact')}>Comenzar</Button>
          </nav>
        )}
      </div>
    </header>
  )
}
