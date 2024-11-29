import { icons } from 'lucide-react';

type Amenity = {
  id: string;
  name: string;
  icon: keyof typeof icons;
};

export const amenities: Amenity[] = [
  { id: 'cl1p0h07s0000e1k6v8v5v8f', name: 'Wi-Fi Gratuito', icon: 'Wifi' },
  { id: 'cl1p0h07s0000e1k6v8v5v8g', name: 'Café da Manhã Incluído', icon: 'Coffee' },
  { id: 'cl1p0h07s0000e1k6v8v5v8h', name: 'Ginásio', icon: 'Dumbbell' },
  { id: 'cl1p0h07s0000e1k6v8v5v8i', name: 'Piscina ao Ar Livre', icon: 'Waves' },
  { id: 'cl1p0h07s0000e1k6v8v5v8j', name: 'Spa e Centro de Bem-Estar', icon: 'Leaf' },
  { id: 'cl1p0h07s0000e1k6v8v5v8k', name: 'Restaurante Gourmet', icon: 'ChefHat' },
  { id: 'cl1p0h07s0000e1k6v8v5v8l', name: 'Serviço de Quartos 24 Horas', icon: 'HandPlatter' },
  { id: 'cl1p0h07s0000e1k6v8v5v8m', name: 'Transporte para o Aeroporto', icon: 'Plane' },
  { id: 'cl1p0h07s0000e1k6v8v5v8n', name: 'Estacionamento Gratuito', icon: 'Car' },
  { id: 'cl1p0h07s0000e1k6v8v5v8p', name: 'Serviço de Lavanderia', icon: 'WashingMachine' },
  { id: 'cl1p0h07s0000e1k6v8v5v8q', name: 'Recepção 24 Horas', icon: 'ConciergeBell' },
  { id: 'cl1p0h07s0000e1k6v8v5v8s', name: 'Salão de Eventos', icon: 'PartyPopper' },
  { id: 'cl1p0h07s0000e1k6v8v5v8t', name: 'Pet Friendly', icon: 'PawPrint' },
  { id: 'cl1p0h07s0000e1k6v8v5v8v', name: 'Ar Condicionado', icon: 'AirVent' }
];
