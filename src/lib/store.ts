import { create } from "zustand";
import type { Creator, Donation, FundingMilestone, Payout } from "./types";

interface CreatorStore {
  creators: Creator[];
  selectedCreator: Creator | null;
  donations: Donation[];
  payouts: Payout[];
  milestones: FundingMilestone[];
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  showFilters: boolean;
  isLoading: boolean;

  setCreators: (creators: Creator[]) => void;
  setSelectedCreator: (creator: Creator | null) => void;
  addDonation: (donation: Donation) => void;
  updateCreatorFunding: (creatorId: string, amount: number) => void;
  addPayout: (payout: Payout) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sortBy: string) => void;
  toggleFilters: () => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
}

// Moved mock data back into store file to fix import error
const mockCreators: Creator[] = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "/mobile-developer-avatar.png",
    category: "Web Developer",
    projectTitle: "Open Source React Component Library",
    description:
      "Building a comprehensive, accessible React component library for modern web applications. Includes 50+ components with TypeScript support.",
    raisedAmount: 2500,
    goalAmount: 10000,
    donorCount: 23,
    tags: ["React", "TypeScript", "Open Source"],
    socialLinks: {
      github: "https://github.com/alexchen",
      twitter: "https://twitter.com/alexchen",
      telegram: "@alexchen",
    },
    createdAt: new Date("2024-01-15"),
    isVerified: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "/mobile-developer-avatar.png",
    category: "UI/UX Designer",
    projectTitle: "Design System for Startups",
    description:
      "Creating a complete design system with Figma components, design tokens, and documentation to help startups build consistent products.",
    raisedAmount: 1800,
    goalAmount: 5000,
    donorCount: 15,
    tags: ["Design", "Figma", "Startup"],
    socialLinks: {
      twitter: "https://twitter.com/sarahdesigns",
      website: "https://sarahdesigns.com",
      telegram: "@sarahdesigns",
    },
    createdAt: new Date("2024-02-01"),
    isVerified: true,
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    avatar: "/mobile-developer-avatar.png",
    category: "Mobile Developer",
    projectTitle: "AI-Powered Fitness App",
    description:
      "Developing a React Native fitness app with AI workout recommendations, progress tracking, and social features.",
    raisedAmount: 3200,
    goalAmount: 15000,
    donorCount: 42,
    tags: ["React Native", "AI", "Fitness"],
    socialLinks: {
      github: "https://github.com/mikerod",
      twitter: "https://twitter.com/mikerod",
      telegram: "@mikerod",
    },
    createdAt: new Date("2024-01-20"),
    isVerified: false,
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "/mobile-developer-avatar.png",
    category: "Data Scientist",
    projectTitle: "Climate Data Visualization Tool",
    description:
      "Building an interactive web platform to visualize climate change data and make environmental information accessible to everyone.",
    raisedAmount: 4500,
    goalAmount: 8000,
    donorCount: 67,
    tags: ["Data Science", "Climate", "Visualization"],
    socialLinks: {
      github: "https://github.com/emmawilson",
      website: "https://climatedata.org",
      telegram: "@emmawilson",
    },
    createdAt: new Date("2024-01-10"),
    isVerified: true,
  },
];

export const useCreatorStore = create<CreatorStore>((set, get) => ({
  creators: mockCreators,
  selectedCreator: null,
  donations: [],
  payouts: [],
  milestones: [],
  searchQuery: "",
  selectedCategory: "all",
  sortBy: "newest",
  showFilters: false,
  isLoading: false,

  setCreators: (creators) => set({ creators }),
  setSelectedCreator: (creator) => set({ selectedCreator: creator }),
  addDonation: (donation) =>
    set((state) => ({
      donations: [...state.donations, donation],
    })),
  // Added funding update functionality
  updateCreatorFunding: (creatorId, amount) =>
    set((state) => ({
      creators: state.creators.map((creator) =>
        creator.id === creatorId
          ? {
              ...creator,
              raisedAmount: creator.raisedAmount + amount,
              donorCount: creator.donorCount + 1,
            }
          : creator,
      ),
    })),
  addPayout: (payout) =>
    set((state) => ({
      payouts: [...state.payouts, payout],
    })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortBy: (sortBy) => set({ sortBy }),
  toggleFilters: () => set((state) => ({ showFilters: !state.showFilters })),
  clearFilters: () =>
    set({
      searchQuery: "",
      selectedCategory: "all",
      showFilters: false,
    }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
