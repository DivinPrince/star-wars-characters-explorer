import { useNavigate } from "react-router-dom";
import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Character } from "@/types";
import { fetchCharacter } from "@/hooks/api/use-get-character";

/**
 * Props for the CharacterCard component
 */
interface CharacterCardProps {
  /** Optional character data to display */
  character?: Character;
}

/**
 * Skeleton loading state for a single character card
 */
export const CharacterCardSkeleton = () => {
  return (
    <div className="w-full rounded-xl shadow-lg bg-card border border-border overflow-hidden">
      <div className="relative">
        <Skeleton className="w-full h-80" />
        <div className="absolute bottom-0 left-0 right-0 bg-background/95 p-4">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
};

/**
 * Renders multiple character card skeletons for loading states
 * 
 * @param {Object} props - Component props
 * @param {number} [props.count=1] - Number of skeleton cards to render
 */
export const CharacterCardSkeletonList = ({ count = 1 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </>
  );
};

/**
 * CharacterCard component displays a Star Wars character in a card format
 * 
 * Features:
 * - Displays character image, name, gender and birth year
 * - Handles loading states with skeleton UI
 * - Prefetches detailed character data on render
 * - Interactive hover effects and animations
 * - Navigates to character details page on click
 * 
 * @param {CharacterCardProps} props - Component props
 * @param {Character} [props.character] - Character data to display
 */
export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  if (!character) {
    return null;
  }

  // Extract character ID from URL for image lookup and navigation
  const characterId = character.url.split("/")[5];

  // Prefetch character details for faster navigation
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["character", characterId],
    queryFn: () => fetchCharacter(characterId),
  });

  // Navigation handler
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/characters/${id}`);
  };

  return (
    <div
      className="group font-orbitron w-full rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-card border border-border hover:ring-2 hover:ring-primary/30 hover:ring-offset-2 ring-offset-background cursor-pointer overflow-hidden transform hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
      onClick={() => handleClick(characterId)}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img
          src={`/img/people/${characterId}.jpg`}
          alt={character.name}
          className="w-full h-80 object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent p-4">
            <h3 className="text-2xl font-bold text-primary drop-shadow-lg group-hover:text-primary/90 transition-colors">
              {character.name}
            </h3>
          <p className="text-sm text-muted-foreground drop-shadow-lg flex items-center gap-2">
            Born: {character.birth_year}
          </p>
        </div>
      </div>
    </div>
  );
};
