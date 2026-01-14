'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { BodyText } from '@/components/ui/typography';
import { analytics } from '@/lib/analytics';

interface VoiceInputProps {
  onTextChange: (text: string) => void;
  disabled?: boolean;
}

export function VoiceInput({ onTextChange, disabled = false }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported] = useState(() => {
    // Check browser support during initialization
    if (typeof window === 'undefined') return false;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return Boolean(SpeechRecognition);
  });
  const [transcript, setTranscript] = useState('');
  const [editableTranscript, setEditableTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recordingStartTime = useRef<number | null>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle space bar for recording if not typing in a textarea
      if (e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (isRecording) {
          stopRecording();
        } else if (!disabled) {
          startRecording();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isRecording, disabled]);

  useEffect(() => {
    // Initialize speech recognition if supported
    if (typeof window !== 'undefined' && isSupported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) return;

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        recordingStartTime.current = Date.now();
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (recordingStartTime.current) {
          const duration = (Date.now() - recordingStartTime.current) / 1000;
          analytics.voiceRecordingUsed(duration);
          recordingStartTime.current = null;
        }
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];

          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }

        if (finalTranscript) {
          const newTranscript = transcript + finalTranscript;
          setTranscript(newTranscript);
          setEditableTranscript(newTranscript);
          onTextChange(newTranscript);
        }

        setInterimTranscript(interimText);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);

        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please enable microphone permissions to use voice input.');
        }
      };

      recognitionRef.current = recognition;

      return () => {
        recognition.stop();
      };
    }
  }, [transcript, onTextChange, isSupported]);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setEditableTranscript('');
    setInterimTranscript('');
    setIsEditing(false);
    onTextChange('');
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setEditableTranscript(newText);
    onTextChange(newText);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [editableTranscript]);

  if (!isSupported) {
    return (
      <div className="text-center space-y-4 p-8 bg-neutral-50 rounded-lg">
        <BodyText variant="muted">
          Voice input is not supported in your browser.
        </BodyText>
        <BodyText variant="subtle" size="sm">
          Please use the text input option instead.
        </BodyText>
      </div>
    );
  }

  const displayText = transcript + (interimTranscript ? ` ${interimTranscript}` : '');

  return (
    <div className="space-y-4">
      {/* Voice Input Display / Edit Area */}
      <div className="min-h-48">
        {transcript && !isRecording && isEditing ? (
          // Editable textarea
          <textarea
            ref={textareaRef}
            value={editableTranscript}
            onChange={handleEditChange}
            placeholder=""
            className="w-full min-h-48 p-6 bg-transparent border-none resize-none focus:outline-none text-lg leading-relaxed"
            style={{ background: 'var(--background-soft)', borderRadius: '8px' }}
            disabled={disabled}
          />
        ) : (
          // Display area
          <div className="min-h-48 p-6 rounded-lg" style={{ background: 'var(--background-soft)' }}>
            {displayText ? (
              <div className="leading-relaxed">
                <span>{transcript}</span>
                {interimTranscript && (
                  <span className="opacity-50 italic">{interimTranscript}</span>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full" style={{ color: 'var(--foreground)' }}>
                <span className="label-mono">
                  {isRecording ? 'listening...' : 'press the microphone button to start speaking'}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Voice Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={disabled}
          className="button-subtle text-lg flex items-center space-x-2 w-full sm:w-auto justify-center"
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {isRecording ? (
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                clipRule="evenodd"
              />
            )}
          </svg>
          <span className="whitespace-nowrap">
            {isRecording ? 'stop recording' : 'start recording'}
          </span>
        </button>

        {transcript && (
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={toggleEdit}
              disabled={disabled || isRecording}
              className="button-subtle flex-1 sm:flex-none"
            >
              {isEditing ? 'done editing' : 'edit'}
            </button>

            <button
              onClick={clearTranscript}
              disabled={disabled || isRecording}
              className="button-subtle flex-1 sm:flex-none"
            >
              clear
            </button>
          </div>
        )}
      </div>

      {/* Recording Status */}
      {isRecording && (
        <div className="flex items-center justify-center space-x-2" style={{ color: 'var(--accent)' }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="label-mono">
            recording...
          </span>
        </div>
      )}

      {/* Character Count and Shortcuts */}
      <div className="text-center space-y-2">
        {(editableTranscript || transcript) && (
          <span className="label-mono">
            {editableTranscript.length || transcript.length} characters
          </span>
        )}

        <span className="label-mono text-xs opacity-60 block">
          space: {isRecording ? 'stop recording' : 'start recording'}
        </span>
      </div>
    </div>
  );
}