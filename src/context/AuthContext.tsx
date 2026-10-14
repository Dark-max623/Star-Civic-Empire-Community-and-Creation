import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { authApi, tokenStore, getErrorMessage } from '../api';
import type { ApiUser } from '../api';

interface AuthContextValue {
  user: ApiUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = tokenStore.getAccess();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const me = await authApi.me();
        // Enforce admin-only on bootstrap too
        if (me.role !== 'admin') {
          tokenStore.clear();
          setUser(null);
        } else {
          setUser(me);
        }
      } catch {
        tokenStore.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await authApi.login(email.trim().toLowerCase(), password);

      // Enforce admin-only at the client side
      if (user.role !== 'admin') {
        await authApi.logout();
        tokenStore.clear();
        return {
          ok: false,
          error: 'Only administrators can access this system.',
        };
      }

      setUser(user);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err) };
    }
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};