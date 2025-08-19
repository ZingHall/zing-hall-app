import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChart3, LogOut, Plus, Settings, User } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useNavigate } from "react-router-dom";

export function UserMenu() {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  if (!user) return null;

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
            />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground capitalize">
              {user.role}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        {user.role === "creator" && (
          <>
            <DropdownMenuItem onClick={() => navigate("/dashboard")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/create-project")}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
