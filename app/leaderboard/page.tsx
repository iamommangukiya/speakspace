import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Filter, Search, Trophy } from "lucide-react"

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <TopPerformerCard
                    position={2}
                    name="Emily Chen"
                    score={92}
                    avatar="/placeholder.svg?height=80&width=80&text=EC"
                    sessions={28}
                  />
                  <TopPerformerCard
                    position={1}
                    name="Michael Johnson"
                    score={95}
                    avatar="/placeholder.svg?height=80&width=80&text=MJ"
                    sessions={42}
                    isTop={true}
                  />
                  <TopPerformerCard
                    position={3}
                    name="Sarah Williams"
                    score={89}
                    avatar="/placeholder.svg?height=80&width=80&text=SW"
                    sessions={23}
                  />
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
                      <LeaderboardRow
                        rank={4}
                        name="Alex Doe"
                        avatar="/placeholder.svg?height=40&width=40&text=AD"
                        sessions={19}
                        score={87}
                        badges={["Communication Pro", "Quick Thinker"]}
                        improvement="+12%"
                        isCurrentUser={true}
                      />
                      <LeaderboardRow
                        rank={5}
                        name="Jessica Lee"
                        avatar="/placeholder.svg?height=40&width=40&text=JL"
                        sessions={15}
                        score={85}
                        badges={["Team Player"]}
                        improvement="+8%"
                      />
                      <LeaderboardRow
                        rank={6}
                        name="David Kim"
                        avatar="/placeholder.svg?height=40&width=40&text=DK"
                        sessions={22}
                        score={83}
                        badges={["Consistent Performer", "Communication Pro"]}
                        improvement="+5%"
                      />
                      <LeaderboardRow
                        rank={7}
                        name="Rachel Green"
                        avatar="/placeholder.svg?height=40&width=40&text=RG"
                        sessions={17}
                        score={81}
                        badges={["Quick Thinker"]}
                        improvement="+15%"
                      />
                      <LeaderboardRow
                        rank={8}
                        name="Thomas Wilson"
                        avatar="/placeholder.svg?height=40&width=40&text=TW"
                        sessions={14}
                        score={79}
                        badges={["Team Player"]}
                        improvement="+7%"
                      />
                      <LeaderboardRow
                        rank={9}
                        name="Olivia Martinez"
                        avatar="/placeholder.svg?height=40&width=40&text=OM"
                        sessions={12}
                        score={78}
                        badges={["Communication Pro"]}
                        improvement="+10%"
                      />
                      <LeaderboardRow
                        rank={10}
                        name="James Taylor"
                        avatar="/placeholder.svg?height=40&width=40&text=JT"
                        sessions={10}
                        score={76}
                        badges={["Consistent Performer"]}
                        improvement="+6%"
                      />
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center mt-6">
                  <Button variant="outline">Load More</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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

        <Card className="shadow-sm border-0 bg-white mt-8">
          <CardHeader>
            <CardTitle>Your Statistics</CardTitle>
            <CardDescription>How you compare to others</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Overall Rank" value="4th" description="Top 5%" />
              <StatCard title="Confidence" value="75%" description="Above average" />
              <StatCard title="Communication" value="82%" description="Top 10%" />
              <StatCard title="Logical Reasoning" value="68%" description="Improving fast" />
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
