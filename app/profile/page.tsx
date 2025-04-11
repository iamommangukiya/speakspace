"use client"

import { useEffect, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, Download, Edit, Star, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function Profile() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return
      
      try {
        // Get user document from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid))
        
        if (userDoc.exists()) {
          setUserData({
            ...userDoc.data(),
            displayName: user.displayName || userDoc.data().name,
            email: user.email,
            photoURL: user.photoURL || userDoc.data().photoURL
          })
        } else {
          // If no user document exists, initialize with auth data
          setUserData({
            displayName: user.displayName || "",
            email: user.email || "",
            bio: "",
            skills: "",
            memberSince: new Date().toISOString().split('T')[0],
            photoURL: user.photoURL || ""
          })
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!authLoading) {
      fetchUserData()
    }
  }, [user, authLoading])

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  // Get initials for avatar
  const getInitials = () => {
    if (!userData?.displayName) return "U"
    return userData.displayName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
  }

  // Format skills as array
  const getSkills = () => {
    if (!userData?.skills) return []
    return typeof userData.skills === 'string' 
      ? userData.skills.split(',').map((skill: string) => skill.trim())
      : userData.skills
  }

  // Format member since date
  const formatMemberSince = () => {
    if (!userData?.createdAt && !userData?.memberSince) return "Recently joined"
    
    const date = userData.createdAt || userData.memberSince
    const dateObj = new Date(date)
    
    return dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long'
    })
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    )
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
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0"
            onClick={handleEditProfile}
          >
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
                  {userData?.photoURL ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img 
                        src={userData.photoURL} 
                        alt={userData.displayName || "Profile"} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-blue-600">{getInitials()}</span>
                    </div>
                  )}
                  <h2 className="text-xl font-bold">{userData?.displayName || "User"}</h2>
                  <p className="text-slate-500">{userData?.email}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="text-sm font-medium">
                      {userData?.level || "Beginner"} Level
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Bio</h3>
                    <p className="text-sm text-slate-600">
                      {userData?.bio || "No bio provided yet. Click 'Edit Profile' to add your bio."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Skills</h3>
                    {getSkills().length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {getSkills().map((skill: string, index: number) => (
                          <span 
                            key={index} 
                            className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600">
                        No skills added yet. Click 'Edit Profile' to add your skills.
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Member Since</h3>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-slate-500 mr-2" />
                      <span className="text-sm text-slate-600">{formatMemberSince()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rest of the component remains the same */}
            <Card className="shadow-sm border-0 bg-white mt-6">
              <CardHeader className="pb-2">
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Badges and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <AchievementBadge
                    title="Communication Pro"
                    description="Scored 80+ in communication"
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

          {/* Rest of the component remains the same */}
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
                          <ProgressItem label="Overall" value={75} change="+12%" />
                          <ProgressItem label="Body Language" value={82} change="+8%" />
                          <ProgressItem label="Voice Projection" value={68} change="+15%" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Communication</h3>
                        <div className="space-y-6">
                          <ProgressItem label="Overall" value={82} change="+5%" />
                          <ProgressItem label="Clarity" value={85} change="+7%" />
                          <ProgressItem label="Conciseness" value={78} change="+10%" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Logical Reasoning</h3>
                        <div className="space-y-6">
                          <ProgressItem label="Overall" value={68} change="+20%" />
                          <ProgressItem label="Problem Solving" value={72} change="+18%" />
                          <ProgressItem label="Critical Thinking" value={65} change="+22%" />
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
                        score={85}
                      />
                      <SessionHistoryItem
                        title="Group Discussion: AI Ethics"
                        date="April 8, 2023"
                        role="Moderator"
                        score={78}
                      />
                      <SessionHistoryItem
                        title="HR Interview Preparation"
                        date="April 5, 2023"
                        role="Participant"
                        score={92}
                      />
                      <SessionHistoryItem
                        title="System Design Interview"
                        date="April 2, 2023"
                        role="Participant"
                        score={75}
                      />
                      <SessionHistoryItem
                        title="Behavioral Interview Practice"
                        date="March 28, 2023"
                        role="Participant"
                        score={88}
                      />
                      <SessionHistoryItem
                        title="Group Discussion: Remote Work"
                        date="March 25, 2023"
                        role="Evaluator"
                        score={82}
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
          <span className="text-sm font-medium mr-2">{value}%</span>
          <span className="text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded">{change}</span>
        </div>
      </div>
      <Progress value={value} className="h-2" />
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
          <div className="text-lg font-bold">{score}%</div>
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
