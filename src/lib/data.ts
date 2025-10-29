import type { Part, Asset, DashboardStat } from '@/lib/types';
import { TrendingUp, TrendingDown, Ship, Anchor, Warehouse } from 'lucide-react';

export const parts: Part[] = [
  { id: 'part-001', name: 'Gantry Crane Motor', description: 'High-torque motor for quay cranes.', price: 15000.0, stock: 12, imageId: 'part-001' },
  { id: 'part-002', name: 'Spreader Cable Reel', description: 'Heavy-duty cable reel for container spreaders.', price: 3500.5, stock: 30, imageId: 'part-002' },
  { id: 'part-003', name: 'Mooring Line', description: '100m ultra-high-molecular-weight polyethylene rope.', price: 2200.0, stock: 50, imageId: 'part-003' },
  { id: 'part-004', name: 'RTG Tire Set', description: 'Complete tire set for rubber-tired gantry cranes.', price: 25000.0, stock: 8, imageId: 'part-004' },
  { id: 'part-005', name: 'Vessel Fuel Filter', description: 'Marine-grade fuel filter for container ships.', price: 450.0, stock: 250, imageId: 'part-005' },
  { id: 'part-006', name: 'Navigation Sensor', description: 'GPS and AIS combination sensor unit.', price: 2800.0, stock: 40, imageId: 'part-006' },
  { id: 'part-007', name: 'Reefer Container Unit', description: 'Refrigeration unit for 40ft containers.', price: 7500.0, stock: 22, imageId: 'part-007' },
  { id: 'part-008', name: 'Docking Fender', description: 'Laminated rubber fender for ship docking.', price: 1800.0, stock: 100, imageId: 'part-008' },
];

export const machineStatusData: Asset[] = [
    { id: 'asset-01', name: 'Quay Crane 01', location: 'Terminal 1, Berth 3', status: 'Operational', lastService: '2024-05-12' },
    { id: 'asset-02', name: 'Vessel "Oceanic"', location: 'Anchorage B', status: 'Maintenance Due', lastService: '2024-03-01' },
    { id: 'asset-03', name: 'RTG Crane 05', location: 'Yard 7', status: 'Operational', lastService: '2024-06-02' },
    { id: 'asset-04', name: 'Pilot Boat "Vigilant"', location: 'Pilot Pier', status: 'Offline', lastService: '2024-05-20' },
    { id: 'asset-05', name: 'Straddle Carrier 12', location: 'Terminal 2, Row 4', status: 'Operational', lastService: '2024-05-28' },
    { id: 'asset-06', name: 'Tugboat "Titan"', location: 'Tug Pen 2', status: 'Maintenance Due', lastService: '2024-04-15' },
];

export const dashboardStats: DashboardStat[] = [
  {
    title: 'Container Throughput (TEU)',
    value: '3.1M',
    change: '+5.2%',
    changeType: 'increase',
    icon: TrendingUp,
  },
  {
    title: 'Vessel Turnaround Time',
    value: '19.5h',
    change: '-3.0%',
    changeType: 'decrease',
    icon: Ship,
  },
  {
    title: 'Berths Occupied',
    value: '42 / 50',
    change: '+2',
    changeType: 'increase',
    icon: Anchor,
  },
  {
    title: 'Yard Capacity',
    value: '85%',
    change: '+1.5%',
    changeType: 'increase',
    icon: Warehouse,
  },
];

export const procurementData = [
  { month: "Jan", cost: 145000 },
  { month: "Feb", cost: 162000 },
  { month: "Mar", cost: 138000 },
  { month: "Apr", cost: 195000 },
  { month: "May", cost: 210000 },
  { month: "Jun", cost: 180000 },
];
