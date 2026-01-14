'use client';

// localStorage keys for session tracking
const STORAGE_KEYS = {
  PRACTICE_COMPLETIONS: 'eduba_practice_completions',
  SIGNUP_DISMISSED_AT: 'eduba_signup_dismissed_at',
  SIGNUP_LAST_SHOWN_AT: 'eduba_signup_last_shown_at',
} as const;

// Track practice session completions
export function incrementPracticeCompletions(): number {
  if (typeof window === 'undefined') return 0;

  const current = getPracticeCompletions();
  const newCount = current + 1;

  localStorage.setItem(STORAGE_KEYS.PRACTICE_COMPLETIONS, newCount.toString());
  return newCount;
}

export function getPracticeCompletions(): number {
  if (typeof window === 'undefined') return 0;

  const stored = localStorage.getItem(STORAGE_KEYS.PRACTICE_COMPLETIONS);
  return stored ? parseInt(stored, 10) : 0;
}

// Signup prompt logic
export function shouldShowSignupPrompt(): boolean {
  if (typeof window === 'undefined') return false;

  const completions = getPracticeCompletions();

  // Only show after 3 completions
  if (completions < 3) return false;

  // Check if dismissed recently (7 days cooldown)
  const dismissedAt = localStorage.getItem(STORAGE_KEYS.SIGNUP_DISMISSED_AT);
  if (dismissedAt) {
    const dismissedTime = parseInt(dismissedAt, 10);
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - dismissedTime < sevenDaysMs) {
      return false;
    }
  }

  // Check if shown recently (don't spam)
  const lastShownAt = localStorage.getItem(STORAGE_KEYS.SIGNUP_LAST_SHOWN_AT);
  if (lastShownAt) {
    const lastShownTime = parseInt(lastShownAt, 10);
    const oneHourMs = 60 * 60 * 1000;
    if (Date.now() - lastShownTime < oneHourMs) {
      return false;
    }
  }

  return true;
}

export function markSignupPromptShown(): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEYS.SIGNUP_LAST_SHOWN_AT, Date.now().toString());
}

export function markSignupPromptDismissed(): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEYS.SIGNUP_DISMISSED_AT, Date.now().toString());
}

// Reset for testing
export function resetSessionTracking(): void {
  if (typeof window === 'undefined') return;

  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}