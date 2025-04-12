"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatRoom } from "./chat-room"
import { SessionChat } from "@/components/session-chat"
import { useAuth } from "@/components/auth-provider"
import { rtdb } from "@/lib/firebase"
import { ref, onValue } from "firebase/database"

export interface SessionInterfaceProps {
  sessionId: string
  userId: string
  userName: string
  isHost: boolean
  onEndCall: () => void
  onToggleChat: () => void
}

export function SessionInterface({ sessionId, userId, userName, isHost, onEndCall }: SessionInterfaceProps) {
  const { user } = useAuth()
  const [participants, setParticipants] = useState<{[key: string]: string}>({})

  useEffect(() => {
    const participantsRef = ref(rtdb, `rooms/${sessionId}/participants`)
    const unsubscribe = onValue(participantsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setParticipants(data)
      }
    })

    return () => unsubscribe()
  }, [sessionId])

  if (!user) {
    return <div>Loading...</div>
  }

  const sessionData = {
    id: sessionId,
    title: "Technical Interview Practice",
    description: "Practice for software engineering roles with mock interviews focusing on algorithms and system design.",
    isHost,
  }

  return (
    <div className="h-[calc(100vh-180px)]">
      <Card className="shadow-sm border-0 bg-white h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{sessionData.title}</CardTitle>
              <CardDescription>
                Session in progress • {Object.keys(participants).length} participants
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ChatRoom 
            sessionId={sessionData.id}
            userId={user?.uid || userId}
            userName={user?.displayName || userName}
            isHost={sessionData.isHost}
            onEndSession={onEndCall}
          />
        </CardContent>
      </Card>
    </div>
  )
}
