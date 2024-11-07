import { cn } from "@/lib/utils";
import { CharacterDetails } from "@/types";
import { format } from "date-fns";
import { ReactNode } from "react";

type CharacterPageDetailsProps = {
  character: CharacterDetails;
};

type CardWithGradientProps = {
  children: ReactNode;
  className?: string;
  gradientPosition?: "left" | "right";
  index?: number;
};

const CardWithGradient = ({ children, className, gradientPosition = "right", index }: CardWithGradientProps) => {
  return (
    <div className={cn(
      "relative overflow-hidden p-6 bg-secondary/50 backdrop-blur-sm rounded-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4",
      className
    )}>
      <div className={cn(
        "absolute top-0 w-40 h-40 bg-primary/10 rounded-full -translate-y-1/2 blur-2xl",
        index !== undefined ? (
          index % 2 === 0 
            ? "left-0 -translate-x-1/2" 
            : "right-0 translate-x-1/2"
        ) : (
          gradientPosition === "left" 
            ? "left-0 -translate-x-1/2" 
            : "right-0 translate-x-1/2"
        )
      )} />
      {children}
    </div>
  );
};

/**
 * CharacterPageDetails component displays detailed information about a Star Wars character
 * including their personal information, films they appear in, and vehicles they've operated.
 *
 * @param {CharacterPageDetailsProps} props - Component props
 * @param {CharacterDetails} props.character - The character data to display
 */
export const CharacterPageDetails = ({
  character,
}: CharacterPageDetailsProps) => {
  // Extract character ID from URL for image lookup
  const characterId = character.url.split("/")[5];

  // Character attributes to display in the grid
  const characterAttributes = [
    { label: "Birth Year", value: character.birth_year },
    {
      label: "Height",
      value:
        character.height === "unknown"
          ? character.height
          : `${character.height}cm`,
    },
    {
      label: "Mass",
      value:
        character.mass === "unknown" ? character.mass : `${character.mass}kg`,
    },
    { label: "Gender", value: character.gender },
    { label: "Eye Color", value: character.eye_color },
    { label: "Hair Color", value: character.hair_color },
  ];

  return (
    <div className="space-y-8">
      {/* Character Header Card */}
      <CardWithGradient className="shadow-lg animate-in slide-in-from-bottom-10 duration-300">
        <div className="relative space-y-6">
          {/* Character Profile */}
          <div className="flex items-center gap-8">
            <img
              src={`/img/people/${characterId}.jpg`}
              alt={character.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-xl transition-transform duration-300"
            />
            <div>
              <h1 className="font-orbitron text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">{character.name}</h1>
              <p className="text-xl text-muted-foreground mt-2 font-semibold">
                From {character.homeworld_details.name}
              </p>
            </div>
          </div>

          {/* Character Attributes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {characterAttributes.map(({ label, value }) => (
              <div
                key={label}
                className="bg-secondary/40 p-6 rounded-xl"
              >
                <p className="text-muted-foreground text-sm mb-2 font-medium">{label}</p>
                <p className="font-bold text-lg capitalize">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </CardWithGradient>

      {/* Films Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">Films</span>
          <span className="text-sm bg-primary/10 px-3 py-1 rounded-full">
            {character.films_details.length}
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {character.films_details.map((film, index) => (
            <CardWithGradient key={film.title} index={index}>
              <h3 className="font-bold text-xl mb-3">{film.title}</h3>
              <p className="text-sm text-muted-foreground">
                Released {format(film.release_date, "dd MMMM yyyy")}
              </p>
              <p className="text-sm text-muted-foreground">
                Directed by {film.director}
              </p>
            </CardWithGradient>
          ))}
        </div>
      </section>

      {/* Starships Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">Starships</span>
          <span className="text-sm bg-primary/10 px-3 py-1 rounded-full">
            {character.starships_details.length}
          </span>
        </h2>
        {character.starships_details.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {character.starships_details.map((starship, index) => (
              <CardWithGradient key={starship.name} index={index}>
                <h3 className="font-bold text-xl mb-3">{starship.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Model: {starship.model}
                </p>
              </CardWithGradient>
            ))}
          </div>
        ) : (
          <p className="text-lg text-muted-foreground italic">
            {character.name} has no starships
          </p>
        )}
      </section>

      {/* Vehicles Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">Vehicles</span>
          <span className="text-sm bg-primary/10 px-3 py-1 rounded-full">
            {character.vehicles_details.length}
          </span>
        </h2>
        {character.vehicles_details.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {character.vehicles_details.map((vehicle, index) => (
              <CardWithGradient key={vehicle.name} index={index}>
                <h3 className="font-bold text-xl mb-3">{vehicle.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Model: {vehicle.model}
                </p>
              </CardWithGradient>
            ))}
          </div>
        ) : (
          <p className="text-lg text-muted-foreground italic">
            {character.name} has no vehicles
          </p>
        )}
      </section>
    </div>
  );
};
