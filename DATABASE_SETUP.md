# Database Setup Guide

This guide provides detailed instructions for setting up the Supabase database for Eduba, including schema creation, data seeding, and configuration.

## Overview

Eduba uses Supabase (PostgreSQL) for its database layer, providing:
- User authentication and management
- Memory training content storage
- Progress tracking and analytics
- Real-time data synchronization
- Row Level Security (RLS) for data protection

## Prerequisites

- Supabase account (free tier available at [supabase.com](https://supabase.com))
- Basic understanding of SQL and PostgreSQL
- Access to Supabase SQL Editor

## Quick Setup Checklist

- [ ] Create Supabase project
- [ ] Apply database schema
- [ ] Seed initial content data
- [ ] Configure authentication settings
- [ ] Set up Row Level Security policies
- [ ] Test database connectivity
- [ ] Configure environment variables

## 1. Create Supabase Project

### Step 1: Create New Project

1. **Sign in** to [Supabase Dashboard](https://supabase.com/dashboard)
2. **Click** "New project"
3. **Select** your organization (create one if needed)
4. **Configure** project settings:
   - **Name**: `eduba-production` (or preferred name)
   - **Database Password**: Generate strong password (save securely)
   - **Region**: Choose closest to your target users
   - **Pricing Plan**: Start with Free (upgrade as needed)

### Step 2: Wait for Project Initialization

- Project creation takes 2-3 minutes
- You'll receive email confirmation when ready
- Database URL and API keys will be generated

## 2. Database Schema Setup

### Step 1: Access SQL Editor

1. **Navigate** to SQL Editor in Supabase dashboard
2. **Click** "New query" to create new SQL script
3. **Copy** the complete schema from `database/schema.sql`

### Step 2: Apply Database Schema

**Execute this SQL** (from `database/schema.sql`):

```sql
-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create passages table
CREATE TABLE IF NOT EXISTS passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,  -- 'stoics', 'founders', 'poets', etc.
  title TEXT NOT NULL,
  author TEXT,
  content TEXT NOT NULL,
  difficulty_order INTEGER NOT NULL,  -- 1, 2, 3... determines sequence
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create user progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  passage_id UUID REFERENCES passages(id) ON DELETE CASCADE,
  best_accuracy FLOAT,
  attempts INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, passage_id)
);

-- Create user streaks table (optional for MVP)
CREATE TABLE IF NOT EXISTS user_streaks (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_practice_date DATE
);

-- Enable Row Level Security on all tables
ALTER TABLE passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for passages (public read access)
CREATE POLICY "Anyone can read passages" ON passages
  FOR SELECT USING (true);

-- RLS Policies for user_progress (users can only see their own progress)
CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_streaks (users can only see their own streaks)
CREATE POLICY "Users can view their own streaks" ON user_streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own streaks" ON user_streaks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks" ON user_streaks
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_passages_path_order ON passages(path, difficulty_order);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_passage_id ON user_progress(passage_id);
```

### Step 3: Verify Schema Creation

1. **Go to** Table Editor in Supabase dashboard
2. **Verify** these tables exist:
   - `passages`
   - `user_progress`
   - `user_streaks`
3. **Check** table structures match schema definition

## 3. Data Seeding

### Step 1: Prepare Seed Data

1. **Open** new SQL query in Supabase SQL Editor
2. **Copy** content from `database/seed_data_enhanced.sql`
3. **Review** content to ensure it matches your needs

### Step 2: Execute Seed Data

**Run the seed SQL** (from `database/seed_data_enhanced.sql`):

This will create:
- **20 Stoics passages**: Marcus Aurelius, Seneca, Epictetus
- **20 Founders passages**: Declaration of Independence, Constitution, key speeches
- **20 Poets passages**: Shakespeare, Wordsworth, other masters

### Step 3: Verify Data Import

**Check data was imported correctly**:

```sql
-- Count passages by path
SELECT path, COUNT(*) as passage_count
FROM passages
GROUP BY path
ORDER BY path;

-- Verify passage content sample
SELECT path, title, author, LEFT(content, 50) as content_preview
FROM passages
ORDER BY path, difficulty_order
LIMIT 10;
```

**Expected Results**:
- `founders`: 20 passages
- `poets`: 20 passages
- `stoics`: 20 passages

## 4. Authentication Configuration

### Step 1: Configure Auth Settings

1. **Navigate** to Authentication > Settings
2. **Configure** these settings:

**Site URL**:
- Development: `http://localhost:3000`
- Production: `https://your-domain.com`

**Redirect URLs**: Add both:
- `http://localhost:3000/auth/callback`
- `https://your-domain.com/auth/callback`

### Step 2: Email Template Configuration

**Configure email templates**:
- **Confirm signup**: Customize if needed
- **Magic Link**: Enable if using passwordless auth
- **Reset Password**: Customize reset flow

### Step 3: Security Settings

**Recommended settings**:
- **Enable email confirmations**: ✅ (for production)
- **Enable email change confirmations**: ✅
- **Secure email change**: ✅
- **Double confirm email changes**: ✅ (high security)

## 5. Row Level Security (RLS) Verification

### Understanding RLS Policies

**Passages Table**:
- ✅ Public read access for all users
- ❌ No write access (content is pre-seeded)

**User Progress Table**:
- ✅ Users can read only their own progress
- ✅ Users can insert their own progress records
- ✅ Users can update their own progress
- ❌ Users cannot see other users' data

**User Streaks Table**:
- ✅ Users can read only their own streaks
- ✅ Users can modify their own streak data
- ❌ Users cannot access other users' streaks

### Testing RLS Policies

**Test with SQL queries**:

```sql
-- Test passage access (should work for anyone)
SELECT COUNT(*) FROM passages;

-- Test user progress access (requires authentication)
-- This will return empty results in SQL editor (no auth context)
SELECT * FROM user_progress WHERE user_id = auth.uid();
```

### RLS Policy Troubleshooting

**Common Issues**:

1. **"insufficient privileges" errors**:
   - Verify RLS policies are correctly applied
   - Check that `auth.uid()` function is available
   - Ensure user is properly authenticated

2. **No data returned when expected**:
   - Verify user authentication status
   - Check that policies allow the intended operation
   - Test with authenticated requests from application

## 6. API Keys and Configuration

### Step 1: Get API Credentials

1. **Navigate** to Settings > API in Supabase dashboard
2. **Copy** these values:

```
Project URL: https://your-project-id.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Security Note**: Never expose `service_role` key in client-side code!

### Step 2: Configure Environment Variables

**For Development** (`.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**For Production** (Vercel environment variables):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 7. Testing Database Connectivity

### Step 1: Test from Application

**Create simple test component**:

```typescript
// Test connection
const testConnection = async () => {
  const { data, error } = await supabase
    .from('passages')
    .select('count')
    .limit(1);

  console.log('Connection test:', { data, error });
};
```

### Step 2: Verify CRUD Operations

**Test data operations**:

```typescript
// Test reading passages
const { data: passages } = await supabase
  .from('passages')
  .select('*')
  .eq('path', 'stoics')
  .limit(5);

// Test user progress (requires authentication)
const { data: progress } = await supabase
  .from('user_progress')
  .select('*')
  .eq('user_id', user.id);
```

### Step 3: Authentication Testing

**Test auth operations**:

```typescript
// Test sign up
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'securepassword'
});

// Test sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'securepassword'
});
```

## 8. Performance Optimization

### Database Indexes

**Verify indexes are created**:

```sql
-- Check indexes on passages table
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'passages';

-- Check indexes on user_progress table
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'user_progress';
```

**Expected indexes**:
- `idx_passages_path_order`: For efficient path-based queries
- `idx_user_progress_user_id`: For user-specific progress queries
- `idx_user_progress_passage_id`: For passage-specific progress queries

### Query Optimization

**Efficient query patterns**:

```sql
-- Good: Uses index on path and difficulty_order
SELECT * FROM passages
WHERE path = 'stoics'
ORDER BY difficulty_order;

-- Good: Uses index on user_id
SELECT * FROM user_progress
WHERE user_id = $1;

-- Avoid: Full table scans without proper indexes
SELECT * FROM passages
WHERE content LIKE '%meditation%';
```

## 9. Backup and Recovery

### Automated Backups

**Supabase automatic backups**:
- Free tier: 7 days of daily backups
- Pro tier: 30 days of daily backups
- Point-in-time recovery available in Pro tier

### Manual Backup

**Export database structure**:
```bash
# Export schema only
pg_dump --schema-only --no-owner --no-privileges \
  postgres://user:pass@host:port/database > schema_backup.sql

# Export data only
pg_dump --data-only --no-owner --no-privileges \
  postgres://user:pass@host:port/database > data_backup.sql
```

### Recovery Procedures

**Restore from backup**:
1. Create new Supabase project
2. Apply schema from backup
3. Import data from backup
4. Update application environment variables
5. Verify data integrity

## 10. Monitoring and Maintenance

### Database Monitoring

**Key metrics to monitor**:
- Active connections count
- Query performance (slow queries)
- Storage usage and growth
- Error rates and types

**Supabase dashboard monitoring**:
- Database health overview
- Real-time metrics
- Query performance insights
- Usage analytics

### Regular Maintenance Tasks

**Weekly**:
- Review slow query logs
- Monitor storage usage
- Check backup status
- Review authentication logs

**Monthly**:
- Analyze query performance trends
- Review and optimize indexes
- Update database statistics
- Check for security updates

**Quarterly**:
- Full database performance review
- Capacity planning assessment
- Security audit and updates
- Backup recovery testing

## 11. Troubleshooting

### Common Issues

**Connection Errors**:
```
Error: Invalid API key
```
**Solution**: Verify environment variables and API key format

**RLS Errors**:
```
Error: insufficient privileges for relation
```
**Solution**: Check RLS policies and user authentication

**Query Performance Issues**:
```
Slow query execution times
```
**Solution**: Add appropriate indexes, optimize query structure

### Debug Tools

**Supabase SQL Editor**:
- Test queries directly in dashboard
- View execution plans
- Monitor query performance

**Application Logging**:
```typescript
// Log Supabase errors
const { data, error } = await supabase
  .from('passages')
  .select('*');

if (error) {
  console.error('Supabase error:', error);
}
```

### Getting Help

**Resources**:
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Community Discord](https://discord.supabase.com/)
- Project repository issues for Eduba-specific questions

---

This database setup guide ensures a robust, secure, and performant database configuration for the Eduba memory training platform. Follow these steps carefully to avoid common pitfalls and ensure optimal performance.

**Security Reminder**: Never commit database credentials to version control. Use environment variables and secure credential management for all database access.