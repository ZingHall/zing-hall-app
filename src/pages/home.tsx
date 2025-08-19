import { CreatorGrid } from "@/components/creator-grid";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            fun(d)Idea
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing creators, developers, and their innovative
            projects. Support the ideas that inspire you.
          </p>
        </div>
        <CreatorGrid />
      </main>
    </div>
  );
}
