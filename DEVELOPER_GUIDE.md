# Developer Guide

This guide provides comprehensive technical documentation for developers contributing to Eduba, covering architecture, development workflows, and implementation details.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Database Design](#database-design)
- [Authentication System](#authentication-system)
- [State Management](#state-management)
- [Styling and Design System](#styling-and-design-system)
- [API Integration](#api-integration)
- [Development Workflow](#development-workflow)
- [Testing Strategy](#testing-strategy)
- [Performance Guidelines](#performance-guidelines)
- [Security Considerations](#security-considerations)
- [Contributing Guidelines](#contributing-guidelines)

## Architecture Overview

### Technology Stack

**Frontend Framework**:
- Next.js 16.1.1 with App Router
- React 19.2.3 with modern hooks and patterns
- TypeScript for full type safety
- Server-side rendering and static generation

**Backend Services**:
- Supabase for database and authentication
- PostgreSQL with Row Level Security (RLS)
- Real-time subscriptions for data updates

**Styling and UI**:
- Tailwind CSS with custom design system
- Mobile-first responsive design
- Semantic color palette for accessibility
- Custom component library

**Deployment and Infrastructure**:
- Vercel for hosting and CI/CD
- Edge functions for global performance
- Automatic HTTPS and CDN distribution

### Core Design Principles

1. **Progressive Enhancement**: Core functionality works without JavaScript
2. **Accessibility First**: WCAG 2.1 AA compliance throughout
3. **Performance Focused**: Optimized for fast loading and smooth interactions
4. **Type Safety**: Comprehensive TypeScript coverage
5. **Clean Architecture**: Separation of concerns and modular design

## Development Setup

### Prerequisites

```bash
# Required versions
node --version  # v18.0.0 or higher
npm --version   # v8.0.0 or higher
git --version   # v2.30.0 or higher
```

### Local Environment Setup

1. **Clone and Install**:
   ```bash
   git clone <repository-url>
   cd eduba-app
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.local.example .env.local
   ```

   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Database Setup**:
   - Follow instructions in `DATABASE_SETUP.md`
   - Ensure schema and seed data are applied

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

### Development Tools

**Required Extensions** (VS Code):
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ESLint
- Prettier

**Optional but Recommended**:
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens
- Thunder Client (for API testing)

## Project Structure

```
eduba-app/
├── src/                          # Source code
│   ├── app/                      # Next.js App Router pages
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── reset-password/page.tsx
│   │   ├── dashboard/page.tsx    # User dashboard
│   │   ├── path/[pathId]/        # Learning path pages
│   │   ├── practice/[passageId]/ # Practice session pages
│   │   ├── design-system/        # Component showcase
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage
│   │   └── globals.css          # Global styles
│   ├── components/               # React components
│   │   └── ui/                  # Design system components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── form.tsx
│   │       ├── typography.tsx
│   │       └── index.ts         # Component exports
│   ├── lib/                     # Utility functions and configs
│   │   ├── auth.tsx            # Authentication context
│   │   ├── supabase.ts         # Supabase client
│   │   ├── comparison.ts       # Text comparison logic
│   │   ├── progress.ts         # Progress calculation
│   │   └── utils.ts            # General utilities
│   ├── types/                   # TypeScript type definitions
│   │   └── speech.d.ts         # Speech API types
│   └── middleware.ts            # Next.js middleware
├── database/                    # Database schema and seeds
│   ├── schema.sql              # Database structure
│   └── seed_data_enhanced.sql  # Initial content
├── public/                     # Static assets
│   ├── icons/
│   └── images/
├── docs/                       # Documentation
└── package.json               # Dependencies and scripts
```

### Key Directories Explained

**`src/app/`**: Next.js App Router pages with file-based routing
**`src/components/ui/`**: Reusable UI components following design system
**`src/lib/`**: Business logic, utilities, and external service integrations
**`database/`**: PostgreSQL schema and initial data
**`public/`**: Static assets served directly by Next.js

## Component Architecture

### Design System Components

**Base Components** (`src/components/ui/`):

```typescript
// Example: Button Component
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  // ... other props
}

export function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  // Implementation with Tailwind classes
}
```

**Typography System**:
- `Heading`: Semantic headings with proper hierarchy
- `BodyText`: Optimized paragraph text for reading
- `Caption`: Small text for metadata

**Layout Components**:
- `Container`: Responsive page containers
- `Section`: Page sections with consistent spacing
- `Card`: Content containers with elevation

### Page Components

**Authentication Pages**:
- Consistent design across login/signup/reset
- Form validation and error handling
- Supabase Auth integration

**Dashboard**:
- Progress overview and learning path cards
- Real-time data updates
- Responsive layout for all screen sizes

**Practice Sessions**:
- Text comparison engine
- Real-time feedback display
- Voice input integration

## Database Design

### Schema Overview

```sql
-- Core Tables
passages           -- Learning content
user_progress      -- Individual user progress per passage
user_streaks       -- Practice streak tracking (optional)

-- Supabase Auth Tables (managed)
auth.users         -- User accounts and authentication
```

### Passages Table

```sql
CREATE TABLE passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,              -- 'stoics', 'founders', 'poets'
  title TEXT NOT NULL,             -- Passage title
  author TEXT,                     -- Author name
  content TEXT NOT NULL,           -- Full passage text
  difficulty_order INTEGER NOT NULL, -- Sequence within path
  created_at TIMESTAMP DEFAULT NOW()
);
```

### User Progress Table

```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  passage_id UUID REFERENCES passages(id) ON DELETE CASCADE,
  best_accuracy FLOAT,             -- Best accuracy percentage achieved
  attempts INTEGER DEFAULT 0,      -- Number of practice attempts
  completed BOOLEAN DEFAULT FALSE, -- Whether user has mastered passage
  completed_at TIMESTAMP,         -- When passage was completed
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, passage_id)     -- One progress record per user/passage
);
```

### Row Level Security (RLS)

**Security Policies**:
- Passages: Public read access for all users
- User Progress: Users can only access their own data
- Automatic user_id enforcement through RLS policies

## Authentication System

### Supabase Auth Integration

**Authentication Context** (`src/lib/auth.tsx`):

```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Implementation using Supabase Auth
}
```

**Protected Routes**: Middleware-based route protection for authenticated pages

**Session Management**: Automatic token refresh and persistent sessions

## State Management

### React Context Pattern

**Auth State**: Global authentication state via React Context
**Local State**: Component-level state using useState and useReducer
**Server State**: Real-time data from Supabase with automatic updates

### Data Fetching Patterns

```typescript
// Example: Fetching user progress
const { data: progress, error } = await supabase
  .from('user_progress')
  .select('*')
  .eq('user_id', user.id);
```

## Styling and Design System

### Tailwind CSS Configuration

**Custom Color Palette** (see `tailwind.config.ts`):
- `brand`: Primary brand colors (slate-based)
- `correct`: Success/correct feedback (green)
- `incorrect`: Error/incorrect feedback (red)
- `reading`: Optimized colors for text content

**Typography Scale**:
- `reading-*`: Sizes optimized for content reading
- `ui-*`: Sizes for interface elements
- `heading-*`: Hierarchy for headings

**Design Tokens**:
```typescript
// Example usage in components
className="bg-brand-500 text-reading-text font-reading-base"
```

### Component Styling Conventions

1. **Utility-First**: Use Tailwind utilities for styling
2. **Component Variants**: Define variants through props
3. **Responsive Design**: Mobile-first breakpoint usage
4. **Accessibility**: Include focus states and ARIA attributes

## API Integration

### Supabase Client Configuration

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Data Fetching Patterns

**Read Operations**:
```typescript
// Get passages for a specific path
const getPassagesByPath = async (path: string) => {
  const { data, error } = await supabase
    .from('passages')
    .select('*')
    .eq('path', path)
    .order('difficulty_order');

  return { data, error };
};
```

**Write Operations**:
```typescript
// Update user progress
const updateProgress = async (passageId: string, accuracy: number) => {
  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      passage_id: passageId,
      best_accuracy: accuracy,
      attempts: 1
    }, {
      onConflict: 'user_id,passage_id'
    });

  return { error };
};
```

## Development Workflow

### Git Workflow

1. **Feature Branches**: Create branches from main for new features
2. **Commit Messages**: Use conventional commit format
3. **Pull Requests**: Required for all changes to main
4. **Code Review**: At least one review required before merging

### Branch Naming Convention

```
feature/user-dashboard-improvements
fix/authentication-redirect-bug
docs/update-deployment-guide
refactor/simplify-progress-calculation
```

### Commit Message Format

```
feat: add voice input support for practice sessions
fix: resolve accuracy calculation edge case
docs: update developer setup instructions
style: improve button component consistency
refactor: extract text comparison logic
test: add unit tests for progress calculations
```

### Code Quality Tools

**ESLint Configuration**:
- Next.js recommended rules
- TypeScript strict mode
- Accessibility rules (jsx-a11y)

**Prettier Configuration**:
- Consistent code formatting
- Automatic formatting on save

## Testing Strategy

### Unit Testing

**Jest and React Testing Library**:
- Component behavior testing
- Business logic validation
- Mock external dependencies

### Integration Testing

**Database Operations**:
- Test Supabase queries and mutations
- Verify RLS policy enforcement
- Validate data transformations

### End-to-End Testing

**Playwright (Recommended)**:
- Complete user workflows
- Authentication flows
- Practice session functionality

### Testing File Structure

```
src/
├── __tests__/
│   ├── components/
│   │   └── ui/
│   ├── lib/
│   └── pages/
└── components/
    └── ui/
        ├── button.tsx
        └── button.test.tsx
```

## Performance Guidelines

### Next.js Optimization

**Static Generation**:
- Use `generateStaticParams` for passage pages
- Pre-render public content at build time
- Implement ISR for content that changes infrequently

**Code Splitting**:
- Automatic route-based splitting
- Dynamic imports for heavy components
- Bundle analysis with `@next/bundle-analyzer`

### Database Performance

**Query Optimization**:
- Use appropriate indexes (defined in schema.sql)
- Limit data fetching to necessary fields
- Implement pagination for large datasets

**Connection Management**:
- Use Supabase connection pooling
- Implement query caching where appropriate
- Monitor database performance metrics

## Security Considerations

### Authentication Security

**Password Requirements**:
- Minimum 8 characters
- Complexity requirements enforced by Supabase
- Password reset functionality with email verification

**Session Security**:
- HTTP-only cookies for session tokens
- Automatic token refresh
- Secure logout functionality

### Data Protection

**Row Level Security**:
- All tables have RLS enabled
- Policies prevent unauthorized access
- User data isolation enforced at database level

**Input Validation**:
- Client-side validation for UX
- Server-side validation for security
- SQL injection prevention through parameterized queries

### Environment Security

**Environment Variables**:
- Never commit secrets to repository
- Use Vercel environment variable encryption
- Rotate keys regularly

## Contributing Guidelines

### Getting Started

1. **Fork Repository**: Create personal fork
2. **Clone Fork**: Work in local environment
3. **Create Branch**: Use descriptive branch names
4. **Make Changes**: Follow coding standards
5. **Test Changes**: Run all tests locally
6. **Submit PR**: Use PR template and description

### Code Standards

**TypeScript**:
- Use strict mode
- Define proper interfaces for all data structures
- Avoid `any` type usage

**React Components**:
- Use functional components with hooks
- Implement proper prop types
- Follow React best practices

**Styling**:
- Use design system components when possible
- Follow mobile-first responsive patterns
- Ensure accessibility compliance

### Pull Request Process

1. **Pre-PR Checklist**:
   - [ ] All tests pass locally
   - [ ] Code follows style guidelines
   - [ ] Documentation updated if needed
   - [ ] No console errors in browser

2. **PR Description**:
   - Clear description of changes
   - Link to relevant issues
   - Screenshots for UI changes
   - Breaking change notes if applicable

3. **Review Process**:
   - Code review by maintainers
   - Automated CI/CD checks
   - Manual testing if needed
   - Approval required before merge

### Issue Reporting

**Bug Reports**:
- Clear reproduction steps
- Environment details
- Screenshots if applicable
- Console error logs

**Feature Requests**:
- Clear use case description
- Implementation suggestions
- UI/UX considerations
- Impact assessment

---

This developer guide provides the foundation for contributing to Eduba. For specific implementation questions or clarifications, refer to the codebase or create an issue for discussion.

**Contact**: Use GitHub issues for technical questions and feature discussions.