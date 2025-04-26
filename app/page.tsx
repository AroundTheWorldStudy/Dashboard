import Image from "next/image"
import { LanguageSelector } from "@/components/language-selector"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="flex flex-col items-center gap-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/images/logo.png"
            alt="Around The World Study Logo"
            width={150}
            height={150}
            priority
            className="animate-fade-in"
          />
        </div>

        <LanguageSelector />
      </div>
    </main>
  )
}
