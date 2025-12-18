import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Products } from "@/components/products"
import { Events } from "@/components/events"
import { Team } from '@/components/team'
import { Presentations } from "@/components/presentations"
import { Training } from "@/components/training"
import { Footer } from "@/components/footer"
import { ContactForm } from '@/components/contact-form'
import { Header } from "@/components/header"
import { AppDownload } from "@/components/app-download"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Team />
      <Products />
      <Events />
      <Presentations />
      <Training />
      <AppDownload />
      <ContactForm id="contact" />
      <Footer />
      
    </main>
  )
}
