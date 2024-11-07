import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import useLocalStorage from "use-local-storage";
import { useRef } from "react";
import { LoaderCircle, Search, Wand2, X } from "lucide-react";

import { useAskAI } from "@/hooks/api/use-ask-ai";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

/**
 * CharacterSearch component provides a search interface for Star Wars characters
 * with two modes: regular text search and AI-powered natural language search.
 * 
 * Features:
 * - Debounced search input to prevent excessive API calls
 * - Toggle between regular and AI-powered search modes
 * - Clear search functionality
 * - Loading state indication
 */
const CharacterSearch = () => {
  // URL query parameter state for search term
  const [search, setSearch] = useQueryState("search");
  
  // Persistent storage for search mode preference
  const [isNaturalLanguage, setIsNaturalLanguage] = useLocalStorage<boolean>(
    "isNaturalLanguage",
    false
  );

  // Reference to input element for direct DOM manipulation
  const inputRef = useRef<HTMLInputElement>(null);

  // AI search mutation hook
  const { mutate: askAI, isPending } = useAskAI();

  /**
   * Handles search input changes with debouncing
   * - For natural language: Processes through AI if input length >= 3
   * - For regular search: Directly updates search query
   */
  const handleSearchChange = useDebouncedCallback((value: string) => {
    if (isNaturalLanguage) {
      if (value === "") {
        setSearch("");
        return;
      }
      
      // Only process AI search for meaningful input
      if (value.length < 3) {
        setSearch(value);
        return;
      }

      askAI(
        { question: value },
        {
          onSuccess: (data) => {
            if (!data) return;
            setSearch(data);
          },
        }
      );
    } else {
      setSearch(value);
    }
  }, 1000);

  /**
   * Clears the search input and resets the search state
   */
  const handleClearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearch("");
    }
  };

  /**
   * Handles the search mode toggle
   * Re-processes current search term with new mode if exists
   */
  const handleSearchModeChange = (checked: boolean) => {
    setIsNaturalLanguage(checked);
    if (inputRef.current?.value) {
      handleSearchChange(inputRef.current.value);
    }
  };

  return (
    <div className="space-y-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative">
        <Input
          type="text"
          placeholder={
            isNaturalLanguage
              ? "Try 'Find me a small green character who speaks in riddles'..."
              : "Search characters by name..."
          }
          defaultValue={search ?? ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="peer h-12 ps-12 pe-12 text-base rounded-xl border-2 focus-visible:ring-offset-2 ring-offset-background focus-visible:ring-ring focus-visible:ring-2"
          ref={inputRef}
        />
        
        {/* Search/Loading indicator */}
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-4 text-primary peer-disabled:opacity-50">
          {isPending ? (
            <LoaderCircle
              className="animate-spin"
              size={20}
              strokeWidth={2}
              aria-hidden="true"
              role="presentation"
            />
          ) : (
            <Search size={20} strokeWidth={2} aria-hidden="true" />
          )}
        </div>

        {/* Clear search button */}
        {inputRef.current?.value && (
          <button 
            className="absolute inset-y-0 end-0 flex items-center justify-center pe-4 text-muted-foreground/80 hover:text-primary transition-colors duration-300" 
            onClick={handleClearSearch}
          >
            <X size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Search mode toggle section */}
      <div className="relative flex w-full items-start gap-2 rounded-lg bg-secondary/30 p-2 shadow-sm shadow-black/[.04] has-[[data-state=checked]]:border-ring">
        <Switch
          id="natural-language"
          checked={isNaturalLanguage}
          onCheckedChange={handleSearchModeChange}
          className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
          aria-describedby="natural-language-description"
        />
        <div className="flex grow items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 animate-pulse">
            <Wand2 size={16} className="text-primary" />
          </div>
          <div className="grid grow gap-2">
            <Label htmlFor="natural-language" className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">AI-Powered Search</Label>
            <p
              id="natural-language-description"
              className="text-xs text-muted-foreground"
            >
              Search using natural language queries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSearch;
