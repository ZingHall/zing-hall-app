import { UserProfile } from "@/components/user-profile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <UserProfile />
      </div>
    </div>
  );
}
