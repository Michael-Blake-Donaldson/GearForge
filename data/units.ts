import { Unit } from '@/types/Unit';

export const units: Unit[] = [
  {
    id: 'am-1',
    regionId: 'american',
    title: 'American Powertrain Foundations',
    description: 'Core engine and driveline architecture common to U.S. platforms.',
    order: 1,
    lessonIds: ['am-l1', 'am-l2'],
  },
  {
    id: 'am-2',
    regionId: 'american',
    title: 'American Chassis and Utility Systems',
    description: 'Suspension, brake bias, and utility-focused driveline behavior.',
    order: 2,
    lessonIds: ['am-l3', 'am-l4'],
  },
  {
    id: 'jp-1',
    regionId: 'japanese',
    title: 'Japanese Efficiency Architecture',
    description: 'Engine efficiency and valvetrain control strategies.',
    order: 1,
    lessonIds: ['jp-l1', 'jp-l2'],
  },
  {
    id: 'jp-2',
    regionId: 'japanese',
    title: 'Japanese Drivability Systems',
    description: 'CVT behavior and hybrid integration fundamentals.',
    order: 2,
    lessonIds: ['jp-l3', 'jp-l4'],
  },
  {
    id: 'eu-1',
    regionId: 'european',
    title: 'European Forced Induction and Fueling',
    description: 'Turbocharging and direct injection control mechanics.',
    order: 1,
    lessonIds: ['eu-l1', 'eu-l2'],
  },
  {
    id: 'eu-2',
    regionId: 'european',
    title: 'European Electronic Networks',
    description: 'High-speed networked modules and transmission logic.',
    order: 2,
    lessonIds: ['eu-l3', 'eu-l4'],
  },
];
