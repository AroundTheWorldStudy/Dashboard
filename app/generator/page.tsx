"use client"
import { Navbar } from "@/components/navbar"
import { FileUploader } from "@/components/file-uploader"
import { useTranslation } from "@/lib/translations"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Globe, Languages } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function GeneratorPage() {
  const searchParams = useSearchParams()
  const lang = searchParams.get("lang") || "en"
  const { t } = useTranslation()

  const handleUploadComplete = (url: string) => {
    // Just show a success message in the FileUploader component
    // No preview section to show
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/5">
      <Navbar currentLang={lang} />

      <div className="bg-gradient-to-b from-primary/5 to-transparent py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link
            href={`/catalog?lang=${lang}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t("backToCatalog")}
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Languages className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-semibold">{t("uploadVideo")}</h1>
          </div>
          <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
            Upload your video to translate it into multiple languages. Our AI will process your video and generate
            translations with natural-sounding voices.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto py-16 px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-medium">Upload Your Video</h2>
            <p className="text-sm text-muted-foreground">Select a video file to translate</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-primary" />
            <span>Supports 8 languages</span>
            <Badge variant="outline" className="ml-2 bg-primary/5">
              New
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <FileUploader onUploadComplete={handleUploadComplete} />
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-8">
                <h3 className="text-xl font-medium mb-6">Translation Languages</h3>
                <div className="grid grid-cols-2 gap-y-4">
                  {[
                    { code: "en", name: "English", flag: "🇺🇸" },
                    { code: "es", name: "Spanish", flag: "🇪🇸" },
                    { code: "fr", name: "French", flag: "🇫🇷" },
                    { code: "de", name: "German", flag: "🇩🇪" },
                    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
                    { code: "zh", name: "Chinese", flag: "🇨🇳" },
                    { code: "hi", name: "Hindi", flag: "🇮🇳" },
                    { code: "ar", name: "Arabic", flag: "🇸🇦" },
                  ].map((language) => (
                    <div key={language.code} className="flex items-center gap-3">
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t">
                  <h4 className="font-medium text-lg mb-4">How it works</h4>
                  <ol className="space-y-4 text-muted-foreground">
                    {[
                      "Upload your video file (max 10 minutes)",
                      "Our AI processes the audio and extracts the speech",
                      "The speech is translated into multiple languages",
                      "New audio is generated in each language",
                      "The translated audio is synchronized with your video",
                      "You'll receive an email when your translations are ready",
                    ].map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
