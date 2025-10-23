'use server';

/**
 * @fileOverview An AI agent that diagnoses equipment problems, suggests solutions, and identifies required parts.
 *
 * - maintenanceAdvisor - A function that handles the full maintenance advisory process.
 * - MaintenanceAdvisorInput - The input type for the maintenanceAdvisor function.
 * - MaintenanceAdvisorOutput - The return type for the maintenanceAdvisor function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MaintenanceAdvisorInputSchema = z.object({
  equipmentType: z.string().describe('The type of equipment experiencing the problem.'),
  problemDescription: z.string().describe('A detailed description of the problem, including symptoms, error codes, and recent events.'),
});
export type MaintenanceAdvisorInput = z.infer<typeof MaintenanceAdvisorInputSchema>;

const MaintenanceAdvisorOutputSchema = z.object({
  diagnosis: z.string().describe('A concise diagnosis of the most likely problem.'),
  suggestedSolutions: z.array(z.string()).describe('A list of actionable steps or solutions to resolve the issue.'),
  requiredPart: z.string().optional().describe('The identified spare part needed to address the failure. Can be null if no specific part is required.'),
});
export type MaintenanceAdvisorOutput = z.infer<typeof MaintenanceAdvisorOutputSchema>;

export async function maintenanceAdvisor(input: MaintenanceAdvisorInput): Promise<MaintenanceAdvisorOutput> {
  return maintenanceAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'maintenanceAdvisorPrompt',
  input: { schema: MaintenanceAdvisorInputSchema },
  output: { schema: MaintenanceAdvisorOutputSchema },
  prompt: `You are an expert industrial maintenance technician. Your task is to analyze an equipment problem, provide a diagnosis, suggest solutions, and identify any required spare parts.

If a specific spare part is identifiable from the description, specify it. If not, the 'requiredPart' field can be omitted.

Equipment Type: {{{equipmentType}}}
Problem Description: {{{problemDescription}}}
`,
});

const maintenanceAdvisorFlow = ai.defineFlow(
  {
    name: 'maintenanceAdvisorFlow',
    inputSchema: MaintenanceAdvisorInputSchema,
    outputSchema: MaintenanceAdvisorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
