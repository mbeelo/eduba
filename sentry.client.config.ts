import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions

  // Session replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.

  integrations: [
    Sentry.replayIntegration({
      // Mask all text content, emails, etc.
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Only run in production
  enabled: process.env.NODE_ENV === "production",

  // Filter out non-critical errors
  beforeSend(event) {
    // Don't send events for cancelled requests
    if (event.exception?.values?.[0]?.value?.includes('AbortError')) {
      return null;
    }

    // Don't send events for network errors
    if (event.exception?.values?.[0]?.value?.includes('NetworkError')) {
      return null;
    }

    return event;
  },
});