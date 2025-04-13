"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { db } from "@/lib/firebase"
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: string
  text: string
  userId: string
  userName: string
  userAvatar?: string
  timestamp: any
}

type ChatRoomProps = {
  sessionId: string
}

export function ChatRoom({ sessionId }: ChatRoomProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    if (!sessionId) return

    // Subscribe to messages for this session
    const messagesRef = collection(db, `sessions/${sessionId}/messages`)
    const q = query(messagesRef, orderBy("timestamp", "asc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[]
      setMessages(newMessages)
    })

    return () => unsubscribe()
  }, [sessionId])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user) return

    try {
      const messagesRef = collection(db, `sessions/${sessionId}/messages`)
      await addDoc(messagesRef, {
        text: newMessage,
        userId: user.id,
        userName: user.name || "Anonymous",
        userAvatar: user.avatar,
        timestamp: serverTimestamp()
      })
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${message.userId === user?.id ? 'flex-row-reverse' : ''}`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.userAvatar || "/placeholder.svg"} />
              <AvatarFallback>{message.userName[0]}</AvatarFallback>
            </Avatar>
            <div
              className={`max-w-[70%] rounded-lg p-3 ${message.userId === user?.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800'
                }`}
            >
              <p className="text-sm font-medium mb-1">{message.userName}</p>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}