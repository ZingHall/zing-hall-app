import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Donation } from "@/lib/types";

interface DonationCardProps {
  donation: Donation;
}

export function DonationCard({ donation }: DonationCardProps) {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs">
          {donation.donorName?.charAt(0) || "A"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            {donation.donorName || "Anonymous"}
          </p>
          <p className="text-sm font-semibold text-primary">
            ${donation.amount}
          </p>
        </div>
        {donation.message && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {donation.message}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {donation.createdAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
