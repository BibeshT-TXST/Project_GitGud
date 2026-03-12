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