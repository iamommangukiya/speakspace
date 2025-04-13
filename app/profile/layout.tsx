import type React from "react"
import { AuthWall } from "@/components/auth-wall"
import { AuthProvider } from "@/components/auth-provider"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AuthWall>{children}</AuthWall>
    </AuthProvider>
  )
}
