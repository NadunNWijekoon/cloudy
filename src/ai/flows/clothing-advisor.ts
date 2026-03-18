
'use server';
/**
 * @fileOverview A Genkit flow for providing clothing suggestions based on weather.
 *
 * - getClothingAdvice - A function that suggests what to wear.
 * - ClothingAdvisorInput - Input schema for clothing advice.
 * - ClothingAdvisorOutput - Output schema for clothing advice.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClothingAdvisorInputSchema = z.object({
  temperature: z.number().describe('Current temperature in Celsius.'),
  weatherDescription: z.string().describe('Weather description (e.g., "Rainy", "Sunny").'),
  humidity: z.number().describe('Humidity percentage.'),
  windSpeed: z.number().describe('Wind speed in km/h.'),
});
export type ClothingAdvisorInput = z.infer<typeof ClothingAdvisorInputSchema>;

const ClothingAdvisorOutputSchema = z.object({
  summary: z.string().describe('A brief summary of why these clothes were chosen.'),
  layers: z.array(z.string()).describe('List of recommended clothing layers.'),
  accessories: z.array(z.string()).describe('List of recommended accessories (e.g., umbrella, sunglasses).'),
});
export type ClothingAdvisorOutput = z.infer<typeof ClothingAdvisorOutputSchema>;

export async function getClothingAdvice(input: ClothingAdvisorInput): Promise<ClothingAdvisorOutput> {
  return clothingAdvisorFlow(input);
}

const clothingAdvisorPrompt = ai.definePrompt({
  name: 'clothingAdvisorPrompt',
  input: {schema: ClothingAdvisorInputSchema},
  output: {schema: ClothingAdvisorOutputSchema},
  prompt: `You are a fashion-forward weather assistant. Based on the following weather conditions, suggest the most practical and comfortable outfit.

Conditions:
- Temp: {{temperature}}°C
- Weather: {{weatherDescription}}
- Humidity: {{humidity}}%
- Wind: {{windSpeed}} km/h

Provide a list of layers, accessories, and a short summary explaining your choices.`,
});

const clothingAdvisorFlow = ai.defineFlow(
  {
    name: 'clothingAdvisorFlow',
    inputSchema: ClothingAdvisorInputSchema,
    outputSchema: ClothingAdvisorOutputSchema,
  },
  async (input) => {
    const {output} = await clothingAdvisorPrompt(input);
    return output!;
  }
);
