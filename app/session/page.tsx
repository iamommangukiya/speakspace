import { MainNav } from "@/components/main-nav"
import { SessionInterface } from "@/components/session-interface"

export default function SessionPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <SessionInterface />
      </main>
    </div>
  )
}
