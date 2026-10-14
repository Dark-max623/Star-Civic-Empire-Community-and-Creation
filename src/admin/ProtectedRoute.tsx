import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gold-primary/30 border-t-gold-primary rounded-full animate-spin" />
          <p className="text-text-subtle text-xs uppercase tracking-widest">
            Loading…
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Defence in depth: reject non-admins even if a valid token is present
  if (user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};