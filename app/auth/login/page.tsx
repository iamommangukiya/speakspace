"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Loader2, Mail } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login, signInWithGoogle } = useAuth()  // Add signInWithGoogle here
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/dashboard"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
  
    try {
      // Attempt to login with Firebase
      await login(email, password);
      // If successful, redirect to dashboard
      router.push(redirect);
    } catch (err) {
      // Show error message
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      // Use the actual Firebase Google sign-in
      await signInWithGoogle();
      router.push(redirect);
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SpeakSpace
          </CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-50 text-red-800 border border-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                className="h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-11 shadow-sm hover:shadow" 
                disabled={isLoading}
                onClick={() => handleGoogleSignIn()}
                type="button"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button 
                variant="outline" 
                className="h-11 shadow-sm hover:shadow" 
                disabled={isLoading}
                onClick={() => handleGoogleSignIn()}
                type="button"
              >
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
