'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Zap, LayoutDashboard, Calendar, Settings, Menu, X, Wallet, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  isActive?: boolean
}

interface LayoutProps {
  children: React.ReactNode
  title: string
}

export function Layout({ children, title }: LayoutProps) {
  const pathname = usePathname()
  
  // If we're on the login page, render without the layout
  if (pathname === '/login') {
    return <>{children}</>
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    {
      title: 'Main Dashboard',
      href: '/',
      icon: LayoutDashboard,
      isActive: pathname === '/'
    },
    {
      title: 'Calendar',
      href: '/calendar',
      icon: Calendar,
      isActive: pathname === '/calendar'
    },
    {
      title: 'Payments',
      href: '/payments',
      icon: Wallet,
      isActive: pathname === '/payments'
    },
    {
      title: 'Lights',
      href: '/lights',
      icon: Lightbulb,
      isActive: pathname === '/lights'
    },
    {
      title: 'Profile Settings',
      href: '/settings',
      icon: Settings,
      isActive: pathname === '/settings'
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-800 bg-black px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <Zap className="h-5 w-5" />
          <span>leap.qa</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-20 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-20 flex h-full w-64 flex-col border-r border-zinc-800 bg-black transition-transform duration-200 ease-in-out lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        "lg:top-0", // On desktop, start from top
        "top-14", // On mobile, start below header
      )}>
        <div className="hidden lg:flex h-14 items-center border-b border-zinc-800 px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white">
            <Zap className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white",
                item.isActive && "bg-zinc-800 text-white"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className={cn(
        "min-h-screen transition-[padding] duration-200 ease-in-out",
        "lg:pl-64" // Only add padding on desktop
      )}>
        <header className="sticky top-0 z-10 h-14 items-center justify-between border-b border-zinc-800 bg-black px-4 flex">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </header>
        <div className="p-4">
          {children}
        </div>
      </main>
    </div>
  )
}

