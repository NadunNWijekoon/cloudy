'use server';
/**
 * @fileOverview A Genkit flow for generating a playful "Outdoor Vibe Score".
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OutdoorScoreInputSchema = z.object({
  temperature: z.number(),
  condition: z.string(),
  windSpeed: z.number(),
  humidity: z.number(),
});
export type OutdoorScoreInput = z.infer<typeof OutdoorScoreInputSchema>;

const OutdoorScoreOutputSchema = z.object({
  score: z.number().describe('A score from 0 to 10.'),
  vibeDescription: z.string().describe('A short, witty, and human-like description of the outdoor vibe.'),
  emoji: z.string().describe('A single emoji representing the vibe.'),
});
export type OutdoorScoreOutput = z.infer<typeof OutdoorScoreOutputSchema>;

export async function getOutdoorScore(input: OutdoorScoreInput): Promise<OutdoorScoreOutput> {
  return outdoorScoreFlow(input);
}

const outdoorScorePrompt = ai.definePrompt({
  name: 'outdoorScorePrompt',
  input: {schema: OutdoorScoreInputSchema},
  output: {schema: OutdoorScoreOutputSchema},
  prompt: `You are a lifestyle weather critic. Rate the current weather vibe from 0 to 10.

Conditions:
- Temp: {{temperature}}°C
- Weather: {{condition}}
- Wind: {{windSpeed}} km/h
- Humidity: {{humidity}}%

Provide a score, a short witty description (max 15 words), and one appropriate emoji.`,
});

const outdoorScoreFlow = ai.defineFlow(
  {
    name: 'outdoorScoreFlow',
    inputSchema: OutdoorScoreInputSchema,
    outputSchema: OutdoorScoreOutputSchema,
  },
  async (input) => {
    const {output} = await outdoorScorePrompt(input);
    return output!;
  }
);
