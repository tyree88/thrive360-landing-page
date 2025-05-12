"use client"

import { NavigationMenuDemo } from "./navigation-menu-demo"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function ThriveNavbar() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("Home")

  useEffect(() => {
    // Set active tab based on current path
    const currentPath = pathname.split("/")[1]

    if (currentPath === "businesses" || currentPath === "business-solutions") {
      setActiveTab("Businesses")
    } else if (currentPath === "eap-solutions" || currentPath === "benefits" || currentPath === "partnerships") {
      setActiveTab("Solutions")
    } else if (currentPath === "case-studies") {
      setActiveTab("Case Studies")
    } else if (pathname === "/") {
      setActiveTab("Home")
    }
  }, [pathname])

  return <NavigationMenuDemo />
}
