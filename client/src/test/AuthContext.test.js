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

// ═══════════════════════════════════════════════════════════
// Test 1: isTokenExpired
// ═══════════════════════════════════════════════════════════
describe('isTokenExpired', () => {

  it('returns FALSE for a token whose exp is in the future', () => {

    // Arrange: set expiry 1 hour from now (in SECONDS, per JWT spec)
    const futureExp = Math.floor(Date.now() / 1000) + 3600;
    const token = makeFakeJWT({ exp: futureExp });

    // Act + Assert
    expect(isTokenExpired(token)).toBe(false);

  });

  it('returns TRUE for a token whose exp is in the past', () => {

    // Arrange: set expiry 1 hour ago
    const pastExp = Math.floor(Date.now() / 1000) - 3600;
    const token = makeFakeJWT({ exp: pastExp });

    // Act + Assert
    expect(isTokenExpired(token)).toBe(true);

  });
  it('returns TRUE for a completely malformed (non-JWT) string', () => {

    // Anything that can't be split and base64-decoded should be treated as expired
    expect(isTokenExpired('not.a.real.jwt')).toBe(true);
    expect(isTokenExpired('')).toBe(true);

  });

  it('returns TRUE when the token is undefined or null', () => {

    // Edge-case guard — prevents runtime crashes in the provider
    expect(isTokenExpired(undefined)).toBe(true);
    expect(isTokenExpired(null)).toBe(true);

  });
  
});
