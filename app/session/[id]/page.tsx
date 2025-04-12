"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { rtdb } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import { useAuth } from "@/components/auth-provider"
import { SessionInterface, type SessionInterfaceProps } from "@/components/session-interface"

export default function SessionPage() {
  const params = useParams()
  const { user } = useAuth()
  const [isHost, setIsHost] = useState(false)
  const sessionId = params.id as string

  useEffect(() => {
    const checkHostStatus = async () => {
      if (!user) return

      const meetingRef = ref(rtdb, `meetings/${sessionId}`)
      const snapshot = await get(meetingRef)
      
      if (snapshot.exists()) {
        const data = snapshot.val()
        setIsHost(data.hostId === user.uid)
      }
    }

    checkHostStatus()
  }, [sessionId, user])

  if (!user) {
    return <div>Please sign in to join the meeting</div>
  }

  const sessionProps: SessionInterfaceProps = {
    sessionId,
    userId: user.uid,
    userName: user.displayName || "User",
    isHost,
    onEndCall: () => window.location.href = "/dashboard",
    onToggleChat: () => {}
  }

  return <SessionInterface {...sessionProps} />
}