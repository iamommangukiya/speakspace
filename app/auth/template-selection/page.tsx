"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ChevronRight, Mic, User, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"

export default function TemplateSelectionPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem("speakspace_user_role", selectedRole)
      localStorage.setItem("speakspace_template", selectedTemplate || "professional")
      localStorage.setItem("speakspace_onboarding_complete", "true")
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <header className="py-6 px-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SpeakSpace
          </h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">Welcome to SpeakSpace, {user?.name?.split(" ")[0]}!</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Let's personalize your experience. Choose your preferred role and template to get started.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Select your primary role</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RoleCard
                title="Participant"
                description="Join sessions and improve your skills through practice and feedback"
                icon={<User className="h-8 w-8 text-blue-600" />}
                isSelected={selectedRole === "participant"}
                onSelect={() => setSelectedRole("participant")}
              />
              <RoleCard
                title="Moderator"
                description="Create and manage sessions, guide discussions, and set topics"
                icon={<Mic className="h-8 w-8 text-indigo-600" />}
                isSelected={selectedRole === "moderator"}
                onSelect={() => setSelectedRole("moderator")}
              />
              <RoleCard
                title="Evaluator"
                description="Provide feedback and ratings to help participants improve"
                icon={<Users className="h-8 w-8 text-purple-600" />}
                isSelected={selectedRole === "evaluator"}
                onSelect={() => setSelectedRole("evaluator")}
              />
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Choose your interface template</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TemplateCard
                title="Professional"
                description="Clean, minimal interface focused on productivity"
                isSelected={selectedTemplate === "professional"}
                onSelect={() => setSelectedTemplate("professional")}
              />
              <TemplateCard
                title="Modern"
                description="Vibrant colors and contemporary design elements"
                isSelected={selectedTemplate === "modern"}
                onSelect={() => setSelectedTemplate("modern")}
              />
              <TemplateCard
                title="Classic"
                description="Traditional layout with intuitive navigation"
                isSelected={selectedTemplate === "classic"}
                onSelect={() => setSelectedTemplate("classic")}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedRole}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-6 text-lg"
              size="lg"
            >
              Continue to Dashboard
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

function RoleCard({
  title,
  description,
  icon,
  isSelected,
  onSelect,
}: {
  title: string
  description: string
  icon: React.ReactNode
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Card
        className={`relative cursor-pointer border-2 transition-all h-full ${
          isSelected
            ? "border-blue-500 shadow-md bg-blue-50"
            : "border-transparent hover:border-blue-200 hover:shadow-sm"
        }`}
        onClick={onSelect}
      >
        {isSelected && (
          <div className="absolute top-3 right-3">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
          </div>
        )}
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-slate-100 mb-4">{icon}</div>
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TemplateCard({
  title,
  description,
  isSelected,
  onSelect,
}: {
  title: string
  description: string
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Card
        className={`relative cursor-pointer border-2 transition-all h-full ${
          isSelected
            ? "border-blue-500 shadow-md bg-blue-50"
            : "border-transparent hover:border-blue-200 hover:shadow-sm"
        }`}
        onClick={onSelect}
      >
        {isSelected && (
          <div className="absolute top-3 right-3">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
          </div>
        )}
        <CardContent className="p-6">
          <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-md mb-4 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Template Preview</span>
          </div>
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
