"use client"

import { VideoGrid } from "@/components/video-grid"
import { Navbar } from "@/components/navbar"
import { useTranslation } from "@/lib/translations"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const lang = searchParams.get("lang") || "en"
  const { setLanguage, t } = useTranslation()

  useEffect(() => {
    // Update the language based on URL parameter
    setLanguage(lang)
  }, [lang, setLanguage])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentLang={lang} />
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-semibold mb-3">{t("videos")}</h1>
          <p className="text-muted-foreground text-lg">Explore our educational content designed for global learning</p>
        </div>
      </div>
      <main className="flex-1 container mx-auto py-8 px-4">
        <VideoGrid lang={lang} />
      </main>
    </div>
  )
}
