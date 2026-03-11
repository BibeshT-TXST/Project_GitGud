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

describe('Axios Response Interceptor', () => {

  beforeEach(() => {
    sessionStorage.clear();
    // Prevent actual navigation in tests
    delete window.location;
    window.location = { href: '' };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clears sessionStorage and redirects on 401 for a NON-auth route', async () => {

    // Arrange
    sessionStorage.setItem('site-token', 'some-token');

    const { default: api } = await import('../api/axios.js');
    const responseInterceptor = api.interceptors.response.handlers[0];

    // Build a fake Axios error matching the shape the interceptor expects
    const fakeError = {
      config: { url: '/api/inventory' },       // NOT an auth route
      response: { status: 401 },
    };

    // Act: call the rejection handler
    await expect(responseInterceptor.rejected(fakeError)).rejects.toBeTruthy();

    // Assert: token was removed + browser was redirected
    expect(sessionStorage.getItem('site-token')).toBeNull();
    expect(window.location.href).toBe('/');

  });

  it('does NOT clear sessionStorage on 401 for /auth/login route', async () => {

    // Arrange
    sessionStorage.setItem('site-token', 'some-token');

    const { default: api } = await import('../api/axios.js');
    const responseInterceptor = api.interceptors.response.handlers[0];

    // Build a fake Axios error matching the shape the interceptor expects
    const fakeError = {
      config: { url: '/auth/login' },           // IS an auth route → skip wipe
      response: { status: 401 },
    };
    
    // Act
    await expect(responseInterceptor.rejected(fakeError)).rejects.toBeTruthy();
    
    // Assert: token should still be there (not wiped)
    
    expect(sessionStorage.getItem('site-token')).toBe('some-token');
    
  });
  
  it('does NOT clear sessionStorage on 401 for /auth/signup route', async () => {

    sessionStorage.setItem('site-token', 'some-token');

    const { default: api } = await import('../api/axios.js');
    const responseInterceptor = api.interceptors.response.handlers[0];
    const fakeError = {
      config: { url: '/auth/signup' },
      response: { status: 401 },
    };

    await expect(responseInterceptor.rejected(fakeError)).rejects.toBeTruthy();

    expect(sessionStorage.getItem('site-token')).toBe('some-token');

  });
  
});
