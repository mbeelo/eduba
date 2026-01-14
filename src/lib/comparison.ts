/**
 * Text comparison utilities for memory training
 * Compares user attempts against original text with word-by-word accuracy
 */

interface WordComparison {
  original: string;
  attempt: string;
  isCorrect: boolean;
  index: number;
}

export interface ComparisonResult {
  accuracy: number;
  wordComparisons: WordComparison[];
  totalWords: number;
  correctWords: number;
  missingWords: string[]; // Words in original but not in attempt
  incorrectWords: string[]; // Words in attempt that are wrong/extra
  originalTokens: string[]; // Original text split into tokens
  attemptTokens: string[]; // Attempt text split into tokens
}

/**
 * Normalize text for comparison by:
 * - Converting to lowercase
 * - Removing extra whitespace
 * - Removing ALL punctuation except apostrophes in contractions
 * - Handling contractions consistently
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace multiple whitespace with single space
    .replace(/\s+/g, ' ')
    // Remove ALL punctuation including hyphens, commas, periods, etc.
    // Keep apostrophes only when between letters (contractions)
    .replace(/[^\w\s']/g, '')
    // Clean up apostrophes - only keep if between word characters
    .replace(/'(?![a-z])|(?<![a-z])'/g, '')
    // Normalize remaining contractions
    .replace(/'/g, "'");
}

/**
 * Split text into words, handling edge cases
 */
function splitIntoWords(text: string): string[] {
  const normalized = normalizeText(text);
  if (!normalized) return [];

  return normalized
    .split(/\s+/)
    .filter(word => word.length > 0);
}

// Cache for edit distance calculations to avoid recomputing
const editDistanceCache = new Map<string, number>();

/**
 * Calculate edit distance (Levenshtein distance) between two words
 * Used for fuzzy matching of similar words with caching for performance
 */
function editDistance(word1: string, word2: string): number {
  // Use caching to avoid recomputing identical comparisons
  const cacheKey = `${word1}:${word2}`;
  if (editDistanceCache.has(cacheKey)) {
    return editDistanceCache.get(cacheKey)!;
  }

  // Swap to ensure word1 is shorter for optimization
  if (word1.length > word2.length) {
    const result = editDistance(word2, word1);
    editDistanceCache.set(cacheKey, result);
    return result;
  }

  const len1 = word1.length;
  const len2 = word2.length;

  // If one string is empty, distance is the length of the other
  if (len1 === 0) {
    editDistanceCache.set(cacheKey, len2);
    return len2;
  }

  // Use only two rows instead of full matrix for memory efficiency
  let prevRow = Array.from({ length: len2 + 1 }, (_, j) => j);
  let currRow = new Array(len2 + 1);

  for (let i = 1; i <= len1; i++) {
    currRow[0] = i;

    for (let j = 1; j <= len2; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        currRow[j] = prevRow[j - 1];
      } else {
        currRow[j] = Math.min(
          prevRow[j] + 1,       // deletion
          currRow[j - 1] + 1,   // insertion
          prevRow[j - 1] + 1    // substitution
        );
      }
    }

    // Swap rows for next iteration
    [prevRow, currRow] = [currRow, prevRow];
  }

  const result = prevRow[len2];
  editDistanceCache.set(cacheKey, result);
  return result;
}

/**
 * Check if two words are similar enough to be considered a match
 * Allows for minor typos and variations
 */
function wordsAreSimilar(word1: string, word2: string, threshold: number = 0.8): boolean {
  if (word1 === word2) return true;

  const maxLength = Math.max(word1.length, word2.length);
  if (maxLength === 0) return true;

  const distance = editDistance(word1, word2);
  const similarity = 1 - (distance / maxLength);

  return similarity >= threshold;
}

/**
 * Split text into tokens preserving original spacing and punctuation
 */
function splitIntoTokens(text: string): string[] {
  if (!text) return [];

  // Split on word boundaries but preserve spaces and punctuation
  return text.split(/(\s+)/).filter(token => token.length > 0);
}

/**
 * Compare user attempt against original text with scribe-level precision
 * Returns detailed word-by-word comparison with accuracy score
 * Scoring: 80% content (words) + 20% format (punctuation/capitalization)
 */
export function compareText(originalText: string, userAttempt: string): ComparisonResult {
  // Split into tokens for display
  const originalTokens = splitIntoTokens(originalText);
  const attemptTokens = splitIntoTokens(userAttempt);

  // Get normalized words for comparison
  const originalWords = splitIntoWords(originalText);
  const attemptWords = splitIntoWords(userAttempt);

  // Early return for identical texts
  if (originalText === userAttempt) {
    return {
      accuracy: 100,
      wordComparisons: originalTokens.map((token, index) => ({
        original: token,
        attempt: token,
        isCorrect: true,
        index
      })),
      totalWords: originalWords.length,
      correctWords: originalWords.length,
      missingWords: [],
      incorrectWords: [],
      originalTokens,
      attemptTokens
    };
  }

  // Find missing words (in original but not in attempt)
  const missingWords: string[] = [];
  const attemptWordSet = new Set(attemptWords);

  for (const word of originalWords) {
    if (!attemptWordSet.has(word)) {
      missingWords.push(word);
    }
  }

  // Find incorrect words (in attempt but not in original, or misspellings)
  const incorrectWords: string[] = [];
  const originalWordSet = new Set(originalWords);

  for (const word of attemptWords) {
    if (!originalWordSet.has(word)) {
      incorrectWords.push(word);
    }
  }

  // Calculate word-level accuracy using position-based comparison
  const totalWords = originalWords.length;
  let correctWords = 0;

  for (let i = 0; i < totalWords; i++) {
    const originalWord = originalWords[i] || '';
    const attemptWord = attemptWords[i] || '';
    if (originalWord === attemptWord) {
      correctWords++;
    }
  }

  // Create word comparisons for legacy compatibility
  const wordComparisons: WordComparison[] = [];
  const maxWords = Math.max(originalWords.length, attemptWords.length);

  for (let i = 0; i < maxWords; i++) {
    const originalWord = originalWords[i] || '';
    const attemptWord = attemptWords[i] || '';

    const isCorrect = originalWord === attemptWord;

    wordComparisons.push({
      original: originalWord,
      attempt: attemptWord,
      isCorrect,
      index: i
    });
  }

  // Calculate content accuracy (80% weight)
  const contentAccuracy = totalWords > 0 ? (correctWords / totalWords) * 100 : 0;

  // Calculate format accuracy (20% weight) - exact character match
  const formatAccuracy = calculateFormatAccuracy(originalText, userAttempt);

  // Combined weighted score: 80% content + 20% format
  const finalAccuracy = Math.round(contentAccuracy * 0.8 + formatAccuracy * 0.2);

  return {
    accuracy: finalAccuracy,
    wordComparisons,
    totalWords,
    correctWords,
    missingWords,
    incorrectWords,
    originalTokens,
    attemptTokens
  };
}

/**
 * Calculate format accuracy (punctuation, capitalization, spacing)
 */
export function calculateFormatAccuracy(original: string, attempt: string): number {
  // Simple character-by-character comparison for format accuracy
  const maxLength = Math.max(original.length, attempt.length);
  if (maxLength === 0) return 100;

  let matches = 0;
  const minLength = Math.min(original.length, attempt.length);

  for (let i = 0; i < minLength; i++) {
    if (original[i] === attempt[i]) {
      matches++;
    }
  }

  // Account for length differences
  const accuracy = (matches / maxLength) * 100;
  return Math.max(0, accuracy);
}

/**
 * Get a human-readable accuracy description
 */
export function getAccuracyDescription(accuracy: number): string {
  if (accuracy >= 95) return 'Excellent';
  if (accuracy >= 90) return 'Very Good';
  if (accuracy >= 80) return 'Good';
  if (accuracy >= 70) return 'Fair';
  if (accuracy >= 60) return 'Needs Improvement';
  return 'Keep Practicing';
}

/**
 * Get encouragement message based on accuracy
 */
export function getEncouragementMessage(accuracy: number): string {
  if (accuracy >= 80) {
    return "Great job! You've mastered this passage.";
  } else if (accuracy >= 60) {
    return "Good effort! With a bit more practice, you'll have it memorized.";
  } else {
    return "Keep practicing! Memory training takes time and repetition.";
  }
}