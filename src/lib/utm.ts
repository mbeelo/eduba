/**
 * UTM parameter builder for cross-app promotion to behelo.com
 */
export interface UTMParams {
  campaign?: string;
  medium?: string;
  source?: string;
  content?: string;
  term?: string;
}

export function buildBeheloUTMLink(params: UTMParams = {}): string {
  const baseUrl = 'https://behelo.com/lander';

  const utmParams = {
    utm_campaign: params.campaign || 'cross-app-promotion',
    utm_medium: params.medium || 'footer',
    utm_source: params.source || 'eduba',
    ...(params.content && { utm_content: params.content }),
    ...(params.term && { utm_term: params.term }),
  };

  const searchParams = new URLSearchParams(utmParams);
  return `${baseUrl}?${searchParams.toString()}`;
}

// Pre-built UTM links for common placements
export const UTMLinks = {
  footerGeneral: buildBeheloUTMLink(),
  footerDashboard: buildBeheloUTMLink({
    medium: 'footer',
    content: 'dashboard-page'
  }),
  headerCTA: buildBeheloUTMLink({
    medium: 'header',
    content: 'main-cta'
  }),
  sidebar: buildBeheloUTMLink({
    medium: 'sidebar',
    content: 'navigation'
  }),
} as const;