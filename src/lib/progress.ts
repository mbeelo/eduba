import { supabase } from './supabase';

export interface PathProgress {
  path: string;
  totalPassages: number;
  completedPassages: number;
  progressPercentage: number;
  currentPassage?: number; // Next available passage to practice
  totalAttempts: number;
  averageAccuracy: number;
}

export interface PassageProgress {
  passageId: string;
  completed: boolean;
  bestAccuracy: number | null;
  attempts: number;
  isUnlocked: boolean;
}

export interface PassageBasic {
  id: string;
  path: string;
  difficulty_order: number;
}

export interface PathWithPassages {
  path: string;
  passages: Array<{
    id: string;
    title: string;
    author: string | null;
    content: string;
    difficulty_order: number;
    progress?: PassageProgress;
  }>;
}

/**
 * Get progress overview for all paths for a specific user
 */
export async function getUserPathsProgress(userId: string): Promise<PathProgress[]> {
  try {
    // Get all passages grouped by path
    const { data: allPassages, error: passagesError } = await supabase
      .from('passages')
      .select('path, id, difficulty_order')
      .order('path', { ascending: true })
      .order('difficulty_order', { ascending: true });

    if (passagesError) {
      console.error('Error fetching passages:', passagesError);
      return [];
    }

    // Get user progress
    const { data: userProgress, error: progressError } = await supabase
      .from('user_progress')
      .select('passage_id, completed, best_accuracy, attempts')
      .eq('user_id', userId);

    if (progressError) {
      console.error('Error fetching user progress:', progressError);
      return [];
    }

    // Create progress map for quick lookup
    const progressMap = new Map();
    userProgress?.forEach(progress => {
      progressMap.set(progress.passage_id, progress);
    });

    // Group passages by path and calculate progress
    const pathGroups = allPassages?.reduce((acc, passage) => {
      if (!acc[passage.path]) {
        acc[passage.path] = [];
      }
      acc[passage.path].push(passage);
      return acc;
    }, {} as Record<string, PassageBasic[]>) || {};

    const pathProgressArray: PathProgress[] = [];

    for (const [path, passages] of Object.entries(pathGroups)) {
      const totalPassages = passages.length;
      let completedPassages = 0;
      let currentPassage: number | undefined;
      let totalAttempts = 0;
      let totalAccuracy = 0;
      let passagesWithAccuracy = 0;

      // Sort by difficulty order
      const sortedPassages = passages.sort((a, b) => a.difficulty_order - b.difficulty_order);

      for (const passage of sortedPassages) {
        const progress = progressMap.get(passage.id);

        if (progress) {
          // Count attempts for any passage that has been attempted
          totalAttempts += progress.attempts || 0;

          // Count accuracy for passages with recorded accuracy
          if (progress.best_accuracy !== null && progress.best_accuracy > 0) {
            totalAccuracy += progress.best_accuracy;
            passagesWithAccuracy++;
          }
        }

        if (progress?.completed) {
          completedPassages++;
        } else if (currentPassage === undefined) {
          // First uncompleted passage - check if it's unlocked
          const previousPassageIndex = sortedPassages.findIndex(p => p.id === passage.id) - 1;

          if (previousPassageIndex < 0) {
            // First passage is always unlocked
            currentPassage = passage.difficulty_order;
          } else {
            // Check if previous passage is completed
            const previousPassage = sortedPassages[previousPassageIndex];
            const previousProgress = progressMap.get(previousPassage.id);

            if (previousProgress?.completed) {
              currentPassage = passage.difficulty_order;
            }
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
  } catch (error) {
    console.error('Error calculating user paths progress:', error);
    return [];
  }
}

/**
 * Get detailed progress for a specific path
 */
export async function getPathProgress(userId: string, pathId: string): Promise<PathWithPassages | null> {
  try {
    // Get all passages for this path
    const { data: passages, error: passagesError } = await supabase
      .from('passages')
      .select('id, title, author, content, difficulty_order')
      .eq('path', pathId)
      .order('difficulty_order', { ascending: true });

    if (passagesError) {
      console.error('Error fetching passages for path:', passagesError);
      return null;
    }

    if (!passages || passages.length === 0) {
      return null;
    }

    // Get user progress for this path
    const passageIds = passages.map(p => p.id);
    const { data: userProgress, error: progressError } = await supabase
      .from('user_progress')
      .select('passage_id, completed, best_accuracy, attempts')
      .eq('user_id', userId)
      .in('passage_id', passageIds);

    if (progressError) {
      console.error('Error fetching user progress for path:', progressError);
      return null;
    }

    // Create progress map
    const progressMap = new Map();
    userProgress?.forEach(progress => {
      progressMap.set(progress.passage_id, progress);
    });

    // All passages are now unlocked - no lock logic
    const passagesWithProgress = passages.map((passage, index) => {
      const progress = progressMap.get(passage.id);

      return {
        ...passage,
        progress: {
          passageId: passage.id,
          completed: progress?.completed || false,
          bestAccuracy: progress?.best_accuracy || null,
          attempts: progress?.attempts || 0,
          isUnlocked: true // All passages are now unlocked
        }
      };
    });

    return {
      path: pathId,
      passages: passagesWithProgress
    };
  } catch (error) {
    console.error('Error getting path progress:', error);
    return null;
  }
}

/**
 * Get the next unlocked passage for a user in a path
 */
export async function getNextUnlockedPassage(userId: string, pathId: string): Promise<string | null> {
  try {
    const pathProgress = await getPathProgress(userId, pathId);

    if (!pathProgress) {
      return null;
    }

    // Find first uncompleted passage (all are now unlocked)
    for (const passage of pathProgress.passages) {
      if (!passage.progress?.completed) {
        return passage.id;
      }
    }

    return null;
  } catch (error) {
    console.error('Error getting next unlocked passage:', error);
    return null;
  }
}

/**
 * Get the next passage after a specific current passage (for skip functionality)
 */
export async function getNextPassageAfter(userId: string, pathId: string, currentPassageId: string): Promise<string | null> {
  try {
    const pathProgress = await getPathProgress(userId, pathId);

    if (!pathProgress) {
      return null;
    }

    // Find current passage index
    const currentIndex = pathProgress.passages.findIndex(p => p.id === currentPassageId);

    if (currentIndex === -1) {
      return null;
    }

    // Return next passage if it exists
    if (currentIndex + 1 < pathProgress.passages.length) {
      return pathProgress.passages[currentIndex + 1].id;
    }

    return null;
  } catch (error) {
    console.error('Error getting next passage after current:', error);
    return null;
  }
}

/**
 * Helper to get path metadata
 */
export function getPathMetadata(pathId: string) {
  const pathInfo = {
    stoics: {
      name: 'The Stoics',
      description: 'Wisdom from Marcus Aurelius, Seneca, and Epictetus',
      color: 'emerald'
    },
    founders: {
      name: 'The Founders',
      description: 'Founding documents and speeches of American democracy',
      color: 'blue'
    },
    poets: {
      name: 'The Poets',
      description: 'Classic verses from Shakespeare, Dickinson, and Frost',
      color: 'purple'
    },
    philosophers: {
      name: 'The Philosophers',
      description: 'Timeless insights on life, knowledge, and the examined mind',
      color: 'emerald'
    },
    orators: {
      name: 'The Orators',
      description: 'Speeches that moved nations and changed history',
      color: 'blue'
    },
    scriptures: {
      name: 'The Scriptures',
      description: 'Sacred wisdom across traditions',
      color: 'purple'
    },
    novelists: {
      name: 'The Novelists',
      description: 'Immortal lines from classic literature',
      color: 'emerald'
    },
    scientists: {
      name: 'The Scientists',
      description: 'The wonder of discovery in their own words',
      color: 'blue'
    },
    warriors: {
      name: 'The Warriors',
      description: 'Strategy and wisdom from history\'s tacticians',
      color: 'purple'
    }
  };

  return pathInfo[pathId as keyof typeof pathInfo] || {
    name: pathId,
    description: 'A collection of memorable passages',
    color: 'gray'
  };
}