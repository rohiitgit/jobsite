-- Create job_type enum
CREATE TYPE job_type_enum AS ENUM ('full-time', 'part-time', 'contract', 'internship');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";