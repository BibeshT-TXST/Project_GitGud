// ----- auth.test.js -----
//
// Integration tests for the authentication routes:
//   POST /auth/signup
//   POST /auth/login
//   POST /auth/logout
//
// These tests use Supertest to send real HTTP requests through the Express
// middleware stack. 
// The database (pg Pool) is mocked with jest.mock() so
// no live PostgreSQL instance is needed.

const request = require('supertest');
const app = require('../../app');
const pool = require('../../db');
const argon2 = require('argon2');