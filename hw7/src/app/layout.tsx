import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Users → Posts",
  description: "/users, /users/[id], /users/[id]/posts",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="w-full sticky top-0 z-50 bg-white/70 dark:bg-black/40 backdrop-blur px-4 py-2 border-b border-black/[.08] dark:border-white/[.145]">
          <div className="max-w-screen-lg mx-auto flex items-center justify-between">
            <Link href="/" className="text-sm/6 font-medium hover:underline">
              Home
            </Link>
            <Link
              href="/users"
              className="text-sm/6 font-medium hover:underline"
            >
              /users
            </Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
