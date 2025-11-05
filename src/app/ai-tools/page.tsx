'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/header';
import MaintenanceChat from '@/components/ai/maintenance-chat';

function AIToolsContent() {
  const searchParams = useSearchParams();
  const equipmentType = searchParams.get('equipmentType') || '';
  const problemDescription = searchParams.get('problemDescription') || '';

  return (
    <MainLayout>
      <Header title="Intelligent Tools" />
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <MaintenanceChat
          initialEquipmentType={equipmentType}
          initialProblemDescription={problemDescription}
        />
      </main>
    </MainLayout>
  );
}

export default function AIToolsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AIToolsContent />
    </Suspense>
  );
}
