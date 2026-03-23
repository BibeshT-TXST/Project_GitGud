// ─────────────────────────────────────────────────────────
// INTEGRATION TEST — App routing + ProtectedRoute
//
// We render the full <App /> component inside a MemoryRouter
// and assert that:
//   1. "/" renders the Login page
//   2. "/successful-logout" renders the logout page
//   3. "/landing" WITHOUT a token → redirected back to "/"
// ─────────────────────────────────────────────────────────
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';

// Mock the api module so no real HTTP requests are made ──
// SuccessfulLogout calls api.post('/auth/logout') on mount.
// Without this mock, jsdom tries to hit localhost:5000 and
// logs a noisy AxiosError: Network Error to stderr.
vi.mock('../api/axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: {} })),
    get:  vi.fn(() => Promise.resolve({ data: {} })),
    put:  vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

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

describe('App routing', () => {

  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders the Login page at "/"', () => {
    renderAtPath('/');
    // The Login page renders a heading with "Login" text
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('renders the Successful Logout page at "/successful-logout"', () => {
    renderAtPath('/successful-logout');
    // The logout page shows "Successfully Logged out"
    expect(screen.getByText('Successfully Logged out')).toBeInTheDocument();
  });

  it('redirects to "/" when accessing "/landing" without a token', () => {
    // sessionStorage is empty → token is null → ProtectedRoute should redirect
    renderAtPath('/landing');
    // We should see the Login page instead of the landing content
     expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

});