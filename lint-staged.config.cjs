const { existsSync } = require('fs');
const { join } = require('path');

// check bun, yarn or npm
const packageManager = existsSync(join(process.cwd(), 'yarn.lock'))
  ? 'yarn'
  : existsSync(join(process.cwd(), 'package-lock.json'))
    ? 'npm'
    : 'bun';

console.log(`Using ${packageManager} as package manager`);

const lintStagedConfig = {
  // TypeScript & JavaScript files
  '**/*.(ts|tsx)': () => `${packageManager} tsc --noEmit`,
  '**/*.(ts|tsx|js)': (filenames) => [
    `${packageManager} eslint --no-warn-ignored --fix ${filenames.join(' ')}`,
    `${packageManager} prettier --write ${filenames.join(' ')}`
  ]
};

module.exports = lintStagedConfig;
