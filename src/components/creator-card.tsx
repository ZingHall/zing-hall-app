import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Github, Heart, Twitter } from "lucide-react";
import type { Creator } from "@/lib/types";
import { useNavigate } from "react-router-dom";

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const navigate = useNavigate();
  const progressPercentage = (creator.raisedAmount / creator.goalAmount) * 100;

  const handleCardClick = async () => {
    await navigate(`/creator/${creator.id}`);
  };

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={"/mobile-developer-avatar.png"}
              alt={creator.name}
            />
            <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{creator.name}</h3>
            <p className="text-sm text-muted-foreground">{creator.category}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              // Handle favorite logic here
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
          <img
            src={
              creator.projectImage ||
              `/placeholder.svg?height=200&width=300&query=${creator.projectTitle}`
            }
            alt={creator.projectTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h4 className="font-medium mb-2 line-clamp-2">
          {creator.projectTitle}
        </h4>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {creator.description}
        </p>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Raised</span>
            <span className="font-medium">
              ${creator.raisedAmount.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Goal: ${creator.goalAmount.toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              {creator.donorCount} supporters
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {creator.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex space-x-2">
            {creator.socialLinks.github && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(creator.socialLinks.github, "_blank");
                }}
              >
                <Github className="h-4 w-4" />
              </Button>
            )}
            {creator.socialLinks.twitter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(creator.socialLinks.twitter, "_blank");
                }}
              >
                <Twitter className="h-4 w-4" />
              </Button>
            )}
            {creator.socialLinks.telegram && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button
            size="sm"
            className="ml-auto"
            onClick={(e) => {
              e.stopPropagation();
              // Handle support logic here
            }}
          >
            Support
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
