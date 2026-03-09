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

// ===================================================================
// GET /api/inventory/stats
// ===================================================================
describe('GET /api/inventory/stats', () => {

  // --- Happy path: stats returned ---
  it('should return 200 with total, byStatus, and byType', async () => {

    // The route makes three sequential pool.query calls.
    // Mock them in order: statusCounts, typeCounts, totalCount.
    pool.query
      .mockResolvedValueOnce({ rows: [{ status: 'Available', count: 10 }] })    // statusCounts
      .mockResolvedValueOnce({ rows: [{ booktype: 'Hardcover', count: 10 }] })  // typeCounts
      .mockResolvedValueOnce({ rows: [{ count: 10 }] });                         // totalCount

    const response = await request(app).get('/api/inventory/stats');

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(10);
    expect(response.body.byStatus).toEqual([{ status: 'Available', count: 10 }]);
    expect(response.body.byType).toEqual([{ booktype: 'Hardcover', count: 10 }]);

  });

  // --- Database error ---
  it('should return 500 when any stats query fails', async () => {

    pool.query.mockRejectedValueOnce(new Error('timeout'));

    const response = await request(app).get('/api/inventory/stats');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error');

  });
});

// ===================================================================
// POST /api/inventory/add
// ===================================================================
describe('POST /api/inventory/add', () => {

  // --- Happy path: add a book ---
  it('should return 200 and the created book', async () => {

    const newBook = {
      isbn: '333',
      title: 'New Book',
      booktype: 'Paperback',
      current_status: 'Available',
      purchasedate: '2025-09-01',
    };

    // Mock: INSERT returns the new row
    pool.query.mockResolvedValueOnce({ rows: [newBook] });
    const response = await request(app)
      .post('/api/inventory/add')
      .send({
        isbn: '333',
        title: 'New Book',
        booktype: 'Paperback',
        status: 'Available',
        date: '2025-09-01'
      });

    expect(response.status).toBe(200);
    expect(response.body.isbn).toBe('333');
    expect(response.body.title).toBe('New Book');

  });

  // --- Database error ---
  it('should return 500 when the insert fails', async () => {

    pool.query.mockRejectedValueOnce(new Error('duplicate key'));
    const response = await request(app)
      .post('/api/inventory/add')
      .send({
        isbn: '333',
        title: 'New Book',
        booktype: 'Paperback',
        status: 'Available',
        date: '2025-09-01'
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error');

  });
  
});