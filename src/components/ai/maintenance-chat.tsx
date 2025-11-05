'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { conversationalMaintenanceAdvisor } from '@/ai/flows/conversational-maintenance';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, User, Bot, Wrench, AlertTriangle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const formSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});
type FormValues = z.infer<typeof formSchema>;

type Message = {
  role: 'user' | 'model';
  content: string;
};

type MaintenanceChatProps = {
  initialEquipmentType?: string;
  initialProblemDescription?: string;
};

export default function MaintenanceChat({
  initialEquipmentType = 'Welding Robot B-3',
  initialProblemDescription = 'The robot arm is moving erratically and failing to complete welds accurately.',
}: MaintenanceChatProps) {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const scrollToBottom = () => {
    setTimeout(() => {
      const scrollableViewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollableViewport) {
        scrollableViewport.scrollTop = scrollableViewport.scrollHeight;
      }
    }, 100);
  };

  const handleInitialQuery = () => {
    startTransition(async () => {
      setHasStarted(true);
      setMessages([{ role: 'user', content: `I have a problem with my ${initialEquipmentType}. Here's the issue: ${initialProblemDescription}` }]);
      try {
        const response = await conversationalMaintenanceAdvisor({
          equipmentType: initialEquipmentType,
          problemDescription: initialProblemDescription,
          history: [],
        });
        setMessages((prev) => [...prev, { role: 'model', content: response }]);
        scrollToBottom();
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to get initial advice. Please try again.',
          variant: 'destructive',
        });
        setHasStarted(false); // Allow retry
      }
    });
  };

  useEffect(() => {
    if (initialProblemDescription && !hasStarted) {
      handleInitialQuery();
    }
  }, [initialProblemDescription, hasStarted]);

  const onSubmit = (values: FormValues) => {
    if (!hasStarted) { // This handles the case where the page is loaded without initial params
      handleInitialQuery();
      return;
    }

    const userMessage: Message = { role: 'user', content: values.message };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();
    scrollToBottom();

    startTransition(async () => {
      try {
        const response = await conversationalMaintenanceAdvisor({
          equipmentType: initialEquipmentType,
          problemDescription: initialProblemDescription,
          history: [...messages, userMessage],
        });
        setMessages((prev) => [...prev, { role: 'model', content: response }]);
        scrollToBottom();
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to get a response. Please try again.',
          variant: 'destructive',
        });
        setMessages(messages => messages.slice(0, -1)); // Remove the user message on failure
      }
    });
  };
  
  const extractPartName = (text: string): string | null => {
    const partKeywords = ['part required:', 'required part:', 'you will need a', 'replace the'];
    const lowerText = text.toLowerCase();
    
    for (const keyword of partKeywords) {
      const index = lowerText.indexOf(keyword);
      if (index !== -1) {
        let potentialPart = text.substring(index + keyword.length).trim();
        // Clean up the extracted string
        potentialPart = potentialPart.split(/[\n.,]/)[0].trim();
        // Remove leading/trailing quotes
        potentialPart = potentialPart.replace(/^['"]|['"]$/g, '');
        // A simple heuristic to avoid overly long strings
        if (potentialPart.length > 0 && potentialPart.length < 50) {
          return potentialPart;
        }
      }
    }
    return null;
  };


  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          Maintenance Advisor Chat
        </CardTitle>
        <CardDescription>
          Your AI assistant for diagnosing and solving equipment problems.
        </CardDescription>
      </CardHeader>
      <CardContent ref={scrollAreaRef} className="flex-1 flex flex-col gap-4">
        <ScrollArea className="flex-1 pr-4 -mr-4">
          <div className="space-y-6">
            {!hasStarted && (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <Bot className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Welcome to the Maintenance Advisor</h3>
                <p className="text-muted-foreground">
                  {initialProblemDescription 
                    ? 'Click "Start Analysis" to begin diagnosing the issue.'
                    : 'Describe an equipment problem to get started.'
                  }
                </p>
                {initialProblemDescription && (
                    <Card className="mt-4 text-left w-full max-w-md">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                Initial Problem
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm"><strong>Equipment:</strong> {initialEquipmentType}</p>
                            <p className="text-sm text-muted-foreground">{initialProblemDescription}</p>
                        </CardContent>
                    </Card>
                )}
              </div>
            )}
            {messages.map((message, index) => {
                const partName = message.role === 'model' ? extractPartName(message.content) : null;
                return (
                  <div
                    key={index}
                    className={cn(
                      'flex items-start gap-3',
                      message.role === 'user' && 'justify-end'
                    )}
                  >
                    {message.role === 'model' && (
                      <Avatar className="w-8 h-8 border-2 border-primary">
                        <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-md rounded-lg p-3 text-sm',
                        message.role === 'model'
                          ? 'bg-muted'
                          : 'bg-primary text-primary-foreground'
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {partName && (
                        <div className="mt-3 pt-3 border-t border-primary/20">
                          <Button asChild variant="outline" size="sm" className="bg-background">
                            <Link href={`/suppliers/${encodeURIComponent(partName)}`}>
                              <Wrench className="mr-2 h-4 w-4" />
                              Find Suppliers for {partName}
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                )
            })}
             {isPending && messages.length > 0 && (
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8 border-2 border-primary">
                  <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="mt-auto pt-4 border-t">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder={!hasStarted ? 'Click "Start Analysis" or type here...' : "Ask a follow-up question..."}
                        {...field}
                        disabled={isPending || (!hasStarted && !initialProblemDescription)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : !hasStarted && initialProblemDescription ? (
                  'Start Analysis'
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
