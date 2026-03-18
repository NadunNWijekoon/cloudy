'use server';
/**
 * @fileOverview A Genkit flow for providing gardening advice based on weather trends.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GardenCareInputSchema = z.object({
  temperature: z.number(),
  rainProbability: z.number(),
  humidity: z.number(),
  nextDayForecast: z.string(),
});
export type GardenCareInput = z.infer<typeof GardenCareInputSchema>;

const GardenCareOutputSchema = z.object({
  wateringAdvice: z.string().describe('Should the user water today?'),
  plantProtection: z.string().describe('Tips for protecting sensitive plants.'),
  tasks: z.array(z.string()).describe('Quick gardening tasks for today.'),
});
export type GardenCareOutput = z.infer<typeof GardenCareOutputSchema>;

export async function getGardenAdvice(input: GardenCareInput): Promise<GardenCareOutput> {
  return gardenCareFlow(input);
}

const gardenCarePrompt = ai.definePrompt({
  name: 'gardenCarePrompt',
  input: {schema: GardenCareInputSchema},
  output: {schema: GardenCareOutputSchema},
  prompt: `You are an expert horticulturalist. Given the current weather and tomorrow's forecast, give practical advice for a home garden.

Current: {{temperature}}°C, {{humidity}}% humidity, {{rainProbability}}% rain chance.
Tomorrow: {{nextDayForecast}}

Recommend watering needs, plant protection, and 2-3 specific tasks.`,
});

const gardenCareFlow = ai.defineFlow(
  {
    name: 'gardenCareFlow',
    inputSchema: GardenCareInputSchema,
    outputSchema: GardenCareOutputSchema,
  },
  async (input) => {
    const {output} = await gardenCarePrompt(input);
    return output!;
  }
);
