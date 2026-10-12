import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Send the visitor to /login and remember where they were heading
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};