
import Link from 'next/link';
import type { Machine } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Wrench, ListChecks, CheckCircle, Truck, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type MaintenanceSuggestionCardProps = {
  machine: Machine;
};

// Hardcoded suggestion for the failing machine
const suggestion = {
  diagnosis: 'Inconsistent sealing temperature causing package rejection.',
  suggestedSolutions: [
    'Inspect heater element for wear and damage.',
    'Replace the primary heater element.',
    'Recalibrate sealing temperature and pressure settings.',
  ],
  requiredPart: 'Heater Element XJ-5',
};

export default function MaintenanceSuggestionCard({ machine }: MaintenanceSuggestionCardProps) {
  const partInMarketplace = { name: 'Heater Element XJ-5' }; // Mock, assume we can find it
  return (
    <Card className="border-destructive/50 bg-destructive/5 animate-in fade-in-50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-6 w-6" />
              Maintenance Alert: {machine.name}
            </CardTitle>
            <CardDescription className="text-destructive/80">
              A critical failure has been detected. Immediate action is recommended.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Wrench className="h-4 w-4 text-accent" />
                <span>Required Part & Diagnosis</span>
            </div>
            <p className="text-lg font-semibold">{suggestion.requiredPart}</p>
            <p className="text-sm">{suggestion.diagnosis}</p>
        </div>
        <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <ListChecks className="h-4 w-4 text-accent" />
                <span>Suggested Solutions</span>
            </div>
            <ul className="space-y-2">
                {suggestion.suggestedSolutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>{solution}</span>
                    </li>
                ))}
            </ul>
        </div>
        </CardContent>
        <div className="flex justify-end gap-2 px-6 pb-6">
            {partInMarketplace && (
                <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buy Now
                </Button>
            )}
            {suggestion.requiredPart && (
            <Button asChild variant="outline">
              <Link href={`/ai-tools?tab=recommender&partName=${encodeURIComponent(suggestion.requiredPart)}`}>
                <Truck className="mr-2 h-4 w-4" />
                Find Supplier
              </Link>
            </Button>
          )}
        </div>
    </Card>
  );
}
