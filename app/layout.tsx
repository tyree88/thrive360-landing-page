import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThriveNavbar } from "@/components/ui/thrive-navbar"
import { ThriveFooter } from "@/components/ui/thrive-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Thrive360",
  description: "Comprehensive mental health platform for organizations and individuals",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThriveNavbar />
        <main>{children}</main>
        <ThriveFooter />
      </body>
    </html>
  )
}
