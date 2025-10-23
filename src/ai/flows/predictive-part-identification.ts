'use server';

/**
 * @fileOverview Predicts equipment failures and identifies necessary spare parts.
 *
 * - predictPart - Predicts equipment failures and identifies necessary spare parts.
 * - PredictPartInput - The input type for the predictPart function.
 * - PredictPartOutput - The return type for the predictPart function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictPartInputSchema = z.object({
  equipmentType: z.string().describe('The type of equipment being monitored.'),
  operationalData: z.string().describe('Operational data from the equipment, including sensor readings, performance metrics, and maintenance history.'),
  failureHistory: z.string().describe('Historical data on equipment failures, including failure types, frequency, and repair logs.'),
});
export type PredictPartInput = z.infer<typeof PredictPartInputSchema>;

const PredictPartOutputSchema = z.object({
  predictedFailure: z.string().describe('The predicted type of equipment failure.'),
  requiredPart: z.string().describe('The identified spare part needed to address the predicted failure.'),
  confidenceLevel: z.number().describe('A numerical value (0-1) indicating the confidence level of the prediction.'),
});
export type PredictPartOutput = z.infer<typeof PredictPartOutputSchema>;

export async function predictPart(input: PredictPartInput): Promise<PredictPartOutput> {
  return predictPartFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictPartPrompt',
  input: {schema: PredictPartInputSchema},
  output: {schema: PredictPartOutputSchema},
  prompt: `You are an expert maintenance manager, skilled at predictively identifying equipment failures and required spare parts.

  Analyze the provided equipment data to predict potential failures and identify the necessary replacement parts. Provide a confidence level (0-1) for your prediction.

  Equipment Type: {{{equipmentType}}}
  Operational Data: {{{operationalData}}}
  Failure History: {{{failureHistory}}}`,
});

const predictPartFlow = ai.defineFlow(
  {
    name: 'predictPartFlow',
    inputSchema: PredictPartInputSchema,
    outputSchema: PredictPartOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
