"use client"

import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
}

type Inputs = Omit<Product, "_id">

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isEditing, setIsEditing] = useState<Product | null>(null)
  const { register, handleSubmit, reset } = useForm<Inputs>()
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setEditValue,
  } = useForm<Inputs>()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products")
      if (!res.ok) {
        console.error("Failed to fetch products:", res.status, res.statusText)
        return
      }
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("Error parsing JSON:", error)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    fetchProducts()
    reset()
  }

  const onEditSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!isEditing) return
    await fetch(`/api/products/${isEditing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    fetchProducts()
    setIsEditing(null)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    })
    fetchProducts()
  }

  useEffect(() => {
    if (isEditing) {
      setEditValue("name", isEditing.name)
      setEditValue("description", isEditing.description)
      setEditValue("price", isEditing.price)
      setEditValue("image", isEditing.image)
    }
  }, [isEditing, setEditValue])

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Agregar Producto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Producto</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input placeholder="Nombre" {...register("name", { required: true })} />
              <Textarea placeholder="Descripción" {...register("description", { required: true })} />
              <Input placeholder="Precio" type="number" {...register("price", { required: true, valueAsNumber: true })} />
              <Input placeholder="URL de imagen" {...register("image", { required: true })} />
              <Button type="submit">Agregar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>


      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product._id} className="p-6 flex flex-col justify-between">
            <div>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-muted-foreground">{product.description}</p>
              <p className="text-lg font-bold mt-2">${product.price}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setIsEditing(product)} variant="outline">Editar</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar Producto</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitEdit(onEditSubmit)} className="space-y-4">
                    <Input placeholder="Name" {...registerEdit("name", { required: true })} />
                    <Textarea placeholder="Description" {...registerEdit("description", { required: true })} />
                    <Input placeholder="Price" type="number" {...registerEdit("price", { required: true, valueAsNumber: true })} />
                    <Input placeholder="Image URL" {...registerEdit("image", { required: true })} />
                    <Button type="submit">Guardar</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button onClick={() => handleDelete(product._id)} variant="destructive">Eliminar</Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
