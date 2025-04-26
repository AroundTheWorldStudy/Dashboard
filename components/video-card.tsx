"use client"

import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { useTranslation } from "@/lib/translations"

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  category: string
}

export function VideoCard({ video, lang }: { video: Video; lang: string }) {
  const { t } = useTranslation()

  return (
    <Link href={`/video/${video.id}?lang=${lang}`} className="group">
      <div className="overflow-hidden rounded-xl border bg-background transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
        <div className="relative aspect-video">
          <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="rounded-full bg-primary p-3 shadow-lg">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-xs text-white rounded-md">
            {video.duration}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium line-clamp-2 text-lg group-hover:text-primary transition-colors">{video.title}</h3>
          <p className="text-xs text-muted-foreground mt-2 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            {video.category}
          </p>
        </div>
      </div>
    </Link>
  )
}
