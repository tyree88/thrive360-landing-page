"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ThriveLogo } from "./thrive-logo"
import { Button } from "./button"
import { ROUTES } from "@/lib/constants"

export function NavigationMenuDemo() {
  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-slate-950 fixed top-0 left-0 z-50">
      <div className="flex-shrink-0">
        {/* Remove the Link wrapper around ThriveLogo */}
        <ThriveLogo variant="white" type="full" size="small" />
      </div>

      <div className="flex-grow flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white bg-transparent hover:bg-slate-800">
                Solutions
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] bg-slate-900">
                  <ListItem href="/businesses" title="For Businesses">
                    Comprehensive mental health solutions for organizations
                  </ListItem>
                  <ListItem href="/business-solutions" title="Business Solutions">
                    Tailored approaches to improve workplace wellbeing
                  </ListItem>
                  <ListItem href="/solutions/teletherapy" title="Teletherapy Solutions">
                    Advanced teletherapy with Neuroplastic Engagement™
                  </ListItem>
                  <ListItem href="/eap-solutions" title="EAP Solutions">
                    Enhanced employee assistance programs
                  </ListItem>
                  <ListItem href="/benefits" title="Benefits">
                    Mental health benefits for your team
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white bg-transparent hover:bg-slate-800">
                Company
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] bg-slate-900">
                  <ListItem href={ROUTES.ABOUT} title="About Us">
                    Our mission and vision
                  </ListItem>
                  <ListItem href="/partnerships" title="Partnerships">
                    Strategic collaborations for better care
                  </ListItem>
                  <ListItem href="/case-studies" title="Case Studies">
                    Real-world examples of our impact
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white bg-transparent hover:bg-slate-800">
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] bg-slate-900">
                  <ListItem href={ROUTES.RESOURCES} title="Resources">
                    Helpful information and tools
                  </ListItem>
                  <ListItem href="/case-studies" title="Case Studies">
                    Success stories and outcomes
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex-shrink-0">
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
          <Link href={ROUTES.CONTACT}>Talk to Our Team</Link>
        </Button>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white text-slate-100",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-slate-400">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
