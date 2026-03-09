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

// ===================================================================
// GET /api/inventory
// ===================================================================
describe('GET /api/inventory', () => {

  // --- Happy path: books exist ---
  it('should return 200 and an array of books', async () => {

    // Mock: pool.query returns two book rows.
    const mockBooks = [
      { isbn: '111', title: 'Book A', booktype: 'Hardcover', status: 'Available', purchasedate: '2025-01-01' },
      { isbn: '222', title: 'Book B', booktype: 'Paperback', status: 'Checked Out', purchasedate: '2025-06-15' },
    ];

    pool.query.mockResolvedValueOnce({ rows: mockBooks });
    const response = await request(app).get('/api/inventory');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBooks);
    expect(response.body.length).toBe(2);

  });

  // --- Empty inventory ---
  it('should return 200 and an empty array when no books exist', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const response = await request(app).get('/api/inventory');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // --- Database error ---
  it('should return 500 when the database query fails', async () => {
    pool.query.mockRejectedValueOnce(new Error('connection refused'));
    const response = await request(app).get('/api/inventory');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error');
  });

});