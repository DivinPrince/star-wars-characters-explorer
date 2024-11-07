import { useQuery } from "@tanstack/react-query";
import { Planet } from "@/types";

export function useGetWorld(url?: string) {
  return useQuery<Planet>({
    queryKey: ["world", url],
    queryFn: async () => {
      if (!url) return null;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!url,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}
