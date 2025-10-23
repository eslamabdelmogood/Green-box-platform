import type { LucideIcon } from "lucide-react";

export type Part = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageId: string;
};

export type MachineStatus = "Operational" | "Warning" | "Failure";

export type Machine = {
  id: string;
  name: string;
  location: string;
  status: MachineStatus;
  uptime: string;
};

export type DashboardStat = {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: LucideIcon;
};
