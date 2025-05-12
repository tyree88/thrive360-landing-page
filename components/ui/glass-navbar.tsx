"use client"

import type * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

interface NavItem {
  label: string
  href: string
}

interface GlassNavbarProps {
  logo?: React.ReactNode
  items?: NavItem[]
  rightElements?: React.ReactNode
  className?: string
}

export function GlassNavbar({ logo, items = [], rightElements, className }: GlassNavbarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("sticky top-0 z-50 w-full", className)}>
      <div className="w-full bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            {logo && (
              <Link href="/" className="flex items-center gap-2">
                {logo}
              </Link>
            )}

            <nav className="hidden md:flex items-center gap-6">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {rightElements}

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white/80 backdrop-blur-xl">
                <nav className="flex flex-col gap-4 mt-8">
                  {items.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-primary p-2",
                        pathname === item.href ? "text-foreground bg-white/20 rounded-md" : "text-muted-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  )
}
