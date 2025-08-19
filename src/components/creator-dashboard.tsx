import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  DollarSign,
  Download,
  Eye,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import { useCreatorStore } from "@/lib/store";
import { DonationCard } from "@/components/donation-card";

interface CreatorDashboardProps {
  creatorId: string;
}

export function CreatorDashboard({ creatorId }: CreatorDashboardProps) {
  const { creators, donations } = useCreatorStore();
  const creator = creators.find((c) => c.id === creatorId);
  const creatorDonations = donations.filter((d) => d.creatorId === creatorId);

  if (!creator) return null;

  const progressPercentage = (creator.raisedAmount / creator.goalAmount) * 100;
  const totalDonations = creatorDonations.length;
  const averageDonation =
    totalDonations > 0 ? creator.raisedAmount / totalDonations : 0;
  const recentDonations = creatorDonations.slice(0, 10);

  // Calculate monthly earnings (mock data)
  const monthlyEarnings = [
    { month: "Jan", amount: 450 },
    { month: "Feb", amount: 680 },
    { month: "Mar", amount: 920 },
    { month: "Apr", amount: creator.raisedAmount },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${creator.raisedAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {progressPercentage.toFixed(1)}% of $
              {creator.goalAmount.toLocaleString()} goal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supporters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creator.donorCount}</div>
            <p className="text-xs text-muted-foreground">
              Avg. ${averageDonation.toFixed(2)} per supporter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,240</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(creator.raisedAmount * 0.95).toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready for withdrawal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funding Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Funding Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold">
                      ${creator.raisedAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Raised</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">
                      ${creator.goalAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Goal</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Withdraw Funds
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Public Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Post Update
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Supporters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDonations.map((donation) => (
                  <DonationCard key={donation.id} donation={donation} />
                ))}
                {recentDonations.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No donations yet. Share your project to get started!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {creatorDonations.map((donation) => (
                  <DonationCard key={donation.id} donation={donation} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyEarnings.map((month) => (
                    <div
                      key={month.month}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{month.month}</span>
                      <span className="font-medium">${month.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supporter Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Average Donation</span>
                  <span className="font-medium">
                    ${averageDonation.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Repeat Supporters</span>
                  <span className="font-medium">23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Anonymous Donations</span>
                  <span className="font-medium">31%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Payout #001</p>
                    <p className="text-sm text-muted-foreground">
                      March 15, 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$850.00</p>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Payout #002</p>
                    <p className="text-sm text-muted-foreground">
                      February 15, 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$620.00</p>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
