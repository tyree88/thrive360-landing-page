"use client"

import { GlassNavbar } from "@/components/ui/glass-navbar"
import { Button } from "@/components/ui/button"
import { GlassTimeCard } from "@/components/ui/glass-time-card"

export function GlassNavbarDemo() {
  // Sample navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
  ]

  // Logo component
  const Logo = () => (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
        <span className="font-bold text-white">T</span>
      </div>
      <span className="font-bold text-lg">Thrive360</span>
    </div>
  )

  // Right side elements
  const rightElements = (
    <div className="hidden md:flex items-center gap-4">
      <Button variant="ghost" className="text-sm">
        Sign In
      </Button>
      <Button className="text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white border-none">
        Get Started
      </Button>
    </div>
  )

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=1068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <GlassNavbar logo={<Logo />} items={navItems} rightElements={rightElements} />
      <div className="container mx-auto pt-32 flex flex-col items-center gap-8">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Modern Glass UI Components</h1>
          <p className="text-xl text-white/80 mb-8">
            Beautiful, responsive glass morphism components for your Next.js applications
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/10">
              View Components
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-none">Get Started</Button>
          </div>
        </div>

        <div className="mt-12">
          <GlassTimeCard showSeconds showTimezone />
        </div>
      </div>
    </div>
  )
}
