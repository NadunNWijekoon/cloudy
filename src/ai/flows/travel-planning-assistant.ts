'use server';
/**
 * @fileOverview A Genkit flow for the AI Travel & Planning Assistant.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TravelPlanningAssistantInputSchema = z.object({
  currentLocationName: z.string(),
  currentWeatherDescription: z.string(),
  futureWeatherForecast: z.string(),
  userActivityPreference: z.string().optional(),
  tripDetails: z.object({
    destinationName: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
});
export type TravelPlanningAssistantInput = z.infer<typeof TravelPlanningAssistantInputSchema>;

const TravelPlanningAssistantOutputSchema = z.object({
  planningAdvice: z.string(),
  suggestedOptimalTimes: z.array(z.string()).optional(),
  weatherSummaryForTrip: z.string().optional(),
});
export type TravelPlanningAssistantOutput = z.infer<typeof TravelPlanningAssistantOutputSchema>;

export async function travelPlanningAssistant(input: TravelPlanningAssistantInput): Promise<TravelPlanningAssistantOutput> {
  return travelPlanningAssistantFlow(input);
}

const travelPlanningAssistantPrompt = ai.definePrompt({
  name: 'travelPlanningAssistantPrompt',
  input: {schema: TravelPlanningAssistantInputSchema},
  output: {schema: TravelPlanningAssistantOutputSchema},
  prompt: `You are an AI-powered Travel & Planning Assistant. Provide suggestions based on weather.

Current Location: {{currentLocationName}}
Current Weather: {{currentWeatherDescription}}
Future Weather Forecast: {{futureWeatherForecast}}

{{#if userActivityPreference}}
User's planned activity: {{{userActivityPreference}}}
Based on the current and future weather forecasts, suggest the optimal times or days for the activity "{{{userActivityPreference}}}". Consider factors like temperature, rain, wind, and UV index. Populate the planningAdvice and suggestedOptimalTimes fields.
{{/if}}

{{#if tripDetails}}
Destination: {{tripDetails.destinationName}}
Dates: {{tripDetails.startDate}} to {{tripDetails.endDate}}
Provide a trip summary for this destination. Populate the planningAdvice and weatherSummaryForTrip fields.
{{/if}}

If neither is provided, give general advice on how to enjoy the upcoming weather.`,
});

const travelPlanningAssistantFlow = ai.defineFlow(
  {
    name: 'travelPlanningAssistantFlow',
    inputSchema: TravelPlanningAssistantInputSchema,
    outputSchema: TravelPlanningAssistantOutputSchema,
  },
  async input => {
    const {output} = await travelPlanningAssistantPrompt(input);
    return output!;
  }
);
