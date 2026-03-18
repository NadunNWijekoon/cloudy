'use server';
/**
 * @fileOverview A Genkit flow for providing outdoor photography suggestions based on weather and light.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PhotographyAdvisorInputSchema = z.object({
  condition: z.string().describe('Weather condition (e.g., Sunny, Overcast, Rainy).'),
  temperature: z.number().describe('Temperature in Celsius.'),
  timeOfDay: z.string().describe('Current time of day.'),
});
export type PhotographyAdvisorInput = z.infer<typeof PhotographyAdvisorInputSchema>;

const PhotographyAdvisorOutputSchema = z.object({
  lightingQuality: z.string().describe('Description of the light quality (e.g., Hard, Diffused).'),
  suggestedSubjects: z.array(z.string()).describe('List of subjects that look good in these conditions.'),
  cameraSettingsTip: z.string().describe('A brief tip for camera settings.'),
  goldenHourNote: z.string().describe('A note about upcoming or past golden hour opportunities.'),
});
export type PhotographyAdvisorOutput = z.infer<typeof PhotographyAdvisorOutputSchema>;

export async function getPhotographyAdvice(input: PhotographyAdvisorInput): Promise<PhotographyAdvisorOutput> {
  return photographyAdvisorFlow(input);
}

const photographyAdvisorPrompt = ai.definePrompt({
  name: 'photographyAdvisorPrompt',
  input: {schema: PhotographyAdvisorInputSchema},
  output: {schema: PhotographyAdvisorOutputSchema},
  prompt: `You are a professional landscape photographer. Analyze the current weather and suggest how to capture the best shots.

Weather: {{condition}}
Temp: {{temperature}}°C
Time: {{timeOfDay}}

Suggest the lighting quality, best subjects to shoot, a technical tip, and a note about light timing.`,
});

const photographyAdvisorFlow = ai.defineFlow(
  {
    name: 'photographyAdvisorFlow',
    inputSchema: PhotographyAdvisorInputSchema,
    outputSchema: PhotographyAdvisorOutputSchema,
  },
  async (input) => {
    const {output} = await photographyAdvisorPrompt(input);
    return output!;
  }
);
