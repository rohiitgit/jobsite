import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Job } from '../jobs/entities/job.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseUrl = this.configService.get('DATABASE_URL');
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    if (databaseUrl) {
      return {
        type: 'postgres',
        url: databaseUrl,
        entities: [Job],
        synchronize: this.configService.get('NODE_ENV') === 'development',
        logging: this.configService.get('NODE_ENV') === 'development',
        migrations: ['dist/database/migrations/*.js'],
        migrationsTableName: 'migrations',
        ssl: isProduction ? { rejectUnauthorized: false } : false,
      };
    }

    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST', 'localhost'),
      port: this.configService.get('DB_PORT', 5432),
      username: this.configService.get('DB_USERNAME', 'postgres'),
      password: this.configService.get('DB_PASSWORD', 'postgres'),
      database: this.configService.get('DB_NAME', 'cybermind_jobs'),
      entities: [Job],
      synchronize: this.configService.get('NODE_ENV') === 'development',
      logging: this.configService.get('NODE_ENV') === 'development',
      migrations: ['dist/database/migrations/*.js'],
      migrationsTableName: 'migrations',
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    };
  }
}