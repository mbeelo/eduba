'use client';

import { useState, useEffect } from 'react';
import { ReadingPhase } from './ReadingPhase';
import { RecallPhase } from './RecallPhase';
import { ResultsPhase } from './ResultsPhase';
import { compareText, type ComparisonResult } from '@/lib/comparison';

interface Passage {
  id: string;
  title: string;
  author: string | null;
  content: string;
  difficulty_order: number;
}

interface TrainingScreenProps {
  passage: Passage;
  onComplete: (accuracy: number) => void;
}

type TrainingPhase = 'reading' | 'recall' | 'results';

export function TrainingScreen({ passage, onComplete }: TrainingScreenProps) {
  const [currentPhase, setCurrentPhase] = useState<TrainingPhase>('reading');
  const [userAttempt, setUserAttempt] = useState('');
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle shortcuts if not typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Escape key to go back/quit
      if (e.key === 'Escape') {
        if (currentPhase === 'reading') {
          onComplete(0); // Exit practice
        }
      }

      // Enter key for primary actions
      if (e.key === 'Enter' && !e.shiftKey) {
        if (currentPhase === 'reading') {
          handleReadingComplete();
        }
      }

      // Space bar for voice recording (only in recall phase)
      if (e.code === 'Space' && currentPhase === 'recall') {
        e.preventDefault(); // Prevent page scroll
        // This will be handled by the RecallPhase component
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentPhase, onComplete]);

  const handleReadingComplete = () => {
    setCurrentPhase('recall');
  };

  const handleRecallSubmit = (attempt: string) => {
    setUserAttempt(attempt);

    // Perform text comparison
    const result = compareText(passage.content, attempt);
    setComparisonResult(result);

    setCurrentPhase('results');
  };

  const handleTryAgain = () => {
    setUserAttempt('');
    setComparisonResult(null);
    setCurrentPhase('recall');
  };

  const handleComplete = () => {
    if (comparisonResult) {
      onComplete(comparisonResult.accuracy);
    }
  };

  return (
    <div className="min-h-screen bg-reading-background">
      {currentPhase === 'reading' && (
        <ReadingPhase
          passage={passage}
          onReady={handleReadingComplete}
        />
      )}

      {currentPhase === 'recall' && (
        <RecallPhase
          passage={passage}
          onSubmit={handleRecallSubmit}
        />
      )}

      {currentPhase === 'results' && comparisonResult && (
        <ResultsPhase
          passage={passage}
          userAttempt={userAttempt}
          comparisonResult={comparisonResult}
          onTryAgain={handleTryAgain}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}