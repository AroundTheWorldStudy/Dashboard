"use client"

import { useState, useEffect } from "react"
import { VideoCard } from "./video-card"
import { useTranslation } from "@/lib/translations"

// Sample video data - in a real app, this would come from an API
const sampleVideos = [
  {
    id: "1",
    titleKey: "video1",
    thumbnail: "/abstract-math-concepts.png",
    duration: "12:34",
    categoryKey: "mathematics",
  },
  {
    id: "2",
    titleKey: "video2",
    thumbnail: "/placeholder.svg?key=cl3p7",
    duration: "15:21",
    categoryKey: "physics",
  },
  {
    id: "3",
    titleKey: "video3",
    thumbnail: "/cradle-of-civilizations.png",
    duration: "18:45",
    categoryKey: "history",
  },
  {
    id: "4",
    titleKey: "video4",
    thumbnail: "/diverse-cell-landscape.png",
    duration: "14:22",
    categoryKey: "biology",
  },
  {
    id: "5",
    titleKey: "video5",
    thumbnail: "/periodic-table-display.png",
    duration: "16:08",
    categoryKey: "chemistry",
  },
  {
    id: "6",
    titleKey: "video6",
    thumbnail: "/grammar-fundamentals.png",
    duration: "11:52",
    categoryKey: "languages",
  },
]

export function VideoGrid({ lang }: { lang: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const [videos, setVideos] = useState<any[]>([])
  const { t } = useTranslation()

  // Simulate loading videos
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideos(sampleVideos)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
        </div>
        <p className="text-muted-foreground animate-pulse">Loading educational videos...</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={{
            ...video,
            title: t(video.titleKey),
            category: t(video.categoryKey),
          }}
          lang={lang}
        />
      ))}
    </div>
  )
}
