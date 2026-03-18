'use server';
/**
 * @fileOverview A Genkit flow for the AI Travel & Planning Assistant.
 *
 * - travelPlanningAssistant - A function that handles generating travel and activity planning advice based on weather.
 * - TravelPlanningAssistantInput - The input type for the travelPlanningAssistant function.
 * - TravelPlanningAssistantOutput - The return type for the travelPlanningAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const TravelPlanningAssistantInputSchema = z.object({
  currentLocationName: z
    .string()
    .describe("The name of the user's current location (e.g., 'New York City')."),
  currentWeatherDescription: z
    .string()
    .describe(
      "A summary of the current weather conditions at the user's location (e.g., 'Partly cloudy, 25°C, light breeze')."
    ),
  futureWeatherForecast: z
    .string()
    .describe(
      "A summary of the upcoming weather forecast relevant to the user's current location or a trip destination, including hourly and daily predictions. This can be for the next 24 hours or up to 7 days, depending on the query."
    ),
  userActivityPreference: z
    .string()
    .optional()
    .describe(
      "A description of the user's planned outdoor activity (e.g., 'hiking', 'picnic', 'beach day', 'going for a walk')."
    ),
  tripDetails: z
    .object({
      destinationName: z.string().describe('The destination name for the trip.'),
      startDate: z
        .string()
        .describe('The start date of the trip (e.g., "YYYY-MM-DD").'),
      endDate: z
        .string()
        .describe('The end date of the trip (e.g., "YYYY-MM-DD").'),
    })
    .optional()
    .describe(
      'Optional details about an upcoming trip for which to provide a weather summary.'
    ),
});
export type TravelPlanningAssistantInput = z.infer<
  typeof TravelPlanningAssistantInputSchema
>;

// Output Schema
const TravelPlanningAssistantOutputSchema = z.object({
  planningAdvice: z
    .string()
    .describe(
      'Human-like advice or a detailed weather summary for the user\'s activity or trip.'
    ),
  suggestedOptimalTimes: z
    .array(z.string())
    .optional()
    .describe('A list of suggested optimal times or days for the activity, if applicable.'),
  weatherSummaryForTrip: z
    .string()
    .optional()
    .describe(
      'A detailed weather summary for the specified trip dates and destination, if a trip was provided.'
    ),
});
export type TravelPlanningAssistantOutput = z.infer<
  typeof TravelPlanningAssistantOutputSchema
>;

// Exported wrapper function
export async function travelPlanningAssistant(
  input: TravelPlanningAssistantInput
): Promise<TravelPlanningAssistantOutput> {
  return travelPlanningAssistantFlow(input);
}

// Prompt definition
const travelPlanningAssistantPrompt = ai.definePrompt({
  name: 'travelPlanningAssistantPrompt',
  input: {schema: TravelPlanningAssistantInputSchema},
  output: {schema: TravelPlanningAssistantOutputSchema},
  prompt: `You are an AI-powered Travel & Planning Assistant. Your goal is to provide human-like suggestions for optimal times for outdoor activities or tailored weather summaries for upcoming trips.

Please provide your response in JSON format, strictly adhering to the following schema:

\`\`\`json
{{jsonSchema TravelPlanningAssistantOutputSchema}}
\`\`\`

Current Location: {{{currentLocationName}}}
Current Weather: {{{currentWeatherDescription}}}
Future Weather Forecast: {{{futureWeatherForecast}}}

{{#if userActivityPreference}}
User's planned activity: {{{userActivityPreference}}}
Based on the current and future weather forecasts, suggest the optimal times or days for the activity "{{{userActivityPreference}}}". Consider factors like temperature, rain, wind, and UV index. Populate the \`planningAdvice\` and \`suggestedOptimalTimes\` fields.
{{/if}}

{{#if tripDetails}}
User's trip details:
Destination: {{{tripDetails.destinationName}}}
Start Date: {{{tripDetails.startDate}}}
End Date: {{{tripDetails.endDate}}}
Provide a tailored weather summary for this trip based on the future weather forecast provided. Include daily outlooks and any potential severe weather warnings. Populate the \`planningAdvice\` and \`weatherSummaryForTrip\` fields.
{{/if}}

If both an activity and trip details are provided, address both. If neither is explicitly provided, provide general weather advice for the current location's forecast, populating only \`planningAdvice\`.
`,
});

// Flow definition
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
