import Link from "next/link"
import { BookOpen, Video, FileText, Download, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground">Access learning materials to improve your communication skills</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search resources..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="articles">Articles</SelectItem>
              <SelectItem value="videos">Videos</SelectItem>
              <SelectItem value="guides">Guides</SelectItem>
              <SelectItem value="exercises">Exercises</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Resources Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Resource Card 1 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Article
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-2">Mastering Group Discussions</CardTitle>
                <CardDescription>Learn effective strategies for participating in group discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>10 min read</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#">Read Article</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Resource Card 2 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                    Video
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-2">Body Language in Interviews</CardTitle>
                <CardDescription>How to use non-verbal communication effectively</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>25 min video</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#">Watch Video</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Resource Card 3 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Guide
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-2">Interview Preparation Checklist</CardTitle>
                <CardDescription>Complete guide to prepare for technical and HR interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>PDF Guide</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#">Download Guide</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Resource Card 4 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                    Exercise
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-2">Active Listening Practice</CardTitle>
                <CardDescription>Interactive exercises to improve your listening skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>15 min activity</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#">Start Exercise</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Resource Card 5 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Article
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-2">Handling Difficult Questions</CardTitle>
                <CardDescription>Strategies for answering challenging interview questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>12 min read</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#">Read Article</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Resource Card 6 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                    Video
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-2">Public Speaking Masterclass</CardTitle>
                <CardDescription>
                  Comprehensive guide to becoming a confident and effective public speaker
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>45 min video</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#">Watch Video</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button variant="outline">Load More Resources</Button>
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Recommended resources would go here - similar structure to "all" tab */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Article
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-2">Improving Communication Clarity</CardTitle>
                <CardDescription>Techniques to make your points clearer and more impactful</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>8 min read</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#">Read Article</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="popular">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Popular resources would go here */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                    Video
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-2">Storytelling in Interviews</CardTitle>
                <CardDescription>How to use stories to make your answers memorable</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>18 min video</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#">Watch Video</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Saved resources would go here */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Guide
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-2">Resume Building Workshop</CardTitle>
                <CardDescription>Step-by-step guide to creating an impressive resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>PDF Guide</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#">Download Guide</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
