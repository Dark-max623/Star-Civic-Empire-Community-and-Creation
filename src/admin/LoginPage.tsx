import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';

  if (isAuthenticated) return <Navigate to={from} replace />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.ok) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-bg-dark-elevated rounded-sm p-8 md:p-10 border border-white/5"
      >
        <div className="flex items-center gap-2 mb-8 justify-center">
          <span className="text-gold-primary font-extrabold text-2xl">STAR CIVIC</span>
          <span className="text-text-primary text-xs tracking-widest">ADMIN</span>
        </div>

        <h1 className="text-text-primary text-2xl font-bold mb-2 text-center">
          Admin Login
        </h1>
        <p className="text-text-subtle text-sm text-center mb-8">
          Sign in to manage the Star Civic Group website
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-text-subtle text-xs uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
              placeholder="admin@starcivic.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-text-subtle text-xs uppercase tracking-widest">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-sm">
              {error}
            </p>
          )}

          <Button variant="solid" size="lg" type="submit" className="w-full mt-2">
            Sign In
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-text-muted text-xs text-center">
            Demo credentials:
            <br />
            <span className="text-gold-primary">starcivic@ravana.com</span> / <span className="text-gold-primary">ravana2025</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};