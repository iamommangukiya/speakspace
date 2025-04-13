"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarIcon, Users } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function CreateMeeting() {
  const router = useRouter()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    maxParticipants: "10",
    rules: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id || !date) return

    setIsSubmitting(true)
    try {
      const meetingId = `gd_${Date.now()}`
      await setDoc(doc(db, "meetings", meetingId), {
        id: meetingId,
        type: "group_discussion",
        topic: formData.topic,
        description: formData.description,
        maxParticipants: parseInt(formData.maxParticipants),
        rules: formData.rules,
        scheduledAt: date,
        createdBy: user.id,
        createdAt: serverTimestamp(),
        status: "scheduled",
        participants: [user.id],
      })

      router.push("/live-sessions")
    } catch (error) {
      console.error("Error creating meeting:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Create Group Discussion</h1>
            <p className="text-slate-500 mt-1">Schedule a new group discussion session</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Discussion Details</CardTitle>
                <CardDescription>Fill in the details for your group discussion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Discussion Topic</Label>
                  <Input
                    id="topic"
                    name="topic"
                    placeholder="Enter the main topic for discussion"
                    value={formData.topic}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a brief description of the discussion points"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Schedule Date & Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Maximum Participants</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="maxParticipants"
                        name="maxParticipants"
                        type="number"
                        min="2"
                        max="20"
                        value={formData.maxParticipants}
                        onChange={handleInputChange}
                        required
                      />
                      <Users className="h-4 w-4 text-slate-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rules">Discussion Rules</Label>
                  <Textarea
                    id="rules"
                    name="rules"
                    placeholder="Set any specific rules or guidelines for the discussion"
                    value={formData.rules}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 shadow-md transition-all hover:shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Discussion"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}