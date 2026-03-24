import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { WhatsappBubble } from "@/components/whatsapp-bubble"
import { Toaster } from "@/components/ui/toaster"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "9MX - La compañia que sabe cómo hacer crecer tu dinero",
  description: "Empoderar a los usuarios para lograr el crecimiento financiero.",
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/new-icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/new-icon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/new-icon.png",
        type: "image/svg+xml",
      },
    ]
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="shortcut icon" href="/icon-light-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={`font-sans antialiased`}>
  {children}
        <WhatsappBubble />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
