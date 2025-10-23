import type { Part, Machine, DashboardStat } from '@/lib/types';
import { TrendingUp, TrendingDown, Wrench, Zap, Factory } from 'lucide-react';

export const parts: Part[] = [
  { id: 'part-001', name: 'Industrial Gear', description: 'High-torque steel gear for heavy machinery.', price: 250.0, stock: 150, imageId: 'part-001' },
  { id: 'part-002', name: 'Hydraulic Pump', description: '24V DC hydraulic pump with pressure regulator.', price: 1200.5, stock: 45, imageId: 'part-002' },
  { id: 'part-003', name: 'Conveyor Belt', description: '10-meter reinforced rubber conveyor belt.', price: 450.75, stock: 80, imageId: 'part-003' },
  { id: 'part-004', name: 'Servo Motor', description: 'Precision servo motor for robotic arms.', price: 850.0, stock: 60, imageId: 'part-004' },
  { id: 'part-005', name: 'Ball Bearing', description: 'Set of 10 high-speed sealed ball bearings.', price: 75.2, stock: 500, imageId: 'part-005' },
  { id: 'part-006', name: 'Pressure Sensor', description: '0-100 PSI industrial pressure sensor.', price: 120.0, stock: 200, imageId: 'part-006' },
  { id: 'part-007', name: 'PLC Unit', description: 'Programmable Logic Controller, 16 inputs/outputs.', price: 1500.0, stock: 30, imageId: 'part-007' },
  { id: 'part-008', name: 'Robotic Arm Gripper', description: 'Pneumatic gripper attachment for robotic arms.', price: 650.0, stock: 75, imageId: 'part-008' },
];

export const machineStatusData: Machine[] = [
    { id: 'mach-01', name: 'CNC Mill A-1', location: 'Factory 1', status: 'Operational', uptime: '99.8%' },
    { id: 'mach-02', name: 'Welding Robot B-3', location: 'Factory 1', status: 'Warning', uptime: '92.1%' },
    { id: 'mach-03', name: 'Stamping Press C-5', location: 'Factory 2', status: 'Operational', uptime: '99.5%' },
    { id: 'mach-04', name: 'Packaging Line D-2', location: 'Factory 2', status: 'Failure', uptime: '78.3%' },
    { id: 'mach-05', name: 'Assembly Bot E-7', location: 'Factory 1', status: 'Operational', uptime: '98.9%' },
    { id: 'mach-06', name: 'Painting Booth F-1', location: 'Factory 3', status: 'Warning', uptime: '94.2%' },
];

export const dashboardStats: DashboardStat[] = [
  {
    title: 'Downtime Reduction',
    value: '18.2%',
    change: '+3.5%',
    changeType: 'increase',
    icon: TrendingUp,
  },
  {
    title: 'Energy Savings',
    value: '2,350 kWh',
    change: '+1.8%',
    changeType: 'increase',
    icon: Zap,
  },
  {
    title: 'Parts Procured',
    value: '1,234',
    change: '-2.1%',
    changeType: 'decrease',
    icon: Wrench,
  },
  {
    title: 'Connected Factories',
    value: '3 / 5',
    change: '+1',
    changeType: 'increase',
    icon: Factory,
  },
];

export const procurementData = [
  { month: "Jan", cost: 4250 },
  { month: "Feb", cost: 3800 },
  { month: "Mar", cost: 5100 },
  { month: "Apr", cost: 2900 },
  { month: "May", cost: 4600 },
  { month: "Jun", cost: 3200 },
];
