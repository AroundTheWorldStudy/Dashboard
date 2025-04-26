"use client"

import { useState } from "react"
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

// Categories for filtering with translation keys
const categories = [
  { key: "all", titleKey: "all" },
  { key: "mathematics", titleKey: "mathematics" },
  { key: "physics", titleKey: "physics" },
  { key: "history", titleKey: "history" },
  { key: "biology", titleKey: "biology" },
  { key: "chemistry", titleKey: "chemistry" },
  { key: "languages", titleKey: "languages" },
]

export function VideoGrid({ lang }: { lang: string }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { t } = useTranslation()

  // Filter videos by category
  const filteredVideos =
    selectedCategory === "all" ? sampleVideos : sampleVideos.filter((video) => video.categoryKey === selectedCategory)

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-xl">
        <h2 className="text-lg font-medium mb-4">{t("categories")}</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                selectedCategory === category.key
                  ? "bg-primary text-white shadow-md"
                  : "bg-white hover:bg-primary/10 border border-gray-200"
              }`}
            >
              {t(category.titleKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
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
    </div>
  )
}
