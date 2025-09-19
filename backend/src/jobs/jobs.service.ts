import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobQueryDto } from './dto/job-query.dto';
import { JobResponseDto } from './dto/job-response.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create({
      ...createJobDto,
      applicationDeadline: new Date(createJobDto.applicationDeadline),
    });

    return this.jobRepository.save(job);
  }

  async findAll(queryDto: JobQueryDto): Promise<JobResponseDto> {
    const {
      title,
      location,
      jobType,
      salaryMin,
      salaryMax,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = queryDto;

    const queryBuilder = this.jobRepository.createQueryBuilder('job');

    this.applyFilters(queryBuilder, {
      title,
      location,
      jobType,
      salaryMin,
      salaryMax,
    });

    const total = await queryBuilder.getCount();

    const jobs = await queryBuilder
      .orderBy(`job.${sortBy}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      data: jobs,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);

    const updateData: any = { ...updateJobDto };
    if (updateJobDto.applicationDeadline) {
      updateData.applicationDeadline = new Date(updateJobDto.applicationDeadline);
    }

    Object.assign(job, updateData);
    return this.jobRepository.save(job);
  }

  async remove(id: string): Promise<void> {
    const job = await this.findOne(id);
    await this.jobRepository.remove(job);
  }

  private applyFilters(
    queryBuilder: SelectQueryBuilder<Job>,
    filters: {
      title?: string;
      location?: string;
      jobType?: string;
      salaryMin?: number;
      salaryMax?: number;
    },
  ): void {
    const { title, location, jobType, salaryMin, salaryMax } = filters;

    if (title) {
      queryBuilder.andWhere('job.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    if (location) {
      queryBuilder.andWhere('job.location ILIKE :location', {
        location: `%${location}%`,
      });
    }

    if (jobType) {
      queryBuilder.andWhere('job.jobType = :jobType', { jobType });
    }

    if (salaryMin !== undefined || salaryMax !== undefined) {
      this.applySalaryFilter(queryBuilder, salaryMin, salaryMax);
    }
  }

  private applySalaryFilter(
    queryBuilder: SelectQueryBuilder<Job>,
    salaryMin?: number,
    salaryMax?: number,
  ): void {
    if (!salaryMin && !salaryMax) return;

    let salaryCondition = '';
    const parameters: Record<string, any> = {};

    if (salaryMin !== undefined) {
      salaryCondition += 'CAST(REGEXP_REPLACE(REGEXP_REPLACE(job.salaryRange, \'[^0-9-]\', \'\', \'g\'), \'-.*\', \'\') AS INTEGER) >= :salaryMin';
      parameters.salaryMin = salaryMin;
    }

    if (salaryMax !== undefined) {
      if (salaryCondition) salaryCondition += ' AND ';
      salaryCondition += 'CAST(REGEXP_REPLACE(REGEXP_REPLACE(job.salaryRange, \'.*-\', \'\'), \'[^0-9]\', \'\', \'g\') AS INTEGER) <= :salaryMax';
      parameters.salaryMax = salaryMax;
    }

    if (salaryCondition) {
      queryBuilder.andWhere(
        `job.salaryRange IS NOT NULL AND ${salaryCondition}`,
        parameters,
      );
    }
  }
}