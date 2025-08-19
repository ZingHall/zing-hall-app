import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/lib/auth-store";
import { Camera, Save } from "lucide-react";

export function UserProfile() {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.creatorProfile?.bio || "",
    category: user?.creatorProfile?.category || "",
    github: user?.creatorProfile?.socialLinks?.github || "",
    twitter: user?.creatorProfile?.socialLinks?.twitter || "",
    telegram: user?.creatorProfile?.socialLinks?.telegram || "",
    website: user?.creatorProfile?.socialLinks?.website || "",
  });

  if (!user) return null;
  console.log({ user });

  const handleSave = () => {
    const updates: any = {
      name: formData.name,
      email: formData.email,
    };

    if (user.role === "creator") {
      updates.creatorProfile = {
        ...user.creatorProfile,
        bio: formData.bio,
        category: formData.category,
        socialLinks: {
          github: formData.github || undefined,
          twitter: formData.twitter || undefined,
          telegram: formData.telegram || undefined,
          website: formData.website || undefined,
        },
      };
    }

    updateProfile(updates);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                />
                <AvatarFallback className="text-2xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                {user.isVerified && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{user.email}</p>
              <Badge variant="outline" className="mt-1 capitalize">
                {user.role}
              </Badge>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                "Edit Profile"
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
          </div>

          {user.role === "creator" && (
            <>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g., Web Developer, Designer, etc."
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Tell us about yourself and your work..."
                  rows={4}
                  disabled={!isEditing}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Social Links (Creator only) */}
      {user.role === "creator" && (
        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                  placeholder="https://github.com/username"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                  placeholder="https://twitter.com/username"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="telegram">Telegram</Label>
                <Input
                  id="telegram"
                  value={formData.telegram}
                  onChange={(e) =>
                    setFormData({ ...formData, telegram: e.target.value })
                  }
                  placeholder="@username"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  placeholder="https://yourwebsite.com"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Account Status</p>
              <p className="text-sm text-muted-foreground">
                {user.isVerified
                  ? "Your account is verified"
                  : "Account verification pending"}
              </p>
            </div>
            {!user.isVerified && (
              <Button variant="outline" size="sm">
                Verify Account
              </Button>
            )}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Member Since</p>
              <p className="text-sm text-muted-foreground">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
