import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useGetCharacter } from "@/hooks/api/use-get-character";
import { CharacterPageDetails } from "./page-details";
import PageTitle from "../page-title";
import { useEffect } from "react";

/**
 * CharacterPage component displays detailed information about a Star Wars character.
 * 
 * Features:
 * - Fetches and displays character details based on URL parameter
 * - Shows loading state while fetching data
 * - Handles missing/invalid character ID
 * - Provides navigation back to character list
 * - Responsive layout with max width constraint
 */
export const CharacterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Early return if no character ID is provided in URL
  if (!id) {
    return (
      <div className="text-center text-muted-foreground">
        Character ID not found
      </div>
    );
  }

  // Fetch character data using custom hook
  const { 
    data: character, 
    isLoading: isLoadingCharacter 
  } = useGetCharacter(id);

  if(!character && !isLoadingCharacter) {
    return (
      <div className="text-center text-muted-foreground">
        Character not found
      </div>
    );
  }
  /**
   * Handles navigation back to the character list page
   */
  const handleReturn = () => navigate("/");

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Return navigation button */}
      <PageTitle title={`Star Wars Character | ${character?.name}`} />
      <button
        onClick={handleReturn}
        className="mb-6 inline-flex items-center px-6 py-3 text-sm font-bold bg-secondary rounded-full hover:bg-secondary/90 transition-colors duration-300 border"
        aria-label="Return to character list"
      >
        ← Return
      </button>

      {/* Conditional rendering based on loading and data state */}
      {isLoadingCharacter ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin" aria-label="Loading character data" />
        </div>
      ) : character ? (
        <CharacterPageDetails character={character} />
      ) : (
        <div className="text-center text-muted-foreground">
          Character not found
        </div>
      )}
    </div>
  );
};
