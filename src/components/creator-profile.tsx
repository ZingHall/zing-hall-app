import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Github,
  Heart,
  MessageSquare,
  Share2,
  Twitter,
  Users,
} from "lucide-react";
import { useCreatorStore } from "@/lib/store";
import { DonationCard } from "@/components/donation-card";
import { SupportModal } from "@/components/support-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreatorProfileProps {
  creatorId?: string;
}

export function CreatorProfile({ creatorId }: CreatorProfileProps) {
  const navigate = useNavigate();
  const { creators, donations } = useCreatorStore();
  const [showSupportModal, setShowSupportModal] = useState(false);

  const creator = creators.find((c) => c.id === creatorId);
  const creatorDonations = donations.filter((d) => d.creatorId === creatorId);

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Creator Not Found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = (creator.raisedAmount / creator.goalAmount) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Creators
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Creator Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={creator.avatar || "/placeholder.svg"}
                        alt={creator.name}
                      />
                      <AvatarFallback className="text-2xl">
                        {creator.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h1 className="text-3xl font-bold">{creator.name}</h1>
                        {creator.isVerified && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-lg text-muted-foreground">
                        {creator.category}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Joined {creator.createdAt.toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {creator.donorCount} supporters
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Follow
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">
                  {creator.projectTitle}
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {creator.projectImage && (
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={
                        creator.projectImage ||
                        `/placeholder.svg?height=400&width=600&query=${creator.projectTitle}`
                      }
                      alt={creator.projectTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="text-muted-foreground leading-relaxed">
                  {creator.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {creator.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Updates */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Recent Updates</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <p className="font-medium">Project milestone reached!</p>
                    <p className="text-sm text-muted-foreground">
                      Thanks to all supporters, we've completed the core
                      component library. Next up: documentation and examples.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      2 days ago
                    </p>
                  </div>
                  <Separator />
                  <div className="border-l-4 border-muted pl-4">
                    <p className="font-medium">New features added</p>
                    <p className="text-sm text-muted-foreground">
                      Added dark mode support and improved accessibility across
                      all components.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      1 week ago
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Funding Progress</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    ${creator.raisedAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    raised of ${creator.goalAmount.toLocaleString()} goal
                  </div>
                </div>

                <Progress value={progressPercentage} className="h-3" />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">
                      {creator.donorCount}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Supporters
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {Math.round(progressPercentage)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Complete
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setShowSupportModal(true)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Support This Project
                </Button>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Connect</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {creator.socialLinks.github && (
                  <a
                    href={creator.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span>GitHub</span>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </a>
                )}
                {creator.socialLinks.twitter && (
                  <a
                    href={creator.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                    <span>Twitter</span>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </a>
                )}
                {creator.socialLinks.telegram && (
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors">
                    <MessageSquare className="h-5 w-5" />
                    <span>Telegram: {creator.socialLinks.telegram}</span>
                  </div>
                )}
                {creator.socialLinks.website && (
                  <a
                    href={creator.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span>Website</span>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Recent Supporters */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Recent Supporters</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {creatorDonations.slice(0, 5).map((donation) => (
                    <DonationCard key={donation.id} donation={donation} />
                  ))}
                  {creatorDonations.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Be the first to support this creator!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Support Modal */}
      <SupportModal
        creator={creator}
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </div>
  );
}
