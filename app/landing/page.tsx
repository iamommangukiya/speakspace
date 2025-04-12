import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, BarChart3, BookOpen } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 z-0"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Master Communication Skills with AI-Powered Practice
            </h1>
            <p className="text-xl text-slate-700 mb-8">
              SpeakSpace helps you prepare for interviews, group discussions, and presentations through real-time
              practice sessions with personalized feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
              >
                <Link href="/auth/register">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose SpeakSpace?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform offers everything you need to improve your communication skills and ace your next interview
              or presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-blue-600" />}
              title="Real-time Practice"
              description="Join voice sessions for mock interviews, group discussions, and presentation practice with peers and mentors."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-indigo-600" />}
              title="Detailed Analytics"
              description="Get insights on your performance with metrics on confidence, communication clarity, and logical reasoning."
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-purple-600" />}
              title="Curated Resources"
              description="Access a library of guides, templates, and practice materials tailored to your specific goals."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              SpeakSpace makes it easy to practice and improve your communication skills in just a few steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StepCard number={1} title="Create Your Profile" description="Set your goals and areas for improvement" />
            <StepCard
              number={2}
              title="Join Practice Sessions"
              description="Participate in mock interviews or group discussions"
            />
            <StepCard
              number={3}
              title="Receive Feedback"
              description="Get real-time evaluations and performance metrics"
            />
            <StepCard
              number={4}
              title="Track Progress"
              description="Monitor your improvement over time with detailed analytics"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Hear from people who have transformed their communication skills with SpeakSpace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="SpeakSpace helped me prepare for my technical interviews. The feedback I received was invaluable!"
              author="Michael Johnson"
              role="Software Engineer"
            />
            <TestimonialCard
              quote="The group discussions improved my confidence in meetings. I'm now more comfortable speaking up."
              author="Emily Chen"
              role="Product Manager"
            />
            <TestimonialCard
              quote="As someone who struggles with public speaking, the practice sessions made a huge difference."
              author="Sarah Williams"
              role="Marketing Specialist"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Improve Your Communication Skills?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their interview performance and public speaking abilities.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-slate-100 shadow-lg">
            <Link href="/auth/register">
              Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">SpeakSpace</h2>
              <p className="text-slate-400">Enhance your communication skills</p>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="#" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} SpeakSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow relative">
      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2 mt-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 text-amber-500">{"★".repeat(5)}</div>
      <p className="text-slate-700 mb-6 italic">"{quote}"</p>
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </div>
  )
}
