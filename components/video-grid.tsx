"use client"

import { useState, useEffect } from "react"
import { VideoCard } from "./video-card"
import { useTranslation } from "@/lib/translations"

// Sample video data - in a real app, this would come from an API
const sampleVideos = []

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
