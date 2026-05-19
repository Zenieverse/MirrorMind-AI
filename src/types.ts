export type AestheticMood = 
  | 'Quiet Luxury'
  | 'Korean Idol'
  | 'Corporate Elite'
  | 'Festival Glow'
  | 'Minimalist Clean Girl'
  | 'Cyberpunk Night'
  | 'Old Money'
  | 'Vacation Glow';

export interface SkinAnalysis {
  age: number;
  scores: {
    spots: number;
    wrinkles: number;
    texture: number;
    dark_circles: number;
    redness: number;
    oiliness: number;
    moisture: number;
  };
  overall_score: number;
}

export interface Recommendation {
  id: string;
  name: string;
  brand: string;
  type: 'skincare' | 'makeup' | 'fashion';
  image: string;
  matchScore: number;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  skinType?: string;
  selectedMood?: AestheticMood;
  savedLooks: string[];
}
