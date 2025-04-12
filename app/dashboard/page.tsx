"use client"

import type React from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, Clock, MessageSquare, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider" // Import useAuth

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth() // Use useAuth to get user
  const [userName, setUserName] = useState<string | null>(null)
  const [sessionCode, setSessionCode] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return
      
      try {
        // Get user document from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid))
        
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setUserName(user.displayName || userData.name || "User")
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    if (!authLoading) {
      fetchUserData()
    }
  }, [user, authLoading]) // Added user and authLoading as dependencies

  const handleJoinSession = (e: React.FormEvent) => {
    e.preventDefault()
    if (sessionCode.trim()) {
      router.push(`/practice/session/${sessionCode}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}</h1>
            <p className="text-slate-500 mt-1">Track your progress and join discussions</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
            <form onSubmit={handleJoinSession} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter session code"
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value)}
                className="w-40 h-10"
              />
              <Button type="submit" variant="outline" size="sm">
                Join
              </Button>
            </form>
            <Button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all hover:shadow-lg"
              size="lg"
              asChild
            >
              <Link href="/practice">
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Practice
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Sessions"
            value="24"
            description="+3 this week"
            icon={<MessageSquare className="h-5 w-5 text-blue-600" />}
          />
          <StatsCard
            title="Average Score"
            value="78%"
            description="+5% improvement"
            icon={<TrendingUp className="h-5 w-5 text-green-600" />}
          />
          <StatsCard
            title="Next Scheduled"
            value="Today"
            description="3:00 PM - Interview Practice"
            icon={<Calendar className="h-5 w-5 text-indigo-600" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your skill development over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weekly">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="weekly" className="space-y-6">
                    <SkillProgress title="Confidence" value={75} />
                    <SkillProgress title="Communication" value={82} />
                    <SkillProgress title="Logical Reasoning" value={68} />
                  </TabsContent>
                  <TabsContent value="monthly" className="space-y-6">
                    <SkillProgress title="Confidence" value={70} />
                    <SkillProgress title="Communication" value={78} />
                    <SkillProgress title="Logical Reasoning" value={65} />
                  </TabsContent>
                  <TabsContent value="yearly" className="space-y-6">
                    <SkillProgress title="Confidence" value={60} />
                    <SkillProgress title="Communication" value={72} />
                    <SkillProgress title="Logical Reasoning" value={58} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled practice sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SessionCard title="Mock Interview: Tech Role" time="Today, 3:00 PM" participants={4} />
                <SessionCard title="Group Discussion: Climate Change" time="Tomorrow, 5:30 PM" participants={8} />
                <SessionCard title="HR Interview Practice" time="Friday, 2:00 PM" participants={3} />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Sessions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest milestones and badges</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <AchievementBadge title="Consistent Performer" description="Completed 5 sessions in a row" />
              <AchievementBadge title="Communication Pro" description="Scored 80+ in communication" />
              <AchievementBadge title="Quick Thinker" description="Excellent logical reasoning" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function StatsCard({
  title,
  value,
  description,
  icon,
}: { title: string; value: string; description: string; icon: React.ReactNode }) {
  return (
    <Card className="shadow-sm border-0 bg-white hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className="text-xs text-slate-500 mt-1">{description}</p>
          </div>
          <div className="p-2 bg-slate-100 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function SkillProgress({ title, value }: { title: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}

function SessionCard({ title, time, participants }: { title: string; time: string; participants: number }) {
  return (
    <div className="flex items-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
      <div className="mr-4 p-2 bg-blue-100 rounded-full">
        <MessageSquare className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-sm">{title}</h4>
        <div className="flex items-center mt-1 text-xs text-slate-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>{time}</span>
          <span className="mx-2">•</span>
          <Users className="h-3 w-3 mr-1" />
          <span>{participants} participants</span>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        Join
      </Button>
    </div>
  )
}

function AchievementBadge({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
      <div className="mr-3 p-2 bg-amber-100 rounded-full">
        <Award className="h-5 w-5 text-amber-600" />
      </div>
      <div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </div>
    </div>
  )
}
