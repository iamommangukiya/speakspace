"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Loader2 } from "lucide-react"

export function AuthWall({ children }: { children: React.ReactNode }) {
  // Keep these for compatibility with other components
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Comment out or remove the redirect logic
  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.push("/auth/login?redirect=" + encodeURIComponent(window.location.pathname))
  //   }
  // }, [isAuthenticated, isLoading, router])

  // Skip loading state check
  if (isLoading) {
    // Return children instead of loading screen
    return <>{children}</>
  }

  // Always render children regardless of authentication status
  return <>{children}</>
}
