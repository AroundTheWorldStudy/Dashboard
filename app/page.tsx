import Image from "next/image"
import { LanguageSelector } from "@/components/language-selector"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-background to-muted/20">
      <div className="flex flex-col items-center gap-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/images/logo.png"
            alt="Around The World Study Logo"
            width={180}
            height={180}
            priority
            className="animate-fade-in drop-shadow-md"
          />
          <h1 className="font-heading text-4xl md:text-5xl tracking-tight select-none">
            <span className="text-primary-900">aroundtheworld</span>
            <span className="text-primary">.study</span>
          </h1>
        </div>

        <LanguageSelector />
      </div>
    </main>
  )
}
