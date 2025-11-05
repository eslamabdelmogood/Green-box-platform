import Link from 'next/link';
import type { DashboardStat } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function StatsCard({ title, value, change, changeType, icon: Icon, href }: DashboardStat) {
  const isIncrease = changeType === 'increase';
  
  const cardContent = (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={cn(
            'text-xs text-muted-foreground',
            isIncrease ? 'text-green-500' : 'text-red-500'
          )}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="transition-all hover:scale-[1.02]">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
