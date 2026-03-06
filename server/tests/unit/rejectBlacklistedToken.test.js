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


});