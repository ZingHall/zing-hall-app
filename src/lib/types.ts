export interface Creator {
  id: string;
  name: string;
  avatar: string;
  category: string;
  projectTitle: string;
  projectImage?: string;
  description: string;
  raisedAmount: number;
  goalAmount: number;
  donorCount: number;
  tags: string[];
  socialLinks: {
    github?: string;
    twitter?: string;
    telegram?: string;
    website?: string;
  };
  createdAt: Date;
  isVerified: boolean;
}

export interface Donation {
  id: string;
  creatorId: string;
  amount: number;
  message?: string;
  donorName?: string;
  paymentMethod?: string;
  createdAt: Date;
}

export interface Payout {
  id: string;
  creatorId: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: Date;
  completedAt?: Date;
}

export interface FundingMilestone {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  targetAmount: number;
  isCompleted: boolean;
  completedAt?: Date;
}
