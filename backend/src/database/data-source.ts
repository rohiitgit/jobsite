import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'cybermind_jobs',
  url: process.env.DATABASE_URL,
  entities: isProduction ? ['dist/**/*.entity.js'] : ['src/**/*.entity.ts'],
  migrations: isProduction ? ['dist/database/migrations/*.js'] : ['src/database/migrations/*.ts'],
  synchronize: false,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});