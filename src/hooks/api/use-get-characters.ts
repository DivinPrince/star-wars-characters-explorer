import { Character } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

type CharacterResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};

export function useGetCharacters(query?: string) {
  return useInfiniteQuery<CharacterResponse>({
    queryKey: ["characters", query],
    queryFn: async ({ pageParam = 1 }) => {
      if (query) {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${pageParam}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        // Extract page number from next URL
        const nextPageUrl = new URL(lastPage.next);
        return Number(nextPageUrl.searchParams.get("page"));
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}
