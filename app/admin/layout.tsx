"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Menu, Package2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  const navLinks = [
    { href: "/admin", label: "Inicio" },
    { href: "/admin/products", label: "Productos" },
    { href: "/admin/events", label: "Eventos" },
    { href: "/admin/participants", label: "Participantes" },
    { href: "/admin/training", label: "Entrenamiento" },
    { href: "/admin/contacts", label: "Contactos" },
    { href: "/admin/users", label: "Usuarios" },
  ]

  useEffect(() => {
    let mounted = true
    fetch('/api/auth/me')
      .then((r) => {
        if (!mounted) return
        if (!r.ok) {
          router.push('/login')
          return
        }
        return r.json()
      })
      .then((data) => {
        if (!mounted) return
        const role = data?.user?.role
        if (role !== 'admin') {
          router.push('/login')
        }
      })
      .catch(() => router.push('/login'))
      .finally(() => mounted && setChecking(false))

    return () => { mounted = false }
  }, [router])

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center">Comprobando autenticación…</div>
    )
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Panel de Administración</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === link.href ? "bg-muted text-primary" : ""
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SheetHeader className="sr-only">
                <SheetTitle>Navegación</SheetTitle>
                <SheetDescription>Menú de navegación del panel de administración</SheetDescription>
              </SheetHeader>
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Admin Dashboard</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${pathname === link.href ? "bg-muted" : ""
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
