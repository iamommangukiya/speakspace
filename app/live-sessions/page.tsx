"use client"

import { useEffect, useState, ChangeEvent } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mic, MicOff, Search, Users, Video, VideoOff, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/components/auth-provider"
import { collection, addDoc, getDocs, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast"

// Session type definition
type Session = {
  id?: string
  title: string
  description: string
  date: string
  time: string
  maxParticipants: number
  evaluators: number
  tags: string[]
  status: "live" | "upcoming" | "ended"
  participants: string[]
  createdBy: string
  createdAt?: Date
}

export default function LiveSessionsPage() {
  const { user } = useAuth()
  const [userRole, setUserRole] = useState('participant')
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [levelFilter, setLevelFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [micPermission, setMicPermission] = useState<boolean | null>(null)
  const [videoPermission, setVideoPermission] = useState<boolean | null>(null)
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [showCreateSessionDialog, setShowCreateSessionDialog] = useState(false)
  const [sessions, setSessions] = useState<Session[]>([])

  const { toast } = useToast();
  useEffect(() => {
    const role = localStorage.getItem("speakspace_user_role") || "participant"
    setUserRole(role)
  }, [])

  // Use a state for a new session with controlled values
  const [newSession, setNewSession] = useState<Omit<Session, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    date: '',
    time: '',
    maxParticipants: 5,
    evaluators: 1,
    tags: [],
    status: 'upcoming',
    participants: [],
    createdBy: user?.id || ''
  })

  // Fetch sessions from Firebase
  const [loading, setLoading] = useState(true);

  // Then modify your fetchSessions function:
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "sessions"));
      const querySnapshot = await getDocs(q);
      const sessionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Session[];
      setSessions(sessionsData);
    } catch (error) {
      console.error("Error fetching sessions: ", error);
    } finally {
      setLoading(false);
    }
  }
  const handleEditSession = (session: Session) => {
    // Need to declare setEditingSession state first
    const [editingSession, setEditingSession] = useState<Session | null>(null);
    setEditingSession(session);
// Move setShowEditDialog state to the component level
const [showEditDialog, setShowEditDialog] = useState(false);
setShowEditDialog(true);
  };

  const updateSession = async () => {
    // Check if editingSession exists and has an id before proceeding
    if (!editingSession || !editingSession.id) {
      console.error('No session selected for editing');
      return;
    }
        
        try {
          await updateDoc(doc(db, "sessions", editingSession.id), {
            ...editingSession,
            maxParticipants: Number(editingSession.maxParticipants),
            evaluators: Number(editingSession.evaluators),
          });
          setShowEditDialog(false);
          fetchSessions();
        } catch (error) {
          console.error("Error updating session: ", error);
        }
      };
      
      const handleDeleteSession = async (sessionId: string) => {
        if (!confirm("Are you sure you want to delete this session?")) return;
        
        try {
          await deleteDoc(doc(db, "sessions", sessionId));
          await fetchSessions();
        } catch (error) {
          console.error("Error deleting session: ", error);
        }
      };
  
  // Create a session document in Firebase using the state values
  const createSession = async () => {
    try {
      await addDoc(collection(db, "sessions"), {
        ...newSession,
        // Ensure types are correct by converting or adding missing fields
        maxParticipants: Number(newSession.maxParticipants),
        evaluators: Number(newSession.evaluators),
        tags: newSession.tags,
        createdAt: new Date(),
        status: 'upcoming',
        participants: [],
        createdBy: user?.id
      })
      setShowCreateSessionDialog(false)
      // Optionally, reset the new session state
      setNewSession({
        title: '',
        description: '',
        date: '',
        time: '',
        maxParticipants: 5,
        evaluators: 1,
        tags: [],
        status: 'upcoming',
        participants: [],
        createdBy: user?.id || ''
      })
      fetchSessions()
    } catch (error) {
      console.error("Error creating session: ", error)
    }
  }

  // Handle joining a session (checks permissions and creates/joins chat room)
  const handleJoinSession = async (session: Session) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to join a session",
        variant: "destructive"
      })
      return
    }

    setSelectedSession(session)
    setShowPermissionDialog(true)

    try {
      // Check media permissions
      const [audioPermission, videoPermission] = await Promise.all([
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(() => true)
          .catch(() => false),
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(() => true)
          .catch(() => false)
      ])

      setMicPermission(audioPermission)
      setVideoPermission(videoPermission)

      // Update session participants
      if (session.id && !session.participants.includes(user.id)) {
        const sessionRef = doc(db, "sessions", session.id)
        await updateDoc(sessionRef, {
          participants: [...session.participants, user.id]
        })
      }
    } catch (error) {
      console.error("Error joining session:", error)
      toast({
        title: "Error",
        description: "Failed to join session. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleContinueToSession = () => {
    if (!selectedSession) return
    
    setShowPermissionDialog(false)
    // Navigate to session with session ID and user role
    window.location.href = `/session?id=${selectedSession.id}&role=${userRole}`
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  // Handler functions to update controlled inputs for the new session
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    // For tags input, split by commas into an array
    if (id === 'session-tags') {
      setNewSession({ ...newSession, tags: value.split(',').map(tag => tag.trim()) })
    } else if (id === 'session-participants') {
      setNewSession({ ...newSession, maxParticipants: Number(value) })
    } else if (id === 'session-evaluators') {
      setNewSession({ ...newSession, evaluators: Number(value) })
    } else {
      // Map input id to session properties, e.g., session-title -> title
      if (id === 'session-title') setNewSession({ ...newSession, title: value })
      if (id === 'session-description') setNewSession({ ...newSession, description: value })
      if (id === 'session-date') setNewSession({ ...newSession, date: value })
      if (id === 'session-time') setNewSession({ ...newSession, time: value })
    }
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
                    value={newSession.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="session-description" className="text-sm font-medium">Description</label>
                  <textarea
                    id="session-description"
                    placeholder="Describe what this session will cover..."
                    rows={3}
                    value={newSession.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="session-date" className="text-sm font-medium">Date</label>
                    <input
                      id="session-date"
                      type="date"
                      value={newSession.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="session-time" className="text-sm font-medium">Time</label>
                    <input
                      id="session-time"
                      type="time"
                      value={newSession.time}
                      onChange={handleChange}
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
                      value={newSession.maxParticipants}
                      onChange={handleChange}
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
                      value={newSession.evaluators}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="session-tags" className="text-sm font-medium">Tags</label>
                  <input
                    id="session-tags"
                    type="text"
                    placeholder="e.g., Technical, Beginner, Software"
                    // When updated, split the input into an array of tags
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-slate-500">Separate tags with commas</p>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all hover:shadow-lg"
                    size="lg"
                    onClick={createSession}
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
  <div className="flex items-center gap-4 mt-4 md:mt-0">
    <Button
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all hover:shadow-lg"
      size="lg"
      onClick={() => setShowCreateSessionDialog(true)}
    >
      <Calendar className="mr-2 h-5 w-5" />
      Create Session
    </Button>

    <Button
      variant="default"
      size="icon"
      onClick={async () => {
        const roomName = "JitsiRoom_" + Math.random().toString(36).substr(2, 9);
        const meetURL = `https://meet.jit.si/${roomName}`;
        await navigator.clipboard.writeText(meetURL);
        // Ideally use a toast instead of alert
        toast({
          title: "Success",
          description: "Room link copied to clipboard."
        });
      }}
      className="bg-green-600 hover:bg-green-700"
      title="Copy room link"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    </Button>
  </div>
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
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p>Loading sessions...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sessions.length === 0 ? (
                    <p>No sessions available</p>
                  ) : (
                    sessions.map((session) => (
                      <SessionCard
                        key={session.id}
                        title={session.title}
                        description={session.description}
                        time={session.time}
                        participants={session.participants.length}
                        maxParticipants={session.maxParticipants}
                        tags={session.tags}
                        status={session.status}
                        onJoin={() => handleJoinSession(session)}
                      />
                    ))
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="registered">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions
                  .filter(session => session.participants.includes(user?.id || ''))
                  .map((session) => (
                    <SessionCard
                      key={session.id}
                      title={session.title}
                      description={session.description}
                      time={session.time}
                      participants={session.participants.length}
                      maxParticipants={session.maxParticipants}
                      tags={session.tags}
                      status={session.status}
                      onJoin={() => handleJoinSession({
                        title: session.title,
                        rules: "Default session rules",
                      })}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="recommended">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions
                  .filter(session => !session.participants.includes(user?.id || ''))
                  .map((session) => (
                    <SessionCard
                      key={session.id}
                      title={session.title}
                      description={session.description}
                      time={session.time}
                      participants={session.participants.length}
                      maxParticipants={session.maxParticipants}
                      tags={session.tags}
                      status={session.status}
                      onJoin={() => handleJoinSession({
                        title: session.title,
                        rules: "Default session rules",
                      })}
                      session={session} // Add this
                    />
                  ))}
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
  
<Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
<DialogContent className="max-w-2xl">
  <DialogHeader>
    <DialogTitle>Edit Session</DialogTitle>
    <DialogDescription>
      Update the session details
    </DialogDescription>
  </DialogHeader>
  {editingSession && (
    <Card className="shadow-none border-0 bg-white dark:bg-slate-900">
      <CardContent className="px-0">
        <div className="space-y-6">
          {/* Copy the same form fields from create dialog */}
          {/* But change the values and onChange handlers to use editingSession */}
          {/* Example for one field: */}
          <div className="space-y-2">
            <label htmlFor="edit-title" className="text-sm font-medium">Session Title</label>
            <input
              id="edit-title"
              type="text"
              value={editingSession.title}
              onChange={(e) => setEditingSession({...editingSession, title: e.target.value})}
              className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Add all other fields similarly */}
          
          <div className="flex gap-3 pt-4">
            <Button
              variant="destructive"
              size="lg"
              onClick={() => handleDeleteSession(editingSession.id!)}
            >
              Delete Session
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all hover:shadow-lg"
              size="lg"
              onClick={updateSession}
            >
              Update Session
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )}
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
    session,
  }: {
    title: string
    description: string
    time: string
    participants: number
    maxParticipants: number
    tags: string[]
    status: "live" | "upcoming" | "ended"
    onJoin: () => void
    session?: Session
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

  
  

