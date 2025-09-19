const fs = require('fs');
const path = require('path');

// Read the current package.json
const packagePath = path.join(__dirname, 'frontend', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Replace workspace dependency with file dependency
packageJson.dependencies['@cybermind/shared'] = 'file:../shared';

// Write the updated package.json
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

console.log('Updated frontend package.json for deployment');