// ─────────────────────────────────────────────────────────
// Integration Test: Inventory Page Business Logic
// Pure helper functions extracted from Inventory_page.jsx
// so they can be tested without rendering any React component.
// ─────────────────────────────────────────────────────────

/**
 * filterRows — applies search, status, and booktype filters.
 *
 * @param {Array}  rows            - full list of book objects
 * @param {string} searchQuery     - title substring to match (case-insensitive)
 * @param {string} statusFilter    - exact status string, or "" for no filter
 * @param {string} booktypeFilter  - exact booktype string, or "" for no filter
 * @returns {Array} the filtered subset
 *
 * Logic:
 *   1. Title filter is case-insensitive `.includes()` — same as original.
 *   2. Status and booktype are strict equality — empty string means "show all".
 */
export function filterRows(rows, searchQuery, statusFilter, booktypeFilter) {
  return rows
    .filter((row) => row.title && row.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((row) => statusFilter === '' || row.status === statusFilter)
    .filter((row) => booktypeFilter === '' || row.booktype === booktypeFilter);
}

/**
 * parseSelectionModel — normalises the various shapes MUI DataGrid
 * can hand to onRowSelectionModelChange.
 *
 * @param {Array|Object} selectionModel - could be [id], { ids: Set }, or { ids: [...] }
 * @returns {string|null} the first selected row ID, or null
 *
 * Logic mirrors the original handleRowSelection exactly:
 *   - Array → take first element
 *   - Object with ids Set → convert to array, take first
 *   - Object with ids iterable → same fallback
 */
export function parseSelectionModel(selectionModel) {
  if (Array.isArray(selectionModel)) {
    return selectionModel.length > 0 ? selectionModel[0] : null;
  }
  if (selectionModel && selectionModel.ids instanceof Set) {
    return selectionModel.ids.size > 0 ? Array.from(selectionModel.ids)[0] : null;
  }
  if (selectionModel && typeof selectionModel === 'object' && selectionModel.ids) {
    const ids = Array.from(selectionModel.ids);
    return ids.length > 0 ? ids[0] : null;
  }
  return null;
}

/**
 * buildCSVString — builds a CSV string from filtered rows.
 *
 * @param {Array} rows - array of book objects with isbn, title, booktype, status, purchasedate
 * @returns {string} CSV content string
 *
 * Logic:
 *   - First row is the human-readable header labels.
 *   - Each data row wraps values in double-quotes and escapes internal quotes.
 */
export function buildCSVString(rows) {
  const headers = ['isbn', 'title', 'booktype', 'status', 'purchasedate'];
  const headerLabels = ['ISBN', 'Title', 'Book Type', 'Status', 'Purchase Date'];
  const csvRows = [
    headerLabels.join(','),
    ...rows.map((row) =>
      headers
        .map((field) => {
          const val = row[field] ?? '';
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(',')
    ),
  ];
  return csvRows.join('\n');
}
