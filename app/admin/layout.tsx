"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Menu, Sun, Moon } from "lucide-react"

const navLinks = [
  { href: "/admin", label: "Inicio" },
  { href: "/admin/products", label: "Productos" },
  { href: "/admin/events", label: "Eventos" },
  { href: "/admin/participants", label: "Participantes" },
  { href: "/admin/training", label: "Entrenamiento" },
  { href: "/admin/contacts", label: "Contactos" },
  { href: "/admin/users", label: "Usuarios" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('admin-theme')
      if (saved === 'dark') setTheme('dark')
      else setTheme('light')
    } catch (e) {
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    // apply class to html element so global CSS variables take effect
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.remove('admin-light')
      root.classList.add('admin-night')
      localStorage.setItem('admin-theme', 'dark')
    } else {
      root.classList.remove('admin-night')
      root.classList.add('admin-light')
      localStorage.setItem('admin-theme', 'light')
    }
  }, [theme])

  return (
    <div className="admin-root min-h-screen">
      <div className="max-w-[1200px] mx-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <Card className="p-4 admin-card sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Menu size={18} />
                <h3 className="text-lg font-semibold">Admin</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </Button>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className={`block px-3 py-2 rounded ${pathname === l.href ? 'bg-[color:var(--primary)] text-white' : 'text-[color:var(--foreground)] hover:bg-[color:var(--primary)]/5'}`}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </Card>
        </aside>

        <main className="lg:col-span-3">
          <div className="space-y-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
