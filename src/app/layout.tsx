import type { Metadata } from "next";
import { Inter, Crimson_Text, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";

// Sans-serif font for UI elements - clean, modern, highly legible
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

// Serif font for content/passages - optimized for reading and memorization
const crimsonText = Crimson_Text({
  variable: "--font-crimson-text",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
});

// Monospace font for code or precise text elements
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ['Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'monospace'],
});

export const metadata: Metadata = {
  title: {
    default: "Eduba - Most tools help you read more. Eduba helps you remember.",
    template: "%s | Eduba"
  },
  description: "Most tools help you read more. Eduba helps you remember. Train recall on passages from history's greatest minds using the traditional scribe method.",
  keywords: [
    "memory training",
    "memorization",
    "academic excellence",
    "study skills",
    "learning",
    "memory palace",
    "recall training",
    "educational app",
    "student tools",
    "memory techniques"
  ],
  authors: [{ name: "Eduba", url: "https://eduba.app" }],
  creator: "Eduba",
  publisher: "Eduba",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://eduba.co'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eduba.co',
    title: 'Eduba - Most tools help you read more. Eduba helps you remember.',
    description: 'Most tools help you read more. Eduba helps you remember. Train recall on passages from history\'s greatest minds using the traditional scribe method.',
    siteName: 'Eduba',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Eduba - Memory Training App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduba - Most tools help you read more. Eduba helps you remember.',
    description: 'Most tools help you read more. Eduba helps you remember. Train recall on passages from history\'s greatest minds using the traditional scribe method.',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-H4EEGEK9Q4"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H4EEGEK9Q4');
            `,
          }}
        />

        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5089242695092248"
             crossOrigin="anonymous"></script>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Eduba",
              "description": "Most tools help you read more. Eduba helps you remember. Train recall on passages from history's greatest minds using the traditional scribe method.",
              "url": "https://eduba.co",
              "applicationCategory": "EducationApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "educationalLevel": "All Levels",
              "educationalUse": "Memory Training",
              "learningResourceType": ["Interactive Content", "Exercise"],
              "audience": {
                "@type": "EducationalAudience",
                "educationalRole": "student"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Eduba"
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${crimsonText.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
