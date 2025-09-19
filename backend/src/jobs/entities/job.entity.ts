import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
}

@Entity('jobs')
export class Job {
  @ApiProperty({
    description: 'Unique identifier for the job',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Job title',
    example: 'Senior Full Stack Developer',
  })
  @Column({ length: 255 })
  title: string;

  @ApiProperty({
    description: 'Company name',
    example: 'TechCorp Inc.',
  })
  @Column({ name: 'company_name', length: 255 })
  companyName: string;

  @ApiProperty({
    description: 'Job location',
    example: 'San Francisco, CA',
  })
  @Column({ length: 255 })
  location: string;

  @ApiProperty({
    description: 'Type of employment',
    enum: JobType,
    example: JobType.FULL_TIME,
  })
  @Column({
    name: 'job_type',
    type: 'enum',
    enum: JobType,
  })
  jobType: JobType;

  @ApiProperty({
    description: 'Salary range',
    example: '$80,000 - $120,000',
    required: false,
  })
  @Column({ name: 'salary_range', length: 100, nullable: true })
  salaryRange?: string;

  @ApiProperty({
    description: 'Job description',
    example: 'We are looking for a skilled developer...',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    description: 'Job requirements',
    example: '5+ years of experience with React and Node.js...',
  })
  @Column('text')
  requirements: string;

  @ApiProperty({
    description: 'Job responsibilities',
    example: 'Develop and maintain web applications...',
  })
  @Column('text')
  responsibilities: string;

  @ApiProperty({
    description: 'Application deadline',
    example: '2024-12-31',
  })
  @Column({ name: 'application_deadline', type: 'date' })
  applicationDeadline: Date;

  @ApiProperty({
    description: 'Job creation timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Job last update timestamp',
    example: '2024-01-16T14:30:00Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}