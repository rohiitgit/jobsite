require('dotenv').config();
const { execSync } = require('child_process');

console.log('Running migrations with DATABASE_URL:', process.env.DATABASE_URL ? 'configured' : 'not configured');

try {
  execSync('npx ts-node --transpile-only -r tsconfig-paths/register ./node_modules/.bin/typeorm migration:run -d src/database/data-source.ts', {
    stdio: 'inherit',
    env: { ...process.env }
  });
  console.log('Migrations completed successfully!');
} catch (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
}