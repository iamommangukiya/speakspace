"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoCall } from "@/components/video-call"
import { SessionChat } from "@/components/session-chat"
import { useAuth } from "@/components/auth-provider"

export function SessionInterface() {
  const { user } = useAuth()
  const [showChat, setShowChat] = useState(true)
  const [activeTab, setActiveTab] = useState("session")
  const [participantCount, setParticipantCount] = useState(3) // Default to 3 participants for testing

  // Mock session data - in a real app, you would fetch this from your backend
  const sessionData = {
    id: "session123",
    title: "Technical Interview Practice",
    description: "Practice for software engineering roles with mock interviews focusing on algorithms and system design.",
    isHost: true,
    participants: Array.from({ length: participantCount }, (_, i) => `user${i+1}`)
  }

  const handleEndCall = () => {
    // In a real app, you would handle ending the call and redirecting
    window.location.href = "/dashboard"
  }

  const toggleChat = () => {
    setShowChat(!showChat)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  // Add buttons to test different participant counts
  const addParticipant = () => {
    setParticipantCount(prev => Math.min(prev + 1, 8)); // Max 8 participants for testing
  };

  const removeParticipant = () => {
    setParticipantCount(prev => Math.max(prev - 1, 0)); // Min 0 participants
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
      <div className={`lg:col-span-${showChat ? '2' : '3'} h-full`}>
        <Card className="shadow-sm border-0 bg-white h-full flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{sessionData.title}</CardTitle>
                <CardDescription>
                  Session in progress • {participantCount + 1} participants
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={removeParticipant}>
                  - Participant
                </Button>
                <Button size="sm" variant="outline" onClick={addParticipant}>
                  + Participant
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <VideoCall 
              sessionId={sessionData.id}
              userId={user.uid}
              userName={user.displayName || "User"}
              isHost={sessionData.isHost}
              onEndCall={handleEndCall}
              onToggleChat={toggleChat}
            />
          </CardContent>
        </Card>
      </div>

      {showChat && (
        <div className="h-full">
          <Tabs defaultValue="chat" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat" onClick={() => setActiveTab("chat")}>Chat</TabsTrigger>
              <TabsTrigger value="notes" onClick={() => setActiveTab("notes")}>Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex-1 mt-0 p-0">
              <SessionChat 
                sessionId={sessionData.id}
                userId={user.uid}
                userName={user.displayName || "User"}
                userAvatar={user.photoURL || undefined}
              />
            </TabsContent>
            <TabsContent value="notes" className="flex-1 mt-0">
              <Card className="shadow-sm border-0 bg-white h-full">
                <CardHeader className="pb-2">
                  <CardTitle>Session Notes</CardTitle>
                  <CardDescription>Take notes during your session</CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea 
                    className="w-full h-[calc(100vh-350px)] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your notes here..."
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
