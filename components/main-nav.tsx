"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, BookOpen, Home, LogOut, MessageSquare, Settings, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Practice",
    href: "/practice",
    icon: MessageSquare,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: BarChart3,
  },
  {
    name: "Resources",
    href: "/resources",
    icon: BookOpen,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
]

export function MainNav() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = async () => {
    if (!isClient) return
    const success = await logout()
    if (true) {
      router.push("/auth/login")
    }
  }

  const { logout } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center mr-6">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SpeakSpace
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-1 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all",
                  isActive ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/50",
                )}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Link>
            )
          })}
        </div>
        <div className="flex items-center ml-auto">
          <Button variant="ghost" size="icon" className="mr-2" aria-label="Settings">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-red-500" aria-label="Log out" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="md:hidden flex overflow-x-auto py-2 px-4 border-t">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center px-3 py-1 text-xs font-medium rounded-md transition-all min-w-[4rem]",
                isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600",
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
