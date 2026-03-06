// ----- rejectBlacklistedToken.test.js -----
// Tests for the token blacklist middleware.
// 
// The middleware checks every incoming request for a revoked JWT.
// If the token is in the blacklist Set, it returns 401.
// If the token is valid or absent, it calls next() and lets the request through.
//
// We test this by:
//   1. Hitting a route with a blacklisted token → expect 401
//   2. Hitting a route with a clean token → expect 200
//   3. Hitting a route with no token at all → expect 200

const request = require('supertest');
const app = require('../../app');

describe('rejectBlacklistedToken middleware', () => {

  // --- TEST 1: Blacklisted token is rejected ---
  // Simulate a logout (which adds the token to the blacklist),
  // then try to access a protected route with that same token.
  // The middleware should intercept and return 401 before the route handler runs.
  it('should return 401 when the token has been blacklisted', async () => {

    // Create a fake token string — the middleware does not validate the JWT,
    // it only checks if the string exists in the blacklist Set.
    const fakeToken = 'blacklisted.token.value';

    // Step 1: Blacklist the token by calling the logout route with it.
    await request(app)
      .post('/auth/logout')
      .set('Authorization', `Bearer ${fakeToken}`);

    // Step 2: Attempt to access any route with the now-blacklisted token.
    // The /test route is a simple GET that returns 200 under normal conditions.
    const response = await request(app)
      .get('/test')
      .set('Authorization', `Bearer ${fakeToken}`);
      
    // The middleware should block this request before it reaches the /test handler.
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Token has been revoked');
  });

});