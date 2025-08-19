import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCreatorStore } from "@/lib/store";
import { X } from "lucide-react";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Web Developer", label: "Web Developer" },
  { value: "UI/UX Designer", label: "UI/UX Designer" },
  { value: "Mobile Developer", label: "Mobile Developer" },
  { value: "Data Scientist", label: "Data Scientist" },
  { value: "Game Developer", label: "Game Developer" },
  { value: "Content Creator", label: "Content Creator" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "most-funded", label: "Most Funded" },
  { value: "most-supporters", label: "Most Supporters" },
  { value: "closest-to-goal", label: "Closest to Goal" },
];

export function CreatorFilters() {
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    clearFilters,
  } = useCreatorStore();

  const hasActiveFilters = selectedCategory !== "all" || searchQuery;

  return (
    <div className="bg-muted/50 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters & Sort</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Sort By</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{searchQuery}"
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            </Badge>
          )}
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {categories.find((c) => c.value === selectedCategory)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSelectedCategory("all")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
