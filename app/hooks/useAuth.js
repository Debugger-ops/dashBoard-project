import { useState, useEffect } from 'react';

export function useAuth(initialAuthState = { isAuthenticated: false, user: null, token: null }) {
  const [authState, setAuthState] = useState(initialAuthState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        setAuthState(JSON.parse(storedAuth));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth', JSON.stringify(authState));
    }
  }, [authState]);

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      setAuthState({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  const checkAuthStatus = async () => {
    if (!authState.token) return;

    try {
      const response = await fetch('/api/validate-token', {
        headers: { Authorization: `Bearer ${authState.token}` },
      });

      if (!response.ok) logout();
    } catch (error) {
      logout();
    }
  };

  return {
    ...authState,
    login,
    logout,
    checkAuthStatus,
  };
}
