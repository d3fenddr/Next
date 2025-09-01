import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Sell CRUD",
  description: "Simple CRUD on Next.js App Router",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
