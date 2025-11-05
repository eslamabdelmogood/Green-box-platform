import type { Part, Asset } from '@/lib/types';
import type { PersonaType } from '@/context/persona-context';
import { TrendingUp, Ship, Anchor, Warehouse, Plane, Factory, Container, Wrench, Tornado, ShieldAlert } from 'lucide-react';

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

// --- Persona-Specific Data ---

const portData = {
  title: 'Port of Singapore',
  spendTitle: 'Logistics Spend Overview',
  assetStatusTitle: 'Asset Status',
  dashboardStats: [
    { title: 'Container Throughput (TEU)', value: '3.1M', change: '+5.2%', changeType: 'increase', icon: TrendingUp },
    { title: 'Vessel Turnaround Time', value: '19.5h', change: '-3.0%', changeType: 'decrease', icon: Ship },
    { title: 'Berths Occupied', value: '42 / 50', change: '+2', changeType: 'increase', icon: Anchor },
    { title: 'Yard Capacity', value: '85%', change: '+1.5%', changeType: 'increase', icon: Warehouse },
  ],
  machineStatusData: [
    { id: 'asset-01', name: 'Quay Crane 01', location: 'Terminal 1, Berth 3', status: 'Operational', lastService: '2024-05-12' },
    { id: 'asset-02', name: 'RTG Crane 05', location: 'Yard 7', status: 'Operational', lastService: '2024-06-02' },
    { id: 'asset-03', name: 'Straddle Carrier 12', location: 'Terminal 2, Row 4', status: 'Operational', lastService: '2024-05-28' },
    { id: 'asset-04', name: 'Vessel "Oceanic"', location: 'Anchorage B', status: 'Operational', lastService: '2024-06-01' },
    { id: 'asset-05', name: 'Pilot Boat "Vigilant"', location: 'Pilot Pier', status: 'Operational', lastService: '2024-06-20' },
    { id: 'asset-06', name: 'Tugboat "Titan"', location: 'Tug Pen 2', status: 'Operational', lastService: '2024-06-15' },
  ],
  procurementData: [
    { month: "Jan", cost: 145000 }, { month: "Feb", cost: 162000 }, { month: "Mar", cost: 138000 },
    { month: "Apr", cost: 195000 }, { month: "May", cost: 210000 }, { month: "Jun", cost: 180000 },
  ],
};

const airportData = {
  title: 'Changi Airport',
  spendTitle: 'Operational Spend Overview',
  assetStatusTitle: 'Ground Fleet Status',
  dashboardStats: [
    { title: 'Passenger Volume', value: '5.2M', change: '+8.1%', changeType: 'increase', icon: TrendingUp },
    { title: 'Cargo Tonnage', value: '150k', change: '+2.5%', changeType: 'increase', icon: Container },
    { title: 'On-Time Performance', value: '92%', change: '+1.2%', changeType: 'increase', icon: Plane },
    { title: 'Baggage Handling', value: '99.8%', change: '-0.1%', changeType: 'decrease', icon: Wrench },
  ],
  machineStatusData: [
    { id: 'asset-01', name: 'Baggage Cart 112', location: 'T3, Carousel 5', status: 'Operational', lastService: '2024-06-10' },
    { id: 'asset-02', name: 'Catering Truck 45', location: 'Gate A12', status: 'Operational', lastService: '2024-06-18' },
    { id: 'asset-03', name: 'Aircraft Tug 08', location: 'T1, Bay C3', status: 'Operational', lastService: '2024-05-30' },
    { id: 'asset-04', name: 'De-icing Unit 02', location: 'Maintenance Bay', status: 'Operational', lastService: '2024-06-22' },
  ],
  procurementData: [
    { month: "Jan", cost: 95000 }, { month: "Feb", cost: 110000 }, { month: "Mar", cost: 105000 },
    { month: "Apr", cost: 130000 }, { month: "May", cost: 140000 }, { month: "Jun", cost: 125000 },
  ],
};

const disasterData = {
  title: 'Disaster Response Zone',
  spendTitle: 'Relief Spend Overview',
  assetStatusTitle: 'Critical Asset Status',
  dashboardStats: [
    { title: 'Affected Population', value: '1.2M', change: '', changeType: 'increase', icon: TrendingUp },
    { title: 'Resources Deployed', value: '5,000+', change: '', changeType: 'increase', icon: Tornado },
    { title: 'Infrastructure Integrity', value: '45%', change: '', changeType: 'decrease', icon: ShieldAlert },
    { title: 'Comms Network', value: '60% Online', change: '', changeType: 'increase', icon: Wrench },
  ],
  machineStatusData: [
    { id: 'asset-01', name: 'Mobile Comms Tower', location: 'Zone A', status: 'Operational', lastService: '2024-06-10' },
    { id: 'asset-02', name: 'Water Purification Unit', location: 'Shelter B', status: 'Operational', lastService: '2024-06-18' },
    { id: 'asset-03', name: 'Heavy-Duty Generator', location: 'Medical Tent', status: 'Operational', lastService: '2024-05-30' },
  ],
  procurementData: [
    { month: "Jan", cost: 350000 }, { month: "Feb", cost: 410000 }, { month: "Mar", cost: 505000 },
    { month: "Apr", cost: 630000 }, { month: "May", cost: 740000 }, { month: "Jun", cost: 825000 },
  ],
};


export const personaData: Record<PersonaType, Omit<typeof portData, 'machineStatusData' | 'procurementData'> & {machineStatusData: Asset[], procurementData: {month: string, cost: number}[]}> = {
  Port: portData,
  Airport: airportData,
  Disaster: disasterData,
};
