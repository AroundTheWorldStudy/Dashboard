import { VideoGrid } from "@/components/video-grid"
import { Navbar } from "@/components/navbar"

export default function CatalogPage({
  searchParams,
}: {
  searchParams: { lang?: string }
}) {
  const lang = searchParams.lang || "en"

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentLang={lang} />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-2xl font-light mb-8">Educational Videos</h1>
        <VideoGrid lang={lang} />
      </main>
    </div>
  )
}
