import type { Machine, MachineStatus } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type MachineStatusTableProps = {
  data: Machine[];
};

const statusColors: Record<MachineStatus, string> = {
  Operational: 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30',
  Warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30',
  Failure: 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 animate-pulse',
};

export default function MachineStatusTable({ data }: MachineStatusTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Machine</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Uptime</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((machine) => (
          <TableRow key={machine.id}>
            <TableCell>
              <div className="font-medium">{machine.name}</div>
              <div className="text-sm text-muted-foreground">{machine.location}</div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={cn('font-normal', statusColors[machine.status])}>
                {machine.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{machine.uptime}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
