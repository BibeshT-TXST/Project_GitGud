// ----- inventory.test.js -----
// Integration tests for the inventory CRUD routes:
//   GET    /api/inventory         — list all books
//   GET    /api/inventory/stats   — book statistics
//   POST   /api/inventory/add     — add a book
//   PUT    /api/inventory/:isbn   — update a book
//   DELETE /api/inventory/:isbn   — delete a single book
//   DELETE /api/inventory         — delete all books (transactional)


// The pg Pool is mocked. No live database is needed.
const request = require('supertest');
const app = require('../../app');
const pool = require('../../db');

// Replace the real pg Pool with a Jest mock.
jest.mock('../../db', () => ({
  query: jest.fn(),
  connect: jest.fn(),
}));

// Reset all mock call history before each test.
beforeEach(() => {
  jest.clearAllMocks();
});