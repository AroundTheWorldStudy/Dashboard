import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"

// Sample video data - in a real app, this would come from an API
const sampleVideos = [
  {
    id: "1",
    title: "Introduction to Mathematics",
    description:
      "This video introduces basic mathematical concepts that form the foundation of higher mathematics. Perfect for beginners and those looking to refresh their knowledge.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "12:34",
    category: "Mathematics",
  },
  {
    id: "2",
    title: "Basic Physics Concepts",
    description:
      "Learn about the fundamental concepts in physics including motion, energy, and forces. This video provides a clear explanation with visual examples.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "15:21",
    category: "Physics",
  },
  {
    id: "3",
    title: "World History: Ancient Civilizations",
    description:
      "Explore the fascinating world of ancient civilizations, their cultures, achievements, and lasting impact on our modern world.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "18:45",
    category: "History",
  },
  {
    id: "4",
    title: "Introduction to Biology",
    description:
      "Discover the science of life in this introductory video that covers cells, genetics, evolution, and the diversity of living organisms.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "14:22",
    category: "Biology",
  },
  {
    id: "5",
    title: "Chemistry Fundamentals",
    description:
      "This video covers the basic principles of chemistry, including atoms, elements, compounds, and chemical reactions.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "16:08",
    category: "Chemistry",
  },
  {
    id: "6",
    title: "Learning English Grammar",
    description:
      "A comprehensive guide to English grammar rules and usage, designed for non-native speakers who want to improve their language skills.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "11:52",
    category: "Languages",
  },
]

export default function VideoPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { lang?: string }
}) {
  const { id } = params
  const lang = searchParams.lang || "en"

  // Find the video by ID
  const video = sampleVideos.find((v) => v.id === id) || sampleVideos[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentLang={lang} />
      <main className="flex-1 container mx-auto py-8 px-4">
        <Link
          href={`/catalog?lang=${lang}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to catalog
        </Link>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-4">
              {/* This would be a video player in a real app */}
              <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-teal-600/90 p-4">
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

            <h1 className="text-2xl font-medium mb-2">{video.title}</h1>
            <p className="text-muted-foreground mb-4">
              {video.category} • {video.duration}
            </p>
            <p className="text-sm">{video.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">Related Videos</h2>
            <div className="space-y-4">
              {sampleVideos
                .filter((v) => v.id !== id)
                .slice(0, 3)
                .map((relatedVideo) => (
                  <Link
                    key={relatedVideo.id}
                    href={`/video/${relatedVideo.id}?lang=${lang}`}
                    className="flex gap-3 group"
                  >
                    <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={relatedVideo.thumbnail || "/placeholder.svg"}
                        alt={relatedVideo.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium group-hover:text-teal-600 line-clamp-2">
                        {relatedVideo.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {relatedVideo.category} • {relatedVideo.duration}
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
