"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const languages = [
  { value: "en", label: "English", regions: ["US", "GB", "CA", "AU", "NZ"] },
  { value: "es", label: "Español", regions: ["ES", "MX", "AR", "CO", "CL"] },
  { value: "fr", label: "Français", regions: ["FR", "CA", "BE", "CH"] },
  { value: "de", label: "Deutsch", regions: ["DE", "AT", "CH"] },
  { value: "pt", label: "Português", regions: ["PT", "BR"] },
  { value: "zh", label: "中文", regions: ["CN", "TW", "HK"] },
  { value: "hi", label: "हिन्दी", regions: ["IN"] },
  { value: "ar", label: "العربية", regions: ["SA", "AE", "EG", "MA", "DZ"] },
  { value: "sw", label: "Kiswahili", regions: ["KE", "TZ", "UG", "RW"] },
  { value: "bn", label: "বাংলা", regions: ["BD", "IN"] },
]

// Map country codes to languages
const countryToLanguage: Record<string, string> = {}
languages.forEach((lang) => {
  lang.regions.forEach((region) => {
    countryToLanguage[region] = lang.value
  })
})

export function LanguageSelector() {
  const [open, setOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [defaultLabel, setDefaultLabel] = useState("Select language")
  const router = useRouter()

  useEffect(() => {
    // Try to detect user's location and set default language
    const detectUserLanguage = async () => {
      try {
        // First try to use the browser's navigator.language
        const browserLang = navigator.language.split("-")[0]
        const matchedLang = languages.find((lang) => lang.value === browserLang)

        if (matchedLang) {
          setDefaultLabel(matchedLang.label)
          return
        }

        // If browser language doesn't match, try geolocation API
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()

        if (data && data.country) {
          const langCode = countryToLanguage[data.country] || "en"
          const langObj = languages.find((l) => l.value === langCode)
          if (langObj) {
            setDefaultLabel(langObj.label)
          }
        }
      } catch (error) {
        console.error("Error detecting location:", error)
        // Fallback to default
        setDefaultLabel("Select language")
      }
    }

    detectUserLanguage()
  }, [])

  const handleSelectLanguage = (currentValue: string) => {
    setSelectedLanguage(currentValue)
    setOpen(false)
    router.push(`/catalog?lang=${currentValue}`)
  }

  return (
    <div className="w-full max-w-xs">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {selectedLanguage
                ? languages.find((language) => language.value === selectedLanguage)?.label
                : defaultLabel}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
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
