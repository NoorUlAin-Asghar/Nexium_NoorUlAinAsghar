'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavbarOn = ['/sign-in', '/sign-up']
  const shouldHideNavbar = hideNavbarOn.includes(pathname)

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  )
}
