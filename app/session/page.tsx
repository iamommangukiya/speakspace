"use client";

import { useEffect } from "react";
import { MainNav } from "@/components/main-nav";
import { SessionInterface } from "@/components/session-interface";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Helper to generate a unique room ID
function generateRoomId() {
  return `room-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export default function SessionPage() {
  useEffect(() => {
    const roomId = generateRoomId(); // Generate unique room name

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
    let unsubscribe: () => void;

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
        };
        

        api = new window.JitsiMeetExternalAPI(domain, options);

        unsubscribe = onSnapshot(collection(db, "chat"), (snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.data());
          });
        });
      })
      .catch((err) => {
        console.error("Jitsi script load error:", err);
      });

    // Cleanup on unmount
    return () => {
      if (api) api.dispose();
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div id="jitsi-container"></div>
        {/* <SessionInterface /> */}
        {/* <ChatUI /> */}
      </main>
    </div>
  );
}
