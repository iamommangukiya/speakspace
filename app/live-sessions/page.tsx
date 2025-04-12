"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mic, MicOff, Search, Users, Video, VideoOff, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/components/auth-provider"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function LiveSessionsPage() {
  const { user } = useAuth()
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("speakspace_user_role") || "participant"
  })
  const [levelFilter, setLevelFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [micPermission, setMicPermission] = useState<boolean | null>(null)
  const [videoPermission, setVideoPermission] = useState<boolean | null>(null)
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [showCreateSessionDialog, setShowCreateSessionDialog] = useState(false)


  const handleJoinSession = (session: any) => {
    setSelectedSession(session)
    setShowPermissionDialog(true)

    // Check for permissions
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setMicPermission(true))
      .catch(() => setMicPermission(false))

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setVideoPermission(true))
      .catch(() => setVideoPermission(false))
  }

  const handleContinueToSession = () => {
    // In a real app, this would navigate to the session
    setShowPermissionDialog(false)
    window.location.href = "/session"
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">

<Dialog open={showCreateSessionDialog} onOpenChange={setShowCreateSessionDialog}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Create a New Session</DialogTitle>
      <DialogDescription>
        Set up a practice session and invite others to join
      </DialogDescription>
    </DialogHeader>

    <Card className="shadow-none border-0 bg-white dark:bg-slate-900">
  <CardContent className="px-0">
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="session-title" className="text-sm font-medium">Session Title</label>
        <input
          id="session-title"
          type="text"
          placeholder="e.g., Technical Interview Practice"
          className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="session-description" className="text-sm font-medium">Description</label>
        <textarea
          id="session-description"
          placeholder="Describe what this session will cover..."
          rows={3}
          className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="session-date" className="text-sm font-medium">Date</label>
          <input
            id="session-date"
            type="date"
            className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="session-time" className="text-sm font-medium">Time</label>
          <input
            id="session-time"
            type="time"
            className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="session-participants" className="text-sm font-medium">Maximum Participants</label>
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
          <label htmlFor="session-evaluators" className="text-sm font-medium">Number of Evaluators</label>
          <input
            id="session-evaluators"
            type="number"
            min="1"
            max="5"
            defaultValue="1"
            className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
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
          onClick={() => setShowCreateSessionDialog(false)} // optional: close on submit
        >
          Create Session
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
  </DialogContent>
</Dialog>
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">Live Sessions</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Join ongoing sessions or view upcoming ones</p>
          </div>
          {userRole == "moderator" && (
           <Button
           className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all hover:shadow-lg"
           size="lg"
           onClick={() => setShowCreateSessionDialog(true)}
         >
           <Calendar className="mr-2 h-5 w-5" />
           Create Session
         </Button>
         
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search sessions..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="gd">Group Discussion</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Sessions</TabsTrigger>
            <TabsTrigger value="registered">Registered</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SessionCard
                title="Technical Interview Practice"
                description="Practice for software engineering roles"
                time="Live Now"
                participants={3}
                maxParticipants={5}
                tags={["Technical", "Interview", "Intermediate"]}
                status="live"
                onJoin={() =>
                  handleJoinSession({
                    title: "Technical Interview Practice",
                    rules: "Be respectful, provide constructive feedback, and stay on topic.",
                  })
                }
              />
              <SessionCard
                title="Group Discussion: AI Ethics"
                description="Discuss the ethical implications of AI"
                time="Starting in 30 minutes"
                participants={6}
                maxParticipants={10}
                tags={["Group Discussion", "AI", "Beginner"]}
                status="upcoming"
                onJoin={() =>
                  handleJoinSession({
                    title: "Group Discussion: AI Ethics",
                    rules: "Everyone gets 2 minutes to speak. Raise hand to be added to the queue.",
                  })
                }
              />
              <SessionCard
                title="HR Interview Preparation"
                description="Common HR questions and best practices"
                time="Starting in 1 hour"
                participants={2}
                maxParticipants={4}
                tags={["HR", "Interview", "Beginner"]}
                status="upcoming"
                onJoin={() =>
                  handleJoinSession({
                    title: "HR Interview Preparation",
                    rules: "Focus on behavioral questions. Each participant will get 15 minutes.",
                  })
                }
              />
              <SessionCard
                title="Product Management Case Study"
                description="Solve a real-world PM case study"
                time="Starting in 2 hours"
                participants={4}
                maxParticipants={6}
                tags={["Product", "Case Study", "Advanced"]}
                status="upcoming"
                onJoin={() =>
                  handleJoinSession({
                    title: "Product Management Case Study",
                    rules: "Present your solution in 10 minutes, followed by 5 minutes of Q&A.",
                  })
                }
              />
              <SessionCard
                title="Mock Interview: Data Science"
                description="Technical questions for data roles"
                time="Live Now"
                participants={2}
                maxParticipants={4}
                tags={["Data Science", "Interview", "Advanced"]}
                status="live"
                onJoin={() =>
                  handleJoinSession({
                    title: "Mock Interview: Data Science",
                    rules: "Focus on explaining your thought process. Use the whiteboard feature when needed.",
                  })
                }
              />
              <SessionCard
                title="Public Speaking Practice"
                description="Improve your presentation skills"
                time="Ended 2 hours ago"
                participants={5}
                maxParticipants={8}
                tags={["Public Speaking", "Presentation", "Intermediate"]}
                status="ended"
                onJoin={() => {}}
              />
            </div>
          </TabsContent>

          <TabsContent value="registered">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SessionCard
                title="System Design Interview"
                description="Practice designing scalable systems"
                time="Tomorrow, 3:00 PM"
                participants={3}
                maxParticipants={5}
                tags={["Technical", "System Design", "Advanced"]}
                status="upcoming"
                onJoin={() =>
                  handleJoinSession({
                    title: "System Design Interview",
                    rules: "Focus on scalability, reliability, and performance. Use the whiteboard feature.",
                  })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="recommended">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SessionCard
                title="Behavioral Interview Practice"
                description="STAR method for answering questions"
                time="Tomorrow, 5:00 PM"
                participants={4}
                maxParticipants={6}
                tags={["Behavioral", "Interview", "Beginner"]}
                status="upcoming"
                onJoin={() =>
                  handleJoinSession({
                    title: "Behavioral Interview Practice",
                    rules: "Use the STAR method: Situation, Task, Action, Result. Each answer should be 2-3 minutes.",
                  })
                }
              />
              <SessionCard
                title="Group Discussion: Remote Work"
                description="Pros and cons of remote work culture"
                time="Friday, 2:00 PM"
                participants={7}
                maxParticipants={12}
                tags={["Group Discussion", "Career", "Beginner"]}
                status="upcoming"
                onJoin={() =>
                  handleJoinSession({
                    title: "Group Discussion: Remote Work",
                    rules: "Everyone gets 2 minutes to speak. Be respectful of others' opinions.",
                  })
                }
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join {selectedSession?.title}</DialogTitle>
            <DialogDescription>
              Please allow microphone and camera access to participate in the session
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {micPermission === true ? (
                    <Mic className="h-6 w-6 text-green-500" />
                  ) : micPermission === false ? (
                    <MicOff className="h-6 w-6 text-red-500" />
                  ) : (
                    <Mic className="h-6 w-6 text-slate-400" />
                  )}
                  <div>
                    <h4 className="font-medium dark:text-white">Microphone</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {micPermission === true
                        ? "Access granted"
                        : micPermission === false
                          ? "Access denied"
                          : "Checking permission..."}
                    </p>
                  </div>
                </div>
                {micPermission === false && (
                  <Button variant="outline" size="sm">
                    Allow
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {videoPermission === true ? (
                    <Video className="h-6 w-6 text-green-500" />
                  ) : videoPermission === false ? (
                    <VideoOff className="h-6 w-6 text-red-500" />
                  ) : (
                    <Video className="h-6 w-6 text-slate-400" />
                  )}
                  <div>
                    <h4 className="font-medium dark:text-white">Camera</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {videoPermission === true
                        ? "Access granted"
                        : videoPermission === false
                          ? "Access denied"
                          : "Checking permission..."}
                    </p>
                  </div>
                </div>
                {videoPermission === false && (
                  <Button variant="outline" size="sm">
                    Allow
                  </Button>
                )}
              </div>
            </div>

            {selectedSession && (
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 className="font-medium mb-2 dark:text-white">Session Rules</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{selectedSession.rules}</p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowPermissionDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleContinueToSession}
                disabled={micPermission !== true}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Join Session
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
  status,
  onJoin,
}: {
  title: string
  description: string
  time: string
  participants: number
  maxParticipants: number
  tags: string[]
  status: "live" | "upcoming" | "ended"
  onJoin: () => void
}) {
  return (
    <Card className="shadow-sm border-0 bg-white dark:bg-slate-800 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg dark:text-white">{title}</h3>
          <Badge
            variant={status === "live" ? "default" : status === "upcoming" ? "outline" : "secondary"}
            className={
              status === "live"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : status === "upcoming"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
            }
          >
            {status === "live" ? (
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                Live
              </span>
            ) : status === "upcoming" ? (
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Upcoming
              </span>
            ) : (
              "Ended"
            )}
          </Badge>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{description}</p>
        <p className="text-xs text-slate-500 dark:text-slate-500 mb-3 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {participants}/{maxParticipants}
          </span>
          <Button
            className={
              status === "ended"
                ? "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            }
            disabled={status === "ended"}
            onClick={onJoin}
          >
            {status === "live" ? "Join Now" : status === "upcoming" ? "Join When Live" : "Ended"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
