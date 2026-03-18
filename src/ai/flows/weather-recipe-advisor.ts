
'use server';
/**
 * @fileOverview A Genkit flow for providing comfort food recipes based on weather.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeAdvisorInputSchema = z.object({
  temperature: z.number(),
  condition: z.string(),
  humidity: z.number(),
});
export type RecipeAdvisorInput = z.infer<typeof RecipeAdvisorInputSchema>;

const RecipeAdvisorOutputSchema = z.object({
  dishName: z.string(),
  whyItMatches: z.string(),
  estimatedTime: z.string(),
  keyIngredients: z.array(z.string()),
});
export type RecipeAdvisorOutput = z.infer<typeof RecipeAdvisorOutputSchema>;

export async function getRecipeAdvice(input: RecipeAdvisorInput): Promise<RecipeAdvisorOutput> {
  return weatherRecipeFlow(input);
}

const weatherRecipePrompt = ai.definePrompt({
  name: 'weatherRecipePrompt',
  input: {schema: RecipeAdvisorInputSchema},
  output: {schema: RecipeAdvisorOutputSchema},
  prompt: `You are a culinary expert. Suggest a "Comfort Food" dish that perfectly matches the current weather.

Current Conditions:
- Temp: {{temperature}}°C
- Weather: {{condition}}
- Humidity: {{humidity}}%

Provide the name of a dish, a brief explanation of why it fits the mood, estimated cooking time, and a list of 4-5 key ingredients.`,
});

const weatherRecipeFlow = ai.defineFlow(
  {
    name: 'weatherRecipeFlow',
    inputSchema: RecipeAdvisorInputSchema,
    outputSchema: RecipeAdvisorOutputSchema,
  },
  async (input) => {
    const {output} = await weatherRecipePrompt(input);
    return output!;
  }
);
