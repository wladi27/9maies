"use client"

import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'

export function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function sendWhatsApp() {
    const lines: string[] = []
    lines.push('Nuevo pedido desde el sitio:')
    if (name) lines.push(`Nombre: ${name}`)
    if (phone) lines.push(`Teléfono: ${phone}`)
    lines.push('\nProductos:')
    cartItems.forEach((it) => {
      lines.push(`- ${it.name} x ${it.quantity} = $${(it.price * it.quantity).toFixed(2)}`)
    })
    lines.push(`\nTotal: $${total.toFixed(2)}`)
    if (note) {
      lines.push('\nNota:')
      lines.push(note)
    }
    const message = lines.join('\n')

    const businessNumber = '+34614211245'
    const digits = businessNumber.replace(/\D/g, '')
    const url = 'https://api.whatsapp.com/send?phone=' + digits + '&text=' + encodeURIComponent(message)
    window.open(url, '_blank')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-md">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-muted-foreground">Tu carrito está vacío.</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto py-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {cartItems.length > 0 && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between font-bold text-lg mb-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <Input placeholder="Nombre (para el pedido)" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
                <Input placeholder="Teléfono (opcional)" value={phone} onChange={(e) => setPhone((e.target as HTMLInputElement).value)} />
                <Textarea placeholder="Nota o instrucciones" value={note} onChange={(e) => setNote((e.target as HTMLTextAreaElement).value)} />
              </div>

                          <div className="flex-1">
                            <Button className="w-full" onClick={sendWhatsApp}>Enviar por WhatsApp</Button>
                          </div>

                <Button variant="outline" className="sm:w-40" onClick={clearCart}>
                  Vaciar Carrito
                </Button>
              </div>
              
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
