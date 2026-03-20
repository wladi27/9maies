import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Products } from "@/components/products"
import { Events } from "@/components/events"
import { Presentations } from "@/components/presentations"
import { Rendimientos } from "@/components/rendimientos"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import AppDownloadSmall from "@/components/app-download-small"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Products />
      <Events />
      <Presentations />
      <Rendimientos />
      <AppDownloadSmall />
      <Footer />
      
    </main>
  )
}
