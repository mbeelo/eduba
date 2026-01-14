# Eduba - Memory Training Platform

Eduba is a scholarly memory training platform that helps users develop deep recall abilities through scientifically-backed memorization techniques. Train your mind with classic literature, speeches, and academic content without gamification or distractions.

## Overview

Eduba focuses on evidence-based memory training using:
- **Active Recall**: Type out passages from memory with no hints or multiple choice
- **Spaced Repetition**: Review content at scientifically optimized intervals
- **Progressive Difficulty**: Master passages in carefully sequenced order
- **Academic Content**: Classic literature, historical speeches, and scholarly texts

## Features

- **Three Learning Paths**: Stoics, Founders, and Poets collections
- **Voice & Text Input**: Practice with speech-to-text or traditional typing
- **Progress Tracking**: Monitor accuracy and completion across all passages
- **Clean Interface**: No points, streaks, or notifications - just focused learning
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js 16.1.1 with React 19.2.3
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Supabase Auth with secure user management
- **Database**: PostgreSQL via Supabase with Row Level Security
- **Deployment**: Optimized for Vercel hosting
- **TypeScript**: Full type safety throughout the application

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account for database and authentication
- Modern web browser with JavaScript enabled

### Local Development

1. **Clone and install dependencies**:
   ```bash
   git clone [repository-url]
   cd eduba-app
   npm install
   ```

2. **Setup environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Setup database** (see DATABASE_SETUP.md for details):
   - Create a new Supabase project
   - Run the schema migration: `database/schema.sql`
   - Seed with initial data: `database/seed_data_enhanced.sql`

4. **Start development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
eduba-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── path/[pathId]/     # Learning path overview
│   │   ├── practice/[passageId]/ # Practice session
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   └── ui/               # Reusable UI components
│   ├── lib/                  # Utility functions and configs
│   └── types/                # TypeScript type definitions
├── database/
│   ├── schema.sql           # Database schema
│   └── seed_data_enhanced.sql # Initial content
├── public/                  # Static assets
└── docs/                   # Documentation files
```

## Learning Paths

### The Stoics
Classical philosophy passages from Marcus Aurelius, Epictetus, and Seneca. Build mental fortitude while training memory.

### The Founders
Historical documents and speeches from America's founding era. Memorize foundational texts of political philosophy.

### The Poets
Verses from Shakespeare, Wordsworth, and other literary masters. Develop cultural literacy through poetic memorization.

## Three-Phase Training Process

1. **Study Phase**: Read and understand the passage content
2. **Practice Phase**: Type out the passage from memory with real-time feedback
3. **Review Phase**: Analyze accuracy and areas for improvement

## Authentication & Security

- Secure user authentication via Supabase Auth
- Row Level Security (RLS) protects user data
- Password reset and account management
- Session management with automatic token refresh

## Performance

- Static generation for public pages
- Optimized bundle size with code splitting
- Progressive enhancement for core functionality
- Responsive design with mobile-first approach

## Contributing

See DEVELOPER_GUIDE.md for detailed contribution guidelines, coding standards, and development workflows.

## Documentation

- [Deployment Guide](DEPLOYMENT.md) - Production deployment instructions
- [User Guide](USER_GUIDE.md) - How to use the memory training system
- [Developer Guide](DEVELOPER_GUIDE.md) - Technical documentation for contributors
- [Database Setup](DATABASE_SETUP.md) - Supabase configuration details

## License

This project is part of the Eduba memory training platform. All rights reserved.

## Support

For technical issues or questions about the memory training methodology, please refer to the comprehensive documentation or create an issue in the project repository.

---

**Eduba**: Memory training for academic excellence.