"use client"

import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "@/lib/translations"
import { useEffect } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar({ currentLang }: { currentLang: string }) {
  const { setLanguage, t } = useTranslation()

  // Ensure the navbar uses the current language from URL
  useEffect(() => {
    if (currentLang) {
      setLanguage(currentLang)
    }
  }, [currentLang, setLanguage])

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Around The World Study Logo" width={40} height={40} />
          <span className="font-heading text-lg tracking-tight select-none">
            <span className="text-primary-900">aroundtheworld</span>
            <span className="text-primary">.study</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href={`/generator?lang=${currentLang}`}>
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
              <Upload className="h-4 w-4" />
              {t("uploadVideo")}
            </Button>
          </Link>
          <LanguageSwitcher currentLang={currentLang} />
        </div>
      </div>
    </header>
  )
}
