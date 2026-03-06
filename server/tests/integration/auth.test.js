// ----- auth.test.js -----
//
// Integration tests for the authentication routes:
//   POST /auth/signup
//   POST /auth/login
//   POST /auth/logout
//
// These tests use Supertest to send real HTTP requests through the Express
// middleware stack. 
// The database (pg Pool) is mocked with jest.mock() so
// no live PostgreSQL instance is needed.

const request = require('supertest');
const app = require('../../app');
const pool = require('../../db');
const argon2 = require('argon2');

// Replace the real pg Pool with a Jest mock.
// Every call to pool.query() inside app.js now hits this mock instead of PostgreSQL.
jest.mock('../../db', () => ({
  query: jest.fn(),
  connect: jest.fn(),
}));

// Store the original environment variables so we can restore them after each test.
// Some tests modify process.env to simulate missing config — this prevents leaking
// that state into other tests.
const originalEnv = { ...process.env };

// ===================================================================
// SETUP & TEARDOWN
// ===================================================================
beforeEach(() => {
  // Reset all mock call history before each test.
  // This ensures that a mock return value set in Test A does not bleed into Test B.
  jest.clearAllMocks();
  // Restore environment variables to their original state.
  process.env = { ...originalEnv };
});

afterAll(() => {
  // Final cleanup — restore env in case any test modified it.
  process.env = originalEnv;
});

// ===================================================================
// POST /auth/signup
// ===================================================================
describe('POST /auth/signup', () => {

  // --- Happy path: new user signs up ---
  // The route should hash the password, insert a row, and return 201.
  it('should return 201 and "Signup success" for a new user', async () => {

    // Mock: no existing user found (empty result set)
    pool.query.mockResolvedValueOnce({ rows: [] });

    // Mock: INSERT succeeds (no return value needed — the route does not use it)
    pool.query.mockResolvedValueOnce({});

    const response = await request(app)
      .post('/auth/signup')
      .send({ username: 'testuser', password: 'testpass' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Signup success');

    // Verify that pool.query was called twice:
    //   1st call: SELECT to check if user exists
    //   2nd call: INSERT to create the user
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  // --- Duplicate user ---
  // If the net_id already exists, the route should return 409.
  it('should return 409 when the user already exists', async () => {

    // Mock: user found (non-empty result set)
    pool.query.mockResolvedValueOnce({
      rows: [{ net_id: 'testuser', passwords: 'somehash' }]
    });

    const response = await request(app)
      .post('/auth/signup')
      .send({ username: 'testuser', password: 'testpass' });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User already exists');

    // Only the SELECT query should have run — no INSERT.
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  // --- Missing PEPPER_SECRET ---
  // The route should return 500 if the pepper is not configured.
  // This catches deployment mistakes where .env is incomplete.
  it('should return 500 when PEPPER_SECRET is missing', async () => {

    // Remove the pepper from the environment for this test only.
    delete process.env.PEPPER_SECRET;

    const response = await request(app)
      .post('/auth/signup')
      .send({ username: 'testuser', password: 'testpass' });
      
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server configuration error');
  });
});