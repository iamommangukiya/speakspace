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
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"

// Define interfaces for our data structures
interface Achievement {
  id: string;
  title: string;
  description: string;
  color: string;
  earned: boolean;
}

interface SkillProgress {
  category: string;
  skills: {
    name: string;
    value: number;
    change: string;
  }[];
}

interface SessionHistory {
  id: string;
  title: string;
  date: Date;
  role: string;
  score: number;
}

interface ResumeTipItem {
  id: string;
  title: string;
  description: string;
}

export default function Profile() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // New state variables for dynamic data
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([])
  const [sessionHistory, setSessionHistory] = useState<SessionHistory[]>([])
  const [resumeTips, setResumeTips] = useState<ResumeTipItem[]>([])
  const [loadingProgress, setLoadingProgress] = useState(true)
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [loadingTips, setLoadingTips] = useState(true)
  const [loadingAchievements, setLoadingAchievements] = useState(true)

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

    // Fetch user achievements
    const fetchAchievements = async () => {
      if (!user) return
      
      try {
        setLoadingAchievements(true)
        
        // Get achievements from Firestore
        const achievementsRef = collection(db, "achievements")
        const userAchievementsRef = collection(db, "users", user.uid, "achievements")
        
        // Get all possible achievements
        const achievementsSnapshot = await getDocs(achievementsRef)
        const allAchievements = achievementsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          earned: false
        })) as Achievement[]
        
        // Get user's earned achievements
        const userAchievementsSnapshot = await getDocs(userAchievementsRef)
        const earnedAchievementIds = userAchievementsSnapshot.docs.map(doc => doc.id)
        
        // Mark earned achievements
        const updatedAchievements = allAchievements.map(achievement => ({
          ...achievement,
          earned: earnedAchievementIds.includes(achievement.id)
        }))
        
        // If no achievements found, use default ones
        if (updatedAchievements.length === 0) {
          setAchievements([
            {
              id: "comm-pro",
              title: "Communication Pro",
              description: "Scored 80+ in communication",
              color: "amber",
              earned: true
            },
            {
              id: "quick-thinker",
              title: "Quick Thinker",
              description: "Excellent logical reasoning",
              color: "blue",
              earned: true
            },
            {
              id: "consistent",
              title: "Consistent Performer",
              description: "5 sessions in a row",
              color: "green",
              earned: true
            },
            {
              id: "team-player",
              title: "Team Player",
              description: "Valuable group discussions",
              color: "purple",
              earned: true
            }
          ])
        } else {
          setAchievements(updatedAchievements)
        }
      } catch (error) {
        console.error("Error fetching achievements:", error)
        // Set default achievements on error
        setAchievements([
          {
            id: "comm-pro",
            title: "Communication Pro",
            description: "Scored 80+ in communication",
            color: "amber",
            earned: true
          },
          {
            id: "quick-thinker",
            title: "Quick Thinker",
            description: "Excellent logical reasoning",
            color: "blue",
            earned: true
          },
          {
            id: "consistent",
            title: "Consistent Performer",
            description: "5 sessions in a row",
            color: "green",
            earned: true
          },
          {
            id: "team-player",
            title: "Team Player",
            description: "Valuable group discussions",
            color: "purple",
            earned: true
          }
        ])
      } finally {
        setLoadingAchievements(false)
      }
    }
    
    // Fetch skill progress
    const fetchSkillProgress = async () => {
      if (!user) return
      
      try {
        setLoadingProgress(true)
        
        // Get skill progress from Firestore
        const progressRef = collection(db, "users", user.uid, "progress")
        const progressSnapshot = await getDocs(progressRef)
        
        if (!progressSnapshot.empty) {
          const progressData = progressSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          
          // Transform data to match our interface
          const formattedProgress = progressData.reduce((acc: SkillProgress[], curr: any) => {
            const existingCategory = acc.find(item => item.category === curr.category)
            
            if (existingCategory) {
              existingCategory.skills.push({
                name: curr.name,
                value: curr.value,
                change: curr.change
              })
            } else {
              acc.push({
                category: curr.category,
                skills: [{
                  name: curr.name,
                  value: curr.value,
                  change: curr.change
                }]
              })
            }
            
            return acc
          }, [])
          
          setSkillProgress(formattedProgress)
        } else {
          // Set default progress data if none exists
          setSkillProgress([
            {
              category: "Confidence",
              skills: [
                { name: "Overall", value: 75, change: "+12%" },
                { name: "Body Language", value: 82, change: "+8%" },
                { name: "Voice Projection", value: 68, change: "+15%" }
              ]
            },
            {
              category: "Communication",
              skills: [
                { name: "Overall", value: 82, change: "+5%" },
                { name: "Clarity", value: 85, change: "+7%" },
                { name: "Conciseness", value: 78, change: "+10%" }
              ]
            },
            {
              category: "Logical Reasoning",
              skills: [
                { name: "Overall", value: 68, change: "+20%" },
                { name: "Problem Solving", value: 72, change: "+18%" },
                { name: "Critical Thinking", value: 65, change: "+22%" }
              ]
            }
          ])
        }
      } catch (error) {
        console.error("Error fetching skill progress:", error)
        // Set default progress data on error
        setSkillProgress([
          {
            category: "Confidence",
            skills: [
              { name: "Overall", value: 75, change: "+12%" },
              { name: "Body Language", value: 82, change: "+8%" },
              { name: "Voice Projection", value: 68, change: "+15%" }
            ]
          },
          {
            category: "Communication",
            skills: [
              { name: "Overall", value: 82, change: "+5%" },
              { name: "Clarity", value: 85, change: "+7%" },
              { name: "Conciseness", value: 78, change: "+10%" }
            ]
          },
          {
            category: "Logical Reasoning",
            skills: [
              { name: "Overall", value: 68, change: "+20%" },
              { name: "Problem Solving", value: 72, change: "+18%" },
              { name: "Critical Thinking", value: 65, change: "+22%" }
            ]
          }
        ])
      } finally {
        setLoadingProgress(false)
      }
    }
    
    // Fetch session history
    const fetchSessionHistory = async () => {
      if (!user) return
      
      try {
        setLoadingHistory(true)
        
        // Get session history from Firestore
        const sessionsRef = collection(db, "users", user.uid, "sessions")
        const sessionsQuery = query(
          sessionsRef,
          orderBy("date", "desc"),
          limit(10)
        )
        
        const sessionsSnapshot = await getDocs(sessionsQuery)
        
        if (!sessionsSnapshot.empty) {
          const sessions = sessionsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date?.toDate() || new Date()
          })) as SessionHistory[]
          
          setSessionHistory(sessions)
        } else {
          // Set default session history if none exists
          setSessionHistory([
            {
              id: "1",
              title: "Technical Interview Practice",
              date: new Date("2023-04-10"),
              role: "Participant",
              score: 85
            },
            {
              id: "2",
              title: "Group Discussion: AI Ethics",
              date: new Date("2023-04-08"),
              role: "Moderator",
              score: 78
            },
            {
              id: "3",
              title: "HR Interview Preparation",
              date: new Date("2023-04-05"),
              role: "Participant",
              score: 92
            },
            {
              id: "4",
              title: "System Design Interview",
              date: new Date("2023-04-02"),
              role: "Participant",
              score: 75
            },
            {
              id: "5",
              title: "Behavioral Interview Practice",
              date: new Date("2023-03-28"),
              role: "Participant",
              score: 88
            },
            {
              id: "6",
              title: "Group Discussion: Remote Work",
              date: new Date("2023-03-25"),
              role: "Evaluator",
              score: 82
            }
          ])
        }
      } catch (error) {
        console.error("Error fetching session history:", error)
        // Set default session history on error
        setSessionHistory([
          {
            id: "1",
            title: "Technical Interview Practice",
            date: new Date("2023-04-10"),
            role: "Participant",
            score: 85
          },
          {
            id: "2",
            title: "Group Discussion: AI Ethics",
            date: new Date("2023-04-08"),
            role: "Moderator",
            score: 78
          },
          {
            id: "3",
            title: "HR Interview Preparation",
            date: new Date("2023-04-05"),
            role: "Participant",
            score: 92
          },
          {
            id: "4",
            title: "System Design Interview",
            date: new Date("2023-04-02"),
            role: "Participant",
            score: 75
          },
          {
            id: "5",
            title: "Behavioral Interview Practice",
            date: new Date("2023-03-28"),
            role: "Participant",
            score: 88
          },
          {
            id: "6",
            title: "Group Discussion: Remote Work",
            date: new Date("2023-03-25"),
            role: "Evaluator",
            score: 82
          }
        ])
      } finally {
        setLoadingHistory(false)
      }
    }
    
    // Fetch resume tips
    const fetchResumeTips = async () => {
      if (!user) return
      
      try {
        setLoadingTips(true)
        
        // Get resume tips from Firestore
        const tipsRef = collection(db, "users", user.uid, "resumeTips")
        const tipsSnapshot = await getDocs(tipsRef)
        
        if (!tipsSnapshot.empty) {
          const tips = tipsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as ResumeTipItem[]
          
          setResumeTips(tips)
        } else {
          // Set default resume tips if none exists
          setResumeTips([
            {
              id: "1",
              title: "Highlight System Design Experience",
              description: "Based on your strong performance in system design discussions, emphasize projects where you've designed scalable systems."
            },
            {
              id: "2",
              title: "Quantify Your Achievements",
              description: "Add specific metrics to your accomplishments. For example, 'Improved application performance by 40%' rather than just 'Improved application performance'."
            },
            {
              id: "3",
              title: "Add Communication Skills",
              description: "Your communication scores are consistently high. Include 'Clear technical communication' as a key skill on your resume."
            },
            {
              id: "4",
              title: "Tailor Your Resume",
              description: "Customize your resume for each job application to highlight relevant experience and skills for that specific role."
            },
            {
              id: "5",
              title: "Include Problem-Solving Examples",
              description: "Add a brief example of a complex problem you solved, as your logical reasoning scores show this is a strength."
            }
          ])
        }
      } catch (error) {
        console.error("Error fetching resume tips:", error)
        // Set default resume tips on error
        setResumeTips([
          {
            id: "1",
            title: "Highlight System Design Experience",
            description: "Based on your strong performance in system design discussions, emphasize projects where you've designed scalable systems."
          },
          {
            id: "2",
            title: "Quantify Your Achievements",
            description: "Add specific metrics to your accomplishments. For example, 'Improved application performance by 40%' rather than just 'Improved application performance'."
          },
          {
            id: "3",
            title: "Add Communication Skills",
            description: "Your communication scores are consistently high. Include 'Clear technical communication' as a key skill on your resume."
          },
          {
            id: "4",
            title: "Tailor Your Resume",
            description: "Customize your resume for each job application to highlight relevant experience and skills for that specific role."
          },
          {
            id: "5",
            title: "Include Problem-Solving Examples",
            description: "Add a brief example of a complex problem you solved, as your logical reasoning scores show this is a strength."
          }
        ])
      } finally {
        setLoadingTips(false)
      }
    }

    if (!authLoading) {
      fetchUserData()
      fetchAchievements()
      fetchSkillProgress()
      fetchSessionHistory()
      fetchResumeTips()
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

  // Format date for session history
  const formatSessionDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get color for achievement badge
  const getAchievementColor = (color: string) => {
    switch (color) {
      case 'amber': return 'text-amber-500';
      case 'blue': return 'text-blue-500';
      case 'green': return 'text-green-500';
      case 'purple': return 'text-purple-500';
      default: return 'text-blue-500';
    }
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

            <Card className="shadow-sm border-0 bg-white mt-6">
              <CardHeader className="pb-2">
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Badges and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingAchievements ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.filter(a => a.earned).slice(0, 4).map((achievement) => (
                      <AchievementBadge
                        key={achievement.id}
                        title={achievement.title}
                        description={achievement.description}
                        icon={<Award className={`h-6 w-6 ${getAchievementColor(achievement.color)}`} />}
                      />
                    ))}
                    {achievements.filter(a => a.earned).length === 0 && (
                      <div className="col-span-2 text-center py-4">
                        <p className="text-sm text-slate-500">Complete sessions to earn achievements!</p>
                      </div>
                    )}
                  </div>
                )}
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
                    {loadingProgress ? (
                      <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {skillProgress.map((category, index) => (
                          <div key={index}>
                            <h3 className="text-lg font-medium mb-4">{category.category}</h3>
                            <div className="space-y-6">
                              {category.skills.map((skill, skillIndex) => (
                                <ProgressItem 
                                  key={skillIndex}
                                  label={skill.name} 
                                  value={skill.value} 
                                  change={skill.change} 
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
                    {loadingHistory ? (
                      <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                      </div>
                    ) : sessionHistory.length > 0 ? (
                      <div className="space-y-4">
                        {sessionHistory.map((session) => (
                          <SessionHistoryItem
                            key={session.id}
                            title={session.title}
                            date={formatSessionDate(session.date)}
                            role={session.role}
                            score={session.score}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-slate-500">No sessions recorded yet. Start practicing to see your history!</p>
                      </div>
                    )}
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
                    {loadingTips ? (
                      <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                      </div>
                    ) : resumeTips.length > 0 ? (
                      <div className="space-y-6">
                        {resumeTips.map((tip) => (
                          <ResumeTip
                            key={tip.id}
                            title={tip.title}
                            description={tip.description}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-slate-500">Complete more sessions to receive personalized resume tips!</p>
                      </div>
                    )}
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
