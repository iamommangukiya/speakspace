import type React from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, FileText, Filter, Search, Video } from "lucide-react"

export default function Resources() {
  return (
    <div className="min-h-screen bg-slate-50">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
            <p className="text-slate-500 mt-1">Guides, tips, and materials to help you improve</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources..."
                className="pl-10 pr-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <Card className="shadow-sm border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Based on your recent sessions and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RecommendedResourceCard
                title="Improving Logical Reasoning"
                description="Techniques to enhance your problem-solving and critical thinking skills."
                reason="Based on your recent logical reasoning scores"
                type="Guide"
                icon={<FileText className="h-5 w-5 text-blue-600" />}
              />
              <RecommendedResourceCard
                title="Technical Interview Questions for Software Engineers"
                description="Common coding and system design questions with detailed solutions."
                reason="Matches your profile and career interests"
                type="Practice"
                icon={<FileText className="h-5 w-5 text-green-600" />}
              />
              <RecommendedResourceCard
                title="Effective Communication in Interviews"
                description="Learn how to articulate your thoughts clearly and concisely."
                reason="Popular among users with similar goals"
                type="Video"
                icon={<Video className="h-5 w-5 text-purple-600" />}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="interview">Interview Prep</TabsTrigger>
            <TabsTrigger value="gd">Group Discussion</TabsTrigger>
            <TabsTrigger value="resume">Resume Building</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <FeaturedResourceCard
                title="Master the Technical Interview"
                description="A comprehensive guide to acing technical interviews with practice questions and strategies."
                type="Guide"
                icon={<FileText className="h-6 w-6 text-blue-600" />}
                tags={["Technical", "Interview", "Preparation"]}
              />
              <FeaturedResourceCard
                title="Effective Group Discussion Techniques"
                description="Learn how to contribute meaningfully in group discussions and stand out from the crowd."
                type="Video Course"
                icon={<Video className="h-6 w-6 text-indigo-600" />}
                tags={["Group Discussion", "Communication", "Leadership"]}
              />
              <FeaturedResourceCard
                title="Resume That Gets You Hired"
                description="Templates and tips for creating a resume that highlights your strengths and catches recruiters' attention."
                type="Template"
                icon={<FileText className="h-6 w-6 text-green-600" />}
                tags={["Resume", "Career", "Job Search"]}
              />
            </div>

            <h2 className="text-2xl font-bold mb-6">Popular Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <ResourceCard
                title="Behavioral Interview Questions"
                description="50+ common behavioral questions with example answers."
                type="Guide"
                icon={<FileText className="h-5 w-5" />}
                tags={["Interview", "Behavioral"]}
              />
              <ResourceCard
                title="System Design Interview Prep"
                description="How to approach and solve system design problems."
                type="Guide"
                icon={<FileText className="h-5 w-5" />}
                tags={["Technical", "System Design"]}
              />
              <ResourceCard
                title="Group Discussion Topics 2023"
                description="Current affairs and trending topics for GD practice."
                type="List"
                icon={<FileText className="h-5 w-5" />}
                tags={["Group Discussion", "Current Affairs"]}
              />
              <ResourceCard
                title="Body Language in Interviews"
                description="Master non-verbal communication for better impressions."
                type="Video"
                icon={<Video className="h-5 w-5" />}
                tags={["Interview", "Body Language"]}
              />
              <ResourceCard
                title="Resume Templates for Tech Roles"
                description="ATS-friendly templates for software engineers and data scientists."
                type="Template"
                icon={<FileText className="h-5 w-5" />}
                tags={["Resume", "Technical"]}
              />
              <ResourceCard
                title="Mock Interview Questions"
                description="Practice with these real interview questions from top companies."
                type="Practice"
                icon={<FileText className="h-5 w-5" />}
                tags={["Interview", "Practice"]}
              />
            </div>

            <h2 className="text-2xl font-bold mb-6">Latest Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard
                title="AI in Technical Interviews"
                description="How to prepare for AI-related questions in tech interviews."
                type="Guide"
                icon={<FileText className="h-5 w-5" />}
                tags={["Technical", "AI", "New"]}
                isNew={true}
              />
              <ResourceCard
                title="Remote Interview Success"
                description="Tips for making a great impression in virtual interviews."
                type="Video"
                icon={<Video className="h-5 w-5" />}
                tags={["Interview", "Remote", "New"]}
                isNew={true}
              />
              <ResourceCard
                title="Salary Negotiation Tactics"
                description="How to negotiate your compensation package effectively."
                type="Guide"
                icon={<FileText className="h-5 w-5" />}
                tags={["Career", "Negotiation", "New"]}
                isNew={true}
              />
            </div>
          </TabsContent>

          <TabsContent value="interview">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Interview Preparation Resources</CardTitle>
                <CardDescription>Guides, practice questions, and tips for acing your interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-slate-600 mb-4">Switch to the "All Resources" tab</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    We've simplified this demo to show all resources in one tab. In a full implementation, this tab
                    would show interview-specific resources.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gd">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Group Discussion Resources</CardTitle>
                <CardDescription>Materials to help you excel in group discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-slate-600 mb-4">Switch to the "All Resources" tab</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    We've simplified this demo to show all resources in one tab. In a full implementation, this tab
                    would show group discussion-specific resources.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Resume Building Resources</CardTitle>
                <CardDescription>Templates and guides for creating an effective resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-slate-600 mb-4">Switch to the "All Resources" tab</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    We've simplified this demo to show all resources in one tab. In a full implementation, this tab
                    would show resume-specific resources.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function FeaturedResourceCard({
  title,
  description,
  type,
  icon,
  tags,
}: {
  title: string
  description: string
  type: string
  icon: React.ReactNode
  tags: string[]
}) {
  return (
    <Card className="shadow-sm border-0 bg-white hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-full">{icon}</div>
          <div>
            <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 border-blue-100">
              {type}
            </Badge>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-slate-600 mb-3">{description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all hover:shadow">
          Access Resource
        </Button>
      </CardContent>
    </Card>
  )
}

function ResourceCard({
  title,
  description,
  type,
  icon,
  tags,
  isNew = false,
}: {
  title: string
  description: string
  type: string
  icon: React.ReactNode
  tags: string[]
  isNew?: boolean
}) {
  return (
    <Card className="shadow-sm border-0 bg-white hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className="bg-slate-100 text-slate-700 border-0">
            {type}
          </Badge>
          {isNew && <Badge className="bg-green-100 text-green-700 border-0 hover:bg-green-100">New</Badge>}
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-slate-600 mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" size="sm" className="text-blue-600">
            <BookOpen className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function RecommendedResourceCard({
  title,
  description,
  reason,
  type,
  icon,
}: {
  title: string
  description: string
  reason: string
  type: string
  icon: React.ReactNode
}) {
  return (
    <Card className="shadow-sm border-0 bg-white hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-full">{icon}</div>
          <div>
            <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 border-blue-100">
              {type}
            </Badge>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-slate-600 mb-3">{description}</p>
            <div className="flex items-center">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                Recommended
              </Badge>
              <span className="text-xs text-slate-500 ml-2">{reason}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
