// ----- jest.config.js -----
// Jest configuration for the backend test suite.
// This file is auto-detected by Jest

module.exports = {

  // tests run Express routes on the server side — no browser DOM.
  testEnvironment: 'node',

  // Look for test files inside tests/ directorie with .test.js extension.
  // This pattern matches both tests/unit/*.test.js and tests/integration/*.test.js.
  testMatch: ['**/tests/**/*.test.js'],

  // Print each individual test name during the run
  verbose: true,

  // Load test-specific environment variables before any test file runs.
  // This ensures process.env.PEPPER_SECRET, JWT_SECRET, etc. are available
  // without depending on the real .env file (which should not exist in CI).
  setupFiles: ['dotenv/config'],
  
};