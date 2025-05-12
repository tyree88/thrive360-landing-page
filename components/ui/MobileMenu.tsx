"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants"

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-slate-950 text-white border-slate-800 p-0">
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-4 p-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-sm font-medium text-slate-400 mb-3">Solutions</h3>
              <div className="flex flex-col space-y-3">
                <Link href="/businesses" className="text-white hover:text-slate-300" onClick={() => setOpen(false)}>
                  For Businesses
                </Link>
                <Link
                  href="/business-solutions"
                  className="text-white hover:text-slate-300"
                  onClick={() => setOpen(false)}
                >
                  Business Solutions
                </Link>
                <Link href="/eap-solutions" className="text-white hover:text-slate-300" onClick={() => setOpen(false)}>
                  EAP Solutions
                </Link>
                <Link href="/benefits" className="text-white hover:text-slate-300" onClick={() => setOpen(false)}>
                  Benefits
                </Link>
              </div>
            </div>

            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-sm font-medium text-slate-400 mb-3">Company</h3>
              <div className="flex flex-col space-y-3">
                <Link href={ROUTES.ABOUT} className="text-white hover:text-slate-300" onClick={() => setOpen(false)}>
                  About Us
                </Link>
                <Link href="/partnerships" className="text-white hover:text-slate-300" onClick={() => setOpen(false)}>
                  Partnerships
                </Link>
                <Link href="/case-studies" className="text-white hover:text-slate-300" onClick={() => setOpen(false)}>
                  Case Studies
                </Link>
              </div>
            </div>

            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-sm font-medium text-slate-400 mb-3">Resources</h3>
              <div className="flex flex-col space-y-3">
                <Link
                  href={ROUTES.RESOURCES}
                  className="text-white hover:text-slate-300"
                  onClick={() => setOpen(false)}
                >
                  Resources
                </Link>
                <Link href="/case-studies" className="text-white hover:text-slate-300" onClick={() => setOpen(false)}>
                  Case Studies
                </Link>
              </div>
            </div>
          </nav>

          <div className="mt-auto p-6">
            <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
              <Link href={ROUTES.CONTACT} onClick={() => setOpen(false)}>
                Talk to Our Team
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
