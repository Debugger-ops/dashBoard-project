"use client";
import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

// Create context
const AuthContext = createContext(null);

/**
 * Auth context provider component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Provider component
 */
export function AuthProvider({ children }) {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use auth context
 * @returns {Object} Auth context value
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  
  if (context === null) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
}

export default AuthContext;