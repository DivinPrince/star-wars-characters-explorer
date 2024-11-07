import { Character } from "@/types";
import { CharacterCard } from "./card";

/**
 * Props for the CharactersList component
 */
type CharactersListProps = {
  /** Array of Star Wars character data to display */
  characters: Character[]
}

/**
 * CharactersList component renders a list of Star Wars characters
 * 
 * Features:
 * - Maps through provided characters array
 * - Renders each character using CharacterCard component
 * - Uses character name as unique key for list items
 * 
 * @param {CharactersListProps} props - Component props
 * @param {Character[]} props.characters - Array of characters to display
 */
export default function CharactersList({ characters }: CharactersListProps) {
  return (
    <>
      {characters.map((character) => (
        <CharacterCard key={character.name} character={character} />
      ))}
    </>
  )
}
