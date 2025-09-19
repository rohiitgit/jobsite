# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Quick Start
```bash
pnpm install              # Install all dependencies
pnpm docker:up            # Start PostgreSQL database
pnpm --filter shared build  # Build shared types package (required first)
pnpm db:migrate           # Run database migrations
pnpm dev                  # Start both backend and frontend
```

### Essential Commands
```bash
# Development
pnpm dev                  # Start backend (3001) and frontend (3000)
pnpm build                # Build all packages (shared → backend → frontend)
pnpm test                 # Run all tests
pnpm lint                 # Lint all packages

# Database Management
pnpm docker:up            # Start PostgreSQL container
pnpm docker:down          # Stop PostgreSQL container
pnpm db:migrate           # Run TypeORM migrations
pnpm db:seed              # Seed database with sample data

# Individual Package Commands
pnpm --filter backend dev     # Backend only (NestJS)
pnpm --filter frontend dev    # Frontend only (Next.js)
pnpm --filter shared build   # Build shared types (required before backend/frontend)
```

### Testing
```bash
# Backend testing
pnpm --filter backend test        # Unit tests
pnpm --filter backend test:watch  # Watch mode
pnpm --filter backend test:e2e    # E2E tests

# Frontend testing
pnpm --filter frontend test       # Next.js tests
pnpm --filter frontend type-check # TypeScript check
```

## Architecture Overview

### Monorepo Structure
- **backend/**: NestJS API server with PostgreSQL + TypeORM
- **frontend/**: Next.js 14 app with Mantine UI components
- **shared/**: TypeScript interfaces and Zod validation schemas

### Key Technical Details

#### Backend (NestJS)
- **Database**: PostgreSQL with TypeORM for migrations and entities
- **API**: RESTful endpoints at `/api/jobs` with full CRUD operations
- **Validation**: class-validator for DTOs, Swagger for API docs
- **Main Entity**: Job entity with fields like title, companyName, location, jobType, salaryRange
- **Database URL**: postgresql://postgres:postgres@localhost:5432/cybermind_jobs

#### Frontend (Next.js)
- **UI Framework**: Mantine 7.x with comprehensive component library
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation from shared package
- **Routing**: Next.js 14 App Router

#### Shared Package
- **Purpose**: Type safety between frontend and backend
- **Contains**: TypeScript interfaces, Zod schemas, API helpers
- **Build Requirement**: Must be built before other packages can use it

### Development Workflow
1. Always start with shared package build when making type changes
2. Database must be running before backend starts
3. Backend serves API docs at http://localhost:3001/api/docs
4. Frontend development server includes hot reload and dev tools

### Key Features Implemented
- Job CRUD operations with form validation
- Advanced filtering (search, job type, salary range)
- Pagination and sorting
- Responsive design
- Real-time search and filtering
- Toast notifications and modal confirmations