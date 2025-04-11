"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Bypass authentication and redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
      setIsLoading(false);
    }, 800); // Reduced delay for faster redirection
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    // Bypass Google authentication and redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
      setIsLoading(false);
    }, 800); // Reduced delay for faster redirection
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isSignUp ? "Create Account" : "Login"}</CardTitle>
        <CardDescription>
          {isSignUp
            ? "Sign up to start practicing and improving your skills"
            : "Login to access your account and continue your practice"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? "Creating account..." : "Logging in..."}
              </>
            ) : (
              <>{isSignUp ? "Create Account" : "Login"}</>
            )}
          </Button>
        </form>

        <div className="flex items-center my-4">
          <Separator className="flex-grow" />
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <Separator className="flex-grow" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          {isSignUp ? "Sign up with Google" : "Login with Google"}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Create Account"}
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
