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

  const [refreshToken, setRefreshToken] = useState(() => {
    if (typeof window !== 'undefined') {
      const currentAuth = localStorage.getItem('ProsekgRefreshToken');
      console.log(`refresh: ${currentAuth}`);
      return currentAuth ? currentAuth : '';
    }
    return '';
  });

  const [accessToken, setAccessToken] = useState(() => {
    if (typeof window !== 'undefined') {
      const currentAuth = localStorage.getItem('ProsekgAccessToken');
      console.log(`acces: ${currentAuth}`);
      return currentAuth ? currentAuth : '';
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticatedOnProseKG', String(isAuthenticated));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ProsekgRefreshToken', String(refreshToken));
    }
  }, [refreshToken]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ProsekgAccessToken', String(accessToken));
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value= {{ isAuthenticated, setIsAuthenticated, accessToken, setAccessToken, refreshToken, setRefreshToken } as { isAuthenticated: boolean; setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; accessToken: string; setAccessToken: React.Dispatch<React.SetStateAction<string>>; refreshToken: string; setRefreshToken: React.Dispatch<React.SetStateAction<string>> }}>
      {children}
    </AuthContext.Provider>
  );
};