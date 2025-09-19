import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobQueryDto } from './dto/job-query.dto';
import { JobResponseDto } from './dto/job-response.dto';
import { Job } from './entities/job.entity';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job posting' })
  @ApiResponse({
    status: 201,
    description: 'Job created successfully',
    type: Job,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
  })
  async create(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs with filtering and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Jobs retrieved successfully',
    type: JobResponseDto,
  })
  async findAll(@Query() queryDto: JobQueryDto): Promise<JobResponseDto> {
    return this.jobsService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job by ID' })
  @ApiParam({
    name: 'id',
    description: 'Job ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Job retrieved successfully',
    type: Job,
  })
  @ApiResponse({
    status: 404,
    description: 'Job not found',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Job> {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job by ID' })
  @ApiParam({
    name: 'id',
    description: 'Job ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Job updated successfully',
    type: Job,
  })
  @ApiResponse({
    status: 404,
    description: 'Job not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<Job> {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a job by ID' })
  @ApiParam({
    name: 'id',
    description: 'Job ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Job deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Job not found',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.jobsService.remove(id);
  }
}