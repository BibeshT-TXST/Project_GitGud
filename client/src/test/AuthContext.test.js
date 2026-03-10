
// UNIT TESTS — isTokenExpired & getUsernameFromToken
// These are PURE FUNCTIONS (input → output, no side effects),
// so we can test them directly without rendering any React
// component or mocking any API.
import { describe, it, expect } from 'vitest';
import { isTokenExpired, getUsernameFromToken } from '../context/AuthContext';

