"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, Mail } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { auth } from "@/lib/firebase" // Ensure this import is correct

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Use Firebase to send a password reset email
      await sendPasswordResetEmail(auth, email)

      setIsSubmitted(true)
    } catch (err: any) {
      console.error("Failed to send reset email:", err)
      setError("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SpeakSpace
          </CardTitle>
          <CardDescription>Reset your password</CardDescription>
        </CardHeader>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-50 text-red-800 border border-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="text-center mb-4">
                <p className="text-sm text-slate-600">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full h-11 px-3 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
              <div className="text-center mt-4">
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-6 py-6">
            <div className="flex justify-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">Check your email</h3>
              <p className="text-sm text-slate-600">
                We've sent a password reset link to <span className="font-medium">{email}</span>
              </p>
              <p className="text-xs text-slate-500 mt-4">
                Didn't receive the email? Check your spam folder or{" "}
                <button className="text-blue-600 hover:text-blue-800 underline" onClick={() => setIsSubmitted(false)}>
                  try again
                </button>
              </p>
            </div>
            <div className="pt-4">
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Back to login
                </Button>
              </Link>
            </div>
          </CardContent>
        )}
      </Card>
    </main>
  )
}
