import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, Apple, Download } from "lucide-react"

export function AppDownload() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/30 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12 space-y-6">
                <div className="inline-block px-4 py-2 bg-primary/20 rounded-full">
                  <span className="text-primary font-semibold">Descarga la App</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">9M AI Corporation</h2>
                <p className="text-lg text-muted-foreground">
                  La IA abre nuevos horizontes para tus inversiones. Combina tu capital con excelentes operaciones.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Control Total</h4>
                      <p className="text-sm text-muted-foreground">Gestiona tus inversiones desde cualquier lugar</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Download className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Acceso Instantáneo</h4>
                      <p className="text-sm text-muted-foreground">Base de datos, invitar amigos, ranking y desafíos</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a href="https://mzy4zmy3.chugewujin.com/TisCdi82IFuS7JN3?5c2f43=218ee5288dff190e7846e90271317d50"><Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
                    <Apple className="w-5 h-5 mr-2" />
                    App Store
                  </Button></a>
                  <a href="https://9m-download.s3.ap-southeast-1.amazonaws.com/Android/apk/9M-Release-1.0.18(26).apk"><Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
                    <Download className="w-5 h-5 mr-2" />
                    Google Play
                  </Button></a>
                </div>
              </div>
              <div className="relative h-96 md:h-full min-h-[500px]">
                <Image src="/images/kv-402x.png" alt="9M AI Mobile App" fill className="object-contain p-4" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
