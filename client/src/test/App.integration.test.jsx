// ─────────────────────────────────────────────────────────
// INTEGRATION TEST — App routing + ProtectedRoute
//
// We render the full <App /> component inside a MemoryRouter
// and assert that:
//   1. "/" renders the Login page
//   2. "/successful-logout" renders the logout page
//   3. "/landing" WITHOUT a token → redirected back to "/"
//   4. "/landing" WITH a token → renders landing content
// ─────────────────────────────────────────────────────────
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from '../context/AuthContext';

// Helper function: Renders App at a given URL path
function renderAtPath(path) {

  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

}