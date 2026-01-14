# Deployment Guide

This guide provides step-by-step instructions for deploying Eduba to production using Vercel and Supabase.

## Prerequisites

- GitHub account with repository access
- Vercel account (free tier available)
- Supabase account (free tier available)
- Node.js 18+ for local testing

## Quick Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database schema and seed data applied
- [ ] Environment variables configured
- [ ] Vercel project connected to repository
- [ ] Production build tested locally
- [ ] Domain configured (optional)
- [ ] Post-deployment testing completed

## 1. Supabase Setup

### Create New Project

1. Visit [Supabase Console](https://supabase.com/dashboard)
2. Click "New project"
3. Choose your organization
4. Enter project details:
   - **Name**: `eduba-production` (or your preferred name)
   - **Database Password**: Use a strong, unique password
   - **Region**: Choose closest to your users

### Configure Database

1. **Apply Schema**:
   - Go to SQL Editor in Supabase dashboard
   - Copy content from `database/schema.sql`
   - Execute the SQL to create tables and policies

2. **Seed Initial Data**:
   - In SQL Editor, run `database/seed_data_enhanced.sql`
   - This creates the learning paths and passages
   - Verify data by checking the Tables tab

### Configure Authentication

1. **Go to Authentication > Settings**
2. **Site URL**: Set to your production domain (e.g., `https://eduba.vercel.app`)
3. **Redirect URLs**: Add your domain for OAuth redirects
4. **Email Templates**: Customize if needed
5. **Enable Email Confirmation**: Recommended for production

### Get API Credentials

1. Go to Settings > API
2. Copy these values (you'll need them for Vercel):
   - **Project URL**: `https://your-project.supabase.co`
   - **Anon/Public Key**: `eyJ...` (long string starting with eyJ)

## 2. Vercel Deployment

### Connect Repository

1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." > "Project"
3. Import your Git repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: Leave as `.` (if deploying from root)
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave default

### Configure Environment Variables

In Vercel project settings, add these environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Security Notes**:
- Never commit these values to your repository
- Use Vercel's environment variable encryption
- Regenerate keys if accidentally exposed

### Deploy

1. Click "Deploy" in Vercel
2. Monitor build process in deployment logs
3. Fix any build errors that arise
4. Verify successful deployment

## 3. Production Verification

### Build Testing

Before deploying, test the production build locally:

```bash
# Clean previous builds
rm -rf .next

# Create production build
npm run build

# Start production server
npm start

# Test at http://localhost:3000
```

### Post-Deployment Checklist

1. **Authentication Flow**:
   - [ ] User registration works
   - [ ] Email verification functions
   - [ ] Sign-in process successful
   - [ ] Password reset functional

2. **Core Functionality**:
   - [ ] Homepage loads correctly
   - [ ] Learning paths display
   - [ ] Practice sessions work
   - [ ] Progress tracking functions
   - [ ] Voice input works (if applicable)

3. **Performance**:
   - [ ] Page load times under 3 seconds
   - [ ] Mobile responsiveness
   - [ ] No console errors
   - [ ] All static assets load

4. **Database Connectivity**:
   - [ ] User data saves correctly
   - [ ] Progress persists between sessions
   - [ ] No connection timeouts

## 4. Domain Configuration (Optional)

### Custom Domain Setup

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domain

2. **DNS Configuration**:
   - Add CNAME record pointing to Vercel
   - Wait for DNS propagation (can take up to 48 hours)

3. **Update Supabase Settings**:
   - Change Site URL to your custom domain
   - Update redirect URLs accordingly

## 5. Environment-Specific Configuration

### Development vs Production

Create separate Supabase projects for different environments:

- **Development**: `eduba-dev`
- **Staging**: `eduba-staging` (optional)
- **Production**: `eduba-production`

### Environment Variables by Environment

**Development** (`.env.local`):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dev_key_here
```

**Production** (Vercel):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod_key_here
```

## 6. Monitoring and Maintenance

### Vercel Analytics

1. Enable Vercel Analytics in project settings
2. Monitor performance and usage patterns
3. Set up alerts for deployment failures

### Supabase Monitoring

1. Monitor database performance in Supabase dashboard
2. Check authentication logs for issues
3. Monitor storage usage and upgrade plan if needed

### Regular Maintenance Tasks

- **Weekly**: Review error logs and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Review and optimize database queries
- **Annually**: Audit security configurations

## 7. Troubleshooting

### Common Build Issues

**Module Resolution Errors**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Environment Variable Issues**:
- Ensure variables are properly set in Vercel
- Check for typos in variable names
- Verify Supabase credentials are correct

### Runtime Issues

**Authentication Failures**:
- Verify Site URL in Supabase matches deployment URL
- Check that redirect URLs are configured correctly
- Ensure anon key has proper permissions

**Database Connection Issues**:
- Verify RLS policies are correctly configured
- Check that database schema is properly applied
- Ensure user has appropriate permissions

### Performance Issues

**Slow Load Times**:
- Optimize images and static assets
- Enable Vercel Edge Functions if needed
- Consider implementing caching strategies

**Database Query Performance**:
- Review and optimize slow queries
- Add appropriate database indexes
- Consider implementing connection pooling

## 8. Scaling Considerations

### Traffic Growth

**Supabase Scaling**:
- Monitor database connection limits
- Upgrade to Pro plan for higher limits
- Implement connection pooling for high traffic

**Vercel Scaling**:
- Pro plan for commercial use
- Enable Edge Functions for global performance
- Consider CDN for static assets

### Feature Additions

**Database Migrations**:
- Plan schema changes carefully
- Test migrations on staging environment
- Implement rollback procedures

**Code Deployments**:
- Use feature flags for gradual rollouts
- Implement proper CI/CD pipelines
- Maintain staging environment for testing

## Support

For deployment issues:

1. Check Vercel deployment logs
2. Review Supabase project logs
3. Consult Next.js deployment documentation
4. Reach out via project repository issues

---

This deployment guide ensures a smooth, secure, and scalable production deployment of the Eduba memory training platform.