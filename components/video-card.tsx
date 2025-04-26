import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  category: string
}

export function VideoCard({ video, lang }: { video: Video; lang: string }) {
  return (
    <Link href={`/video/${video.id}?lang=${lang}`} className="group">
      <div className="overflow-hidden rounded-lg border bg-background transition-colors hover:bg-accent/10">
        <div className="relative aspect-video">
          <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="rounded-full bg-teal-600/90 p-3">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-xs text-white rounded">
            {video.duration}
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium line-clamp-2">{video.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{video.category}</p>
        </div>
      </div>
    </Link>
  )
}
