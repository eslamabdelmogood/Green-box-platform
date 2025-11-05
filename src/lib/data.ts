import type { Part, Asset, GreenBoxNode, Supplier, PartSupplier } from '@/lib/types';
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

export const suppliers: Supplier[] = [
    { id: 'sup-01', name: 'Global Heavy Industries', country: 'Germany' },
    { id: 'sup-02', name: 'Nippon Steel Engineering', country: 'Japan' },
    { id: 'sup-03', name: 'American Crane & Equipment', country: 'USA' },
    { id: 'sup-04', name: 'Maritime Advanced Systems', country: 'Netherlands' },
];

export const partSuppliers: PartSupplier[] = [
    { partId: 'part-001', supplierId: 'sup-01', price: 14800, leadTime: 10, spec: '500kW, 750 RPM, IP67' },
    { partId: 'part-001', supplierId: 'sup-02', price: 15200, leadTime: 12, spec: '510kW, 750 RPM, IP68' },
    { partId: 'part-001', supplierId: 'sup-03', price: 15500, leadTime: 7, spec: '490kW, 740 RPM, IP67' },
    { partId: 'part-002', supplierId: 'sup-01', price: 3400, leadTime: 15, spec: '300m capacity, 12-core fiber' },
    { partId: 'part-002', supplierId: 'sup-04', price: 3600, leadTime: 10, spec: '350m capacity, 12-core armored' },
    { partId: 'part-003', supplierId: 'sup-04', price: 2100, leadTime: 5, spec: '12-strand, 80mm diameter' },
    { partId: 'part-004', supplierId: 'sup-03', price: 24500, leadTime: 20, spec: '24.00R35, E-4 rock lug' },
    { partId: 'part-005', supplierId: 'sup-01', price: 450, leadTime: 3, spec: '10 micron, high-flow' },
    { partId: 'part-005', supplierId: 'sup-03', price: 475, leadTime: 2, spec: '10 micron, spin-on' },
    { partId: 'part-006', supplierId: 'sup-02', price: 2750, leadTime: 18, spec: 'IMO Certified, NMEA 2000' },
    { partId