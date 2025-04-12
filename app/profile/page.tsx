"use client"

import type React from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, Download, Edit, Star } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { StarRating } from "@/components/star-rating"

export default function Profile() {
  const { user } = useAuth()

  // Get initials for avatar
  const getInitials = () => {
    if (!user?.name) return "U"
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
            <p className="text-slate-500 mt-1">View and manage your account</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="pb-2">
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-blue-600">{getInitials()}</span>
                  </div>
                  <h2 className="text-xl font-bold">{user?.name || "User"}</h2>
                  <p className="text-slate-500">{user?.email || "user@example.com"}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="text-sm font-medium">Advanced Level</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Bio</h3>
                    <p className="text-sm text-slate-600">
                      Software engineer with 3 years of experience, currently preparing for senior roles. Passionate
                      about system design and distributed systems.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                        Technical Interviews
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">System Design</span>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">Algorithms</span>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                        Public Speaking
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Member Since</h3>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-slate-500 mr-2" />
                      <span className="text-sm text-slate-600">January 2023</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0 bg-white mt-6">
              <CardHeader className="pb-2">
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Badges and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <AchievementBadge
                    title="Communication Pro"
                    description="Scored 8+ in communication"
                    icon={<Award className="h-6 w-6 text-amber-500" />}
                  />
                  <AchievementBadge
                    title="Quick Thinker"
                    description="Excellent logical reasoning"
                    icon={<Award className="h-6 w-6 text-blue-500" />}
                  />
                  <AchievementBadge
                    title="Consistent Performer"
                    description="5 sessions in a row"
                    icon={<Award className="h-6 w-6 text-green-500" />}
                  />
                  <AchievementBadge
                    title="Team Player"
                    description="Valuable group discussions"
                    icon={<Award className="h-6 w-6 text-purple-500" />}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="progress" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="history">Session History</TabsTrigger>
                <TabsTrigger value="resume">Resume Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="progress" className="mt-6">
                <Card className="shadow-sm border-0 bg-white">
                  <CardHeader>
                    <CardTitle>Skill Progress</CardTitle>
                    <CardDescription>Your skill development over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Confidence</h3>
                        <div className="space-y-6">
                          <ProgressItem label="Overall" value={7.5} change="+1.2" />
                          <ProgressItem label="Body Language" value={8.2} change="+0.8" />
                          <ProgressItem label="Voice Projection" value={6.8} change="+1.5" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Communication</h3>
                        <div className="space-y-6">
                          <ProgressItem label="Overall" value={8.2} change="+0.5" />
                          <ProgressItem label="Clarity" value={8.5} change="+0.7" />
                          <ProgressItem label="Conciseness" value={7.8} change="+1.0" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Logical Reasoning</h3>
                        <div className="space-y-6">
                          <ProgressItem label="Overall" value={6.8} change="+2.0" />
                          <ProgressItem label="Problem Solving" value={7.2} change="+1.8" />
                          <ProgressItem label="Critical Thinking" value={6.5} change="+2.2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card className="shadow-sm border-0 bg-white">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Session History</CardTitle>
                      <CardDescription>Your past practice sessions</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <SessionHistoryItem
                        title="Technical Interview Practice"
                        date="April 10, 2023"
                        role="Participant"
                        score={8.5}
                      />
                      <SessionHistoryItem
                        title="Group Discussion: AI Ethics"
                        date="April 8, 2023"
                        role="Moderator"
                        score={7.8}
                      />
                      <SessionHistoryItem
                        title="HR Interview Preparation"
                        date="April 5, 2023"
                        role="Participant"
                        score={9.2}
                      />
                      <SessionHistoryItem
                        title="System Design Interview"
                        date="April 2, 2023"
                        role="Participant"
                        score={7.5}
                      />
                      <SessionHistoryItem
                        title="Behavioral Interview Practice"
                        date="March 28, 2023"
                        role="Participant"
                        score={8.8}
                      />
                      <SessionHistoryItem
                        title="Group Discussion: Remote Work"
                        date="March 25, 2023"
                        role="Evaluator"
                        score={8.2}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resume" className="mt-6">
                <Card className="shadow-sm border-0 bg-white">
                  <CardHeader>
                    <CardTitle>Resume Tips</CardTitle>
                    <CardDescription>Personalized suggestions based on your sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <ResumeTip
                        title="Highlight System Design Experience"
                        description="Based on your strong performance in system design discussions, emphasize projects where you've designed scalable systems."
                      />
                      <ResumeTip
                        title="Quantify Your Achievements"
                        description="Add specific metrics to your accomplishments. For example, 'Improved application performance by 40%' rather than just 'Improved application performance'."
                      />
                      <ResumeTip
                        title="Add Communication Skills"
                        description="Your communication scores are consistently high. Include 'Clear technical communication' as a key skill on your resume."
                      />
                      <ResumeTip
                        title="Tailor Your Resume"
                        description="Customize your resume for each job application to highlight relevant experience and skills for that specific role."
                      />
                      <ResumeTip
                        title="Include Problem-Solving Examples"
                        description="Add a brief example of a complex problem you solved, as your logical reasoning scores show this is a strength."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

function AchievementBadge({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center text-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
      <div className="mb-2">{icon}</div>
      <h4 className="font-medium text-sm">{title}</h4>
      <p className="text-xs text-slate-500 mt-1">{description}</p>
    </div>
  )
}

function ProgressItem({
  label,
  value,
  change,
}: {
  label: string
  value: number
  change: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center">
          <StarRating value={value} max={10} readOnly size="sm" />
          <span className="text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded ml-2">+{change}</span>
        </div>
      </div>
    </div>
  )
}

function SessionHistoryItem({
  title,
  date,
  role,
  score,
}: {
  title: string
  date: string
  role: string
  score: number
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
      <div>
        <h4 className="font-medium">{title}</h4>
        <div className="flex items-center mt-1 text-xs text-slate-500">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>Role: {role}</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="text-right mr-4">
          <span className="text-sm font-medium">Score</span>
          <div className="mt-1">
            <StarRating value={score} max={10} readOnly size="sm" />
          </div>
        </div>
        <Button variant="ghost" size="sm">
          View
        </Button>
      </div>
    </div>
  )
}

function ResumeTip({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  )
}
