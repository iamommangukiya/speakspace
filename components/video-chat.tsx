import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface VideoChatProps {
  sessionId: string
  userId: string
  userName: string
}

export function VideoChat({ sessionId, userId, userName }: VideoChatProps) {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const messagesRef = collection(db, 'sessions', sessionId, 'messages')
    const q = query(messagesRef, orderBy('timestamp', 'asc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setMessages(newMessages)
    })

    return () => unsubscribe()
  }, [sessionId])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      await addDoc(collection(db, 'sessions', sessionId, 'messages'), {
        text: newMessage,
        userId,
        userName,
        timestamp: serverTimestamp()
      })
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 ${message.userId === userId ? 'text-right' : ''}`}
          >
            <div className={`inline-block max-w-[70%] rounded-lg px-3 py-2 
              ${message.userId === userId ? 
                'bg-blue-500 text-white' : 
                'bg-gray-100 text-gray-900'}`}
            >
              <div className="text-xs opacity-75">{message.userName}</div>
              <div>{message.text}</div>
            </div>
          </div>
        ))}
      </ScrollArea>
      
      <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}