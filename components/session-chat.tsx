"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  text: string
  timestamp: Date
}

interface SessionChatProps {
  sessionId: string
  userId: string
  userName: string
  userAvatar?: string
}

export function SessionChat({ sessionId, userId, userName, userAvatar }: SessionChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mock initial messages
    const initialMessages: Message[] = [
      {
        id: "1",
        userId: "user1",
        userName: "Michael Johnson",
        userAvatar: "/placeholder.svg?height=32&width=32&text=MJ",
        text: "Hello everyone! Welcome to the session.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
      },
      {
        id: "2",
        userId: "user2",
        userName: "Emily Chen",
        userAvatar: "/placeholder.svg?height=32&width=32&text=EC",
        text: "Thanks for hosting this session. I'm excited to practice!",
        timestamp: new Date(Date.now() - 1000 * 60 * 4) // 4 minutes ago
      },
      {
        id: "3",
        userId: "user3",
        userName: "Sarah Williams",
        userAvatar: "/placeholder.svg?height=32&width=32&text=SW",
        text: "I have a question about system design interviews. What's the best approach to start?",
        timestamp: new Date(Date.now() - 1000 * 60 * 2) // 2 minutes ago
      }
    ]
    
    setMessages(initialMessages)
    
    // In a real app, you would set up a listener for new messages here
    // Example: const unsubscribe = onSessionMessages(sessionId, setMessages)
    // return unsubscribe
  }, [sessionId])

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        userId,
        userName,
        userAvatar,
        text: newMessage,
        timestamp: new Date()
      }
      
      // In a real app, you would send this to your backend/Firestore
      // sendMessage(sessionId, message)
      
      // For demo, just add to local state
      setMessages(prev => [...prev, message])
      setNewMessage("")
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-full border rounded-lg bg-white">
      <div className="p-3 border-b">
        <h3 className="font-medium">Session Chat</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.userId === userId ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.userId === userId ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={message.userAvatar} alt={message.userName} />
                  <AvatarFallback>{message.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className={`px-3 py-2 rounded-lg ${
                  message.userId === userId 
                    ? 'bg-blue-500 text-white rounded-tr-none' 
                    : 'bg-slate-100 text-slate-800 rounded-tl-none'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium">
                      {message.userId === userId ? 'You' : message.userName}
                    </span>
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}