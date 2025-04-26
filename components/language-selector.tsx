"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/translations"

const languages = [
  {
    value: "en",
    label: "English",
    regions: ["US", "GB", "CA", "AU", "NZ"],
    selectText: "Select language",
    searchText: "Search language...",
    noLanguageFound: "No language found.",
  },
  {
    value: "es",
    label: "Español",
    regions: [
      "ES",
      "MX",
      "AR",
      "CO",
      "CL",
      "PE",
      "VE",
      "EC",
      "GT",
      "CU",
      "BO",
      "DO",
      "HN",
      "PY",
      "SV",
      "NI",
      "CR",
      "PA",
      "UY",
    ],
    selectText: "Seleccionar idioma",
    searchText: "Buscar idioma...",
    noLanguageFound: "No se encontró ningún idioma.",
  },
  {
    value: "fr",
    label: "Français",
    regions: [
      "FR",
      "CA",
      "BE",
      "CH",
      "LU",
      "MC",
      "CI",
      "SN",
      "ML",
      "NE",
      "BF",
      "TG",
      "BJ",
      "GA",
      "CD",
      "MG",
      "CM",
      "MU",
    ],
    selectText: "Sélectionner la langue",
    searchText: "Rechercher une langue...",
    noLanguageFound: "Aucune langue trouvée.",
  },
  {
    value: "de",
    label: "Deutsch",
    regions: ["DE", "AT", "CH", "LU", "LI"],
    selectText: "Sprache auswählen",
    searchText: "Sprache suchen...",
    noLanguageFound: "Keine Sprache gefunden.",
  },
  {
    value: "pt",
    label: "Português",
    regions: ["PT", "BR", "AO", "MZ", "GW", "CV", "ST", "TL"],
    selectText: "Selecionar idioma",
    searchText: "Pesquisar idioma...",
    noLanguageFound: "Nenhum idioma encontrado.",
  },
  {
    value: "zh",
    label: "中文",
    regions: ["CN", "TW", "HK", "SG", "MO"],
    selectText: "选择语言",
    searchText: "搜索语言...",
    noLanguageFound: "未找到语言。",
  },
  {
    value: "hi",
    label: "हिन्दी",
    regions: ["IN", "FJ"],
    selectText: "भाषा चुनें",
    searchText: "भाषा खोजें...",
    noLanguageFound: "कोई भाषा नहीं मिली।",
  },
  {
    value: "ar",
    label: "العربية",
    regions: [
      "SA",
      "AE",
      "EG",
      "MA",
      "DZ",
      "TN",
      "LY",
      "JO",
      "LB",
      "IQ",
      "SY",
      "KW",
      "QA",
      "BH",
      "OM",
      "YE",
      "SD",
      "SO",
      "DJ",
    ],
    selectText: "اختر اللغة",
    searchText: "ابحث عن لغة...",
    noLanguageFound: "لم يتم العثور على لغة.",
  },
  {
    value: "sw",
    label: "Kiswahili",
    regions: ["KE", "TZ", "UG", "RW", "BI", "CD", "SS", "SO", "MZ", "ZM", "MW"],
    selectText: "Chagua lugha",
    searchText: "Tafuta lugha...",
    noLanguageFound: "Hakuna lugha iliyopatikana.",
  },
  {
    value: "bn",
    label: "বাংলা",
    regions: ["BD", "IN"],
    selectText: "ভাষা নির্বাচন করুন",
    searchText: "ভাষা অনুসন্ধান করুন...",
    noLanguageFound: "কোন ভাষা পাওয়া যায়নি।",
  },
]

// Map country codes to languages
const countryToLanguage: Record<string, string> = {}
languages.forEach((lang) => {
  lang.regions.forEach((region) => {
    countryToLanguage[region] = lang.value
  })
})

// Minimum loading time in milliseconds
const MIN_LOADING_TIME = 2500

export function LanguageSelector() {
  const [open, setOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [detectedLang, setDetectedLang] = useState<string>("en")
  const [isLoading, setIsLoading] = useState(true)
  const [loadingText, setLoadingText] = useState("Detecting language...")
  const router = useRouter()
  const { setLanguage } = useTranslation()

  // Get the localized text based on detected language
  const getLocalizedSelectText = () => {
    const lang = languages.find((l) => l.value === detectedLang)
    return lang?.selectText || "Select language"
  }

  const getLocalizedSearchText = () => {
    const lang = languages.find((l) => l.value === detectedLang)
    return lang?.searchText || "Search language..."
  }

  const getLocalizedNoLanguageFound = () => {
    const lang = languages.find((l) => l.value === detectedLang)
    return lang?.noLanguageFound || "No language found."
  }

  useEffect(() => {
    // Try to detect user's location and set default language
    const detectUserLanguage = async () => {
      setIsLoading(true)
      const startTime = Date.now()

      // Array of loading messages to cycle through
      const loadingMessages = [
        "Detecting language...",
        "Locating region...",
        "Analyzing location...",
        "Setting up preferences...",
      ]

      // Set up message cycling
      const messageInterval = setInterval(() => {
        setLoadingText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
      }, 800)

      try {
        let detectedLanguageCode = "en"

        // First try to use the browser's navigator.language
        const browserLang = navigator.language.split("-")[0]
        const matchedLang = languages.find((lang) => lang.value === browserLang)

        if (matchedLang) {
          detectedLanguageCode = matchedLang.value
        } else {
          // If browser language doesn't match, try geolocation API
          const response = await fetch("https://ipapi.co/json/")
          const data = await response.json()

          if (data && data.country) {
            detectedLanguageCode = countryToLanguage[data.country] || "en"
          }
        }

        // Calculate how much time has passed
        const elapsedTime = Date.now() - startTime

        // If detection was fast, wait until minimum loading time is reached
        if (elapsedTime < MIN_LOADING_TIME) {
          await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME - elapsedTime))
        }

        // Set the detected language
        setDetectedLang(detectedLanguageCode)
      } catch (error) {
        console.error("Error detecting location:", error)
        // Fallback to default
        setDetectedLang("en")
      } finally {
        clearInterval(messageInterval)
        setIsLoading(false)
      }
    }

    detectUserLanguage()
  }, [])

  const handleSelectLanguage = (currentValue: string) => {
    setSelectedLanguage(currentValue)
    setLanguage(currentValue) // Update the global language state
    setOpen(false)
    router.push(`/catalog?lang=${currentValue}`)
  }

  return (
    <div className="w-full max-w-xs">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Globe className={cn("h-4 w-4", isLoading && "animate-spin")} />
              {isLoading ? (
                <span className="text-muted-foreground animate-pulse">{loadingText}</span>
              ) : (
                getLocalizedSelectText()
              )}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={getLocalizedSearchText()} />
            <CommandList>
              <CommandEmpty>{getLocalizedNoLanguageFound()}</CommandEmpty>
              <CommandGroup>
                {languages.map((language) => (
                  <CommandItem key={language.value} value={language.value} onSelect={handleSelectLanguage}>
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedLanguage === language.value ? "opacity-100" : "opacity-0")}
                    />
                    {language.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
