"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { seedLeaderboardData } from "@/lib/seed-data"
import { Loader2, Check, AlertCircle } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { useAuth } from "@/components/auth-provider"

export default function DataSeedPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const { user } = useAuth()

  const handleSeedData = async () => {
    setIsLoading(true)
    setResult(null)
    
    try {
      const seedResult = await seedLeaderboardData()
      setResult(seedResult)
    } catch (error) {
      console.error("Error:", error)
      setResult({ 
        success: false, 
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-seed data when the page loads
  useEffect(() => {
    handleSeedData()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <Card className="max-w-md mx-auto shadow-sm border-0">
          <CardHeader>
            <CardTitle>Data Seeding Tool</CardTitle>
            <CardDescription>
              Add sample users and leaderboard entries to the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                  <p className="text-slate-600">Seeding data to Firebase...</p>
                </div>
              ) : result ? (
                <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50' : 'bg-red-50'} flex items-start gap-3`}>
                  {result.success ? (
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <h3 className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                      {result.success ? 'Success!' : 'Error'}
                    </h3>
                    <p className={`text-sm ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                      {result.message}
                    </p>
                  </div>
                </div>
              ) : null}
              
              <div className="space-y-2">
                <p className="text-sm text-slate-500">
                  This tool creates sample users and leaderboard entries in your Firebase database.
                  You can use this to quickly populate your database for testing.
                </p>
                
                <Button 
                  onClick={handleSeedData} 
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Seeding Data...
                    </>
                  ) : (
                    "Seed Sample Data Again"
                  )}
                </Button>
              </div>
              
              <div className="text-xs text-slate-500 border-t pt-4 mt-4">
                <p>After seeding, visit the <a href="/leaderboard" className="text-blue-600 hover:underline">Leaderboard</a> to see the data.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}