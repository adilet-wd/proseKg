'use client'
import React, { createContext, useEffect, useState } from 'react';

// Создаем контекст
export const AuthContext = createContext<{ isAuthenticated: boolean; setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> } | null>(null);

// Создаем провайдер контекста
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      const currentAuth = localStorage.getItem('isAuthenticatedOnProseKG');
      return currentAuth === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticatedOnProseKG', String(isAuthenticated));
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value= {{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};