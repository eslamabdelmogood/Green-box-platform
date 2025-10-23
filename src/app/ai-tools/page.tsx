'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SupplierRecommenderForm from '@/components/ai/supplier-recommender-form';
import MaintenanceAdvisorForm from '@/components/ai/maintenance-advisor-form';

function AIToolsContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'advisor';
  const partName = searchParams.get('partName') || '';

  return (
    <MainLayout>
      <Header title="Intelligent Tools" />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <Tabs defaultValue={tab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="advisor">Maintenance Advisor</TabsTrigger>
            <TabsTrigger value="recommender">Supplier Recommender</TabsTrigger>
          </TabsList>
          <TabsContent value="advisor" className="space-y-4">
            <MaintenanceAdvisorForm />
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
