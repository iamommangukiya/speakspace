"use client"

import { useState } from "react"
import { Camera, Briefcase, School, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  // Mock user data - in a real app, this would come from your auth service
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "evaluator",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Communication skills coach with 5+ years of experience in interview preparation and public speaking training.",
    occupation: "Communication Coach",
    education: "M.A. in Communications, Stanford University",
    joinDate: "January 2023",
    avatar: "/placeholder.svg?height=128&width=128",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  })

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setUserData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="sessions">Session History</TabsTrigger>
          <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Photo */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
                <CardDescription>This will be displayed on your profile</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="text-4xl">{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <p className="font-medium text-lg">{userData.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={userData.location}
                      onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={userData.bio}
                      onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>

            {/* Professional Information */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>Share your professional background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="occupation"
                        value={userData.occupation}
                        onChange={(e) => setUserData({ ...userData, occupation: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <div className="flex items-center gap-2">
                      <School className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="education"
                        value={userData.education}
                        onChange={(e) => setUserData({ ...userData, education: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Member Since</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Input id="joinDate" value={userData.joinDate} disabled />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive session reminders and feedback via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={userData.notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={userData.notifications.push}
                  onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={userData.notifications.sms}
                  onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your profile visibility and data sharing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Profile</Label>
                  <p className="text-sm text-muted-foreground">Allow others to view your profile information</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Share Session History</Label>
                  <p className="text-sm text-muted-foreground">Allow others to see your past sessions</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anonymous Feedback</Label>
                  <p className="text-sm text-muted-foreground">Keep your identity hidden when providing feedback</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Privacy Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>Your past sessions and evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Session 1 */}
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-medium">Technical Interview Practice</h3>
                      <p className="text-sm text-muted-foreground">April 2, 2023 • Participant</p>
                    </div>
                    <Badge>Completed</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Overall Score</span>
                      <span className="font-medium">82/100</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Duration</span>
                      <span>45 minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Participants</span>
                      <span>5</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Session 2 */}
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-medium">Group Discussion: Climate Change</h3>
                      <p className="text-sm text-muted-foreground">March 25, 2023 • Moderator</p>
                    </div>
                    <Badge>Completed</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Overall Score</span>
                      <span className="font-medium">78/100</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Duration</span>
                      <span>60 minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Participants</span>
                      <span>8</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Session 3 */}
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-medium">Leadership Skills Workshop</h3>
                      <p className="text-sm text-muted-foreground">March 15, 2023 • Evaluator</p>
                    </div>
                    <Badge>Completed</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Overall Score</span>
                      <span className="font-medium">85/100</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Duration</span>
                      <span>90 minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Participants</span>
                      <span>12</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Sessions</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Badges & Achievements</CardTitle>
              <CardDescription>Recognize your progress and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Badge 1 */}
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    <span className="text-2xl text-primary">🎯</span>
                  </div>
                  <h3 className="font-medium text-center">Clear Communicator</h3>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    Achieved high clarity scores in 5+ sessions
                  </p>
                </div>

                {/* Badge 2 */}
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    <span className="text-2xl text-primary">🔍</span>
                  </div>
                  <h3 className="font-medium text-center">Critical Thinker</h3>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    Demonstrated exceptional logical reasoning
                  </p>
                </div>

                {/* Badge 3 */}
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    <span className="text-2xl text-primary">👂</span>
                  </div>
                  <h3 className="font-medium text-center">Active Listener</h3>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    Consistently engages with others' ideas
                  </p>
                </div>

                {/* Badge 4 */}
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    <span className="text-2xl text-primary">🚀</span>
                  </div>
                  <h3 className="font-medium text-center">Fast Improver</h3>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    Showed significant progress in a short time
                  </p>
                </div>

                {/* Badge 5 */}
                <div className="flex flex-col items-center p-4 border rounded-lg bg-muted/50">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3">
                    <span className="text-2xl text-muted-foreground">🏆</span>
                  </div>
                  <h3 className="font-medium text-center text-muted-foreground">Debate Master</h3>
                  <p className="text-xs text-center text-muted-foreground mt-1">Win 10 debate sessions (5/10)</p>
                </div>

                {/* Badge 6 */}
                <div className="flex flex-col items-center p-4 border rounded-lg bg-muted/50">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3">
                    <span className="text-2xl text-muted-foreground">🌟</span>
                  </div>
                  <h3 className="font-medium text-center text-muted-foreground">Top Evaluator</h3>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    Provide feedback in 20+ sessions (12/20)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
