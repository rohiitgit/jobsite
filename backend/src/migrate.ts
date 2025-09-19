import * as dotenv from 'dotenv';
import { AppDataSource } from './database/data-source';

// Load environment variables
dotenv.config();

async function runMigrations() {
  try {
    console.log('Environment variables:');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'configured' : 'not configured');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('NODE_ENV:', process.env.NODE_ENV);

    console.log('\nDataSource options:');
    console.log(JSON.stringify(AppDataSource.options, null, 2));

    console.log('\nConnecting to database...');
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    console.log('Running migrations...');
    await AppDataSource.runMigrations();
    console.log('Migrations completed successfully!');

    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();