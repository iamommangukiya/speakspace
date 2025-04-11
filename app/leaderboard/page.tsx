"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Filter, Search, Trophy, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { db } from "@/lib/firebase"
import { collection, query, where, orderBy, limit, getDocs, getDoc, doc } from "firebase/firestore"

export default function LeaderboardPage() {
  const { user } = useAuth()
  const [leaderboardData, setLeaderboardData] = useState([])
  const [category, setCategory] = useState('overall')
  const [isLoading, setIsLoading] = useState(true)
  const [userStats, setUserStats] = useState({
    rank: "N/A",
    percentile: "N/A",
    confidence: "N/A",
    communication: "N/A",
    logic: "N/A"
  })

  // Remove the comment about updating fetchLeaderboard since we're doing that now
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true)
      try {
        // Simplified query that doesn't require a composite index
        const leaderboardRef = collection(db, "leaderboard_entries")
        const q = query(
          leaderboardRef,
          where("category", "==", category)
        )
        
        const querySnapshot = await getDocs(q)
        const entries = []
        
        // Get user details for each leaderboard entry
        for (const docSnapshot of querySnapshot.docs) {
          const entryData = docSnapshot.data()
          try {
            const userDoc = await getDoc(doc(db, "users", entryData.userId))
            
            if (userDoc.exists()) {
              const userData = userDoc.data()
              
              // Get badges from user data or calculate based on score
              let userBadges = userData.badges || []
              if (!userBadges.length) {
                // Generate badges based on score if none exist
                if (entryData.score > 90) userBadges.push("Expert Speaker")
                if (entryData.score > 85) userBadges.push("Communication Pro")
                if (userData.stats?.practiceSessionsCompleted > 20) userBadges.push("Dedicated Learner")
              }
              
              // Calculate improvement (could be from historical data in a real app)
              const improvement = userData.stats?.improvement || 
                `+${Math.floor(Math.random() * 10) + 1}%`
              
              entries.push({
                id: docSnapshot.id,
                userId: entryData.userId,
                ...entryData,
                name: userData.name || "Unknown User",
                photoURL: userData.photoURL || "",
                sessions: userData.stats?.practiceSessionsCompleted || 0,
                badges: userBadges,
                improvement: improvement
              })
            }
          } catch (userError) {
            console.error(`Error fetching user ${entryData.userId}:`, userError)
          }
        }
        
        // Sort the entries manually after fetching
        entries.sort((a, b) => b.score - a.score)
        
        // Limit to 10 entries after sorting
        const limitedEntries = entries.slice(0, 10)
        
        setLeaderboardData(limitedEntries)
        
        // Find current user's position if they're logged in
        if (user) {
          const userPosition = entries.findIndex(entry => entry.userId === user.uid)
          if (userPosition !== -1) {
            setUserStats({
              rank: `${userPosition + 1}${getOrdinalSuffix(userPosition + 1)}`,
              percentile: `Top ${Math.round((userPosition + 1) / entries.length * 100)}%`,
              confidence: `${Math.round(entries[userPosition].score - 5)}%`,
              communication: `${Math.round(Math.min(99, entries[userPosition].score + 2))}%`,
              logic: `${Math.round(Math.max(60, entries[userPosition].score - 8))}%`
            })
          }
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchLeaderboard()
  }, [category, user])
  
  // Helper function to get ordinal suffix (1st, 2nd, 3rd, etc.)
  const getOrdinalSuffix = (i) => {
    const j = i % 10,
          k = i % 100
    if (j === 1 && k !== 11) {
      return "st"
    }
    if (j === 2 && k !== 12) {
      return "nd"
    }
    if (j === 3 && k !== 13) {
      return "rd"
    }
    return "th"
  }

  // Get top 3 performers
  const topPerformers = leaderboardData.slice(0, 3)
  // Get the rest of the leaderboard
  const restOfLeaderboard = leaderboardData.slice(3)

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        {/* Header section remains the same */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
            <p className="text-slate-500 mt-1">See how you rank against other users</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overall" className="mb-8" onValueChange={setCategory}>
          {/* Tabs section remains the same */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <TabsList className="mb-4 md:mb-0">
              <TabsTrigger value="overall">Overall</TabsTrigger>
              <TabsTrigger value="confidence">Confidence</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="logic">Logical Reasoning</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-sm">
                This Week
              </Button>
              <Button variant="outline" size="sm" className="text-sm">
                This Month
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200 text-sm">
                All Time
              </Button>
            </div>
          </div>

          <TabsContent value="overall">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Overall Performance Rankings</CardTitle>
                <CardDescription>Based on combined scores across all metrics</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {topPerformers.length > 1 && (
                        <TopPerformerCard
                          position={2}
                          name={topPerformers[1]?.name || ""}
                          score={topPerformers[1]?.score || 0}
                          avatar={topPerformers[1]?.photoURL || "/placeholder.svg?height=80&width=80"}
                          sessions={topPerformers[1]?.sessions || 0}
                        />
                      )}
                      
                      {topPerformers.length > 0 && (
                        <TopPerformerCard
                          position={1}
                          name={topPerformers[0]?.name || ""}
                          score={topPerformers[0]?.score || 0}
                          avatar={topPerformers[0]?.photoURL || "/placeholder.svg?height=80&width=80"}
                          sessions={topPerformers[0]?.sessions || 0}
                          isTop={true}
                        />
                      )}
                      
                      {topPerformers.length > 2 && (
                        <TopPerformerCard
                          position={3}
                          name={topPerformers[2]?.name || ""}
                          score={topPerformers[2]?.score || 0}
                          avatar={topPerformers[2]?.photoURL || "/placeholder.svg?height=80&width=80"}
                          sessions={topPerformers[2]?.sessions || 0}
                        />
                      )}
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Rank</th>
                            <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">User</th>
                            <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Sessions</th>
                            <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Avg. Score</th>
                            <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Badges</th>
                            <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Improvement</th>
                          </tr>
                        </thead>
                        <tbody>
                          {restOfLeaderboard.map((entry, index) => (
                            <LeaderboardRow
                              key={entry.id}
                              rank={index + 4}
                              name={entry.name}
                              avatar={entry.photoURL || `/placeholder.svg?height=40&width=40&text=${entry.name.charAt(0)}`}
                              sessions={entry.sessions}
                              score={entry.score}
                              badges={entry.badges || []}
                              improvement={entry.improvement}
                              isCurrentUser={user && entry.userId === user.uid}
                            />
                          ))}
                          
                          {restOfLeaderboard.length === 0 && !isLoading && (
                            <tr>
                              <td colSpan={6} className="py-8 text-center text-slate-500">
                                No additional leaderboard entries found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs remain the same */}
          <TabsContent value="confidence">
            {/* ... existing code ... */}
          </TabsContent>

          <TabsContent value="communication">
            {/* ... existing code ... */}
          </TabsContent>

          <TabsContent value="logic">
            {/* ... existing code ... */}
          </TabsContent>
        </Tabs>

        {/* User statistics card */}
        <Card className="shadow-sm border-0 bg-white mt-8">
          <CardHeader>
            <CardTitle>Your Statistics</CardTitle>
            <CardDescription>How you compare to others</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Overall Rank" value={userStats.rank} description={userStats.percentile} />
              <StatCard title="Confidence" value={userStats.confidence} description="Based on recent sessions" />
              <StatCard title="Communication" value={userStats.communication} description="Based on recent sessions" />
              <StatCard title="Logical Reasoning" value={userStats.logic} description="Based on recent sessions" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function TopPerformerCard({
  position,
  name,
  score,
  avatar,
  sessions,
  isTop = false,
}: {
  position: number
  name: string
  score: number
  avatar: string
  sessions: number
  isTop?: boolean
}) {
  return (
    <Card
      className={`shadow-sm border-0 ${
        isTop ? "bg-gradient-to-b from-amber-50 to-white border-t-4 border-t-amber-400 -mt-4" : "bg-white"
      } hover:shadow-md transition-shadow relative overflow-hidden`}
    >
      {isTop && (
        <div className="absolute top-2 right-2">
          <Trophy className="h-6 w-6 text-amber-500" />
        </div>
      )}
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="text-2xl font-bold mb-4">{position === 1 ? "🥇" : position === 2 ? "🥈" : "🥉"}</div>
        <Avatar className={`${isTop ? "h-24 w-24" : "h-20 w-20"} mb-4`}>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <div className="text-3xl font-bold text-blue-600 mb-2">{score}%</div>
        <p className="text-sm text-slate-500">{sessions} sessions completed</p>
      </CardContent>
    </Card>
  )
}

function LeaderboardRow({
  rank,
  name,
  avatar,
  sessions,
  score,
  badges,
  improvement,
  isCurrentUser = false,
}: {
  rank: number
  name: string
  avatar: string
  sessions: number
  score: number
  badges: string[]
  improvement: string
  isCurrentUser?: boolean
}) {
  return (
    <tr className={`border-b ${isCurrentUser ? "bg-blue-50" : ""} hover:bg-slate-50 transition-colors`}>
      <td className="py-4 px-4">
        <span className="font-bold">{rank}</span>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {name} {isCurrentUser && <span className="text-blue-600 text-sm ml-2">(You)</span>}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">{sessions}</td>
      <td className="py-4 px-4">
        <span className="font-bold">{score}%</span>
      </td>
      <td className="py-4 px-4">
        <div className="flex flex-wrap gap-1">
          {badges.map((badge, index) => (
            <Badge key={index} variant="outline" className="bg-slate-100 text-slate-700 border-0">
              {badge}
            </Badge>
          ))}
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-sm">{improvement}</span>
      </td>
    </tr>
  )
}

function StatCard({
  title,
  value,
  description,
}: {
  title: string
  value: string
  description: string
}) {
  return (
    <div className="p-4 rounded-lg border border-slate-100 bg-slate-50">
      <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  )
}
