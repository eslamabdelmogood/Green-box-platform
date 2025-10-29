import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/header';
import PartList from '@/components/marketplace/part-list';
import { parts } from '@/lib/data';

export default function MarketplacePage() {
  return (
    <MainLayout>
      <Header title="Spares Marketplace" />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <PartList initialParts={parts} />
      </main>
    </MainLayout>
  );
}
