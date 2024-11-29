import { icons } from 'lucide-react';

type Amenity = {
  id: string;
  icon: keyof typeof icons;
};

export const amenities: Amenity[] = [
  { id: 'cl1p0h07s0000e1k6v8v5v8f', icon: 'Wifi' },
  { id: 'cl1p0h07s0000e1k6v8v5v8g', icon: 'Coffee' },
  { id: 'cl1p0h07s0000e1k6v8v5v8h', icon: 'Dumbbell' },
  { id: 'cl1p0h07s0000e1k6v8v5v8i', icon: 'Waves' },
  { id: 'cl1p0h07s0000e1k6v8v5v8j', icon: 'Leaf' },
  { id: 'cl1p0h07s0000e1k6v8v5v8k', icon: 'ChefHat' },
  { id: 'cl1p0h07s0000e1k6v8v5v8l', icon: 'HandPlatter' },
  { id: 'cl1p0h07s0000e1k6v8v5v8m', icon: 'Plane' },
  { id: 'cl1p0h07s0000e1k6v8v5v8n', icon: 'Car' },
  { id: 'cl1p0h07s0000e1k6v8v5v8p', icon: 'WashingMachine' },
  { id: 'cl1p0h07s0000e1k6v8v5v8q', icon: 'ConciergeBell' },
  { id: 'cl1p0h07s0000e1k6v8v5v8s', icon: 'PartyPopper' },
  { id: 'cl1p0h07s0000e1k6v8v5v8t', icon: 'PawPrint' },
  { id: 'cl1p0h07s0000e1k6v8v5v8v', icon: 'AirVent' }
];
