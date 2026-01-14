/**
 * Basic analytics utilities for tracking user interactions
 * Can be easily extended to work with Google Analytics, Posthog, etc.
 */

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
  userId?: string;
}

class Analytics {
  private isEnabled: boolean;
  private userId?: string;

  constructor() {
    // Enable analytics in production only
    this.isEnabled = typeof window !== 'undefined' &&
                    process.env.NODE_ENV === 'production' &&
                    !window.location.hostname.includes('localhost');
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  private log(event: AnalyticsEvent) {
    if (!this.isEnabled) {
      console.log('📊 Analytics Event:', event);
      return;
    }

    // In a real implementation, this would send to your analytics service
    // For now, we'll just log to console and could add localStorage tracking
    try {
      const eventData = {
        ...event,
        userId: this.userId,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };

      // Store locally for potential batch sending
      const events = JSON.parse(localStorage.getItem('eduba_events') || '[]');
      events.push(eventData);

      // Keep only last 100 events to avoid storage bloat
      const recentEvents = events.slice(-100);
      localStorage.setItem('eduba_events', JSON.stringify(recentEvents));

      console.log('📊 Analytics Event:', eventData);
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }

  // User lifecycle events
  userSignedUp(properties?: Record<string, any>) {
    this.log({
      name: 'user_signed_up',
      properties
    });
  }

  userSignedIn(properties?: Record<string, any>) {
    this.log({
      name: 'user_signed_in',
      properties
    });
  }

  userSignedOut() {
    this.log({
      name: 'user_signed_out'
    });
    this.userId = undefined;
  }

  // Training events
  passageStarted(passageId: string, passageTitle: string) {
    this.log({
      name: 'passage_started',
      properties: {
        passage_id: passageId,
        passage_title: passageTitle
      }
    });
  }

  passageCompleted(passageId: string, accuracy: number, attempts: number) {
    this.log({
      name: 'passage_completed',
      properties: {
        passage_id: passageId,
        accuracy,
        attempts,
        passed: accuracy >= 80
      }
    });
  }

  voiceRecordingUsed(duration?: number) {
    this.log({
      name: 'voice_recording_used',
      properties: {
        duration_seconds: duration
      }
    });
  }

  keyboardShortcutUsed(shortcut: string) {
    this.log({
      name: 'keyboard_shortcut_used',
      properties: {
        shortcut
      }
    });
  }

  // Navigation events
  pageViewed(pageName: string, properties?: Record<string, any>) {
    this.log({
      name: 'page_viewed',
      properties: {
        page_name: pageName,
        ...properties
      }
    });
  }

  // Error tracking
  errorOccurred(error: string, context?: Record<string, any>) {
    this.log({
      name: 'error_occurred',
      properties: {
        error_message: error,
        ...context
      }
    });
  }

  // Performance tracking
  performanceMetric(metric: string, value: number, unit: string = 'ms') {
    this.log({
      name: 'performance_metric',
      properties: {
        metric_name: metric,
        value,
        unit
      }
    });
  }

  // Get stored events (for debugging or batch sending)
  getStoredEvents(): AnalyticsEvent[] {
    try {
      return JSON.parse(localStorage.getItem('eduba_events') || '[]');
    } catch {
      return [];
    }
  }

  // Clear stored events
  clearStoredEvents() {
    localStorage.removeItem('eduba_events');
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Hook for React components
export function useAnalytics() {
  return analytics;
}