"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, BookOpen, Calendar, Home, MessageSquare, User } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { StarRating } from "@/components/star-rating"

const navItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  // {
  //   name: "Practice",
  //   href: "/practice",
  //   icon: Calendar,
  // },
  {
    name: "Live Sessions",
    href: "/live-sessions",
    icon: MessageSquare,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: BarChart3,
  },
  {
    name: "Resume",
    href: "/resume",
    icon: BookOpen,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
]

export function MainNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [userRating, setUserRating] = useState(4)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Get user rating from localStorage or API
    const storedRating = localStorage.getItem("speakspace_user_rating")
    if (storedRating) {
      setUserRating(Number.parseFloat(storedRating))
    }

    // Get theme preference
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme === "dark") {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      document.documentElement.classList.remove("dark")
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center mr-6">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SpeakSpace
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-1 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all",
                  isActive
                    ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50"
                    : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-blue-950/30",
                )}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Link>
            )
          })}
        </div>
        <div className="flex items-center ml-auto gap-4">
          <div className="hidden md:flex items-center">
            <StarRating value={userRating} max={5} readOnly size="sm" className="mr-3" />
            <span className="text-sm font-medium dark:text-white">{user?.name?.split(" ")[0] || "User"}</span>
          </div>
          <UserNav />
        </div>
      </div>

      <div className="md:hidden flex overflow-x-auto py-2 px-4 border-t">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center px-3 py-1 text-xs font-medium rounded-md transition-all min-w-[4rem]",
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400",
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
