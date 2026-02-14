'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'USER' | 'AGENT' | 'ADMIN';
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and user on mount
    const token = localStorage.getItem('nusava_token');
    const storedUser = localStorage.getItem('nusava_user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('nusava_token');
        localStorage.removeItem('nusava_user');
      }
    }
    setLoading(false);
  }, []);

  const handleSetUser = (newUserData: User | null) => {
    setUser(newUserData);
    if (newUserData) {
      localStorage.setItem('nusava_user', JSON.stringify(newUserData));
    } else {
      localStorage.removeItem('nusava_user');
    }
  };

  const login = (token: string, userData: User) => {
    localStorage.setItem('nusava_token', token);
    localStorage.setItem('nusava_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('nusava_token');
    localStorage.removeItem('nusava_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
