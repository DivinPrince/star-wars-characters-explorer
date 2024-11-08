import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { useMutation } from "@tanstack/react-query";
import { generateObject } from "ai";
import { z } from "zod";

// Initialize Google AI client
const google = createGoogleGenerativeAI({
  apiKey: import.meta.env.VITE_AI_API_KEY,
});

/**
 * Response type for AI character identification
 */
interface AskAIResponse {
  /** The identified character name */
  character: string;
}

/**
 * Request type for AI character identification
 */
interface AskAIRequest {
  /** The question/description about the character */
  question: string;
}

/**
 * Sends a request to the AI model to identify a Star Wars character based on description
 * 
 * @param request - The request containing the character description
 * @returns The identified character name
 * @throws Error if AI request fails
 */
const askAI = async (request: AskAIRequest): Promise<string> => {
  try {
    const { object } = await generateObject<AskAIResponse>({
      model: google("gemini-1.5-flash"),
      system:
        "You are an expert in Star Wars characters. When given a description, respond with the name of one matching character. Provide only the name. if there are multiple characters that match, provide a name for the group of characters eg. skywalker",
      schema: z.object({
        character: z.string().min(1, "Character name cannot be empty"),
      }),
      prompt: request.question,
    });
    return object.character;
  } catch (error) {
    console.error("AI request failed:", error);
    throw new Error("Failed to identify character");
  }
};

/**
 * Hook for making AI character identification requests
 * 
 * @returns Mutation object for handling AI requests
 */
export const useAskAI = () => {
  return useMutation({
    mutationFn: askAI,
  });
};
