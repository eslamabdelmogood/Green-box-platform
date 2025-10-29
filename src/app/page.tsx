'use client';

import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/header';
import StatsCard from '@/components/dashboard/stats-card';
import { usePersona } from '@/context/persona-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProcurementChart from '@/components/dashboard/procurement-chart';
import MachineStatusTable from '@/components/dashboard/machine-status-table';

export default function DashboardPage() {
  const { persona } = usePersona();
  const { title, dashboardStats, machineStatusData, procurementData, spendTitle, assetStatusTitle } = persona;
  
  return (
    <MainLayout>
      <Header title={title} />
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>{spendTitle}</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ProcurementChart data={procurementData} />
            </CardContent>
          </Card>
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <CardTitle>{assetStatusTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <MachineStatusTable data={machineStatusData} />
            </CardContent>
          </Card>
        </div>
      </main>
    </MainLayout>
  );
}
