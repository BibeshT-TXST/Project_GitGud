// UNIT TESTS — Axios interceptors (request + response)
// testing LOGIC, not network calls:
// 1. Request interceptor: does it attach the Bearer token?
// 2. Response interceptor: does it clear storage on 401/403
//    but skip clearing on auth routes?
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';