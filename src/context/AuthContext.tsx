import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AdminUser } from '../types';

interface AuthContextValue {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AUTH_KEY = 'sce_admin_session';

const MOCK_ADMIN = {
  email: 'admin@starcivic.com',
  password: 'starcivic2025',
  name: 'Star Civic Admin',
  role: 'admin' as const,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail === MOCK_ADMIN.email &&
      password === MOCK_ADMIN.password
    ) {
      const admin: AdminUser = {
        email: MOCK_ADMIN.email,
        name: MOCK_ADMIN.name,
        role: 'admin',
      };
      setUser(admin);
      localStorage.setItem(AUTH_KEY, JSON.stringify(admin));
      return { ok: true };
    }

    return { ok: false, error: 'Invalid email or password.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};