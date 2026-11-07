import { KupGrade, TermItem, TheoryQuestion, PlayerStats } from '../data/types';
import { ALL_GRADES } from '../data/grades';

export interface EncounterCard {
  type: 'technique' | 'theory';
  term?: TermItem;
  theory?: TheoryQuestion;
  gradeTitle: string;
  isCurrentGrade: boolean;
}

export interface DeckConfig {
  grade: KupGrade;
  isCumulativeExam: boolean;
  totalEncounters: number;
  stats: PlayerStats;
}

/**
 * Calculates a priority weight for spaced repetition based on historical accuracy.
 * Unseen or recently failed items receive higher weights to ensure focused review.
 */
export function calculateItemWeight(id: string, isCurrentGrade: boolean, stats: PlayerStats): number {
  let weight = 2.0;
  const record = stats.termAccuracy[id];

  if (!record || record.correct + record.incorrect === 0) {
    // Unpracticed: ensure student encounters it soon
    weight = 4.0;
  } else {
    const total = record.correct + record.incorrect;
    const history = record.history || [];
    const recentAccuracy = history.length > 0
      ? history.filter(Boolean).length / history.length
      : record.correct / total;

    const failedLast = history.length > 0 && history[history.length - 1] === false;

    if (failedLast || recentAccuracy < 0.5) {
      // Failed on last attempt or low accuracy: top priority for review!
      weight = 6.0;
    } else if (recentAccuracy < 0.75) {
      weight = 4.0;
    } else if (recentAccuracy >= 0.85 && total >= 3) {
      // Mastered item: lower probability so weaknesses get focus
      weight = 1.0;
    }
  }

  // In cumulative mode, prioritize the current target grade over lower belts
  if (isCurrentGrade) {
    weight *= 1.5;
  }

  return weight;
}

/**
 * Weighted sampling without replacement to guarantee no duplicate questions in a session.
 */
export function sampleWeightedWithoutReplacement<T extends { id: string }>(
  pool: T[],
  count: number,
  getWeight: (item: T) => number
): T[] {
  if (pool.length === 0) return [];
  const available = [...pool];
  const selected: T[] = [];

  while (selected.length < count && available.length > 0) {
    const weights = available.map(getWeight);
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let rand = Math.random() * totalWeight;

    let chosenIdx = 0;
    for (let i = 0; i < available.length; i++) {
      rand -= weights[i];
      if (rand <= 0) {
        chosenIdx = i;
        break;
      }
    }

    selected.push(available[chosenIdx]);
    available.splice(chosenIdx, 1);
  }

  // Fallback if pool is smaller than required count (refill while preventing consecutive duplicates)
  while (selected.length < count) {
    const lastId = selected[selected.length - 1]?.id;
    const refill = pool.length > 1 ? pool.filter(item => item.id !== lastId) : pool;
    const weights = refill.map(getWeight);
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let rand = Math.random() * totalWeight;

    let chosenIdx = 0;
    for (let i = 0; i < refill.length; i++) {
      rand -= weights[i];
      if (rand <= 0) {
        chosenIdx = i;
        break;
      }
    }
    selected.push(refill[chosenIdx]);
  }

  return selected;
}

/**
 * Generates an optimized, spaced-repetition encounter deck for the session.
 */
export function buildEncounterDeck(config: DeckConfig): {
  deck: EncounterCard[];
  allCandidateTerms: TermItem[];
} {
  const { grade, isCumulativeExam, totalEncounters, stats } = config;

  // 1. Determine which grades are included
  const includedGrades = isCumulativeExam
    ? ALL_GRADES.filter(g => g.gradeNumber >= grade.gradeNumber)
    : [grade];

  // 2. Pool candidate terms and candidate theory questions
  interface WrappedTerm {
    id: string;
    term: TermItem;
    gradeTitle: string;
    isCurrentGrade: boolean;
  }

  interface WrappedTheory {
    id: string;
    theory: TheoryQuestion;
    gradeTitle: string;
    isCurrentGrade: boolean;
  }

  const termsPool: WrappedTerm[] = [];
  const theoryPool: WrappedTheory[] = [];
  const allCandidateTerms: TermItem[] = [];

  for (const g of includedGrades) {
    const isCurrent = g.id === grade.id;
    for (const t of g.terms) {
      allCandidateTerms.push(t);
      termsPool.push({
        id: t.id,
        term: t,
        gradeTitle: g.title,
        isCurrentGrade: isCurrent
      });
    }
    for (const th of g.theory) {
      theoryPool.push({
        id: th.id,
        theory: th,
        gradeTitle: g.title,
        isCurrentGrade: isCurrent
      });
    }
  }

  // 3. Count encounters:
  // Every 4th encounter and the final encounter is a Theory encounter
  let theoryCount = 0;
  for (let i = 1; i <= totalEncounters; i++) {
    if (i % 4 === 0 || i === totalEncounters) {
      theoryCount++;
    }
  }
  const techniqueCount = totalEncounters - theoryCount;

  // 4. Sample items without replacement
  const selectedTerms = sampleWeightedWithoutReplacement(
    termsPool,
    techniqueCount,
    item => calculateItemWeight(item.id, item.isCurrentGrade, stats)
  );

  const selectedTheory = sampleWeightedWithoutReplacement(
    theoryPool,
    theoryCount,
    item => calculateItemWeight(item.id, item.isCurrentGrade, stats)
  );

  // 5. Assemble deck in encounter sequence
  const deck: EncounterCard[] = [];
  let termIdx = 0;
  let theoryIdx = 0;

  for (let i = 1; i <= totalEncounters; i++) {
    const isTheory = i % 4 === 0 || i === totalEncounters;
    if (isTheory && theoryIdx < selectedTheory.length) {
      const th = selectedTheory[theoryIdx++];
      deck.push({
        type: 'theory',
        theory: th.theory,
        gradeTitle: th.gradeTitle,
        isCurrentGrade: th.isCurrentGrade
      });
    } else if (termIdx < selectedTerms.length) {
      const tm = selectedTerms[termIdx++];
      deck.push({
        type: 'technique',
        term: tm.term,
        gradeTitle: tm.gradeTitle,
        isCurrentGrade: tm.isCurrentGrade
      });
    }
  }

  return { deck, allCandidateTerms };
}
