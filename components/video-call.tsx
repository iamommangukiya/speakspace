"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare } from "lucide-react"

interface VideoCallProps {
  sessionId: string
  userId: string
  userName: string // Add userName prop
  isHost: boolean
  onEndCall: () => void
  onToggleChat: () => void
}

export function VideoCall({ sessionId, userId, userName, isHost, onEndCall, onToggleChat }: VideoCallProps) {
  const [micEnabled, setMicEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [participants, setParticipants] = useState<string[]>([])
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  useEffect(() => {
    // Initialize local video stream
    const setupLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: videoEnabled,
          audio: micEnabled
        })
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
        
        // Here you would connect to your WebRTC service
        // initializeWebRTCConnection(stream)
        
      } catch (error) {
        console.error("Error accessing media devices:", error)
        setVideoEnabled(false)
        setMicEnabled(false)
      }
    }
    
    setupLocalStream()
    
    // Mock adding participants for demo
    const mockParticipants = ["user1", "user2", "user3"].filter(id => id !== userId)
    setParticipants(mockParticipants)
    
    return () => {
      // Cleanup function to stop all media tracks
      const stream = localVideoRef.current?.srcObject as MediaStream
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [sessionId, userId])

  const toggleMic = () => {
    const stream = localVideoRef.current?.srcObject as MediaStream
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !micEnabled
      })
    }
    setMicEnabled(!micEnabled)
  }

  const toggleVideo = () => {
    const stream = localVideoRef.current?.srcObject as MediaStream
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !videoEnabled
      })
    }
    setVideoEnabled(!videoEnabled)
  }

  // Determine the grid layout based on participant count
  const getGridLayout = () => {
    const totalParticipants = participants.length + 1; // +1 for local user
    
    if (totalParticipants <= 1) {
      return "grid-cols-1";
    } else if (totalParticipants <= 4) {
      return "grid-cols-2";
    } else {
      // For more than 4 participants, we'll use a different layout
      return "grid-cols-1 md:grid-cols-3";
    }
  };

  // Determine if a video should be displayed larger (for host when > 4 participants)
  const isLargeVideo = (participantId: string | null) => {
    const totalParticipants = participants.length + 1;
    return totalParticipants > 4 && ((participantId === null && isHost) || (participantId === "host" && !isHost));
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`flex-1 grid ${getGridLayout()} gap-4 p-4 bg-slate-900 rounded-lg overflow-hidden`}>
        {/* Local video */}
        <div className={`relative bg-slate-800 rounded-lg overflow-hidden ${
          isLargeVideo(null) ? 'md:col-span-2 md:row-span-2' : ''
        }`}>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-slate-900/70 px-2 py-1 rounded text-white text-xs">
            {userName || "You"} {isHost ? "(Host)" : ""}
          </div>
        </div>
        
        {/* Remote videos */}
        {participants.map(participantId => (
          <div 
            key={participantId} 
            className={`relative bg-slate-800 rounded-lg overflow-hidden ${
              isLargeVideo(participantId) ? 'md:col-span-2 md:row-span-2' : ''
            }`}
          >
            <video
              ref={(el) => { remoteVideoRefs.current[participantId] = el; }}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-slate-900/70 px-2 py-1 rounded text-white text-xs">
              Participant {participantId}
            </div>
          </div>
        ))}
      </div>
      
      {/* Controls */}
      <div className="flex justify-center items-center gap-4 p-4 bg-white border-t">
        <Button 
          variant={micEnabled ? "outline" : "secondary"} 
          size="icon" 
          onClick={toggleMic}
          className="rounded-full h-12 w-12"
        >
          {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant={videoEnabled ? "outline" : "secondary"} 
          size="icon" 
          onClick={toggleVideo}
          className="rounded-full h-12 w-12"
        >
          {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="destructive" 
          size="icon" 
          onClick={onEndCall}
          className="rounded-full h-12 w-12"
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onToggleChat}
          className="rounded-full h-12 w-12"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}