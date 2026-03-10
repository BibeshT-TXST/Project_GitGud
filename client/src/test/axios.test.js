// UNIT TESTS — Axios interceptors (request + response)
// testing LOGIC, not network calls:
// 1. Request interceptor: does it attach the Bearer token?
// 2. Response interceptor: does it clear storage on 401/403
//    but skip clearing on auth routes?
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// We need to control sessionStorage BEFORE importing api ──
// Vitest hoists vi.mock calls, so sessionStorage mocking must
// happen before the module runs its top-level interceptor setup.
describe('Axios Request Interceptor', () => {

  beforeEach(() => {
    // Reset sessionStorage mock before each test
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('attaches Authorization header when a token exists in sessionStorage', async () => {

    // Arrange: place a token into sessionStorage
    sessionStorage.setItem('site-token', 'my-test-token');

    // Dynamically import api so interceptors pick up the sessionStorage value
    // We need to re-import to trigger the interceptor with current sessionStorage
    const { default: api } = await import('../api/axios.js');

    // Manually invoke the request interceptor by running it on a fake config
    // The interceptor is registered on api.interceptors.request
    // We can test it by checking the handlers array
    const requestInterceptor = api.interceptors.request.handlers[0];
    const config = { headers: {} };
    const result = requestInterceptor.fulfilled(config);

    // Assert: The header should now carry the Bearer prefix
    expect(result.headers.Authorization).toBe('Bearer my-test-token');

  });

  it('does NOT attach Authorization header when sessionStorage has no token', async () => {

    // Arrange: sessionStorage is empty (cleared in beforeEach)
    const { default: api } = await import('../api/axios.js');
    const requestInterceptor = api.interceptors.request.handlers[0];
    const config = { headers: {} };
    const result = requestInterceptor.fulfilled(config);

    // Assert: no Authorization header should exist
    expect(result.headers.Authorization).toBeUndefined();

  });

});
