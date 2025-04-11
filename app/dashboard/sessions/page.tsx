import { Calendar, Clock, Filter, Plus, Search, Users, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SessionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
          <p className="text-muted-foreground">Join, create, or manage discussion and interview sessions</p>
        </div>
        <Button className="w-full md:w-auto gap-2">
          <Plus className="h-4 w-4" /> Create New Session
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search sessions..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Session Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="group-discussion">Group Discussion</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sessions Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="my-sessions">My Sessions</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Session Card 1 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    Group Discussion
                  </Badge>
                  <Badge variant="outline">2 Spots Left</Badge>
                </div>
                <CardTitle className="mt-2">Climate Change Solutions</CardTitle>
                <CardDescription>Debate on environmental policies and corporate responsibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>April 15, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>5:30 PM - 7:00 PM (EST)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>8 participants (6/8 joined)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Join Session</Button>
              </CardFooter>
            </Card>

            {/* Session Card 2 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20">
                    Interview Practice
                  </Badge>
                  <Badge variant="outline">4 Spots Left</Badge>
                </div>
                <CardTitle className="mt-2">Technical Interview Prep</CardTitle>
                <CardDescription>Mock interview session focused on system design questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>April 18, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>3:00 PM - 4:30 PM (EST)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>6 participants (2/6 joined)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Join Session</Button>
              </CardFooter>
            </Card>

            {/* Session Card 3 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">
                    Workshop
                  </Badge>
                  <Badge variant="outline">10 Spots Left</Badge>
                </div>
                <CardTitle className="mt-2">Public Speaking Workshop</CardTitle>
                <CardDescription>Learn techniques to improve your presentation skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>April 20, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>2:00 PM - 4:00 PM (EST)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>15 participants (5/15 joined)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Join Session</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button variant="outline">View More Sessions</Button>
          </div>
        </TabsContent>

        <TabsContent value="my-sessions">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sessions You're Hosting</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                      Group Discussion
                    </Badge>
                    <Badge variant="secondary">You're Hosting</Badge>
                  </div>
                  <CardTitle className="mt-2">Leadership in Crisis</CardTitle>
                  <CardDescription>Discussion on effective leadership during challenging times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>April 25, 2023</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>4:00 PM - 5:30 PM (EST)</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>10 participants (3/10 joined)</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button className="flex-1">Manage</Button>
                </CardFooter>
              </Card>
            </div>

            <h3 className="text-lg font-medium mt-8">Sessions You've Joined</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20">
                      Interview Practice
                    </Badge>
                    <Badge variant="secondary">Joined</Badge>
                  </div>
                  <CardTitle className="mt-2">Technical Interview Prep</CardTitle>
                  <CardDescription>Mock interview session focused on system design questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>April 18, 2023</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>3:00 PM - 4:30 PM (EST)</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>6 participants (2/6 joined)</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Enter Session</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Technical Interview Practice</h3>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">April 2, 2023 • Participant</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">Score: 82/100</div>
                  <div className="h-2 w-16 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "82%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Communication: 85%
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                  Confidence: 78%
                </Badge>
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  Logical Reasoning: 88%
                </Badge>
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
                  Active Listening: 75%
                </Badge>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  View Feedback
                </Button>
                <Button variant="outline" size="sm">
                  Watch Recording
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Group Discussion: Climate Change</h3>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">March 25, 2023 • Moderator</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">Score: 78/100</div>
                  <div className="h-2 w-16 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Communication: 80%
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                  Confidence: 75%
                </Badge>
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  Logical Reasoning: 82%
                </Badge>
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
                  Active Listening: 76%
                </Badge>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  View Feedback
                </Button>
                <Button variant="outline" size="sm">
                  Watch Recording
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Leadership Skills Workshop</h3>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">March 15, 2023 • Participant</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">Score: 75/100</div>
                  <div className="h-2 w-16 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Communication: 78%
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                  Confidence: 72%
                </Badge>
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  Logical Reasoning: 76%
                </Badge>
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
                  Active Listening: 74%
                </Badge>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  View Feedback
                </Button>
                <Button variant="outline" size="sm">
                  Watch Recording
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    Group Discussion
                  </Badge>
                  <Badge variant="outline">Recommended</Badge>
                </div>
                <CardTitle className="mt-2">AI Ethics and Society</CardTitle>
                <CardDescription>Discussion on the ethical implications of artificial intelligence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>April 22, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>6:00 PM - 7:30 PM (EST)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>12 participants (5/12 joined)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Join Session</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20">
                    Interview Practice
                  </Badge>
                  <Badge variant="outline">Recommended</Badge>
                </div>
                <CardTitle className="mt-2">Behavioral Interview Mastery</CardTitle>
                <CardDescription>Practice answering common behavioral interview questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>April 24, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>4:00 PM - 5:30 PM (EST)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>8 participants (3/8 joined)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Join Session</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Session */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Featured Session</CardTitle>
          <CardDescription>Join our special workshop with industry experts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3 space-y-4">
              <h3 className="text-xl font-bold">Mastering Communication in Tech Interviews</h3>
              <p className="text-muted-foreground">
                Join this exclusive workshop led by hiring managers from top tech companies. Learn how to effectively
                communicate your technical knowledge, handle challenging questions, and showcase your problem-solving
                skills.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>April 30, 2023</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span>1:00 PM - 3:00 PM (EST)</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  <span>Limited to 20 participants</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button className="gap-2">
                  Reserve Your Spot <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="md:w-1/3 relative min-h-[200px] rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Workshop preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
