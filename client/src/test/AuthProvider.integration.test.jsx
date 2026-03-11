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