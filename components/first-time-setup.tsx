"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MainNav } from "@/components/main-nav"
import { useAuth } from "@/components/auth-provider"
import { ArrowRight, CheckCircle2, Target } from "lucide-react"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function FirstTimeSetup({ onComplete }: { onComplete: () => void }) {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [goals, setGoals] = useState("")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleNextStep = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsSubmitting(true)
      try {
        // Save preferences to localStorage for backward compatibility
        localStorage.setItem("speakspace_user_skills", JSON.stringify(selectedSkills))
        localStorage.setItem("speakspace_user_goals", goals)
        localStorage.setItem("speakspace_user_role", selectedRole || "")
        localStorage.setItem("speakspace_onboarding_complete", "true")

        // Save user preferences to Firestore if user is authenticated
        if (user?.id) {
          await setDoc(doc(db, "users", user.id), {
            skills: selectedSkills,
            goals: goals,
            preferredRole: selectedRole,
            onboardingCompleted: true,
            onboardingCompletedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          }, { merge: true })
        }

        // Complete onboarding
        onComplete()
      } catch (error) {
        console.error("Error saving user preferences:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to SpeakSpace, {user?.name?.split(" ")[0] || "User"}!
            </h1>
            <p className="text-slate-500 mt-2">Let's set up your profile to personalize your experience</p>
          </div>

          <div className="flex justify-between items-center mb-8">
            <StepIndicator step={1} currentStep={currentStep} label="Skills to Improve" />
            <div className="h-1 flex-1 bg-slate-200 mx-2">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              />
            </div>
            <StepIndicator step={2} currentStep={currentStep} label="Your Goals" />
            <div className="h-1 flex-1 bg-slate-200 mx-2">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentStep - 2) / 2) * 100}%` }}
              />
            </div>
            <StepIndicator step={3} currentStep={currentStep} label="Preferred Role" />
          </div>

          {currentStep === 1 && (
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>What skills would you like to improve?</CardTitle>
                <CardDescription>Select all that apply to personalize your practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SkillCheckbox
                    id="interview-skills"
                    label="Interview Skills"
                    description="Improve responses to common interview questions"
                    checked={selectedSkills.includes("interview-skills")}
                    onCheckedChange={() => handleSkillToggle("interview-skills")}
                  />
                  <SkillCheckbox
                    id="public-speaking"
                    label="Public Speaking"
                    description="Enhance presentation and speech delivery"
                    checked={selectedSkills.includes("public-speaking")}
                    onCheckedChange={() => handleSkillToggle("public-speaking")}
                  />
                  <SkillCheckbox
                    id="group-discussion"
                    label="Group Discussion"
                    description="Better participation in team discussions"
                    checked={selectedSkills.includes("group-discussion")}
                    onCheckedChange={() => handleSkillToggle("group-discussion")}
                  />
                  <SkillCheckbox
                    id="technical-communication"
                    label="Technical Communication"
                    description="Clearly explain complex technical concepts"
                    checked={selectedSkills.includes("technical-communication")}
                    onCheckedChange={() => handleSkillToggle("technical-communication")}
                  />
                  <SkillCheckbox
                    id="confidence"
                    label="Confidence"
                    description="Build self-assurance in professional settings"
                    checked={selectedSkills.includes("confidence")}
                    onCheckedChange={() => handleSkillToggle("confidence")}
                  />
                  <SkillCheckbox
                    id="logical-reasoning"
                    label="Logical Reasoning"
                    description="Enhance problem-solving and critical thinking"
                    checked={selectedSkills.includes("logical-reasoning")}
                    onCheckedChange={() => handleSkillToggle("logical-reasoning")}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all hover:shadow-lg"
                >
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>What are your goals?</CardTitle>
                <CardDescription>Tell us what you hope to achieve with SpeakSpace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goals">Your goals</Label>
                    <Textarea
                      id="goals"
                      placeholder="e.g., I want to prepare for upcoming job interviews, improve my public speaking skills for presentations, etc."
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all hover:shadow-lg"
                >
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>What's your preferred role?</CardTitle>
                <CardDescription>Select the role you'd like to take in practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <RoleCard
                    title="Moderator"
                    description="Manage the flow of the discussion, set topics, and ensure timekeeping"
                    isSelected={selectedRole === "moderator"}
                    onSelect={() => setSelectedRole("moderator")}
                  />
                  <RoleCard
                    title="Participant"
                    description="Engage actively in the discussion or mock interview"
                    isSelected={selectedRole === "participant"}
                    onSelect={() => setSelectedRole("participant")}
                  />
                  <RoleCard
                    title="Evaluator"
                    description="Observe and provide feedback on participants' performance"
                    isSelected={selectedRole === "evaluator"}
                    onSelect={() => setSelectedRole("evaluator")}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all hover:shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Complete Setup <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

function StepIndicator({ step, currentStep, label }: { step: number; currentStep: number; label: string }) {
  const isActive = step === currentStep
  const isCompleted = step < currentStep

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm mb-2 ${
          isActive ? "bg-blue-600 text-white" : isCompleted ? "bg-green-600 text-white" : "bg-slate-200 text-slate-600"
        }`}
      >
        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : step}
      </div>
      <span className="text-xs text-slate-600 text-center">{label}</span>
    </div>
  )
}

function SkillCheckbox({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  description: string
  checked: boolean
  onCheckedChange: () => void
}) {
  return (
    <div
      className={`p-4 rounded-lg border ${checked ? "border-blue-500 bg-blue-50" : "border-slate-200"} hover:border-blue-300 transition-colors`}
    >
      <div className="flex items-start space-x-3">
        <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} className="mt-1" />
        <div>
          <Label htmlFor={id} className="font-medium">
            {label}
          </Label>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}

function RoleCard({
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
    <Card
      className={`relative cursor-pointer border-2 transition-all ${
        isSelected ? "border-blue-500 shadow-md bg-blue-50" : "border-transparent hover:border-blue-200 hover:shadow-sm"
      }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 className="h-5 w-5 text-blue-600" />
        </div>
      )}
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-slate-100 mb-4">
          <Target className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  )
}
