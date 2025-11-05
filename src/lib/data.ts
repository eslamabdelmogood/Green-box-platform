import type { Part, Asset, GreenBoxNode } from '@/lib/types';
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

export const nodes: GreenBoxNode[] = Array.from({ length: 50 }, (_, i) => ({
    id: `GBN-${String(i + 1).padStart(3, '0')}`,
    location: `Sector ${String.fromCharCode(65 + Math.floor(i / 10))}-${(i % 10) + 1}`,
    status: i < 45 ? 'Active' : 'Inactive',
}));
