# Vercel Deployment Guide

This guide will help you deploy the Job Management Admin Interface to Vercel with a PostgreSQL database.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install with `npm i -g vercel`
3. **Git Repository**: Push your code to GitHub/GitLab/Bitbucket

## Step 1: Set Up Vercel Postgres Database

1. **Create Database**:
   ```bash
   # Login to Vercel
   vercel login

   # Create a new Postgres database
   vercel postgres create cybermind-db
   ```

2. **Get Database Connection**:
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to Storage → Your Database
   - Copy the `DATABASE_URL` connection string

## Step 2: Deploy Backend API

1. **Deploy Backend**:
   ```bash
   # Navigate to backend directory
   cd backend

   # Deploy to Vercel
   vercel --prod
   ```

2. **Set Environment Variables**:
   In Vercel Dashboard → Your Backend Project → Settings → Environment Variables:
   ```
   NODE_ENV=production
   DATABASE_URL=<your-postgres-connection-string>
   FRONTEND_URL=<your-frontend-url-will-be-set-later>
   ```

3. **Run Database Migrations**:
   ```bash
   # Set up the database schema
   vercel env pull .env.local
   pnpm db:migrate

   # Optional: Seed with sample data
   pnpm db:seed
   ```

## Step 3: Deploy Frontend

1. **Deploy Frontend**:
   ```bash
   # Navigate to frontend directory
   cd ../frontend

   # Deploy to Vercel
   vercel --prod
   ```

2. **Set Environment Variables**:
   In Vercel Dashboard → Your Frontend Project → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=<your-backend-url>/api
   ```

## Step 4: Update CORS Configuration

1. **Update Backend Environment**:
   - Go to Backend Project → Settings → Environment Variables
   - Update `FRONTEND_URL` with your actual frontend URL
   - Redeploy: `vercel --prod`

## Step 5: Configure Custom Domains (Optional)

1. **Add Custom Domain**:
   - Frontend: `app.yourdomain.com`
   - Backend: `api.yourdomain.com`

2. **Update Environment Variables**:
   - Update `NEXT_PUBLIC_API_URL` to use custom domain
   - Update `FRONTEND_URL` in backend to use custom domain

## Environment Variables Summary

### Backend Environment Variables
```
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend Environment Variables
```
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
```

## Deployment Commands

### One-time Setup
```bash
# Deploy both projects
vercel --prod

# Set up database
vercel postgres create cybermind-db
```

### Regular Deployments
```bash
# Deploy backend changes
cd backend && vercel --prod

# Deploy frontend changes
cd frontend && vercel --prod

# Deploy both (from root)
vercel --prod
```

## Troubleshooting

### Database Connection Issues
1. Verify `DATABASE_URL` is correctly set
2. Check that SSL is enabled in production
3. Ensure database migrations have been run

### CORS Issues
1. Verify `FRONTEND_URL` matches your actual frontend URL
2. Check that both HTTP and HTTPS URLs are handled
3. Ensure environment variables are saved and deployed

### Build Issues
1. Ensure shared package builds first: `pnpm --filter shared build`
2. Check that all dependencies are listed in package.json
3. Verify TypeScript compilation: `pnpm build`

### Performance Optimization
1. Enable Vercel Analytics in dashboard
2. Configure caching headers for API responses
3. Use Vercel Edge Functions for geo-distributed API

## Production URLs

After deployment, your application will be available at:
- **Frontend**: `https://your-project-name.vercel.app`
- **Backend API**: `https://your-backend-name.vercel.app/api`
- **API Documentation**: `https://your-backend-name.vercel.app/api/docs`

## Monitoring and Maintenance

1. **Vercel Analytics**: Monitor performance and usage
2. **Database Monitoring**: Check Vercel Postgres metrics
3. **Error Tracking**: Set up Sentry or similar service
4. **Backup Strategy**: Configure database backups

## Security Considerations

1. **Environment Variables**: Never commit production secrets
2. **CORS Configuration**: Restrict to specific domains
3. **Database Access**: Use connection pooling
4. **API Rate Limiting**: Implement if needed

## Next Steps

1. Set up monitoring and alerting
2. Configure CI/CD pipeline with GitHub Actions
3. Add database backup strategy
4. Implement caching strategy
5. Set up staging environment