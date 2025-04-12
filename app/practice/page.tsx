"use client"

import { useEffect, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Filter, Search } from "lucide-react"
import Link from "next/link"

export default function Practice() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [showCreateSessionDialog, setShowCreateSessionDialog] = useState(false)


  useEffect(() => {
    // Get the user's preferred role from localStorage
    const savedRole = localStorage.getItem("speakspace_user_role")
    if (savedRole) {
      setUserRole(savedRole)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Practice Sessions</h1>
            <p className="text-slate-500 mt-1">Join or create a new practice session</p>
          </div>
        </div>

        <Tabs defaultValue="join" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="join">Join Session</TabsTrigger>
            <TabsTrigger value="create">Create Session</TabsTrigger>
          </TabsList>
          <TabsContent value="join" className="mt-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search sessions..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SessionCard
                title="Technical Interview Practice"
                description="Practice for software engineering roles"
                time="Starting in 15 minutes"
                participants={3}
                maxParticipants={5}
                tags={["Technical", "Software", "Beginner-Friendly"]}
              />
              <SessionCard
                title="Group Discussion: AI Ethics"
                description="Discuss the ethical implications of AI"
                time="Starting in 30 minutes"
                participants={6}
                maxParticipants={10}
                tags={["Group Discussion", "AI", "Ethics"]}
              />
              <SessionCard
                title="HR Interview Preparation"
                description="Common HR questions and best practices"
                time="Starting in 1 hour"
                participants={2}
                maxParticipants={4}
                tags={["HR", "Behavioral", "Career"]}
              />
              <SessionCard
                title="Product Management Case Study"
                description="Solve a real-world PM case study"
                time="Starting in 2 hours"
                participants={4}
                maxParticipants={6}
                tags={["Product", "Case Study", "Advanced"]}
              />
              <SessionCard
                title="Mock Interview: Data Science"
                description="Technical questions for data roles"
                time="Starting in 3 hours"
                participants={2}
                maxParticipants={4}
                tags={["Data Science", "Technical", "Intermediate"]}
              />
              <SessionCard
                title="Public Speaking Practice"
                description="Improve your presentation skills"
                time="Starting tomorrow"
                participants={5}
                maxParticipants={8}
                tags={["Public Speaking", "Presentation", "All Levels"]}
              />
            </div>
          </TabsContent>
          <TabsContent value="create" className="mt-6">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Create a New Session</CardTitle>
                <CardDescription>Set up a practice session and invite others to join</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="session-title" className="text-sm font-medium">
                      Session Title
                    </label>
                    <input
                      id="session-title"
                      type="text"
                      placeholder="e.g., Technical Interview Practice"
                      className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="session-description" className="text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      id="session-description"
                      placeholder="Describe what this session will cover..."
                      rows={3}
                      className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="session-date" className="text-sm font-medium">
                        Date
                      </label>
                      <input
                        id="session-date"
                        type="date"
                        className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="session-time" className="text-sm font-medium">
                        Time
                      </label>
                      <input
                        id="session-time"
                        type="time"
                        className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="session-participants" className="text-sm font-medium">
                      Maximum Participants
                    </label>
                    <input
                      id="session-participants"
                      type="number"
                      min="2"
                      max="10"
                      defaultValue="5"
                      className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <input
                      type="text"
                      placeholder="e.g., Technical, Beginner, Software"
                      className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-slate-500">Separate tags with commas</p>
                  </div>

                  <div className="pt-4">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all hover:shadow-lg"
                      size="lg"
                    >
                      Create Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {!userRole && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RoleCard
                title="Moderator"
                description="Manage the flow of the discussion, set topics, and ensure timekeeping"
                icon="M"
                onSelect={() => {
                  localStorage.setItem("speakspace_user_role", "moderator")
                  setUserRole("moderator")
                }}
              />
              <RoleCard
                title="Participant"
                description="Engage actively in the discussion or mock interview"
                icon="P"
                onSelect={() => {
                  localStorage.setItem("speakspace_user_role", "participant")
                  setUserRole("participant")
                }}
              />
              <RoleCard
                title="Evaluator"
                description="Observe and provide feedback on participants' performance"
                icon="E"
                onSelect={() => {
                  localStorage.setItem("speakspace_user_role", "evaluator")
                  setUserRole("evaluator")
                }}
              />
            </div>
          </div>
        )}

        {userRole && (
          <div className="mt-8 flex justify-center">
            <Button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all hover:shadow-lg"
              size="lg"
              asChild
            >
              <Link href="/session">Continue as {userRole.charAt(0).toUpperCase() + userRole.slice(1)}</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

function SessionCard({
  title,
  description,
  time,
  participants,
  maxParticipants,
  tags,
}: {
  title: string
  description: string
  time: string
  participants: number
  maxParticipants: number
  tags: string[]
}) {
  return (
    <Card className="shadow-sm border-0 bg-white hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg">{title}</h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {participants}/{maxParticipants}
          </span>
        </div>
        <p className="text-sm text-slate-600 mb-3">{description}</p>
        <p className="text-xs text-slate-500 mb-3">{time}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all hover:shadow">
          Join Session
        </Button>
      </CardContent>
    </Card>
  )
}

function RoleCard({
  title,
  description,
  icon,
  onSelect,
}: {
  title: string
  description: string
  icon: string
  onSelect: () => void
}) {
  return (
    <Card
      className="relative cursor-pointer border-2 border-transparent hover:border-blue-200 hover:shadow-sm transition-all"
      onClick={onSelect}
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-slate-100 mb-4">
          <span className="text-xl font-bold text-blue-600">{icon}</span>
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  )
}
