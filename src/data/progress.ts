import { PlayerStats } from './types';

const STORAGE_KEY = 'tagb_tkd_kungfu_stats_v1';

export function loadPlayerStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        score: 0, // Reset session score
        currentStreak: 0,
        bestStreak: parsed.bestStreak || 0,
        health: 5,
        maxHealth: 5,
        totalEnemiesDefeated: parsed.totalEnemiesDefeated || 0,
        termAccuracy: parsed.termAccuracy || {}
      };
    }
  } catch (e) {
    console.warn('Failed to load stats from localStorage:', e);
  }

  return {
    score: 0,
    currentStreak: 0,
    bestStreak: 0,
    health: 5,
    maxHealth: 5,
    totalEnemiesDefeated: 0,
    termAccuracy: {}
  };
}

export function savePlayerProgress(stats: PlayerStats): void {
  try {
    const toSave = {
      bestStreak: stats.bestStreak,
      totalEnemiesDefeated: stats.totalEnemiesDefeated,
      termAccuracy: stats.termAccuracy
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save stats to localStorage:', e);
  }
}

export function clearPlayerStats(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear stats:', e);
  }
}

export function recordAnswerAttempt(stats: PlayerStats, termId: string, isCorrect: boolean): void {
  if (!stats.termAccuracy[termId]) {
    stats.termAccuracy[termId] = { correct: 0, incorrect: 0, history: [] };
  }
  
  const record = stats.termAccuracy[termId];
  if (!record.history) {
    record.history = [];
  }
  
  // Keep rolling history of last 5 attempts
  record.history.push(isCorrect);
  if (record.history.length > 5) {
    record.history.shift();
  }

  if (isCorrect) {
    record.correct++;
    stats.currentStreak++;
    if (stats.currentStreak > stats.bestStreak) {
      stats.bestStreak = stats.currentStreak;
    }
    stats.totalEnemiesDefeated++;
    stats.score += 100 + (stats.currentStreak * 10);
  } else {
    record.incorrect++;
    stats.currentStreak = 0;
    stats.health = Math.max(0, stats.health - 1);
  }
  savePlayerProgress(stats);
}
