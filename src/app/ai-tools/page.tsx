'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PredictivePartForm from '@/components/ai/predictive-part-form';
import SupplierRecommenderForm from '@/components/ai/supplier-recommender-form';

function AIToolsContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'prediction';
  const partName = searchParams.get('partName') || '';

  return (
    <MainLayout>
      <Header title="Intelligent Tools" />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <Tabs defaultValue={tab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="prediction">Predictive Maintenance</TabsTrigger>
            <TabsTrigger value="recommender">Supplier Recommender</TabsTrigger>
          </TabsList>
          <TabsContent value="prediction" className="space-y-4">
            <PredictivePartForm />
          </TabsContent>
          <TabsContent value="recommender" className="space-y-4">
            <SupplierRecommenderForm initialPartName={partName} />
          </TabsContent>
        </Tabs>
      </main>
    </MainLayout>
  );
}

export default function AIToolsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AIToolsContent />
        </Suspense>
    )
}
