# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Operations
- `node populate-db.js` - Populate database with content from populate-db.js master file
- `npm run seed` - Seed content using scripts/seed-content.js (if it exists)
- `npm run seed:replace` - Replace existing content during seeding

### Environment Setup
- Copy `.env.local.example` to `.env.local` and configure Supabase credentials
- Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Architecture Overview

### Application Structure
Eduba is a memory training platform built with Next.js 16.1 using the app router. The core architecture follows a three-phase learning system:

1. **Reading Phase** - Users study the passage content
2. **Recall Phase** - Users type the passage from memory with real-time feedback
3. **Results Phase** - Detailed accuracy analysis and progression

### Key Technical Components

#### Dual Progress System
The app supports both authenticated and anonymous users with different progress tracking:

- **Authenticated Users**: Progress stored in Supabase with Row Level Security
- **Anonymous Users**: Progress stored in localStorage via `local-progress.ts`
- **Migration System**: Anonymous progress can be migrated to authenticated accounts

#### Content Management
- **Master Content**: `populate-db.js` contains all passages (236 total across 9 learning paths)
- **Learning Paths**: stoics, founders, poets, philosophers, orators, novelists, scientists, scriptures, warriors
- **Progressive Difficulty**: Passages ordered by difficulty within each path

#### Text Comparison Engine
Advanced word-by-word comparison system in `src/lib/comparison.ts`:
- Normalizes text (removes punctuation, handles contractions)
- Provides detailed accuracy scoring
- Identifies missing, incorrect, and extra words
- Supports real-time feedback during practice

#### Authentication System
- **Provider**: Supabase Auth with React Context (`src/lib/auth.tsx`)
- **Anonymous Mode**: Full functionality without account creation
- **Account Migration**: Seamless transition from anonymous to authenticated state

### UI Design System

#### Typography Hierarchy
- **Inter**: Primary UI font (buttons, navigation, labels)
- **Crimson Text**: Content font optimized for reading and memorization
- **JetBrains Mono**: Monospace for precise text elements

#### Theme System
- Comprehensive dark/light mode support via `src/lib/theme.tsx`
- CSS custom properties for consistent theming
- Academic, distraction-free design philosophy

#### Component Architecture
- **Training Components**: `src/components/training/` - Core learning experience
- **UI Components**: `src/components/ui/` - Reusable design system components
- **AdBanner System**: Opt-in advertising with localStorage preference (`eduba_ads_enabled`)

### Database Schema
- **passages**: Content with id, title, author, content, difficulty_order, path
- **user_progress**: Tracks completion, accuracy, attempts per user/passage
- **Row Level Security**: Ensures user data isolation

### Content Quality Standards
- **Minimum Length**: 15+ words per passage for effective memory training
- **Progressive Difficulty**: Smooth length/complexity progression within paths
- **Attribution Accuracy**: Verified quotes with proper source attribution
- **Fair Use Compliance**: Educational excerpts from classic literature and speeches

## Key File Locations

### Core Application Logic
- `src/app/practice/[passageId]/page.tsx` - Main training interface
- `src/lib/progress.ts` - Server-side progress tracking
- `src/lib/local-progress.ts` - Client-side anonymous progress
- `src/lib/comparison.ts` - Text comparison and accuracy engine

### Content Management
- `populate-db.js` - Master content file (always create backups before changes)
- Content organized by learning paths with difficulty progression

### UI Components
- `src/components/training/TrainingScreen.tsx` - Main training orchestrator
- `src/components/ui/` - Design system components
- `src/app/globals.css` - CSS custom properties and theme definitions

## Development Guidelines

### Working with Content
- Always backup `populate-db.js` before making changes: `cp populate-db.js populate-db-backup-$(date +%Y%m%d-%H%M%S).js`
- Test content changes locally before deploying
- Maintain difficulty progression within learning paths
- Verify attribution accuracy for all quotes

### State Management
- Authentication state managed via React Context
- Progress tracking handles both anonymous and authenticated states
- Theme preferences persisted in localStorage

### Performance Considerations
- Static generation for public pages
- Client-side state for training interactions
- Optimized font loading with `display: swap`
- Responsive design with mobile-first approach

### Database Operations
- Use `populate-db.js` for content updates (clears and replaces all passages)
- Progress data persists across content updates
- Test database changes in development environment first