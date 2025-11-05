'use client';

import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { maintenanceAdvisor, type MaintenanceAdvisorOutput } from '@/ai/flows/maintenance-advisor';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Stethoscope, Loader2, ListChecks, Wrench, CheckCircle, Truck } from 'lucide-react';

const formSchema = z.object({
  equipmentType: z.string().min(1, 'Equipment type is required.'),
  problemDescription: z.string().min(1, 'Problem description is required.'),
});

type FormValues = z.infer<typeof formSchema>;

type MaintenanceAdvisorFormProps = {
  initialEquipmentType?: string;
  initialProblemDescription?: string;
};

export default function MaintenanceAdvisorForm({ initialEquipmentType = '', initialProblemDescription = '' }: MaintenanceAdvisorFormProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<MaintenanceAdvisorOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      equipmentType: initialEquipmentType || 'Welding Robot B-3',
      problemDescription: initialProblemDescription || 'The robot arm is moving erratically and failing to complete welds accurately. Making a clicking sound on the main joint.',
    },
  });

  useEffect(() => {
    if (initialEquipmentType) {
      form.setValue('equipmentType', initialEquipmentType);
    }
    if (initialProblemDescription) {
      form.setValue('problemDescription', initialProblemDescription);
    }
  }, [initialEquipmentType, initialProblemDescription, form]);


  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      setResult(null);
      try {
        const advisorResult = await maintenanceAdvisor(values);
        setResult(advisorResult);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to get maintenance advice. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Advisor</CardTitle>
          <CardDescription>
            Describe an equipment problem to get a full diagnosis, suggested solutions, and required part identification.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="equipmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., CNC Milling Machine" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="problemDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem Description</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="Describe the symptoms, error codes, and recent events..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Stethoscope className="mr-2 h-4 w-4" />
                )}
                Analyze Problem
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Maintenance Advice</CardTitle>
          <CardDescription>Expert analysis, solutions, and part identification.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-2 h-[410px] flex items-center justify-center">
            {isPending && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
            {!isPending && !result && <p className="text-muted-foreground">Results will appear here.</p>}
            {result && (
                <div className="w-full space-y-4 animate-in fade-in-50">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Stethoscope className="h-4 w-4 text-accent" />
                            <span>Diagnosis</span>
                        </div>
                        <p className="text-lg font-semibold">{result.diagnosis}</p>
                    </div>
                     <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <ListChecks className="h-4 w-4 text-accent" />
                            <span>Suggested Solutions</span>
                        </div>
                        <ul className="space-y-2 pl-5">
                            {result.suggestedSolutions.map((solution, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                                    <span>{solution}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {result.requiredPart && (
                      <div className="space-y-2">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Wrench className="h-4 w-4 text-accent" />
                              <span>Required Part</span>
                          </div>
                          <div className='flex items-center justify-between'>
                            <p className="text-lg font-semibold">{result.requiredPart}</p>
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/ai-tools?tab=recommender&partName=${encodeURIComponent(result.requiredPart)}`}>
                                <Truck className="mr-2 h-4 w-4" />
                                Find Supplier
                              </Link>
                            </Button>
                          </div>
                      </div>
                    )}
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
