import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/lib/translations"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "block",
})

export const metadata: Metadata = {
  title: "Around The World Study",
  description: "Educational content for underserved communities and cultures",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TranslationProvider>{children}</TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
