"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { seedLeaderboardData } from "@/lib/seed-data"
import { Loader2 } from "lucide-react"

export default function SeedDataPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSeedData = async () => {
    setIsLoading(true)
    setResult(null)
    
    try {
      const success = await seedLeaderboardData()
      if (success) {
        setResult("Data seeded successfully! You can now view the leaderboard.")
      } else {
        setResult("Failed to seed data. Check console for errors.")
      }
    } catch (error) {
      console.error("Error:", error)
      setResult(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-sm border-0">
        <CardHeader>
          <CardTitle>Seed Sample Data</CardTitle>
          <CardDescription>
            Add sample users and leaderboard entries to the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-sm text-slate-500">
            This will create sample users and leaderboard entries in your Firebase database.
            Use this to quickly populate your database for testing.
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
              "Seed Sample Data"
            )}
          </Button>
          
          {result && (
            <div className={`mt-4 p-3 rounded text-sm ${result.includes("successfully") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {result}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}