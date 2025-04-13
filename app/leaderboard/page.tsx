"use client"

import { useEffect, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Filter, Search, Trophy } from "lucide-react"
import { collection, getDocs, query, orderBy, limit, doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// User type definition
type User = {
  id: string
  name: string
  avatar?: string
  sessions: number
  score: number
  badges: string[]
  improvement: string
}

export default function Leaderboard() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<string>('participant')
  const [isEditing, setIsEditing] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const handleEditUser = (user: User) => {
    setEditingUser({...user})
    setIsEditing(true)
  }

  const handleSaveEdit = async () => {
    if (!editingUser) return
    
    try {
      // Update user in Firestore
      const userRef = doc(db, "users", editingUser.id)
      await updateDoc(userRef, {
        score: editingUser.score,
        sessions: editingUser.sessions,
        badges: editingUser.badges,
        improvement: editingUser.improvement
      })
      
      // Update local state
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ))
      
      setIsEditing(false)
      setEditingUser(null)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingUser(null)
  }

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("speakspace_user_role") || "participant"
    setUserRole(role)
    
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const q = query(collection(db, "users"), orderBy("score", "desc"), limit(10))
        const querySnapshot = await getDocs(q)
        
        const usersData = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            name: data.name || "Anonymous User",
            avatar: data.avatar || `/placeholder.svg?height=40&width=40&text=${data.name?.charAt(0) || "A"}`,
            sessions: data.sessions || 0, // No random fallback
            score: data.score || 0, // No random fallback
            badges: data.badges || ["New User"],
            improvement: data.improvement || "+0%"
          }
        }) as User[]
        
        setUsers(usersData)
      } catch (error) {
        console.error("Error fetching users:", error)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Get top 3 users for the podium
  const topUsers = users.slice(0, 3)
  
  // Get remaining users for the table
  const remainingUsers = users.slice(3)

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        {/* Dialog for editing user statistics */}
        <Dialog open={isEditing} onOpenChange={(open) => !open && handleCancelEdit()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User Statistics</DialogTitle>
            </DialogHeader>
            {editingUser && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name">User Name</Label>
                  <Input 
                    id="user-name" 
                    value={editingUser.name} 
                    disabled 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-sessions">Sessions</Label>
                  <Input 
                    id="user-sessions" 
                    type="number" 
                    value={editingUser.sessions} 
                    onChange={(e) => setEditingUser({...editingUser, sessions: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-score">Score (%)</Label>
                  <Input 
                    id="user-score" 
                    type="number" 
                    value={editingUser.score} 
                    onChange={(e) => setEditingUser({...editingUser, score: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-improvement">Improvement</Label>
                  <Input 
                    id="user-improvement" 
                    value={editingUser.improvement} 
                    onChange={(e) => setEditingUser({...editingUser, improvement: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-badges">Badges (comma separated)</Label>
                  <Input 
                    id="user-badges" 
                    value={editingUser.badges.join(', ')} 
                    onChange={(e) => setEditingUser({...editingUser, badges: e.target.value.split(',').map(b => b.trim())})}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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

        <Tabs defaultValue="overall" className="mb-8">
          {/* Tab navigation remains the same */}
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
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-slate-500">Loading leaderboard data...</p>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-slate-600 mb-4">
                      No users found
                    </h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                      Be the first to join the leaderboard by participating in sessions!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {topUsers.length >= 2 && (
                        <TopPerformerCard
                          position={2}
                          name={topUsers[1].name}
                          score={topUsers[1].score}
                          avatar={topUsers[1].avatar || ""}
                          sessions={topUsers[1].sessions}
                        />
                      )}
                      {topUsers.length >= 1 && (
                        <TopPerformerCard
                          position={1}
                          name={topUsers[0].name}
                          score={topUsers[0].score}
                          avatar={topUsers[0].avatar || ""}
                          sessions={topUsers[0].sessions}
                          isTop={true}
                        />
                      )}
                      {topUsers.length >= 3 && (
                        <TopPerformerCard
                          position={3}
                          name={topUsers[2].name}
                          score={topUsers[2].score}
                          avatar={topUsers[2].avatar || ""}
                          sessions={topUsers[2].sessions}
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
                            {userRole === 'evaluator' && (
                              <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Actions</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {remainingUsers.map((user, index) => (
                            <LeaderboardRow
                              key={user.id}
                              rank={index + 4}
                              name={user.name}
                              avatar={user.avatar || ""}
                              sessions={user.sessions}
                              score={user.score}
                              badges={user.badges}
                              improvement={user.improvement}
                              isCurrentUser={user.id === currentUser?.id}
                              isEvaluator={userRole === 'evaluator'}
                              onEdit={() => handleEditUser(user)}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button variant="outline">Load More</Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs remain the same */}
          <TabsContent value="confidence">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Confidence Rankings</CardTitle>
                <CardDescription>Based on confidence scores in sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-slate-600 mb-4">
                    Switch to the "Overall" tab to see rankings
                  </h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    We've simplified this demo to show the overall leaderboard. In a full implementation, this tab would
                    show confidence-specific rankings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Communication Rankings</CardTitle>
                <CardDescription>Based on communication scores in sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-slate-600 mb-4">
                    Switch to the "Overall" tab to see rankings
                  </h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    We've simplified this demo to show the overall leaderboard. In a full implementation, this tab would
                    show communication-specific rankings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logic">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Logical Reasoning Rankings</CardTitle>
                <CardDescription>Based on logical reasoning scores in sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-slate-600 mb-4">
                    Switch to the "Overall" tab to see rankings
                  </h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    We've simplified this demo to show the overall leaderboard. In a full implementation, this tab would
                    show logical reasoning-specific rankings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Helper function to get ordinal suffix for numbers
function getOrdinalSuffix(i: number): string {
  const j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}

// Keep the existing component definitions
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
  isEvaluator = false,
  onEdit,
}: {
  rank: number
  name: string
  avatar: string
  sessions: number
  score: number
  badges: string[]
  improvement: string
  isCurrentUser?: boolean
  isEvaluator?: boolean
  onEdit?: () => void
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
      {isEvaluator && (
        <td className="py-4 px-4">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            Edit
          </Button>
        </td>
      )}
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
