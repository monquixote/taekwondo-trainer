import type { KupGrade } from '../types.ts';
import { kup9 } from './kup9.ts';
import { kup8 } from './kup8.ts';
import { kup7 } from './kup7.ts';
import { kup6 } from './kup6.ts';
import { kup5 } from './kup5.ts';
import { kup4 } from './kup4.ts';
import { kup3 } from './kup3.ts';
import { kup2 } from './kup2.ts';

export { kup9, kup8, kup7, kup6, kup5, kup4, kup3, kup2 };

export const ALL_GRADES: KupGrade[] = [
  kup9,
  kup8,
  kup7,
  kup6,
  kup5,
  kup4,
  kup3,
  kup2
];

export function getGradeById(id: string): KupGrade {
  const found = ALL_GRADES.find(g => g.id === id);
  return found || kup7; // default to 7th Kup
}

export function getDefaultGrade(): KupGrade {
  return kup7; // Default starting point (7th Kup)
}
