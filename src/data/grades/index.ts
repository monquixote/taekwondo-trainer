import { KupGrade } from '../types';
import { kup9 } from './kup9';
import { kup8 } from './kup8';

export const ALL_GRADES: KupGrade[] = [
  kup9,
  kup8
];

export function getGradeById(id: string): KupGrade {
  const found = ALL_GRADES.find(g => g.id === id);
  return found || kup8; // default to 8th Kup
}

export function getDefaultGrade(): KupGrade {
  return kup8; // The user's son's current study focus
}
