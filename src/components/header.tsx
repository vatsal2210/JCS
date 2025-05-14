
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export function Header() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/assets/JCS.png" alt="JCS Logo" width={50} height={50} />
          <span className="hidden font-bold sm:inline-block">
            Jain Community Services
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            Home
          </Link>
          <Link 
            href="/services" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/services') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            Services
          </Link>
          <Link 
            href="/events" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/events') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            Events
          </Link>
          <Link 
            href="/contact" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/contact') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}
