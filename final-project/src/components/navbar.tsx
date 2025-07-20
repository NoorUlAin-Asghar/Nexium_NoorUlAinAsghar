"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()
  const hideNavbarOn = ['/sign-in']
  const minimalNavbar = hideNavbarOn.includes(pathname)

  return (
    <nav className="px-3 py-1 shadow-md">
      <div className="text-[#008080] max-w-7xl mx-auto grid grid-cols-2 items-center">
        {/* Left-side nav items */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="text-3xl font-extrabold font-dancing">
                <Link href="/">Pitch Generator</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Conditionally show right-side nav */}
        { !minimalNavbar && (
          <div className="flex justify-end">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/docs">Generate</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/docs">Docs</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/sign-in">Sign In</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>
    </nav>
  )
}
