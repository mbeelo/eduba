'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReadingText, BodyText, Heading } from '@/components/ui/typography';
import { Layout } from '@/components/ui/layout';

interface Passage {
  id: string;
  title: string;
  author: string | null;
  content: string;
  difficulty_order: number;
}

interface ReadingPhaseProps {
  passage: Passage;
  onReady: () => void;
}

export function ReadingPhase({ passage, onReady }: ReadingPhaseProps) {
  const wordCount = passage.content.trim().split(/\s+/).length;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="text-center space-y-6">
            <div>
              <Heading level={1} className="text-2xl md:text-3xl mb-2">
                {passage.title}
              </Heading>
              {passage.author && (
                <BodyText variant="muted">
                  {passage.author}
                </BodyText>
              )}
            </div>

            <span className="label-mono">
              phase 1: reading • {wordCount} words
            </span>

            <ReadingText
              size="lg"
              className="text-center leading-relaxed passage-text block my-8"
            >
              {passage.content}
            </ReadingText>
          </div>
        </div>

        <div className="text-center space-y-4">
          <button
            onClick={onReady}
            className="button-subtle text-lg"
          >
            i'm ready
          </button>

          <div className="space-y-2">
            <span className="label-mono text-xs opacity-60 block">
              keyboard shortcuts
            </span>
            <div className="flex justify-center gap-4 text-xs opacity-60">
              <span>enter: continue</span>
              <span>esc: exit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}