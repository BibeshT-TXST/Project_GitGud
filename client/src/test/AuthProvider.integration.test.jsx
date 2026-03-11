// client/src/context/AuthProvider.integration.test.jsx
// ─────────────────────────────────────────────────────────
// INTEGRATION TEST — AuthProvider + useAuth hook
//
// We render a minimal consumer inside the real AuthProvider
// and verify that login/logout update both React state
// AND sessionStorage correctly.
// ─────────────────────────────────────────────────────────
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';