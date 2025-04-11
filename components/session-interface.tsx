"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff, Send, Video, VideoOff } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export function SessionInterface() {
  const [micEnabled, setMicEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [message, setMessage] = useState("")

  const toggleMic = () => setMicEnabled(!micEnabled)
  const toggleVideo = () => setVideoEnabled(!videoEnabled)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Send message logic would go here
      setMessage("")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Technical Interview Practice</CardTitle>
                <CardDescription>Session in progress • 32:45</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={micEnabled ? "default" : "outline"}
                  size="icon"
                  onClick={toggleMic}
                  className={micEnabled ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
                <Button
                  variant={videoEnabled ? "default" : "outline"}
                  size="icon"
                  onClick={toggleVideo}
                  className={videoEnabled ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  You (Participant)
                </div>
              </div>
              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Interviewer" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  Sarah (Moderator)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Observer" />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  Mike (Evaluator)
                </div>
              </div>
              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Observer" />
                    <AvatarFallback>RL</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  Rachel (Participant)
                </div>
              </div>
              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Observer" />
                    <AvatarFallback>TJ</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  Tom (Participant)
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Separator className="mb-4" />
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="mt-4">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Session Chat</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px] overflow-y-auto space-y-4">
                <ChatMessage
                  name="Sarah"
                  role="Moderator"
                  message="Welcome everyone to this technical interview practice session. We'll be focusing on system design questions today."
                  time="10:02 AM"
                />
                <ChatMessage
                  name="Mike"
                  role="Evaluator"
                  message="Remember to explain your thought process clearly as you work through the problems."
                  time="10:03 AM"
                />
                <ChatMessage
                  name="You"
                  role="Participant"
                  message="Thanks for the tips. I'm ready to start whenever everyone else is."
                  time="10:04 AM"
                  isUser={true}
                />
                <ChatMessage
                  name="Rachel"
                  role="Participant"
                  message="I'm ready too. Looking forward to the practice!"
                  time="10:05 AM"
                />
                <ChatMessage
                  name="Sarah"
                  role="Moderator"
                  message="Great! Let's begin with a common system design question: How would you design a URL shortening service like bit.ly?"
                  time="10:06 AM"
                />
                <ChatMessage
                  name="You"
                  role="Participant"
                  message="For a URL shortening service, I'd first consider the requirements: generating unique short URLs, redirecting to original URLs, and handling high traffic."
                  time="10:08 AM"
                  isUser={true}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="feedback" className="mt-4">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Real-time Feedback</CardTitle>
                <CardDescription>Your performance metrics for this session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                  <p className="text-xs text-slate-500">Good eye contact and posture. Try to reduce filler words.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Communication</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-slate-500">Clear explanations and good use of technical terminology.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Logical Reasoning</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-slate-500">
                    Structured approach to problem-solving. Consider edge cases more thoroughly.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Evaluator Notes</h4>
                  <div className="bg-slate-50 p-3 rounded-md text-sm">
                    <p>
                      Good technical knowledge and communication skills. Demonstrates clear understanding of system
                      design principles. Could improve on discussing scalability aspects and trade-offs in more detail.
                    </p>
                    <p className="mt-2">
                      Recommendation: Practice more complex system design questions and focus on discussing performance
                      optimizations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ChatMessage({
  name,
  role,
  message,
  time,
  isUser = false,
}: {
  name: string
  role: string
  message: string
  time: string
  isUser?: boolean
}) {
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-8 w-8 mt-1">
        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${name.charAt(0)}`} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className={`max-w-[80%] ${isUser ? "text-right" : ""}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm">{name}</span>
          <span className="text-xs text-slate-500">({role})</span>
        </div>
        <div
          className={`p-3 rounded-lg text-sm ${isUser ? "bg-blue-100 text-blue-900" : "bg-slate-100 text-slate-900"}`}
        >
          {message}
        </div>
        <span className="text-xs text-slate-500 mt-1 block">{time}</span>
      </div>
    </div>
  )
}
