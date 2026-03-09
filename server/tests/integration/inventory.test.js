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

// ===================================================================
// PUT /api/inventory/:isbn
// ===================================================================
describe('PUT /api/inventory/:isbn', () => {

  // --- Happy path: book found and updated ---
  it('should return 200 and the updated book', async () => {

    const updatedBook = {
      isbn: '111',
      title: 'Updated Title',
      booktype: 'Hardcover',
      current_status: 'Checked Out',
      purchasedate: '2025-01-01',
    };

    pool.query.mockResolvedValueOnce({ rows: [updatedBook] });

    const response = await request(app)
      .put('/api/inventory/111')
      .send({
        title: 'Updated Title',
        booktype: 'Hardcover',
        status: 'Checked Out',
        purchasedate: '2025-01-01'
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Title');

  });

  // --- Book not found ---
  it('should return 404 when the ISBN does not exist', async () => {

    // Mock: UPDATE affected zero rows
    pool.query.mockResolvedValueOnce({ rows: [] });

    const response = await request(app)
      .put('/api/inventory/999')
      .send({
        title: 'Ghost',
        booktype: 'Paperback',
        status: 'Available',
        purchasedate: '2025-01-01'
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Book not found with the provided ISBN');

  });

});

// ===================================================================
// DELETE /api/inventory/:isbn
// ===================================================================
describe('DELETE /api/inventory/:isbn', () => {

  // --- Happy path: book found and deleted ---
  it('should return 200 and the deleted book', async () => {

    const deletedBook = {
      isbn: '111',
      title: 'Deleted Book',
      booktype: 'Hardcover',
      current_status: 'Available',
      purchasedate: '2025-01-01',
    };

    pool.query.mockResolvedValueOnce({ rows: [deletedBook] });

    const response = await request(app).delete('/api/inventory/111');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Book deleted successfully');
    expect(response.body.book.isbn).toBe('111');

  });

  // --- Book not found ---
  it('should return 404 when the ISBN does not exist', async () => {

    pool.query.mockResolvedValueOnce({ rows: [] });

    const response = await request(app).delete('/api/inventory/999');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Book not found with the provided ISBN');

  });
  
});

// ===================================================================
// DELETE /api/inventory (delete all — transactional)
// ===================================================================
describe('DELETE /api/inventory', () => {

  // --- Happy path: all books deleted ---
  // This route uses pool.connect() to get a client for a transaction (BEGIN/COMMIT).
  // The mock must return a client object with query() and release() methods.
  it('should return 200 and the count of deleted books', async () => {
    // Create a mock client that simulates the transactional flow:

    //   client.query('BEGIN')  → resolves
    //   client.query('DELETE...') → resolves with rowCount
    //   client.query('COMMIT') → resolves
    //   client.release() → no-op
    const mockClient = {
      query: jest.fn()
        .mockResolvedValueOnce()                          // BEGIN
        .mockResolvedValueOnce({ rowCount: 5 })           // DELETE FROM books RETURNING *
        .mockResolvedValueOnce(),                          // COMMIT
      release: jest.fn(),
    };

    // pool.connect() returns the mock client

    pool.connect.mockResolvedValueOnce(mockClient);

    const response = await request(app).delete('/api/inventory');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('All books deleted successfully');
    expect(response.body.deletedCount).toBe(5);

    // Verify the transaction lifecycle was followed correctly.
    expect(mockClient.query).toHaveBeenCalledTimes(3);
    expect(mockClient.release).toHaveBeenCalledTimes(1);

  });

  // --- Transaction failure: should rollback ---
  // If the DELETE query fails, the route must call ROLLBACK and return 500.
  it('should return 500 and rollback when the transaction fails', async () => {

    const mockClient = {
      query: jest.fn()
        .mockResolvedValueOnce()                          // BEGIN succeeds
        .mockRejectedValueOnce(new Error('disk full'))    // DELETE fails
        .mockResolvedValueOnce(),                          // ROLLBACK succeeds
      release: jest.fn(),
    };

    pool.connect.mockResolvedValueOnce(mockClient);

    const response = await request(app).delete('/api/inventory');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error during wholesale deletion');

    // Verify ROLLBACK was called (3rd query call) and client was released.
    expect(mockClient.query).toHaveBeenCalledTimes(3);
    expect(mockClient.release).toHaveBeenCalledTimes(1);

  });
  
});