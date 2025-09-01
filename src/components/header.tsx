import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { useCreatorStore } from "@/lib/store";
import { useAuthStore } from "@/lib/auth-store";
import { UserMenu } from "@/components/auth/user-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate } from "react-router-dom";
import { useCreateWallet } from "@privy-io/react-auth/extended-chains";
import { usePrivy } from "@privy-io/react-auth";
import { BottomNav } from "./bottom-nav";
import { useUserContext } from "@/context/user-context";

export function Header() {
  const { searchQuery, setSearchQuery, toggleFilters } = useCreatorStore();
  const { user: auth } = useAuthStore();
  const { isAuthenticated } = useUserContext();
  const navigate = useNavigate();
  const { user, login, ready, authenticated } = usePrivy();
  const { createWallet } = useCreateWallet();

  const handleSignup = async () => {
    if (!ready) return console.error("Privy not ready yet");
    if (!authenticated) {
      console.error("User not authenticated");
      await login();
      return;
    }

    if (user?.wallet?.walletClientType === "embedded") {
      console.log("wallet already existx");
    }
    const wallet = await createWallet({ chainType: "sui" });
    console.log(`wallet created: ${wallet}`);
    try {
    } catch (error) {
      console.error("Error at creating Sui wallet: ", error);
    }
  };

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo - always visible */}
          <div className="flex items-center">
            <h2
              className="text-xl md:text-2xl font-bold text-primary cursor-pointer flex gap-1 items-center justify-center"
              onClick={() => navigate("/")}
            >
              <img src="/zing.svg" className="w-8 h-8 text-xl pt-1" />
              Zing
            </h2>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search creators, projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Desktop navigation - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={toggleFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <ThemeToggle />

            {isAuthenticated ? (
              <>
                {auth?.role === "creator" && (
                  <Button size="sm" onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </Button>
                )}
                <UserMenu />
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleSignup}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate("/auth/signup")}>
                  Join as Creator
                </Button>
              </>
            )}
          </div>

          {/* Mobile header right section */}
          <div className="flex md:hidden items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleSignup}>
              Sign In
            </Button>
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>
      <BottomNav />
    </>
  );
}
