import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "./language-switcher"

export function Navbar({ currentLang }: { currentLang: string }) {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Around The World Study Logo" width={40} height={40} />
          <span className="font-light">aroundtheworld.study</span>
        </Link>

        <LanguageSwitcher currentLang={currentLang} />
      </div>
    </header>
  )
}
