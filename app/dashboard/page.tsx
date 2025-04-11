import Link from "next/link"
import { MessageSquare, Users, Calendar, BarChart2, ArrowRight, Clock, Mic, Award, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your progress and upcoming sessions.
          </p>
        </div>
        <Button className="w-full md:w-auto gap-2">
          Join a Session <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8/10</div>
            <p className="text-xs text-muted-foreground">+0.3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next session in 2 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+21 from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Upcoming Sessions */}
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled group discussions and interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Session 1 */}
              <div className="flex items-center gap-4 p-3 rounded-lg border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Technical Interview Practice</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Tomorrow, 3:00 PM</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mock interview session focused on system design questions
                  </p>
                </div>
              </div>

              {/* Session 2 */}
              <div className="flex items-center gap-4 p-3 rounded-lg border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Group Discussion: Climate Change</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Apr 15, 5:30 PM</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Debate on environmental policies and corporate responsibility
                  </p>
                </div>
              </div>

              {/* Session 3 */}
              <div className="flex items-center gap-4 p-3 rounded-lg border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Public Speaking Workshop</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Apr 18, 2:00 PM</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Learn techniques to improve your presentation skills</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/sessions">View All Sessions</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Your skill development progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium">Communication</span>
                </div>
                <span className="text-sm font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">Confidence</span>
                </div>
                <span className="text-sm font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2 bg-green-100 [&>div]:bg-green-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium">Logical Reasoning</span>
                </div>
                <span className="text-sm font-medium">82%</span>
              </div>
              <Progress value={82} className="h-2 bg-blue-100 [&>div]:bg-blue-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-amber-500"></div>
                  <span className="text-sm font-medium">Active Listening</span>
                </div>
                <span className="text-sm font-medium">70%</span>
              </div>
              <Progress value={70} className="h-2 bg-amber-100 [&>div]:bg-amber-500" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/progress">View Detailed Progress</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Activity & Resources */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest sessions and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Earned "Clear Communicator" badge</p>
                  <p className="text-sm text-muted-foreground">
                    You received positive feedback for your clear explanations
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Completed "Leadership Skills" session</p>
                  <p className="text-sm text-muted-foreground">
                    You participated in a group discussion on leadership styles
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">4 days ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <BarChart2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Improved confidence score by 12%</p>
                  <p className="text-sm text-muted-foreground">
                    Your confidence metrics have shown significant improvement
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Resources</CardTitle>
            <CardDescription>Recommended materials to improve your skills</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="articles">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="exercises">Exercises</TabsTrigger>
              </TabsList>
              <TabsContent value="articles" className="space-y-4 mt-4">
                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">10 Tips for Effective Communication</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn key strategies to improve your communication skills
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Body Language in Interviews</h3>
                    <p className="text-sm text-muted-foreground">How to use non-verbal cues to your advantage</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="videos" className="space-y-4 mt-4">
                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mic className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Public Speaking Masterclass</h3>
                    <p className="text-sm text-muted-foreground">45-minute video on overcoming speech anxiety</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mic className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Group Discussion Techniques</h3>
                    <p className="text-sm text-muted-foreground">Video tutorial on effective participation in GDs</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="exercises" className="space-y-4 mt-4">
                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Impromptu Speaking Challenge</h3>
                    <p className="text-sm text-muted-foreground">Practice speaking on random topics for 2 minutes</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Active Listening Exercise</h3>
                    <p className="text-sm text-muted-foreground">
                      Improve your listening skills with this interactive exercise
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/resources">Browse All Resources</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
