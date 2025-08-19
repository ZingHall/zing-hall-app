import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PREFIX } from "./constant";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "creator" | "supporter";
  isVerified: boolean;
  createdAt: Date;
  creatorProfile?: {
    bio: string;
    category: string;
    socialLinks: {
      github?: string;
      twitter?: string;
      telegram?: string;
      website?: string;
    };
  };
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    role: "creator" | "supporter",
  ) => Promise<void>;
  signOut: () => void;
  updateProfile: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

// Mock users for development
const mockUsers: User[] = [
  {
    id: "1",
    email: "alex@example.com",
    name: "Alex Chen",
    avatar: "/mobile-developer-avatar.png",
    role: "creator",
    isVerified: true,
    createdAt: new Date("2024-01-15"),
    creatorProfile: {
      bio: "Full-stack developer passionate about open source",
      category: "Web Developer",
      socialLinks: {
        github: "https://github.com/alexchen",
        twitter: "https://twitter.com/alexchen",
        telegram: "@alexchen",
      },
    },
  },
  {
    id: "2",
    email: "supporter@example.com",
    name: "John Supporter",
    role: "supporter",
    isVerified: false,
    createdAt: new Date("2024-02-01"),
  },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: mockUsers[0],
      isLoading: false,
      isAuthenticated: false,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const user = mockUsers.find((u) => u.email === email);
          if (!user) {
            throw new Error("Invalid credentials");
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signUp: async (
        email: string,
        password: string,
        name: string,
        role: "creator" | "supporter",
      ) => {
        set({ isLoading: true });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const newUser: User = {
            id: Date.now().toString(),
            email,
            name,
            role,
            isVerified: false,
            createdAt: new Date(),
            ...(role === "creator" && {
              creatorProfile: {
                bio: "",
                category: "",
                socialLinks: {},
              },
            }),
          };

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signOut: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateProfile: (updates) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...updates },
          });
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: `${PREFIX}-auth-storage`,
    },
  ),
);
