import { CreatorCard } from "@/components/creator-card";
import { CreatorFilters } from "@/components/creator-filters";
import { useCreatorStore } from "@/lib/store";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

export function CreatorGrid() {
  const {
    creators,
    searchQuery,
    selectedCategory,
    sortBy,
    showFilters,
    isLoading,
  } = useCreatorStore();

  const filteredAndSortedCreators = useMemo(() => {
    let filtered = creators;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (creator) =>
          creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          creator.projectTitle
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          creator.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          creator.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (creator) => creator.category === selectedCategory,
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "most-funded":
        filtered.sort((a, b) => b.raisedAmount - a.raisedAmount);
        break;
      case "most-supporters":
        filtered.sort((a, b) => b.donorCount - a.donorCount);
        break;
      case "closest-to-goal":
        filtered.sort((a, b) => {
          const aProgress = (a.raisedAmount / a.goalAmount) * 100;
          const bProgress = (b.raisedAmount / b.goalAmount) * 100;
          return bProgress - aProgress;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [creators, searchQuery, selectedCategory, sortBy]);

  console.log({ filteredAndSortedCreators });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading creators...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showFilters && <CreatorFilters />}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredAndSortedCreators.length} creator
          {filteredAndSortedCreators.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {filteredAndSortedCreators.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-2">
            No creators found
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {filteredAndSortedCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
}
