'use server';

/**
 * @fileOverview An AI agent that recommends the most efficient supplier and delivery route for a required part.
 *
 * - recommendEfficientSupplier - A function that handles the supplier recommendation process.
 * - RecommendEfficientSupplierInput - The input type for the recommendEfficientSupplier function.
 * - RecommendEfficientSupplierOutput - The return type for the recommendEfficientSupplier function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendEfficientSupplierInputSchema = z.object({
  partName: z.string().describe('The name of the required part.'),
  quantity: z.number().describe('The quantity of the part needed.'),
  deliveryLocation: z.string().describe('The delivery location for the part.'),
});
export type RecommendEfficientSupplierInput = z.infer<typeof RecommendEfficientSupplierInputSchema>;

const RecommendEfficientSupplierOutputSchema = z.object({
  supplierName: z.string().describe('The name of the recommended supplier.'),
  deliveryRoute: z.string().describe('The recommended delivery route.'),
  estimatedCost: z.number().describe('The estimated cost of the part and delivery.'),
  availability: z.string().describe('The availability of the part at the supplier.'),
});
export type RecommendEfficientSupplierOutput = z.infer<typeof RecommendEfficientSupplierOutputSchema>;

export async function recommendEfficientSupplier(
  input: RecommendEfficientSupplierInput
): Promise<RecommendEfficientSupplierOutput> {
  return recommendEfficientSupplierFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendEfficientSupplierPrompt',
  input: {schema: RecommendEfficientSupplierInputSchema},
  output: {schema: RecommendEfficientSupplierOutputSchema},
  prompt: `You are an expert in industrial logistics and supply chain management. Based on the part needed, its quantity, and the delivery location, you will recommend the most efficient supplier and delivery route. You will also estimate the cost and confirm availability.

Part Name: {{{partName}}}
Quantity: {{{quantity}}}
Delivery Location: {{{deliveryLocation}}}

Consider factors such as supplier location, part availability, delivery time, and cost.

Output in JSON format.
`,
});

const recommendEfficientSupplierFlow = ai.defineFlow(
  {
    name: 'recommendEfficientSupplierFlow',
    inputSchema: RecommendEfficientSupplierInputSchema,
    outputSchema: RecommendEfficientSupplierOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
