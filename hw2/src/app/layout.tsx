import type { Metadata } from "next"
import Link from "next/link"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Recipes App",
  description: "Mini recipes application built with Next.js App Router",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <nav className="max-w-4xl mx-auto flex items-center justify-between py-4 px-6">
            <Link href="/recipes" className="text-2xl font-bold">
              Recipes
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
