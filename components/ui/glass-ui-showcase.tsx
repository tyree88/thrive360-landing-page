"use client"

import { GlassNavbar } from "@/components/ui/glass-navbar"
import { Button } from "@/components/ui/button"
import { GlassTimeCard } from "@/components/ui/glass-time-card"
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
  GlassCardFooter,
} from "@/components/ui/glass-card"

export function GlassUIShowcase() {
  // Sample navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "#components" },
    { label: "Examples", href: "#examples" },
    { label: "Documentation", href: "#docs" },
    { label: "GitHub", href: "https://github.com" },
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
      <Button variant="ghost" className="text-sm text-white hover:text-white hover:bg-white/10">
        Sign In
      </Button>
      <Button className="text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white border-none">
        Get Started
      </Button>
    </div>
  )

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=1068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <GlassNavbar logo={<Logo />} items={navItems} rightElements={rightElements} />

      <div className="container mx-auto pt-32 pb-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Glass UI Components</h1>
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

        <div className="mt-20" id="components">
          <h2 className="text-3xl font-bold mb-10 text-center">Component Showcase</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Time Card */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">Glass Time Card</h3>
              <GlassTimeCard showSeconds showTimezone />
            </div>

            {/* Glass Card - Default */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">Glass Card - Default</h3>
              <GlassCard className="w-full max-w-sm">
                <GlassCardHeader>
                  <GlassCardTitle>Default Card</GlassCardTitle>
                  <GlassCardDescription>A simple glass card with default styling</GlassCardDescription>
                </GlassCardHeader>
                <GlassCardContent>
                  <p>This card uses the default glass effect with medium intensity.</p>
                </GlassCardContent>
                <GlassCardFooter className="flex justify-end">
                  <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                    Learn More
                  </Button>
                </GlassCardFooter>
              </GlassCard>
            </div>

            {/* Glass Card - Elevated */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4">Glass Card - Elevated</h3>
              <GlassCard variant="elevated" intensity="heavy" className="w-full max-w-sm">
                <GlassCardHeader>
                  <GlassCardTitle>Elevated Card</GlassCardTitle>
                  <GlassCardDescription>A glass card with elevated styling and heavy intensity</GlassCardDescription>
                </GlassCardHeader>
                <GlassCardContent>
                  <p>This card uses the elevated glass effect with heavy intensity for more prominence.</p>
                </GlassCardContent>
                <GlassCardFooter className="flex justify-between">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-none">
                    Submit
                  </Button>
                </GlassCardFooter>
              </GlassCard>
            </div>
          </div>
        </div>

        <div className="mt-20" id="examples">
          <h2 className="text-3xl font-bold mb-10 text-center">Usage Examples</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Login Form */}
            <GlassCard variant="elevated" className="w-full max-w-md mx-auto">
              <GlassCardHeader>
                <GlassCardTitle>Sign In</GlassCardTitle>
                <GlassCardDescription>Enter your credentials to access your account</GlassCardDescription>
              </GlassCardHeader>
              <GlassCardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </GlassCardContent>
              <GlassCardFooter className="flex flex-col gap-4">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white border-none">
                  Sign In
                </Button>
                <p className="text-sm text-center">
                  Don't have an account?{" "}
                  <a href="#" className="text-purple-300 hover:underline">
                    Sign up
                  </a>
                </p>
              </GlassCardFooter>
            </GlassCard>

            {/* Feature Showcase */}
            <GlassCard variant="bordered" intensity="light" className="w-full">
              <GlassCardHeader>
                <GlassCardTitle>Glass UI System Features</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Responsive design that works on all devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Customizable intensity and variant options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Composable components for flexible layouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Seamless integration with Next.js and Tailwind CSS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Accessible and keyboard navigable</span>
                  </li>
                </ul>
              </GlassCardContent>
              <GlassCardFooter>
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/10">
                  View Documentation
                </Button>
              </GlassCardFooter>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
