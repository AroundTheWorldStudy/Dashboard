"use client"

import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "@/lib/translations"
import { useEffect } from "react"

export function Navbar({ currentLang }: { currentLang: string }) {
  const { setLanguage } = useTranslation()

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
          <span className="font-heading text-lg tracking-tight">
            aroundtheworld<span className="text-primary">.study</span>
          </span>
        </Link>

        <LanguageSwitcher currentLang={currentLang} />
      </div>
    </header>
  )
}
