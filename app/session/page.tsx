"use client";

import { useEffect } from "react";
import { MainNav } from "@/components/main-nav";
import { SessionInterface } from "@/components/session-interface";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function SessionPage() {
  useEffect(() => {
    // Check if JitsiMeetExternalAPI is loaded
    if (typeof window.JitsiMeetExternalAPI !== "undefined") {
      const domain = "meet.jit.si";
      const options = {
        roomName: "abc@345",
        width: "100%",
        height: 500,
        parentNode: document.getElementById("jitsi-container"),
      };
      const api = new window.JitsiMeetExternalAPI(domain, options);

      // Firebase chat listener
      const unsubscribe = onSnapshot(collection(db, "chat"), (snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          // Handle incoming chat messages
        });
      });

      return () => {
        api.dispose();
        unsubscribe();
      };
    } else {
      console.error("JitsiMeetExternalAPI not loaded");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div id="jitsi-container"></div>
        <SessionInterface />
{/* <ChatUI /> */}
      </main>
    </div>
  );
}
