import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { Link, useNavigate } from "react-router-dom";

export function SignUpForm() {
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"creator" | "supporter">("supporter");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await signUp(email, password, name, role);
      navigate("/");
    } catch (err) {
      setError("Failed to create account");
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Join fun(d)Idea</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              placeholder="Create a password"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Account Type</Label>
            <RadioGroup
              value={role}
              onValueChange={(value: "creator" | "supporter") => setRole(value)}
            >
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="supporter" id="supporter" />
                <Label htmlFor="supporter" className="flex-1 cursor-pointer">
                  <div className="font-medium">Supporter</div>
                  <div className="text-sm text-muted-foreground">
                    Discover and support amazing projects
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="creator" id="creator" />
                <Label htmlFor="creator" className="flex-1 cursor-pointer">
                  <div className="font-medium">Creator</div>
                  <div className="text-sm text-muted-foreground">
                    Share your projects and receive funding
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
