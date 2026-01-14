'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BodyText, Heading } from '@/components/ui/typography';
import { Layout } from '@/components/ui/layout';
import { VoiceInput } from './VoiceInput';

interface Passage {
  id: string;
  title: string;
  author: string | null;
  content: string;
  difficulty_order: number;
}

interface RecallPhaseProps {
  passage: Passage;
  onSubmit: (attempt: string) => void;
}

export function RecallPhase({ passage, onSubmit }: RecallPhaseProps) {
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [textInput, setTextInput] = useState('');
  const [voiceInput, setVoiceInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea and auto-focus on mount
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [textInput]);

  // Auto-focus on component mount when in text mode
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && inputMode === 'text') {
      textarea.focus();
    }
  }, [inputMode]);

  const getCurrentInput = () => {
    return inputMode === 'text' ? textInput : voiceInput;
  };

  const handleSubmit = () => {
    const currentInput = getCurrentInput().trim();

    if (!currentInput) {
      return;
    }

    setIsSubmitting(true);

    // Small delay to show loading state
    setTimeout(() => {
      onSubmit(currentInput);
    }, 500);
  };

  const handleVoiceInputChange = (text: string) => {
    setVoiceInput(text);
  };

  const isInputEmpty = getCurrentInput().trim().length === 0;

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
              phase 2: recall
            </span>

            {/* Input Mode Toggle */}
            <div className="flex justify-center">
              <div className="flex gap-8">
                <button
                  type="button"
                  onClick={() => setInputMode('text')}
                  className="text-lg transition-colors relative"
                  style={{
                    color: inputMode === 'text' ? 'var(--foreground)' : 'var(--foreground)',
                    opacity: inputMode === 'text' ? 1 : 0.4
                  }}
                >
                  type
                  {inputMode === 'text' && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 mt-1"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('voice')}
                  className="text-lg transition-colors relative"
                  style={{
                    color: inputMode === 'voice' ? 'var(--foreground)' : 'var(--foreground)',
                    opacity: inputMode === 'voice' ? 1 : 0.4
                  }}
                >
                  voice
                  {inputMode === 'voice' && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 mt-1"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Text Input */}
            {inputMode === 'text' && (
              <div className="space-y-3">
                <textarea
                  ref={textareaRef}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder=""
                  className="w-full min-h-48 p-6 bg-transparent resize-none focus:outline-none text-lg leading-relaxed"
                  style={{
                    background: 'var(--background-soft)',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    transition: 'border-color 0.2s'
                  }}
                  disabled={isSubmitting}
                />
                {textInput.length > 0 && (
                  <span className="label-mono text-center block">
                    {textInput.length}
                  </span>
                )}
              </div>
            )}

            {/* Voice Input */}
            {inputMode === 'voice' && (
              <VoiceInput
                onTextChange={handleVoiceInputChange}
                disabled={isSubmitting}
              />
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={isInputEmpty || isSubmitting}
            className="button-subtle text-lg"
          >
            {isSubmitting ? 'analyzing...' : 'submit'}
          </button>
        </div>
      </div>
    </div>
  );
}