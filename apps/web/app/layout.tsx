import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: 'Electoral Roll Search - Thoothukudi AC 210 | TNSEC',
  description: 'Search electoral roll for Thoothukudi Assembly Constituency 210. Tamil Nadu State Election Commission voter information system.',
  keywords: ['electoral roll', 'voter search', 'Thoothukudi', 'AC 210', 'TNSEC', 'Tamil Nadu Election'],
  authors: [{ name: 'Tamil Nadu State Election Commission' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Electoral Roll Search - Thoothukudi AC 210',
    description: 'Search electoral roll for Thoothukudi Assembly Constituency 210',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
