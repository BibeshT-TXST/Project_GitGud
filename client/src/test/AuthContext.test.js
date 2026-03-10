// UNIT TESTS — isTokenExpired & getUsernameFromToken
// These are PURE FUNCTIONS (input → output, no side effects),
// so we can test them directly without rendering any React
// component or mocking any API.
import { describe, it, expect } from 'vitest';
import { isTokenExpired, getUsernameFromToken } from '../context/AuthContext';

// Helper function: builds a fake JWT string with a given payload 
function makeFakeJWT(payload) {
  const header = btoa(JSON.stringify({ alg: 'HS256' }));           // fake header
  const body   = btoa(JSON.stringify(payload));                    // the part our helpers parse
  const sig    = 'fake-signature';                                 // ignored by helpers
  return `${header}.${body}.${sig}`;
}

