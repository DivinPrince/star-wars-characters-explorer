import { useQuery } from "@tanstack/react-query";
import { Character, CharacterDetails } from "@/types";


export const fetchCharacter = async (id: string) => {
    // Fetch character
    const characterResponse = await fetch(
      `https://swapi.dev/api/people/${id}`
    );
    if (!characterResponse.ok) {
      throw new Error("Failed to fetch character");
    }
    const character: Character = await characterResponse.json();

    // Fetch films
    const filmsPromises = character.films.map(async (filmUrl) => {
      const response = await fetch(filmUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch film");
      }
      return response.json();
    });
    const films_details = await Promise.all(filmsPromises);

    // Fetch vehicles
    const vehiclesPromises = character.vehicles.map(async (vehicleUrl) => {
      const response = await fetch(vehicleUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch vehicle");
      }
      return response.json();
    });
    const vehicles_details = await Promise.all(vehiclesPromises);

    // Fetch starships
    const starshipsPromises = character.starships.map(async (starshipUrl) => {
      const response = await fetch(starshipUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch starship");
      }
      return response.json();
    });
    const starships_details = await Promise.all(starshipsPromises);

    // Fetch homeworld
    const homeworldResponse = await fetch(character.homeworld);
    if (!homeworldResponse.ok) {
      throw new Error("Failed to fetch homeworld");
    }
    const homeworld_details = await homeworldResponse.json();

    return {
      ...character,
      films_details,
      vehicles_details,
      starships_details,
      homeworld_details,
    };
  }

export function useGetCharacter(id: string) {
  return useQuery<CharacterDetails>({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}
