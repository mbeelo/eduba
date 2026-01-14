import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom color palette for Eduba - professional, focused memory training
      colors: {
        // Brand colors - sophisticated academic palette with better contrast
        brand: {
          50: '#f8faff',
          100: '#f0f4ff',
          200: '#e0e7ff',
          300: '#c7d2fe',
          400: '#a5b4fc',
          500: '#6366f1', // Primary brand color - authoritative indigo
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },

        // Semantic colors optimized for memory training feedback
        // High contrast for accessibility and clear feedback
        correct: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#16a34a', // More authoritative success green
          600: '#15803d',
          700: '#166534',
          800: '#14532d',
          900: '#0f2027',
        },

        incorrect: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#dc2626', // More authoritative error red
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#5f1212',
        },

        // Enhanced neutral colors for better hierarchy and depth
        neutral: {
          50: '#fdfdfd',
          100: '#f8f9fa',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#1a1d20',
        },

        // Reading-focused colors with improved contrast
        reading: {
          background: '#ffffff',
          'background-soft': '#fdfdfd',
          text: '#1a1d20',
          'text-muted': '#495057',
          'text-highlight': '#212529',
          border: '#dee2e6',
          'border-focus': '#4f46e5',
        },

        // Academic color palette for scholarly contexts
        academic: {
          50: '#f8f9fc',
          100: '#f1f3f9',
          200: '#e2e6f0',
          300: '#cbd2e0',
          400: '#9aa4b8',
          500: '#6b7794', // Sophisticated academic gray-blue
          600: '#556080',
          700: '#434d6b',
          800: '#343c56',
          900: '#2a3147',
        }
      },

      // Typography scale optimized for reading and memorization
      fontFamily: {
        // Sans-serif for UI elements
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],

        // Serif font for content/passages - optimized for reading comprehension
        serif: ['var(--font-crimson-text)', 'Georgia', 'serif'],

        // Monospace for code or precise text
        mono: ['var(--font-jetbrains-mono)', 'Menlo', 'Monaco', 'monospace'],
      },

      // Reading-optimized typography scales
      fontSize: {
        // Content reading sizes
        'reading-sm': ['16px', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'reading-base': ['18px', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'reading-lg': ['20px', { lineHeight: '1.7', letterSpacing: '0.005em' }],
        'reading-xl': ['22px', { lineHeight: '1.65', letterSpacing: '0.005em' }],

        // UI text sizes
        'ui-xs': ['12px', { lineHeight: '1.4' }],
        'ui-sm': ['14px', { lineHeight: '1.5' }],
        'ui-base': ['16px', { lineHeight: '1.5' }],
        'ui-lg': ['18px', { lineHeight: '1.5' }],

        // Heading sizes
        'heading-sm': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-base': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-lg': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-xl': ['40px', { lineHeight: '1.1', fontWeight: '700' }],
      },

      // Spacing scale optimized for reading layouts
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },

      // Border radius for clean, modern feel
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },

      // Box shadows for subtle depth
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'reading': '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 1px 4px -1px rgba(0, 0, 0, 0.06)',
      },

      // Animation and transitions
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },

      // Container max widths for different content types
      maxWidth: {
        'reading': '65ch', // Optimal line length for reading
        'content': '80ch',
        'ui': '1200px',
      },

      // Custom screens for better responsive design
      screens: {
        'xs': '475px',
        'reading': '768px', // Optimal breakpoint for reading layouts
      }
    },
  },
  plugins: [],
};

export default config;