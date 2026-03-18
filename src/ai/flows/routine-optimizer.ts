'use server';
/**
 * @fileOverview A Genkit flow for optimizing daily outdoor routines.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RoutineOptimizerInputSchema = z.object({
  hourlyForecast: z.array(z.object({
    time: z.string(),
    temp: z.number(),
    condition: z.string(),
    rainProb: z.number(),
  })),
});
export type RoutineOptimizerInput = z.infer<typeof RoutineOptimizerInputSchema>;

const RoutineOptimizerOutputSchema = z.object({
  recommendations: z.array(z.object({
    activity: z.string(),
    bestTime: z.string(),
    reason: z.string(),
  })),
});
export type RoutineOptimizerOutput = z.infer<typeof RoutineOptimizerOutputSchema>;

export async function getRoutineOptimization(input: RoutineOptimizerInput): Promise<RoutineOptimizerOutput> {
  return routineOptimizerFlow(input);
}

const routineOptimizerPrompt = ai.definePrompt({
  name: 'routineOptimizerPrompt',
  input: {schema: RoutineOptimizerInputSchema},
  output: {schema: RoutineOptimizerOutputSchema},
  prompt: `Based on the following hourly forecast, suggest the best times for: 
1. A morning run or walk
2. Walking the dog
3. Outdoor coffee or lunch

Hourly Data:
{{#each hourlyForecast}}
- {{time}}: {{temp}}°C, {{condition}}, {{rainProb}}% rain
{{/each}}

Provide specific times and brief reasons based on temperature and rain probability.`,
});

const routineOptimizerFlow = ai.defineFlow(
  {
    name: 'routineOptimizerFlow',
    inputSchema: RoutineOptimizerInputSchema,
    outputSchema: RoutineOptimizerOutputSchema,
  },
  async (input) => {
    const {output} = await routineOptimizerPrompt(input);
    return output!;
  }
);
