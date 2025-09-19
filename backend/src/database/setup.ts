import { DataSource } from 'typeorm';
import { Job, JobType } from '../jobs/entities/job.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'cybermind_jobs',
  entities: [Job],
  synchronize: true, // This will auto-create tables
  logging: true,
});

async function setupDatabase() {
  try {
    console.log('🔌 Connecting to database...');
    await dataSource.initialize();
    console.log('✅ Database connected and tables created');

    // Check if we have any jobs
    const jobRepository = dataSource.getRepository(Job);
    const jobCount = await jobRepository.count();

    if (jobCount === 0) {
      console.log('📝 Adding sample data...');

      const sampleJobs = [
        {
          title: 'Senior Full Stack Developer',
          companyName: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          jobType: JobType.FULL_TIME,
          salaryRange: '$120,000 - $160,000',
          description: 'We are looking for a Senior Full Stack Developer to join our team. You will be responsible for developing and maintaining web applications using modern technologies.',
          requirements: '• 5+ years of experience with React and Node.js\n• Experience with TypeScript\n• Knowledge of database design\n• Strong problem-solving skills',
          responsibilities: '• Develop and maintain web applications\n• Collaborate with design and product teams\n• Write clean, maintainable code\n• Participate in code reviews',
          applicationDeadline: new Date('2024-12-31'),
        },
        {
          title: 'Frontend Developer',
          companyName: 'StartupXYZ',
          location: 'Remote',
          jobType: JobType.FULL_TIME,
          salaryRange: '$80,000 - $110,000',
          description: 'Join our growing startup as a Frontend Developer and help build amazing user experiences.',
          requirements: '• 3+ years of React experience\n• Proficiency in CSS and JavaScript\n• Experience with modern build tools\n• Strong attention to detail',
          responsibilities: '• Build responsive user interfaces\n• Optimize application performance\n• Collaborate with UX designers\n• Implement new features',
          applicationDeadline: new Date('2024-11-30'),
        },
        {
          title: 'Backend Engineer',
          companyName: 'DataFlow Solutions',
          location: 'New York, NY',
          jobType: JobType.FULL_TIME,
          salaryRange: '$100,000 - $140,000',
          description: 'We need a Backend Engineer to help scale our data processing platform.',
          requirements: '• Strong experience with Node.js or Python\n• Database design and optimization\n• API design and development\n• Cloud platforms experience',
          responsibilities: '• Design and implement APIs\n• Optimize database performance\n• Ensure system scalability\n• Monitor and maintain services',
          applicationDeadline: new Date('2024-10-15'),
        },
        {
          title: 'UI/UX Designer',
          companyName: 'Creative Agency',
          location: 'Los Angeles, CA',
          jobType: JobType.CONTRACT,
          salaryRange: '$60 - $80 per hour',
          description: 'Looking for a talented UI/UX Designer for a 6-month contract project.',
          requirements: '• 4+ years of UI/UX design experience\n• Proficiency in Figma and Adobe Creative Suite\n• Strong portfolio\n• Experience with user research',
          responsibilities: '• Create wireframes and prototypes\n• Design user interfaces\n• Conduct user research\n• Collaborate with development team',
          applicationDeadline: new Date('2024-09-30'),
        },
        {
          title: 'Software Engineering Intern',
          companyName: 'Innovation Labs',
          location: 'Boston, MA',
          jobType: JobType.INTERNSHIP,
          salaryRange: '$25 - $30 per hour',
          description: 'Summer internship opportunity for computer science students.',
          requirements: '• Currently pursuing CS degree\n• Basic programming skills\n• Enthusiasm to learn\n• Good communication skills',
          responsibilities: '• Work on real projects\n• Learn from senior developers\n• Participate in team meetings\n• Contribute to codebase',
          applicationDeadline: new Date('2025-03-15'),
        },
      ];

      for (const jobData of sampleJobs) {
        const job = jobRepository.create(jobData);
        await jobRepository.save(job);
      }

      console.log(`✅ Added ${sampleJobs.length} sample jobs`);
    } else {
      console.log(`✅ Database already has ${jobCount} jobs`);
    }

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
    console.log('🔌 Database connection closed');
  }
}

setupDatabase();