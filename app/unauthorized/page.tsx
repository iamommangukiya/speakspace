import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock, LogIn } from "lucide-react"

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <Lock className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-slate-600 mb-8">
          You don't have permission to access this page. Please sign in or contact support if you believe this is an
          error.
        </p>
        <Button
          asChild
          className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <Link href="/auth/login">
            <LogIn className="h-4 w-4" />
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  )
}
