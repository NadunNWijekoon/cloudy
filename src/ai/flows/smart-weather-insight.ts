'use server';
/**
 * @fileOverview A Genkit flow for generating smart, human-like weather suggestions and actionable insights.
 *
 * - smartWeatherInsight - A function that generates a smart weather insight.
 * - SmartWeatherInsightInput - The input type for the smartWeatherInsight function.
 * - SmartWeatherInsightOutput - The return type for the smartWeatherInsight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartWeatherInsightInputSchema = z.object({
  locationName: z.string().describe('The name of the location (e.g., "San Francisco, CA").'),
  currentConditions: z.object({
    temperature: z.number().describe('Current temperature in Celsius.'),
    feelsLikeTemperature: z.number().describe('Current "feels like" temperature in Celsius.'),
    weatherDescription: z.string().describe('Brief description of current weather (e.g., "Partly cloudy").'),
    humidity: z.number().describe('Current humidity percentage.'),
    windSpeed: z.number().describe('Current wind speed in km/h.'),
    uvIndex: z.number().describe('Current UV index.'),
    aqi: z.number().describe('Current Air Quality Index.'),
  }).describe('Current weather conditions.'),
  hourlyForecast: z.array(z.object({
    time: z.string().describe('Time of the forecast (e.g., "3 PM").'),
    temperature: z.number().describe('Temperature in Celsius at this hour.'),
    weatherDescription: z.string().describe('Weather description for this hour.'),
    rainProbability: z.number().describe('Probability of rain at this hour (0-100).'),
  })).describe('Hourly forecast for the next 24 hours.'),
  dailyForecast: z.array(z.object({
    date: z.string().describe('Date of the forecast (e.g., "Tomorrow").'),
    minTemperature: z.number().describe('Minimum temperature in Celsius for the day.'),
    maxTemperature: z.number().describe('Maximum temperature in Celsius for the day.'),
    weatherDescription: z.string().describe('Weather description for the day.'),
    rainProbability: z.number().describe('Probability of rain for the day (0-100).'),
  })).describe('Daily forecast for the next 7 days.'),
});
export type SmartWeatherInsightInput = z.infer<typeof SmartWeatherInsightInputSchema>;

const SmartWeatherInsightOutputSchema = z.object({
  insight: z.string().describe('A human-like, actionable weather insight or suggestion.'),
});
export type SmartWeatherInsightOutput = z.infer<typeof SmartWeatherInsightOutputSchema>;

export async function smartWeatherInsight(input: SmartWeatherInsightInput): Promise<SmartWeatherInsightOutput> {
  return smartWeatherInsightFlow(input);
}

const smartWeatherInsightPrompt = ai.definePrompt({
  name: 'smartWeatherInsightPrompt',
  input: {schema: SmartWeatherInsightInputSchema},
  output: {schema: SmartWeatherInsightOutputSchema},
  prompt: `You are a smart, helpful weather assistant. Your goal is to provide concise, human-like, and actionable suggestions or insights based on the provided weather data for {{locationName}}. Focus on what the user needs to know or do.

Current Conditions for {{locationName}}:
- Temperature: {{currentConditions.temperature}}°C (Feels like: {{currentConditions.feelsLikeTemperature}}°C)
- Description: {{currentConditions.weatherDescription}}
- Humidity: {{currentConditions.humidity}}%
- Wind Speed: {{currentConditions.windSpeed}} km/h
- UV Index: {{currentConditions.uvIndex}}
- AQI: {{currentConditions.aqi}}

Hourly Forecast (next 24 hours):
{{#each hourlyForecast}}
- {{time}}: {{temperature}}°C, {{weatherDescription}}, Rain Probability: {{rainProbability}}%
{{/each}}

Daily Forecast (next 7 days):
{{#each dailyForecast}}
- {{date}}: Min {{minTemperature}}°C / Max {{maxTemperature}}°C, {{weatherDescription}}, Rain Probability: {{rainProbability}}%
{{/each}}

Based on this information, provide ONE actionable insight or suggestion. Prioritize important events like rain, extreme temperatures, or high UV/AQI. If there are no immediate concerns, give a general helpful tip.

Example insights:
- "Light rain expected at 3 PM — take an umbrella."
- "The UV Index is high today, remember to apply sunscreen if you're going outside."
- "Temperatures will drop significantly tonight; consider bringing in sensitive plants."
- "Air quality is poor today, it's best to limit outdoor activities."
- "Enjoy a pleasant day with clear skies and mild temperatures!"
- "Strong winds are expected this afternoon, secure any loose outdoor items."

Your insight:`,
});

const smartWeatherInsightFlow = ai.defineFlow(
  {
    name: 'smartWeatherInsightFlow',
    inputSchema: SmartWeatherInsightInputSchema,
    outputSchema: SmartWeatherInsightOutputSchema,
  },
  async (input) => {
    const {output} = await smartWeatherInsightPrompt(input);
    return output!;
  }
);
