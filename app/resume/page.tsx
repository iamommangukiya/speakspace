"use client"

import type React from "react"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UploadIcon as FileUpload, Download, FileText, Plus, Star, Trash2 } from "lucide-react"
import { StarRating } from "@/components/star-rating"

export default function ResumePage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeScore, setResumeScore] = useState<number | null>(null)
  const [resumeFeedback, setResumeFeedback] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Resume builder state
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
    },
    summary: "",
    experience: [
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [],
  })

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
      setIsUploading(true)

      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false)
        setIsAnalyzing(true)

        // Simulate analysis process
        setTimeout(() => {
          setIsAnalyzing(false)
          setResumeScore(7.5)
          setResumeFeedback([
            "Your resume lacks quantifiable achievements",
            "Technical skills section could be more comprehensive",
            "Consider adding a projects section to showcase your work",
            "Education section is well-structured",
            "Professional summary is concise but could be more impactful",
          ])
        }, 2000)
      }, 1500)
    }
  }



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <MainNav />
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">Resume</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Get feedback on your resume or create a new one</p>
          </div>
        </div>

        <Tabs defaultValue="feedback" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="feedback">Resume Feedback</TabsTrigger>
            <TabsTrigger value="resume">Resume Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="feedback">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="shadow-sm border-0 bg-white dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Upload Your Resume</CardTitle>
                    <CardDescription>Get personalized feedback and suggestions to improve your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {!resumeFile ? (
                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8 text-center">
                          <FileUpload className="h-10 w-10 text-slate-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2 dark:text-white">Upload Resume</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            Supported formats: PDF, DOCX, RTF
                          </p>
                          <Input
                            type="file"
                            accept=".pdf,.docx,.rtf"
                            className="hidden"
                            id="resume-upload"
                            onChange={handleResumeUpload}
                          />
                          <Label htmlFor="resume-upload" className="cursor-pointer">
                            <Button>Select File</Button>
                          </Label>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate dark:text-white">{resumeFile.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {(resumeFile.size / 1024).toFixed(0)} KB
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setResumeFile(null)}
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {isUploading && (
                            <div className="text-center py-4">
                              <div className="animate-pulse text-blue-600 dark:text-blue-400">Uploading...</div>
                            </div>
                          )}

                          {isAnalyzing && (
                            <div className="text-center py-4">
                              <div className="animate-pulse text-blue-600 dark:text-blue-400">
                                Analyzing your resume...
                              </div>
                            </div>
                          )}

                          {resumeScore !== null && !isUploading && !isAnalyzing && (
                            <div className="text-center py-4">
                              <h3 className="text-lg font-medium mb-2 dark:text-white">Resume Score</h3>
                              <div className="flex justify-center mb-2">
                                <StarRating value={resumeScore} max={10} readOnly />
                              </div>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Your resume is good, but there's room for improvement
                              </p>
                            </div>
                          )}

                          <Button className="w-full">Download Detailed Report</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                {resumeFeedback.length > 0 && (
                  <Card className="shadow-sm border-0 bg-white dark:bg-slate-800">
                    <CardHeader>
                      <CardTitle>Resume Feedback</CardTitle>
                      <CardDescription>Here's what our analysis found about your resume</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {resumeFeedback.map((feedback, index) => (
                          <div
                            key={index}
                            className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg flex items-start"
                          >
                            <div
                              className={`p-2 rounded-full mr-3 ${
                                index % 3 === 0
                                  ? "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
                                  : index % 3 === 1
                                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                    : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                              }`}
                            >
                              <Star className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm dark:text-white">{feedback}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
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
      </main>
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