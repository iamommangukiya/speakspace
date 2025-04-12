"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { rtdb } from "@/lib/firebase"
import { ref, set, onValue, off, push } from "firebase/database"

interface Message {
  id: string
  userId: string
  userName: string
  content: string
  timestamp: number
}

interface ChatRoomProps {
  sessionId: string
  userId: string
  userName: string
  isHost: boolean
  onEndSession: () => void
}

export function ChatRoom({ sessionId, userId, userName, isHost, onEndSession }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [participants, setParticipants] = useState<{[key: string]: string}>({})

  useEffect(() => {
    const roomRef = ref(rtdb, `rooms/${sessionId}`)
    const messagesRef = ref(rtdb, `rooms/${sessionId}/messages`)
    
    const setupRoom = async () => {
      if (isHost) {
        await set(roomRef, {
          hostId: userId,
          participants: { [userId]: userName },
          createdAt: Date.now()
        })
      } else {
        await set(ref(rtdb, `rooms/${sessionId}/participants/${userId}`), userName)
      }
    }

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const messageList = Object.entries(data).map(([id, msg]: [string, any]) => ({
          id,
          ...msg
        }))
        setMessages(messageList)
      }
    })

    const participantsRef = ref(rtdb, `rooms/${sessionId}/participants`)
    onValue(participantsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setParticipants(data)
      }
    })

    setupRoom()

    return () => {
      off(roomRef)
    }
  }, [sessionId, userId, userName, isHost])

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const messagesRef = ref(rtdb, `rooms/${sessionId}/messages`)
    await push(messagesRef, {
      userId,
      userName,
      content: newMessage,
      timestamp: Date.now()
    })
    setNewMessage("")
  }

  return (
    <div className="grid grid-cols-4 gap-4 h-full p-4">
      <div className="col-span-1 bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium mb-2">Participants ({Object.keys(participants).length})</h3>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {Object.entries(participants).map(([id, name]) => (
              <div key={id} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>{name} {id === userId && '(You)'}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="col-span-3">
        <Card className="h-full flex flex-col">
          <CardContent className="flex-1 p-4">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.userId === userId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      message.userId === userId ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}>
                      <div className="text-sm font-medium mb-1">{message.userName}</div>
                      <div>{message.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex gap-2 mt-4">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}