import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJobTable1693000000000 implements MigrationInterface {
  name = 'CreateJobTable1693000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "job_type_enum" AS ENUM('full-time', 'part-time', 'contract', 'internship')
    `);

    await queryRunner.query(`
      CREATE TABLE "jobs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying(255) NOT NULL,
        "company_name" character varying(255) NOT NULL,
        "location" character varying(255) NOT NULL,
        "job_type" "job_type_enum" NOT NULL,
        "salary_range" character varying(100),
        "description" text NOT NULL,
        "requirements" text NOT NULL,
        "responsibilities" text NOT NULL,
        "application_deadline" date NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_jobs_title" ON "jobs" ("title")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_jobs_location" ON "jobs" ("location")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_jobs_type" ON "jobs" ("job_type")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "idx_jobs_type"`);
    await queryRunner.query(`DROP INDEX "idx_jobs_location"`);
    await queryRunner.query(`DROP INDEX "idx_jobs_title"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TYPE "job_type_enum"`);
  }
}