import type { LucideIcon } from "lucide-react";
import type { personaData } from './data';

export type Part = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageId: string;
};

export type AssetStatus = "Operational" | "Maintenance Due" | "Offline";

export type Asset = {
  id: string;
  name: string;
  location: string;
  status: AssetStatus;
  lastService: string;
};

export type DashboardStat = {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: LucideIcon;
};

export type PersonaData = (typeof personaData)['Port'];
