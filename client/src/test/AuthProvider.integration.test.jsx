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

// Demo consumer that exposes auth state to the test DOM 
// We render token, user, and add buttons to trigger login/logout.
function TestConsumer() {
  const { token, user, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="token">{token ?? 'no-token'}</span>
      <span data-testid="user">{user ?? 'no-user'}</span>
      <button onClick={() => login('jwt-abc', 'netid42')}>Log In</button>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}

describe('AuthProvider integration', () => {

  beforeEach(() => {
    // Start each test with a clean sessionStorage
    sessionStorage.clear();
  });

  it('starts with no token and no user when sessionStorage is empty', () => {

    // Arrange + Act
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    // Assert: initial state should reflect "logged out"
    expect(screen.getByTestId('token').textContent).toBe('no-token');
    expect(screen.getByTestId('user').textContent).toBe('no-user');

  });

  it('updates token and user after login() is called', async () => {

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    // Act: click the "Log In" button, which calls login('jwt-abc', 'netid42')
    await act(async () => {
      screen.getByText('Log In').click();
    });

    // Assert: state and sessionStorage should both reflect the new values
    expect(screen.getByTestId('token').textContent).toBe('jwt-abc');
    expect(screen.getByTestId('user').textContent).toBe('netid42');
    expect(sessionStorage.getItem('site-token')).toBe('jwt-abc');

  });

  it('clears token and user after logout() is called', async () => {

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    // Arrange: log in first
    await act(async () => {
      screen.getByText('Log In').click();
    });

    // Act: now log out
    await act(async () => {
      screen.getByText('Log Out').click();
    });

    // Assert: everything should be cleared
    expect(screen.getByTestId('token').textContent).toBe('no-token');
    expect(screen.getByTestId('user').textContent).toBe('no-user');
    expect(sessionStorage.getItem('site-token')).toBeNull();

  });
  
});