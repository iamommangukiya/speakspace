"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { rtdb } from "@/lib/firebase"
import { ref, get, update } from "firebase/database"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"

export default function JoinPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const [error, setError] = useState("")
  const meetingId = searchParams?.get("id")

  const joinMeeting = async () => {
    if (!meetingId || !user) return

    try {
      const meetingRef = ref(rtdb, `meetings/${meetingId}`)
      const snapshot = await get(meetingRef)
      
      if (snapshot.exists()) {
        const meetingData = snapshot.val()
        
        if (!meetingData.active) {
          setError("This meeting has ended")
          return
        }

        // Add participant to the meeting
        await update(meetingRef, {
          [`participants/${user.uid}`]: user.displayName || "User"
        })

        router.push(`/session/${meetingId}`)
      } else {
        setError("Meeting not found")
      }
    } catch (error) {
      console.error("Error joining meeting:", error)
      setError("Failed to join meeting")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Join Meeting</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p className="mb-8">Meeting ID: {meetingId}</p>
      <Button onClick={joinMeeting} size="lg">
        Join Now
      </Button>
    </div>
  )
}