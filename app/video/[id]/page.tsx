"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useTranslation } from "@/lib/translations"
import { useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"

// Sample video data - in a real app, this would come from an API
const sampleVideos = [
  {
    id: "1",
    titleKey: "video1",
    descriptionKey: "video1Description", // You'll need to add these to translations
    thumbnail: "/abstract-math-concepts.png",
    duration: "12:34",
    categoryKey: "mathematics",
  },
  {
    id: "2",
    titleKey: "video2",
    descriptionKey: "video2Description",
    thumbnail: "/placeholder.svg?key=pb7pf",
    duration: "15:21",
    categoryKey: "physics",
  },
  {
    id: "3",
    titleKey: "video3",
    descriptionKey: "video3Description",
    thumbnail: "/ancient-civilizations-classroom.png",
    duration: "18:45",
    categoryKey: "history",
  },
  {
    id: "4",
    titleKey: "video4",
    descriptionKey: "video4Description",
    thumbnail: "/diverse-biology-classroom.png",
    duration: "14:22",
    categoryKey: "biology",
  },
  {
    id: "5",
    titleKey: "video5",
    descriptionKey: "video5Description",
    thumbnail: "/placeholder.svg?key=qke9p",
    duration: "16:08",
    categoryKey: "chemistry",
  },
  {
    id: "6",
    titleKey: "video6",
    descriptionKey: "video6Description",
    thumbnail: "/placeholder.svg?height=180&width=320&query=english class",
    duration: "11:52",
    categoryKey: "languages",
  },
]

export default function VideoPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string
  const lang = searchParams.get("lang") || "en"
  const { setLanguage, t } = useTranslation()

  useEffect(() => {
    // Update the language based on URL parameter
    setLanguage(lang)
  }, [lang, setLanguage])

  // Find the video by ID
  const video = sampleVideos.find((v) => v.id === id) || sampleVideos[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentLang={lang} />
      <main className="flex-1 container mx-auto py-8 px-4">
        <Link
          href={`/catalog?lang=${lang}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t("backToCatalog")}
        </Link>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-6 shadow-lg">
              {/* This would be a video player in a real app */}
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={t(video.titleKey)}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-primary/90 p-4 shadow-md hover:bg-primary transition-colors cursor-pointer">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-heading font-medium mb-4">{t(video.titleKey)}</h1>
            <div className="flex items-center text-muted-foreground mb-6 text-sm">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{t(video.categoryKey)}</span>
              <span className="mx-2">•</span>
              <span>
                {t("duration")}: {video.duration}
              </span>
            </div>
            <p className="text-md leading-relaxed">
              {video.descriptionKey ? t(video.descriptionKey) : "No description available"}
            </p>
          </div>

          <div className="bg-muted/20 p-6 rounded-xl">
            <h2 className="text-xl font-medium mb-6 border-b pb-2">{t("relatedVideos")}</h2>
            <div className="space-y-5">
              {sampleVideos
                .filter((v) => v.id !== id)
                .slice(0, 3)
                .map((relatedVideo) => (
                  <Link
                    key={relatedVideo.id}
                    href={`/video/${relatedVideo.id}?lang=${lang}`}
                    className="flex gap-4 group hover:bg-muted/30 p-2 rounded-lg transition-colors"
                  >
                    <div className="relative w-28 h-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={relatedVideo.thumbnail || "/placeholder.svg"}
                        alt={t(relatedVideo.titleKey)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                        {t(relatedVideo.titleKey)}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t(relatedVideo.categoryKey)} • {relatedVideo.duration}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
