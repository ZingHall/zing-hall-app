import { CreatorDashboard } from "@/components/creator-dashboard";

export default function DashboardPage() {
  // In a real app, you'd get the creator ID from authentication
  const creatorId = "1"; // Mock creator ID

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Creator Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your projects and funding
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <CreatorDashboard creatorId={creatorId} />
      </div>
    </div>
  );
}
