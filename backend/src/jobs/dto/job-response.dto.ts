import { ApiProperty } from '@nestjs/swagger';
import { Job } from '../entities/job.entity';

export class JobResponseDto {
  @ApiProperty({
    description: 'List of jobs',
    type: [Job],
  })
  data: Job[];

  @ApiProperty({
    description: 'Total number of jobs',
    example: 50,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 5,
  })
  totalPages: number;
}