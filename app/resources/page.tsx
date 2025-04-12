"use client";

import { useEffect, useState } from "react"
import type React from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, FileText, Filter, Search, Video } from "lucide-react"
import ResumeUpload from "@/components/ResumeUpload"
import { useAuth } from "@/components/auth-provider"

// Define interfaces for our data structures
interface ResourceCardProps {
  title: string;
  description: string;
  type: string;
  icon: React.ReactNode;
  tags: string[];
  isNew?: boolean;
}

interface FeaturedResourceCardProps extends ResourceCardProps {}

interface RecommendedResourceCardProps {
  title: string;
  description: string;
  reason: string;
}

// Define resource data interface
interface ResourceData {
  id: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

interface RecommendedResourceData {
  id: string;
  title: string;
  description: string;
  reason: string;
}

// Component definitions
const FeaturedResourceCard: React.FC<FeaturedResourceCardProps> = ({ title, description, type, icon, tags }) => (
  // Component implementation remains the same
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
);

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, type, icon, tags, isNew = false }) => (
  // Component implementation remains the same
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

const RecommendedResourceCard: React.FC<RecommendedResourceCardProps> = ({ title, description, reason }) => (
  // Component implementation remains the same
  <div className="flex p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
    <div className="mr-4 p-3 bg-blue-100 rounded-full h-fit">
      <BookOpen className="h-5 w-5 text-blue-600" />
    </div>
    <div>
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      <p className="text-sm text-slate-600 mb-2">{description}</p>
      <div className="flex items-center">
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
          Recommended
        </Badge>
        <span className="text-xs text-slate-500 ml-2">{reason}</span>
      </div>
    </div>
  </div>
);

// Helper function to get the appropriate icon based on resource type
const getIconForType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video':
    case 'video course':
      return <Video className="h-6 w-6 text-indigo-600" />;
    case 'guide':
    case 'template':
    case 'list':
    case 'practice':
    default:
      return <FileText className="h-6 w-6 text-blue-600" />;
  }
};

export default function ResourcesPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // State for resources data
  const [featuredResources, setFeaturedResources] = useState<ResourceData[]>([]);
  const [popularResources, setPopularResources] = useState<ResourceData[]>([]);
  const [latestResources, setLatestResources] = useState<ResourceData[]>([]);
  const [recommendedResources, setRecommendedResources] = useState<RecommendedResourceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch resources data
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        
        // In a real application, these would be API calls
        // For demo purposes, we're simulating API responses
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in a real app, this would come from your API
        const featuredData = [
          {
            id: '1',
            title: 'Master the Technical Interview',
            description: 'A comprehensive guide to acing technical interviews with practice questions and strategies.',
            type: 'Guide',
            tags: ['Technical', 'Interview', 'Preparation'],
            isFeatured: true
          },
          {
            id: '2',
            title: 'Effective Group Discussion Techniques',
            description: 'Learn how to contribute meaningfully in group discussions and stand out from the crowd.',
            type: 'Video Course',
            tags: ['Group Discussion', 'Communication', 'Leadership'],
            isFeatured: true
          },
          {
            id: '3',
            title: 'Resume That Gets You Hired',
            description: 'Templates and tips for creating a resume that highlights your strengths and catches recruiters\' attention.',
            type: 'Template',
            tags: ['Resume', 'Career', 'Job Search'],
            isFeatured: true
          }
        ];
        
        const popularData = [
          {
            id: '4',
            title: 'Behavioral Interview Questions',
            description: '50+ common behavioral questions with example answers.',
            type: 'Guide',
            tags: ['Interview', 'Behavioral']
          },
          {
            id: '5',
            title: 'System Design Interview Prep',
            description: 'How to approach and solve system design problems.',
            type: 'Guide',
            tags: ['Technical', 'System Design']
          },
          {
            id: '6',
            title: 'Group Discussion Topics 2023',
            description: 'Current affairs and trending topics for GD practice.',
            type: 'List',
            tags: ['Group Discussion', 'Current Affairs']
          },
          {
            id: '7',
            title: 'Body Language in Interviews',
            description: 'Master non-verbal communication for better impressions.',
            type: 'Video',
            tags: ['Interview', 'Body Language']
          },
          {
            id: '8',
            title: 'Resume Templates for Tech Roles',
            description: 'ATS-friendly templates for software engineers and data scientists.',
            type: 'Template',
            tags: ['Resume', 'Technical']
          },
          {
            id: '9',
            title: 'Mock Interview Questions',
            description: 'Practice with these real interview questions from top companies.',
            type: 'Practice',
            tags: ['Interview', 'Practice']
          }
        ];
        
        const latestData = [
          {
            id: '10',
            title: 'AI in Technical Interviews',
            description: 'How to prepare for AI-related questions in tech interviews.',
            type: 'Guide',
            tags: ['Technical', 'AI', 'New'],
            isNew: true
          },
          {
            id: '11',
            title: 'Remote Interview Success',
            description: 'Tips for making a great impression in virtual interviews.',
            type: 'Video',
            tags: ['Interview', 'Remote', 'New'],
            isNew: true
          },
          {
            id: '12',
            title: 'Salary Negotiation Tactics',
            description: 'How to negotiate your compensation package effectively.',
            type: 'Guide',
            tags: ['Career', 'Negotiation', 'New'],
            isNew: true
          }
        ];
        
        const recommendedData = [
          {
            id: '13',
            title: 'Improving Logical Reasoning',
            description: 'Techniques to enhance your problem-solving and critical thinking skills.',
            reason: 'Based on your recent logical reasoning scores'
          },
          {
            id: '14',
            title: 'Technical Interview Questions for Software Engineers',
            description: 'Common coding and system design questions with detailed solutions.',
            reason: 'Matches your profile and career interests'
          }
        ];
        
        setFeaturedResources(featuredData);
        setPopularResources(popularData);
        setLatestResources(latestData);
        setRecommendedResources(recommendedData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError('Failed to load resources. Please try again later.');
        setIsLoading(false);
      }
    };

    if (mounted) {
      fetchResources();
    }
  }, [mounted]);

  // Filter resources based on search query
  const filterResources = (resources: ResourceData[]) => {
    if (!searchQuery) return resources;
    
    return resources.filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add error boundary
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveFilter}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="interview">Interview Prep</TabsTrigger>
            <TabsTrigger value="gd">Group Discussion</TabsTrigger>
            <TabsTrigger value="resume">Resume Building</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
                <Button onClick={() => window.location.reload()} className="mt-4">
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {filterResources(featuredResources).map(resource => (
                    <FeaturedResourceCard
                      key={resource.id}
                      title={resource.title}
                      description={resource.description}
                      type={resource.type}
                      icon={getIconForType(resource.type)}
                      tags={resource.tags}
                    />
                  ))}
                </div>

                <h2 className="text-2xl font-bold mb-6">Popular Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {filterResources(popularResources).map(resource => (
                    <ResourceCard
                      key={resource.id}
                      title={resource.title}
                      description={resource.description}
                      type={resource.type}
                      icon={getIconForType(resource.type)}
                      tags={resource.tags}
                    />
                  ))}
                </div>

                <h2 className="text-2xl font-bold mb-6">Latest Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterResources(latestResources).map(resource => (
                    <ResourceCard
                      key={resource.id}
                      title={resource.title}
                      description={resource.description}
                      type={resource.type}
                      icon={getIconForType(resource.type)}
                      tags={resource.tags}
                      isNew={resource.isNew}
                    />
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="interview">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle>Interview Preparation Resources</CardTitle>
                <CardDescription>Guides, practice questions, and tips for acing your interviews</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterResources([...featuredResources, ...popularResources, ...latestResources])
                      .filter(resource => 
                        resource.tags.some(tag => 
                          tag.toLowerCase().includes('interview') || 
                          tag.toLowerCase().includes('technical')
                        )
                      )
                      .map(resource => (
                        <ResourceCard
                          key={resource.id}
                          title={resource.title}
                          description={resource.description}
                          type={resource.type}
                          icon={getIconForType(resource.type)}
                          tags={resource.tags}
                          isNew={resource.isNew}
                        />
                      ))}
                  </div>
                )}
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
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterResources([...featuredResources, ...popularResources, ...latestResources])
                      .filter(resource => 
                        resource.tags.some(tag => 
                          tag.toLowerCase().includes('group discussion') || 
                          tag.toLowerCase().includes('communication')
                        )
                      )
                      .map(resource => (
                        <ResourceCard
                          key={resource.id}
                          title={resource.title}
                          description={resource.description}
                          type={resource.type}
                          icon={getIconForType(resource.type)}
                          tags={resource.tags}
                          isNew={resource.isNew}
                        />
                      ))}
                  </div>
                )}
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
                <ResumeUpload />
                
                {!isLoading && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterResources([...featuredResources, ...popularResources, ...latestResources])
                      .filter(resource => 
                        resource.tags.some(tag => 
                          tag.toLowerCase().includes('resume') || 
                          tag.toLowerCase().includes('cv')
                        )
                      )
                      .map(resource => (
                        <ResourceCard
                          key={resource.id}
                          title={resource.title}
                          description={resource.description}
                          type={resource.type}
                          icon={getIconForType(resource.type)}
                          tags={resource.tags}
                          isNew={resource.isNew}
                        />
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="shadow-sm border-0 bg-white mt-12">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Based on your recent sessions and performance</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedResources.map(resource => (
                  <RecommendedResourceCard
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    reason={resource.reason}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
