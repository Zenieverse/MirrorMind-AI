import { AestheticMood } from './types';

export const MOODS: { id: AestheticMood; title: string; color: string; image: string; description: string }[] = [
  {
    id: 'Quiet Luxury',
    title: 'Quiet Luxury',
    color: 'from-neutral-900 to-neutral-700',
    description: 'Subtle sophistication and timeless elegance.',
    image: 'https://images.unsplash.com/photo-1539109132314-34a936699561?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'Korean Idol',
    title: 'Korean Idol',
    color: 'from-pink-500 to-rose-400',
    description: 'Radiant glass skin and youthful vibrancy.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'Cyberpunk Night',
    title: 'Cyberpunk Night',
    color: 'from-purple-600 to-indigo-900',
    description: 'Electric neon accents and edgy metallic finishes.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'Old Money',
    title: 'Old Money',
    color: 'from-amber-100 to-amber-200',
    description: 'Heritage styles with a focus on quality and tradition.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'Festival Glow',
    title: 'Festival Glow',
    color: 'from-orange-400 to-yellow-300',
    description: 'Bold glitters and sun-kissed radiance.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'Minimalist Clean Girl',
    title: 'Clean Girl',
    color: 'from-slate-100 to-slate-300',
    description: 'Effortless dewy skin and natural definition.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=400'
  }
];

export const PRODUCTS = [
  {
    id: '1',
    name: 'Hydra-Glow Serum',
    brand: 'MirrorMind Essentials',
    type: 'skincare',
    matchScore: 98,
    description: 'Intense hydration with micro-algae spheres.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    name: 'Velvet Matte Lipstick',
    brand: 'Lux-AI',
    type: 'makeup',
    matchScore: 94,
    description: 'Weightless pigment that adapts to your undertones.',
    image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=200'
  }
];
