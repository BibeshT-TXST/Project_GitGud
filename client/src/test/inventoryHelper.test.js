// ─────────────────────────────────────────────────────────
// UNIT TESTS — filterRows, parseSelectionModel, buildCSVString
// ─────────────────────────────────────────────────────────
import { describe, it, expect } from 'vitest';
import { filterRows, parseSelectionModel, buildCSVString } from '../utils/inventoryHelper';

// ── Sample data used across multiple tests ──
const SAMPLE_ROWS = [
  { isbn: '001', title: 'React Handbook',  booktype: 'Paperback', status: 'Out on Loan',  purchasedate: '2024-01-01' },
  { isbn: '002', title: 'Node.js Guide',   booktype: 'HardCover', status: 'Reserved',     purchasedate: '2024-02-15' },
  { isbn: '003', title: 'JavaScript Deep',  booktype: 'E-Book',    status: 'Archived',     purchasedate: '2024-03-10' },
  { isbn: '004', title: 'React Patterns',   booktype: 'Paperback', status: 'in-Repair',    purchasedate: '2024-04-20' },
];

// ═══════════════════════════════════════════════════════════
// filterRows tests:
// ═══════════════════════════════════════════════════════════
describe('filterRows', () => {

  it('returns all rows when no filters are applied', () => {
    // searchQuery = '', statusFilter = '', booktypeFilter = ''
    const result = filterRows(SAMPLE_ROWS, '', '', '');
    expect(result).toHaveLength(4);
  });

  it('filters by title search (case-insensitive)', () => {
    // "react" should match "React Handbook" and "React Patterns"
    const result = filterRows(SAMPLE_ROWS, 'react', '', '');
    expect(result).toHaveLength(2);
    expect(result.map(r => r.isbn)).toEqual(['001', '004']);
  });

  it('filters by status only', () => {
    const result = filterRows(SAMPLE_ROWS, '', 'Reserved', '');
    expect(result).toHaveLength(1);
    expect(result[0].isbn).toBe('002');
  });

  it('filters by booktype only', () => {
    const result = filterRows(SAMPLE_ROWS, '', '', 'E-Book');
    expect(result).toHaveLength(1);
    expect(result[0].isbn).toBe('003');
  });

  it('combines all three filters together', () => {
    // Search "react" + status "" (no filter) + booktype "Paperback"
    // Should match isbn 001 and 004 (title), then narrow to Paperback → both match
    const result = filterRows(SAMPLE_ROWS, 'react', '', 'Paperback');
    expect(result).toHaveLength(2);
  });

  it('returns empty array when search matches nothing', () => {
    const result = filterRows(SAMPLE_ROWS, 'zzzzz', '', '');
    expect(result).toHaveLength(0);
  });

  it('handles rows with missing/null title gracefully', () => {
    // A row with no title should be filtered out by the title guard
    const rowsWithNull = [...SAMPLE_ROWS, { isbn: '005', title: null, booktype: 'E-Book', status: 'Archived' }];
    const result = filterRows(rowsWithNull, '', '', '');
    expect(result).toHaveLength(4); // the null-title row is excluded
  });

});

// ═══════════════════════════════════════════════════════════
// parseSelectionModel tests:
// ═══════════════════════════════════════════════════════════
describe('parseSelectionModel', () => {

  it('returns the first ID from a plain array', () => {
    expect(parseSelectionModel(['isbn-001', 'isbn-002'])).toBe('isbn-001');
  });

  it('returns null from an empty array', () => {
    expect(parseSelectionModel([])).toBeNull();
  });

  it('returns the first ID from an object with a Set of ids', () => {
    const model = { ids: new Set(['isbn-003']) };
    expect(parseSelectionModel(model)).toBe('isbn-003');
  });

  it('returns null from an object with an empty Set', () => {
    expect(parseSelectionModel({ ids: new Set() })).toBeNull();
  });

  it('returns the first ID from an object with an ids array (fallback)', () => {
    const model = { ids: ['isbn-004'] };
    expect(parseSelectionModel(model)).toBe('isbn-004');
  });

  it('returns null from null/undefined input', () => {
    expect(parseSelectionModel(null)).toBeNull();
    expect(parseSelectionModel(undefined)).toBeNull();
  });
  
});
