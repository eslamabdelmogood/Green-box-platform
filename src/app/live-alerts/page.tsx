import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/header';
import LiveAlertsDisplay from '@/components/dashboard/live-alerts-display';

export default function LiveAlertsPage() {
  return (
    <MainLayout>
      <Header title="Live Critical Alerts" />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <LiveAlertsDisplay />
      </main>
    </MainLayout>
  );
}
