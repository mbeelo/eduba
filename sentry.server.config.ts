import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance monitoring
  tracesSampleRate: 1.0,

  // Only run in production
  enabled: process.env.NODE_ENV === "production",

  // Filter out non-critical errors
  beforeSend(event) {
    // Don't send events for cancelled requests
    if (event.exception?.values?.[0]?.value?.includes('AbortError')) {
      return null;
    }

    // Don't send events for database connection issues (common in dev)
    if (event.exception?.values?.[0]?.value?.includes('ECONNREFUSED')) {
      return null;
    }

    return event;
  },
});