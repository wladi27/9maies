import { redirect } from 'next/navigation'

export default function AdminIndex() {
  // Redirige a la pantalla de login por defecto
  redirect('/admin/login')
}
