"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare } from "lucide-react"
import { Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { VideoChat } from "@/components/video-chat"

import { rtdb } from "@/lib/firebase" // Make sure you have Firebase configured
import { ref, set, onValue, off } from "firebase/database"

interface VideoCallProps {
  sessionId: string
  userId: string
  userName: string // Add userName prop
  isHost: boolean
  onEndCall: () => void
  onToggleChat: () => void
}

export function VideoCall({ sessionId, userId, userName, isHost, onEndCall, onToggleChat }: VideoCallProps) {
  const { toast } = useToast()
  const [micEnabled, setMicEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [participants, setParticipants] = useState<string[]>([])
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})
  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({})
  const [isConnecting, setIsConnecting] = useState(true)

  useEffect(() => {

    
    // Update to use rtdb reference
    const roomRef = ref(rtdb, `meetings/${sessionId}`)
    
    const setupMeeting = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoEnabled,
        audio: micEnabled
      })
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      if (isHost) {
        // Create room in realtime database
        await set(roomRef, {
          hostId: userId,
          participants: { [userId]: userName },
          createdAt: Date.now()
        })
      } else {
        // Join existing room
        const pc = new RTCPeerConnection({
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' }
          ]
        })
        
        // Add local stream
        stream.getTracks().forEach(track => {
          pc.addTrack(track, stream)
        })

        // Handle incoming streams
        pc.ontrack = (event) => {
          if (remoteVideoRefs.current["host"]) {
            remoteVideoRefs.current["host"].srcObject = event.streams[0]
          }
        }

        // Create and send offer
        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)
        
        await set(ref(rtdb, `meetings/${sessionId}/offers/${userId}`), {
          type: offer.type,
          sdp: offer.sdp,
          userId,
          userName,
          timestamp: Date.now()
        })

        peerConnections.current["host"] = pc
      }
    }

    setupMeeting()

    // Cleanup
    return () => {
      off(roomRef)
      Object.values(peerConnections.current).forEach(pc => pc.close())
    }
  }, [sessionId, userId, isHost])

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

  // Move shareMeeting function outside of the return statement
  const shareMeeting = async () => {
    const meetingUrl = `${window.location.origin}/join?id=${sessionId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my SpeakSpace meeting',
          text: `Join my meeting on SpeakSpace. Meeting ID: ${sessionId}`,
          url: meetingUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fall back to clipboard
        copyMeetingInfo();
      }
    } else {
      // No share API support, use clipboard
      copyMeetingInfo();
    }
  };

  const copyMeetingInfo = () => {
    const meetingInfo = `Meeting ID: ${sessionId}\nJoin URL: ${window.location.origin}/join?id=${sessionId}`;
    navigator.clipboard.writeText(meetingInfo)
      .then(() => {
        toast({
          title: "Meeting info copied!",
          description: "Share this with participants to join the call.",
        })
      })
      .catch((error) => {
        console.error('Error copying meeting info:', error);
        toast({
          variant: "destructive",
          title: "Failed to copy meeting info",
          description: "Please try again",
        })
      });
  };

  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="flex h-full">
      <div className={`flex-1 flex flex-col ${isChatOpen ? 'mr-4' : ''}`}>
        {/* Video Grid and Controls */}
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
            variant="outline" 
            size="icon" 
            onClick={shareMeeting}
            className="rounded-full h-12 w-12"
          >
            <Share2 className="h-5 w-5" />
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
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="rounded-full h-12 w-12"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>
  
      {/* Chat Sidebar */}
      {isChatOpen && (
        <div className="w-80 border-l">
          <VideoChat
            sessionId={sessionId}
            userId={userId}
            userName={userName}
          />
        </div>
      )}
    </div>
  )
  
}