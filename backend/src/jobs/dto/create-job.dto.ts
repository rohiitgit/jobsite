import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { JobType } from '../entities/job.entity';

export class CreateJobDto {
  @ApiProperty({
    description: 'Job title',
    example: 'Senior Full Stack Developer',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'Company name',
    example: 'TechCorp Inc.',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  companyName: string;

  @ApiProperty({
    description: 'Job location',
    example: 'San Francisco, CA',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  location: string;

  @ApiProperty({
    description: 'Type of employment',
    enum: JobType,
    example: JobType.FULL_TIME,
  })
  @IsEnum(JobType)
  jobType: JobType;

  @ApiProperty({
    description: 'Salary range',
    example: '$80,000 - $120,000',
    required: false,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  salaryRange?: string;

  @ApiProperty({
    description: 'Job description',
    example: 'We are looking for a skilled developer...',
    minLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @ApiProperty({
    description: 'Job requirements',
    example: '5+ years of experience with React and Node.js...',
    minLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  requirements: string;

  @ApiProperty({
    description: 'Job responsibilities',
    example: 'Develop and maintain web applications...',
    minLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  responsibilities: string;

  @ApiProperty({
    description: 'Application deadline (ISO date string)',
    example: '2024-12-31',
  })
  @IsDateString()
  applicationDeadline: string;
}