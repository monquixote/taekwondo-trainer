import { KupGrade } from '../types';
import { kup9 } from './kup9';
import { kup8 } from './kup8';
import { kup7 } from './kup7';

export { kup9, kup8, kup7 };

export const ALL_GRADES: KupGrade[] = [
  kup9,
  kup8,
  kup7
];

export function getGradeById(id: string): KupGrade {
  const found = ALL_GRADES.find(g => g.id === id);
  return found || kup7; // default to 7th Kup
}

export function getDefaultGrade(): KupGrade {
  return kup7; // Default starting point (7th Kup)
}
