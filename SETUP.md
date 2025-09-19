# Job Management Admin Interface - Setup Guide

This is a comprehensive setup guide for the Job Management Admin Interface project.

## Project Overview

A full-stack application built with modern technologies:

### Backend (NestJS)
- **Framework**: NestJS 10.x with TypeScript
- **Database**: PostgreSQL 15+ with TypeORM
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI
- **Features**: CRUD operations, filtering, pagination, sorting

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **UI Library**: Mantine 7.x
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state
- **Features**: Responsive design, real-time search, advanced filtering

### Shared Package
- **Types**: Shared TypeScript interfaces
- **Validation**: Zod schemas for form validation
- **Utilities**: API helpers and common functions

## Prerequisites

Make sure you have the following installed:

- **Node.js**: 18+ (recommended: 20+)
- **pnpm**: 8+ (`npm install -g pnpm`)
- **Docker**: Latest version
- **Docker Compose**: Latest version

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies for the monorepo
pnpm install
```

### 2. Start Database

```bash
# Start PostgreSQL database in Docker
pnpm docker:up
```

Wait for the database to be ready (check Docker logs).

### 3. Setup Environment Variables

The `.env` and `.env.local` files are already created with default values:

- **Backend**: `backend/.env`
- **Frontend**: `frontend/.env.local`

### 4. Build Shared Package

```bash
# Build the shared types package
pnpm --filter shared build
```

### 5. Run Database Migration

```bash
# Run database migrations (creates tables)
pnpm db:migrate
```

### 6. Seed Database (Optional)

```bash
# Add sample job data
pnpm db:seed
```

### 7. Start Development Servers

```bash
# Start both backend and frontend
pnpm dev
```

This will start:
- **Backend API**: http://localhost:3001
- **Frontend App**: http://localhost:3000
- **API Documentation**: http://localhost:3001/api/docs

## Available Scripts

### Root Level Commands

```bash
# Development
pnpm dev                    # Start all services
pnpm build                  # Build all packages
pnpm test                   # Run all tests
pnpm lint                   # Lint all packages

# Database
pnpm docker:up             # Start database
pnpm docker:down           # Stop database
pnpm db:migrate            # Run migrations
pnpm db:seed              # Seed sample data
```

### Individual Package Commands

```bash
# Backend only
pnpm --filter backend dev
pnpm --filter backend build
pnpm --filter backend test

# Frontend only
pnpm --filter frontend dev
pnpm --filter frontend build
pnpm --filter frontend test

# Shared package only
pnpm --filter shared build
```

## Project Structure

```
cybermind/
├── backend/                # NestJS API server
│   ├── src/
│   │   ├── jobs/          # Job module (entities, DTOs, service, controller)
│   │   ├── database/      # Database config, migrations, seeds
│   │   └── main.ts        # Application entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API client
│   │   └── providers/     # React context providers
│   ├── package.json
│   └── next.config.js
├── shared/                 # Shared types and utilities
│   ├── src/
│   │   ├── types/         # TypeScript interfaces
│   │   ├── schemas/       # Zod validation schemas
│   │   └── utils/         # Common utilities
│   └── package.json
├── docker-compose.yml      # Database services
├── package.json           # Root package.json
└── pnpm-workspace.yaml    # Workspace configuration
```

## Features Implemented

### ✅ Job Management
- Create, read, update, delete job postings
- Form validation with comprehensive error handling
- Rich text editing for job descriptions

### ✅ Advanced Filtering
- Search by job title and location
- Filter by job type (Full-time, Part-time, Contract, Internship)
- Salary range filtering with interactive slider
- Clear all filters functionality

### ✅ Data Management
- Pagination with customizable page sizes
- Sorting by multiple fields (date, title, company, etc.)
- Real-time search and filtering
- Responsive data table

### ✅ User Experience
- Responsive design works on all screen sizes
- Loading states and error handling
- Toast notifications for user feedback
- Modal confirmations for destructive actions

### ✅ Developer Experience
- TypeScript end-to-end type safety
- Shared types between frontend and backend
- Comprehensive API documentation
- Development tools (ESLint, Prettier)
- Hot reload for development

## API Endpoints

### Job Management
- `GET /api/jobs` - List jobs with filtering and pagination
- `POST /api/jobs` - Create a new job
- `GET /api/jobs/:id` - Get job details
- `PATCH /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Query Parameters for Listing
- `title` - Search in job title
- `location` - Filter by location
- `jobType` - Filter by job type
- `salaryMin` / `salaryMax` - Salary range filtering
- `page` / `limit` - Pagination
- `sortBy` / `sortOrder` - Sorting

## Database Schema

The Job entity includes:
- `id` (UUID) - Primary key
- `title` (String) - Job title
- `companyName` (String) - Company name
- `location` (String) - Job location
- `jobType` (Enum) - Employment type
- `salaryRange` (String, Optional) - Salary information
- `description` (Text) - Job description
- `requirements` (Text) - Job requirements
- `responsibilities` (Text) - Job responsibilities
- `applicationDeadline` (Date) - Application deadline
- `createdAt` / `updatedAt` (Timestamps) - Audit fields

## Troubleshooting

### Database Connection Issues
```bash
# Check if database is running
docker ps

# View database logs
docker logs cybermind_postgres

# Restart database
pnpm docker:down && pnpm docker:up
```

### Build Issues
```bash
# Clean and rebuild
rm -rf node_modules dist .next
pnpm install
pnpm build
```

### Port Conflicts
If ports 3000, 3001, or 5432 are in use:
1. Update the port numbers in the configuration files
2. Update the corresponding environment variables

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in backend environment
2. Configure production database connection
3. Build all packages: `pnpm build`
4. Serve frontend with a static file server
5. Run backend with `pnpm --filter backend start:prod`

## Next Steps

Future enhancements could include:
- User authentication and authorization
- Email notifications for job applications
- File upload for job attachments
- Advanced analytics and reporting
- Integration with external job boards
- Mobile app development

---

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all services are running
3. Ensure database is accessible
4. Check environment variables are correct

Happy coding! 🚀