export interface DailyEntry {
  id: string;
  date: string;
  mood: number;
  energy: number;
  sleep: number;
  stress: number;
  exercise: boolean;
  notes: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'meditation' | 'exercise' | 'sleep' | 'stress' | 'emergency';
  link: string;
}
