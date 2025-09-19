# Job Management Admin Interface

A full-stack application for managing job postings with a modern tech stack.

## Tech Stack

### Backend
- **NestJS** - Node.js framework with TypeScript
- **PostgreSQL** - Database with TypeORM
- **Docker** - Containerized development environment

### Frontend
- **Next.js 14** - React framework with App Router
- **Mantine** - Modern React components library
- **React Hook Form** - Form handling and validation
- **TanStack Query** - Server state management

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+
- Docker & Docker Compose

### Installation

1. **Clone and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start the database:**
   ```bash
   pnpm docker:up
   ```

3. **Run database migrations:**
   ```bash
   pnpm db:migrate
   ```

4. **Start development servers:**
   ```bash
   pnpm dev
   ```

This will start:
- Backend API: http://localhost:3001
- Frontend: http://localhost:3000
- Database: postgresql://postgres:postgres@localhost:5432/cybermind_jobs

## Development Commands

```bash
# Start all services
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Database commands
pnpm docker:up          # Start database
pnpm docker:down        # Stop database
pnpm db:migrate         # Run migrations
pnpm db:seed           # Seed data
```

## Project Structure

```
cybermind/
├── backend/           # NestJS API
├── frontend/          # Next.js app
├── shared/            # Shared types
└── docker-compose.yml # Development services
```

## Features

- ✅ Job listing with advanced filtering
- ✅ Job creation/editing forms
- ✅ Responsive design with Mantine UI
- ✅ Form validation with React Hook Form
- ✅ TypeScript end-to-end
- ✅ Real-time search and filtering
- ✅ Pagination and sorting