"use client";

import { useEffect } from "react";
import { MainNav } from "@/components/main-nav";
import { SessionInterface } from "@/components/session-interface";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SessionPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.JitsiMeetExternalAPI) {
      const domain = "meet.jit.si";
      const options = {
        roomName: "MyCoolRoom123",
        width: "100%",
        height: 500,
        parentNode: document.getElementById("jitsi-container"),
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      const unsubscribe = onSnapshot(collection(db, "chat"), (snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });

      return () => {
        api.dispose();
        unsubscribe();
      };
    } else {
      console.warn("JitsiMeetExternalAPI not loaded");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div id="jitsi-container"></div>
        <SessionInterface />
      </main>
    </div>
  );
}
