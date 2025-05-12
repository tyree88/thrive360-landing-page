"use client"

import { NavigationMenuDemo } from "./navigation-menu-demo"
import MobileMenu from "./MobileMenu"

export default function Navbar() {
  return (
    <div className="relative">
      <NavigationMenuDemo />
      <div className="absolute top-4 right-6 md:hidden">
        <MobileMenu />
      </div>
    </div>
  )
}
