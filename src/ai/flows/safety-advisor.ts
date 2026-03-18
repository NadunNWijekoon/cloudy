
'use server';
/**
 * @fileOverview A Genkit flow for providing safety advice during severe weather events.
 *
 * - getSafetyAdvice - A function that generates safety recommendations.
 * - SafetyAdvisorInput - Input schema for weather alerts.
 * - SafetyAdvisorOutput - Output schema for safety steps.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SafetyAdvisorInputSchema = z.object({
  alertType: z.string().describe('The type of weather alert (e.g., "Heat Advisory", "Flood Watch").'),
  alertDescription: z.string().describe('The full description of the alert from the weather service.'),
  location: z.string().describe('The location affected.'),
});
export type SafetyAdvisorInput = z.infer<typeof SafetyAdvisorInputSchema>;

const SafetyAdvisorOutputSchema = z.object({
  immediateSteps: z.array(z.string()).describe('Critical steps to take right now.'),
  preparationTips: z.array(z.string()).describe('Long-term preparation tips.'),
  emergencyContactsSummary: z.string().describe('General advice on who to contact.'),
});
export type SafetyAdvisorOutput = z.infer<typeof SafetyAdvisorOutputSchema>;

export async function getSafetyAdvice(input: SafetyAdvisorInput): Promise<SafetyAdvisorOutput> {
  return safetyAdvisorFlow(input);
}

const safetyAdvisorPrompt = ai.definePrompt({
  name: 'safetyAdvisorPrompt',
  input: {schema: SafetyAdvisorInputSchema},
  output: {schema: SafetyAdvisorOutputSchema},
  prompt: `You are an Emergency Preparedness Expert. A severe weather alert has been issued for {{{location}}}.

Alert: {{{alertType}}}
Details: {{{alertDescription}}}

Provide clear, actionable safety advice for someone in this location. Break it down into immediate steps and longer-term preparation tips.`,
});

const safetyAdvisorFlow = ai.defineFlow(
  {
    name: 'safetyAdvisorFlow',
    inputSchema: SafetyAdvisorInputSchema,
    outputSchema: SafetyAdvisorOutputSchema,
  },
  async (input) => {
    const {output} = await safetyAdvisorPrompt(input);
    return output!;
  }
);
