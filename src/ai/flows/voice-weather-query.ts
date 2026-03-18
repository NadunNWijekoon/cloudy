'use server';
/**
 * @fileOverview A Genkit flow for a basic AI voice weather assistant.
 *
 * - voiceWeatherQuery - A function that handles natural language weather queries.
 * - VoiceWeatherQueryInput - The input type for the voiceWeatherQuery function.
 * - VoiceWeatherQueryOutput - The return type for the voiceWeatherQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceWeatherQueryInputSchema = z.object({
  query: z.string().describe('The natural language weather question from the user (e.g., "Will it rain today?").'),
  currentWeatherSummary: z
    .string()
    .describe(
      'A concise summary of current weather conditions (e.g., "Current temperature is 25C, feels like 23C, clear sky.").'
    ),
  hourlyForecastSummary: z
    .string()
    .describe(
      'A concise summary of the hourly forecast for the next 24 hours (e.g., "Hourly: 1 PM - 26C, sunny; 2 PM - 27C, sunny; 3 PM - 25C, light rain.").'
    ),
  dailyForecastSummary: z
    .string()
    .describe(
      'A concise summary of the 7-day forecast (e.g., "Daily: Mon - High 28C/Low 18C, sunny; Tue - High 25C/Low 15C, cloudy with chance of rain.").'
    ),
});
export type VoiceWeatherQueryInput = z.infer<typeof VoiceWeatherQueryInputSchema>;

const VoiceWeatherQueryOutputSchema = z.object({
  response: z.string().describe('The AI-generated textual response to the user\'s weather query.'),
});
export type VoiceWeatherQueryOutput = z.infer<typeof VoiceWeatherQueryOutputSchema>;

export async function voiceWeatherQuery(input: VoiceWeatherQueryInput): Promise<VoiceWeatherQueryOutput> {
  return voiceWeatherQueryFlow(input);
}

const voiceWeatherPrompt = ai.definePrompt({
  name: 'voiceWeatherPrompt',
  input: {schema: VoiceWeatherQueryInputSchema},
  output: {schema: VoiceWeatherQueryOutputSchema},
  prompt: `You are a helpful and concise weather assistant. Your goal is to answer user questions about the weather accurately based on the provided weather information.

Current Weather Summary:
{{{currentWeatherSummary}}}

Hourly Forecast Summary (next 24 hours):
{{{hourlyForecastSummary}}}

7-Day Forecast Summary:
{{{dailyForecastSummary}}}

User's Question:
{{{query}}}

Based on the information above, please provide a direct and concise answer to the user's question. If the information is not sufficient to answer, state that you cannot answer the question with the provided data.`,
});

const voiceWeatherQueryFlow = ai.defineFlow(
  {
    name: 'voiceWeatherQueryFlow',
    inputSchema: VoiceWeatherQueryInputSchema,
    outputSchema: VoiceWeatherQueryOutputSchema,
  },
  async input => {
    const {output} = await voiceWeatherPrompt(input);
    return output!;
  }
);
