import { BarChart, LineChart, PieChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Progress Tracking</h1>
          <p className="text-muted-foreground">
            Monitor your skill development and performance over time
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="last3months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last3months">Last 3 Months</SelectItem>
              <SelectItem value="last6months">Last 6 Months</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            Export Data
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Score
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76/100</div>
            <p className="text-xs text-muted-foreground">
              +12 points from initial assessment
            </p>
            <div className="mt-4 h-3 w-full rounded-full bg-muted">
              <div className="h-3 rounded-full bg-primary" style={{ width: '76%' }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sessions Completed
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              4 as participant, 5 as moderator, 3 as evaluator
            </p>
            <div className="mt-4 grid grid-cols-12 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-8 rounded-sm bg-primary" 
                  style={{ opacity: 0.3 + (i * 0.06) }}
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Skill Distribution
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Balanced</div>
            <p className="text-xs text-muted-foreground">
              Good progress across all skill areas
            </p>
            <div className="mt-4 flex gap-2">
              <div className="h-2 flex-1 rounded-full bg-primary"></div>
              <div className="h-2 flex-1 rounded-full bg-blue-500"></div>
              <div className="h-2 flex-1 rounded-full bg-green-500"></div>
              <div className="h-2 flex-1 rounded-full bg-amber-500"></div>
            </div>
            <div className="mt-2 flex text-xs justify-between">
              <span>Communication</span>
              <span>Confidence</span>
              <span>Logic</span>
              <span>Listening</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress */}
      <Tabs defaultValue="skills" className="space-y-4">
        <TabsList>
          <TabsTrigger value="skills">Skills Progress</TabsTrigger>
          <TabsTrigger value="sessions">Session History</TabsTrigger>
          <TabsTrigger value="feedback">Feedback Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="skills" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Communication Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Communication Skills</CardTitle>
                <CardDescription>
                  Your ability to express ideas clearly and effectively
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Clarity */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Clarity</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '82%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your ability to express ideas in a clear, understandable manner
                  </p>
                </div>
                
                {/* Conciseness */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Conciseness</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your ability to communicate efficiently without unnecessary details
                  </p>
                </div>
                
                {/* Persuasiveness */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Persuasiveness</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '68%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your ability to convince others and make compelling arguments
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Confidence */}
            <Card>
              <CardHeader>
                <CardTitle>Confidence</CardTitle>
                <CardDescription>
                  Your self-assurance and presence during discussions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Speaking Confidence */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Speaking Confidence</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: '70%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your comfort level when speaking in group settings
                  </p>
                </div>
                
                {/* Body Language */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Body Language</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your non-verbal communication and physical presence
                  </p>
                </div>
                
                {/* Voice Projection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Voice Projection</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your ability to speak clearly and be heard by others
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Logical Reasoning */}
            <Card>
              <CardHeader>
                <CardTitle>Logical Reasoning</CardTitle>
                <CardDescription>
                  Your ability to construct and analyze arguments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Critical Thinking */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Critical Thinking</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your ability to analyze information objectively
                  </p>
                </div>
                
                {/* Argument Construction */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Argument Construction</span>
                    <span className="text-sm font-medium">80%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your ability to build logical, well-structured arguments
                  </p>
                </div>
                
                {/* Problem Solving */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Problem Solving</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your ability to find solutions to complex problems
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Active Listening */}
            <Card>
              <CardHeader>
                <CardTitle>Active Listening</CardTitle>
                <CardDescription>
                  Your ability to engage with and understand others
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Attentiveness */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Attentiveness</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-amber-500" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your ability to focus on and follow discussions
                  </p>
                </div>
                
                {/* Comprehension */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Comprehension</span>
                    <span className="text-sm font-medium">80%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-amber-500" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your ability to understand and process information
                  </p>
                </div>
                
                {/* Responsiveness */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Responsiveness</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-amber-500" style={{ width: '68%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your ability to engage with and respond to others' points
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>
                Your participation and performance in past sessions
              </CardDescription>
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
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">Score: 82/100</div>
                      <div className="h-2 w-16 rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Communication</span>
                      <span>85%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Confidence</span>
                      <span>78%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Logical Reasoning</span>
                      <span>88%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Active Listening</span>
                      <span>75%</span>
                    </div>
                  </div>
                </div>
                
                {/* Session 2 */}
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-medium">Group Discussion: Climate Change</h3>
                      <p className="text-sm text-muted-foreground">March 25, 2023 • Moderator</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">Score: 78/100</div>
                      <div className="h-2 w-16 rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Communication</span>
                      <span>80%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Confidence</span>
                      <span>75%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Logical Reasoning</span>
                      <span>82%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Active Listening</span>
                      <span>76%</span>
                    </div>
                  </div>
                </div>
                
                {/* Session 3 */}
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-medium">Leadership Skills Workshop</h3>
                      <p className="text-sm text-muted-foreground">March 15, 2023 • Participant</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">Score: 75/100</div>
                      <div className="h-2 w-16 rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Communication</span>
                      <span>78%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Confidence</span>
                      <span>72%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Logical Reasoning</span>
                      <span>76%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Active Listening</span>
                      <span>74%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Analysis</CardTitle>
              <CardDescription>
                Summary of feedback received from evaluators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Strengths */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Key Strengths</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                      <div>
                        <p className="font-medium">Clear communication</p>
                        <p className="text-sm text-muted-foreground">
                          You express your ideas in a structured and understandable way
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                      <div>
                        <p className="font-medium">Logical reasoning</p>
                        <p className="text-sm text-muted-foreground">
                          Your arguments are well-structured and backed by evidence
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                      <div>
                        <p className="font-medium">Active participation</p>
                        <p className="text-sm text-muted-foreground">
                          You consistently engage in discussions and contribute valuable insights
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Areas for Improvement */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Areas for Improvement</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      </div>
                      <div>
                        <p className="font-medium">Confidence in challenging situations</p>
                        <p className="text-sm text-muted-foreground">
                          Work on maintaining composure when faced with opposing viewpoints
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      </div>
                      <div>
                        <p className="font-medium">Conciseness</p>
                        <p className="text-sm text-muted-foreground">
                          Try to be more concise and avoid unnecessary details in your responses
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      </div>
                      <div>
                        <p className="font-medium">Body language</p>
                        <p className="text-sm text-muted-foreground">
                          Work on maintaining eye contact and using more expressive gestures
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Evaluator Comments */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Recent Evaluator Comments</h3>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <p className="italic text-sm mb-2">
                        "Your logical reasoning is impressive. You consistently back your arguments with evidence and present them in a structured manner. To improve further, work on being more concise in your responses."
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Technical Interview Practice • April 2, 2023</span>
                        <span>Evaluator: Sarah J.</span>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <p className="italic text-sm mb-2">
                        "You have a clear communication style that makes complex ideas accessible. I'd recommend working on your confidence when challenged by others. Remember to maintain your composure and stick to your points."
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Group Discussion: Climate Change • March 25, 2023</span>
                        <span>Evaluator:\
