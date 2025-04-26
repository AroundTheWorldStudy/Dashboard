"use client"

import { useRouter } from "next/navigation"
import { Check, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/lib/translations"

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "pt", label: "Português" },
  { value: "zh", label: "中文" },
  { value: "hi", label: "हिन्दी" },
  { value: "ar", label: "العربية" },
  { value: "sw", label: "Kiswahili" },
  { value: "bn", label: "বাংলা" },
]

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter()
  const { setLanguage } = useTranslation()
  const currentLanguage = languages.find((lang) => lang.value === currentLang) || languages[0]

  const handleSelectLanguage = (value: string) => {
    setLanguage(value)
    router.push(`/catalog?lang=${value}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          <span>{currentLanguage.label}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.value}
            onClick={() => handleSelectLanguage(language.value)}
            className="flex items-center gap-2"
          >
            {language.value === currentLang && <Check className="h-4 w-4" />}
            <span className={language.value === currentLang ? "font-medium" : ""}>{language.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
