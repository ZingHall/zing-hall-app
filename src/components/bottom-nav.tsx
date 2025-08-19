import { Heart, Home, Menu, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/auth-store";

export function BottomNav() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t sm:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <button
          onClick={() => navigate("/")}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => navigate("/search")}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50"
        >
          <Search className="w-5 h-5" />
          <span className="text-xs">Search</span>
        </button>
        <button
          onClick={() => navigate("/favorites")}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50"
        >
          <Heart className="w-5 h-5" />
          <span className="text-xs">Favorites</span>
        </button>
        {user?.role === "creator" ? (
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth/signup")}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs">Become Creator</span>
          </button>
        )}
        <button
          onClick={() => navigate("/profile")}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50"
        >
          <User className="w-5 h-5" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}
