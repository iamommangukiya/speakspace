"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MainNav } from "@/components/main-nav";
import { SessionInterface } from "@/components/session-interface";
import { ChatRoom } from "@/components/chat-room";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";

export default function SessionPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get("id");
    if (!sessionId || !user) {
      toast({
        title: "Error",
        description: "Invalid session parameters",
        variant: "destructive"
      });
      window.location.href = "/live-sessions";
      return;
    }

    const fetchSession = async () => {
      try {
        const sessionDoc = await getDoc(doc(db, "sessions", sessionId));
        if (!sessionDoc.exists()) {
          throw new Error("Session not found");
        }
        setSession({
          id: sessionDoc.id,
          ...sessionDoc.data()
        });

        // Initialize Jitsi after session is loaded
        initializeJitsi(sessionId);
      } catch (error) {
        console.error("Error fetching session:", error);
        toast({
          title: "Error",
          description: "Failed to load session",
          variant: "destructive"
        });
        window.location.href = "/live-sessions";
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [searchParams, user, toast]);

  const initializeJitsi = (roomId: string) => {
    const loadJitsiScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (typeof window.JitsiMeetExternalAPI !== "undefined") {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject("Failed to load Jitsi script");
        document.body.appendChild(script);
      });
    };

    let api: any;

    loadJitsiScript()
      .then(() => {
        const domain = "meet.jit.si";
        const options = {
          roomName: roomId,
          width: "100%",
          height: 500,
          parentNode: document.getElementById("jitsi-container"),
          configOverwrite: {
            startWithAudioMuted: true,
            startWithVideoMuted: true,
          },
          userInfo: {
            displayName: user?.name || "Anonymous"
          }
        };

        api = new window.JitsiMeetExternalAPI(domain, options);
      })
      .catch((err) => {
        console.error("Jitsi script load error:", err);
        toast({
          title: "Error",
          description: "Failed to load video conference",
          variant: "destructive"
        });
      });

    return () => {
      if (api) api.dispose();
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div id="jitsi-container" className="rounded-lg overflow-hidden shadow-lg"></div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[600px]">
            <ChatRoom sessionId={session?.id} />
          </div>
        </div>
      </main>
    </div>
  );
}
