export type QuestionCategory = 
  | 'body_part' 
  | 'stance' 
  | 'technique' 
  | 'kick' 
  | 'block' 
  | 'strike' 
  | 'thrust'
  | 'pattern' 
  | 'belt' 
  | 'theory';

export interface TermItem {
  id: string;
  category: QuestionCategory;
  english: string;
  korean: string;
  pronunciation?: string;
  notes?: string;
  options?: string[]; // Optional pre-defined distractors or auto-generated
}

export interface TheoryQuestion {
  id: string;
  prompt: string;
  correctAnswer: string;
  distractors: string[];
  explanation?: string;
}

export interface KupGrade {
  id: string;
  gradeNumber: number; // e.g. 8 for 8th Kup
  title: string;       // "8th Kup - Yellow Belt (Green Stripe Syllabus)"
  beltColor: string;   // e.g. "#ffe600"
  stripeColor?: string; // e.g. "#00a859"
  pattern: {
    name: string;
    movements: number;
    meaning: string;
  };
  beltMeaning: string;
  terms: TermItem[];
  theory: TheoryQuestion[];
}

export interface PlayerStats {
  score: number;
  currentStreak: number;
  bestStreak: number;
  health: number;
  maxHealth: number;
  totalEnemiesDefeated: number;
  termAccuracy: Record<string, { correct: number; incorrect: number; history?: boolean[] }>;
}
