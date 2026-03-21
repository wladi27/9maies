"use client"

import React from "react"
import { usePathname } from "next/navigation"

export function WhatsappBubble() {
  const pathname = usePathname()
  // Do not show on admin routes
  if (pathname?.startsWith("/admin")) return null

  return (
    <a
      href="https://wa.me/+50769604272"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir chat de WhatsApp"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50"
    >
      <span className="sr-only">WhatsApp</span>
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-transform hover:scale-105 flex items-center justify-center ring-2 ring-white/80">
        {/* WhatsApp logo (inline SVG) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="24"
          height="24"
          aria-hidden="true"
          className="drop-shadow-sm"
        >
          <path
            fill="currentColor"
            d="M27.1 4.9C24.3 2.1 20.6.5 16.7.5 8.6.5 1.9 7.2 1.9 15.3c0 2.7.7 5.3 2.1 7.6L2 30l7.3-2c2.2 1.2 4.7 1.9 7.3 1.9 8.1 0 14.8-6.6 14.8-14.8 0-3.9-1.6-7.6-4.4-10.2zM16.6 27.2c-2.3 0-4.6-.6-6.5-1.8l-.5-.3-4.3 1.2 1.2-4.2-.3-.6c-1.3-2-2-4.4-2-6.9 0-6.9 5.6-12.5 12.5-12.5 3.4 0 6.5 1.3 8.8 3.6 2.3 2.3 3.7 5.5 3.7 8.8 0 6.9-5.6 12.5-12.6 12.5zm7.3-9.4c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.7-.2-1 .2-.3.4-1.2 1.2-1.5 1.4-.3.3-.6.3-1 .1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.3-2.7-.2-.4-.1-.6.1-.9.2-.2.4-.6.6-.9.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8-.1-.2-1-2.4-1.4-3.2-.4-.8-.7-.7-1-.7H9.6c-.3 0-.8.1-1.1.5-.4.4-1.5 1.5-1.5 3.6s1.5 4.1 1.7 4.4c.2.3 3 4.6 7.3 6.3 1 .4 1.8.7 2.4.9 1 .3 1.9.2 2.6.1.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.6-.4z"
          />
        </svg>
      </div>
    </a>
  )
}
