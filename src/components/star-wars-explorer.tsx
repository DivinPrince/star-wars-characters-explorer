import { useRef, useEffect } from "react";
import { useQueryState } from "nuqs";

import { useGetCharacters } from "@/hooks/api/use-get-characters";
import CharactersList from "@/components/character/characters-list";
import CharacterSearch from "@/components/character/search";
import { CharacterCardSkeletonList } from "@/components/character/card";

/**
 * StarWarsExplorer component provides the main interface for exploring Star Wars characters.
 * 
 * Features:
 * - Character search functionality with URL query state
 * - Infinite scrolling pagination
 * - Loading states and error handling
 * - Responsive grid layout
 * - Empty state handling
 */
export default function StarWarsExplorer() {
  // Search query state from URL
  const [search] = useQueryState('search');

  // Fetch characters with optional search filter
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCharacters(search ?? undefined);

  // Intersection observer for infinite scrolling
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Helper to check if there are no search results
  const hasNoResults = data?.pages[0]?.results.length === 0;

  return (
    <div className="max-w-4xl mx-auto p-6 relative" id="#">
      <CharacterSearch />
      {/* Loading state */}
      {isLoading && (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          <CharacterCardSkeletonList count={10} />
        </div>
      )}

      {/* Error state */}
      {isError && (
        <p className="text-red-600" role="alert">
          Error fetching characters
        </p>
      )}

      {/* Results grid */}
      {data?.pages && (
        <div className="mb-4">
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
            {data.pages.map((page, index) => (
              <CharactersList 
                key={index}
                characters={page.results} 
              />
            ))}
            {isFetchingNextPage && (
              <CharacterCardSkeletonList count={10} />
            )}
          </div>
        </div>
      )}

      {/* No results message */}
      {hasNoResults && (
        <p className="text-muted-foreground">
          No character found that matches your search
        </p>
      )}

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-4" aria-hidden="true" />
    </div>
  );
}
