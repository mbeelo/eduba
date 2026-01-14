/**
 * Local storage progress service for anonymous users
 * Provides same interface as server-side progress but stores data locally
 */

import { PathProgress, PassageProgress, PathWithPassages } from './progress';
import { getPathMetadata } from './progress';

const STORAGE_KEY = 'eduba_anonymous_progress';

interface LocalProgressData {
  passageProgress: Record<string, {
    completed: boolean;
    bestAccuracy: number | null;
    attempts: number;
    lastAttemptDate: string;
  }>;
  version: number; // For future migrations
}

// Available paths with their passage counts (hardcoded for now)
const PATH_PASSAGE_COUNTS = {
  stoics: 20,
  founders: 20,
  poets: 20,
  philosophers: 20,
  orators: 20,
  scriptures: 20,
  novelists: 20,
  scientists: 20,
  warriors: 20
};

/**
 * Get local progress data from localStorage
 */
function getLocalProgressData(): LocalProgressData {
  if (typeof window === 'undefined') {
    return { passageProgress: {}, version: 1 };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        passageProgress: data.passageProgress || {},
        version: data.version || 1
      };
    }
  } catch (error) {
    console.error('Error loading local progress:', error);
  }

  return { passageProgress: {}, version: 1 };
}

/**
 * Save progress data to localStorage
 */
function saveLocalProgressData(data: LocalProgressData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving local progress:', error);
  }
}

/**
 * Record progress for a passage (anonymous version)
 */
export function recordLocalProgress(
  passageId: string,
  accuracy: number,
  completed: boolean = false
): void {
  const data = getLocalProgressData();
  const current = data.passageProgress[passageId] || {
    completed: false,
    bestAccuracy: null,
    attempts: 0,
    lastAttemptDate: new Date().toISOString()
  };

  // Update progress
  data.passageProgress[passageId] = {
    completed: completed || current.completed,
    bestAccuracy: current.bestAccuracy ? Math.max(current.bestAccuracy, accuracy) : accuracy,
    attempts: current.attempts + 1,
    lastAttemptDate: new Date().toISOString()
  };

  saveLocalProgressData(data);
}

/**
 * Get anonymous user paths progress (localStorage version)
 */
export function getLocalPathsProgress(): PathProgress[] {
  const data = getLocalProgressData();
  const pathProgressArray: PathProgress[] = [];

  // Generate progress for each path
  for (const [path, totalPassages] of Object.entries(PATH_PASSAGE_COUNTS)) {
    let completedPassages = 0;
    let currentPassage: number | undefined;
    let totalAttempts = 0;
    let totalAccuracy = 0;
    let passagesWithAccuracy = 0;

    // Check progress for passages in this path
    for (let difficultyOrder = 1; difficultyOrder <= totalPassages; difficultyOrder++) {
      const passageId = `${path}_${difficultyOrder}`;
      const progress = data.passageProgress[passageId];

      if (progress) {
        totalAttempts += progress.attempts;

        if (progress.bestAccuracy !== null && progress.bestAccuracy > 0) {
          totalAccuracy += progress.bestAccuracy;
          passagesWithAccuracy++;
        }

        if (progress.completed) {
          completedPassages++;
        } else if (currentPassage === undefined) {
          // Check if this passage is unlocked
          const isFirstPassage = difficultyOrder === 1;
          const previousPassageId = `${path}_${difficultyOrder - 1}`;
          const previousProgress = data.passageProgress[previousPassageId];
          const isPreviousCompleted = previousProgress?.completed || false;

          if (isFirstPassage || isPreviousCompleted) {
            currentPassage = difficultyOrder;
          }
        }
      } else if (currentPassage === undefined) {
        // No progress on this passage - check if it's unlocked
        const isFirstPassage = difficultyOrder === 1;
        const previousPassageId = `${path}_${difficultyOrder - 1}`;
        const previousProgress = data.passageProgress[previousPassageId];
        const isPreviousCompleted = previousProgress?.completed || false;

        if (isFirstPassage || isPreviousCompleted) {
          currentPassage = difficultyOrder;
        }
      }
    }

    const progressPercentage = totalPassages > 0 ? Math.round((completedPassages / totalPassages) * 100) : 0;
    const averageAccuracy = passagesWithAccuracy > 0 ? Math.round(totalAccuracy / passagesWithAccuracy) : 0;

    pathProgressArray.push({
      path,
      totalPassages,
      completedPassages,
      progressPercentage,
      currentPassage,
      totalAttempts,
      averageAccuracy
    });
  }

  return pathProgressArray;
}

/**
 * Get local progress for a specific passage
 */
export function getLocalPassageProgress(passageId: string): PassageProgress {
  const data = getLocalProgressData();
  const progress = data.passageProgress[passageId];

  if (!progress) {
    return {
      passageId,
      completed: false,
      bestAccuracy: null,
      attempts: 0,
      isUnlocked: true // Will be calculated by caller
    };
  }

  return {
    passageId,
    completed: progress.completed,
    bestAccuracy: progress.bestAccuracy,
    attempts: progress.attempts,
    isUnlocked: true // Will be calculated by caller
  };
}

/**
 * Check if user has any local progress
 */
export function hasLocalProgress(): boolean {
  const data = getLocalProgressData();
  return Object.keys(data.passageProgress).length > 0;
}

/**
 * Export local progress for account migration
 */
export function exportLocalProgress(): LocalProgressData {
  return getLocalProgressData();
}

/**
 * Clear local progress (for account migration or reset)
 */
export function clearLocalProgress(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing local progress:', error);
  }
}

/**
 * Get next uncompleted passage for anonymous user (all passages are now unlocked)
 */
export function getLocalNextUnlockedPassage(pathId: string): number | null {
  const data = getLocalProgressData();
  const totalPassages = PATH_PASSAGE_COUNTS[pathId as keyof typeof PATH_PASSAGE_COUNTS];

  if (!totalPassages) return null;

  // Find first uncompleted passage (all are unlocked)
  for (let difficultyOrder = 1; difficultyOrder <= totalPassages; difficultyOrder++) {
    const passageId = `${pathId}_${difficultyOrder}`;
    const progress = data.passageProgress[passageId];

    // If not completed, this is the next one to practice
    if (!progress?.completed) {
      return difficultyOrder;
    }
  }

  return null;
}

/**
 * Get the next passage after a specific current passage (for skip functionality)
 */
export function getLocalNextPassageAfter(pathId: string, currentPassageId: string): number | null {
  const totalPassages = PATH_PASSAGE_COUNTS[pathId as keyof typeof PATH_PASSAGE_COUNTS];

  if (!totalPassages) return null;

  // Extract current difficulty order from passage ID
  const currentOrder = parseInt(currentPassageId.split('_').pop() || '0');

  if (currentOrder >= totalPassages) {
    return null; // Already at the last passage
  }

  // Return next passage order
  return currentOrder + 1;
}