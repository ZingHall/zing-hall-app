import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserContext } from "@/context/user-context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isLoading, user } = useUserContext();
  const [screenName, setScreenName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("login");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Register");
  };

  useEffect(() => {
    if (isLoading) return;
    // Redirect to home page if enokiKeypair exists
    if (user) {
      // navigate("/");
    }
  }, [isLoading, navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left side - Image */}
        <div className="relative h-[40vh] w-full bg-muted md:h-auto md:w-1/2">
          <img
            src="/hero.jpg?height=800&width=1200"
            alt="Zing - Support your friends"
            className="absolute h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
          <div className="absolute bottom-8 left-8 z-10 max-w-md text-white md:bottom-1/2 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 md:transform">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Zing</h1>
            <p className="text-lg opacity-90 md:text-xl">
              Discover and share culinary experiences with mindfulness and
              control over your data.
            </p>
          </div>
        </div>

        {/* Right side - Login */}
        <div className="flex w-full items-center justify-center p-8 md:w-1/2 md:p-16">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Welcome</h2>
              <p className="mt-2 text-muted-foreground">
                Sign in to start your mindful culinary journey
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/60"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-center">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="screenName">Screen Name</Label>
                  <Input
                    id="screenName"
                    type="text"
                    value={screenName}
                    onChange={(e) => setScreenName(e.target.value)}
                    placeholder="Enter your screen name"
                    disabled={isLoading}
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
                    placeholder="Enter your password"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="flex gap-1">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                    onClick={handleLogin}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                    onClick={handleRegister}
                  >
                    {isLoading ? "Register in..." : "Register"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              By signing in, you agree to our{" "}
              <a href="#" className="font-medium text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
