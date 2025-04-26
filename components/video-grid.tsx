"use client"

import { useState } from "react"
import { VideoCard } from "./video-card"

// Sample video data - in a real app, this would come from an API
const sampleVideos = [
  {
    id: "1",
    title: "Introduction to Mathematics",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "12:34",
    category: "Mathematics",
  },
  {
    id: "2",
    title: "Basic Physics Concepts",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "15:21",
    category: "Physics",
  },
  {
    id: "3",
    title: "World History: Ancient Civilizations",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "18:45",
    category: "History",
  },
  {
    id: "4",
    title: "Introduction to Biology",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "14:22",
    category: "Biology",
  },
  {
    id: "5",
    title: "Chemistry Fundamentals",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "16:08",
    category: "Chemistry",
  },
  {
    id: "6",
    title: "Learning English Grammar",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "11:52",
    category: "Languages",
  },
]

// Categories for filtering
const categories = ["All", "Mathematics", "Physics", "History", "Biology", "Chemistry", "Languages"]

export function VideoGrid({ lang }: { lang: string }) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter videos by category
  const filteredVideos =
    selectedCategory === "All" ? sampleVideos : sampleVideos.filter((video) => video.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === category ? "bg-teal-600 text-white" : "bg-muted hover:bg-muted/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} lang={lang} />
        ))}
      </div>
    </div>
  )
}
