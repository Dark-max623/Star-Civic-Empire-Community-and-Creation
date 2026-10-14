import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export const LoginPage = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    '/admin/dashboard';

  // If a session bootstrap is happening, show a spinner
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

  // Already logged in? Skip login.
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError('');
    setIsSubmitting(true);

    try {
      const result = await login(email.trim().toLowerCase(), password);

      if (result.ok) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Login failed.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-subtle text-xs uppercase tracking-widest hover:text-gold-primary transition-colors mb-8"
        >
          ← Back to site
        </Link>

        <div className="bg-bg-dark-elevated rounded-sm p-8 md:p-10 border border-white/5">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <span className="text-gold-primary font-extrabold text-2xl tracking-tight">
              STAR CIVIC
            </span>
            <span className="text-text-primary text-xs tracking-widest">
              EMPIRE
            </span>
          </div>

          <h1 className="text-text-primary text-2xl font-bold mb-2 text-center">
            Login
          </h1>
          <p className="text-text-subtle text-sm text-center mb-8">
            
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="login-email"
                className="text-text-subtle text-xs uppercase tracking-widest"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
                placeholder="me@starcivic.com"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="login-password"
                className="text-text-subtle text-xs uppercase tracking-widest"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
                placeholder="••••••••"
                disabled={isSubmitting}
              />
            </div>

            {/* Forgot password link */}
            <div className="flex justify-end -mt-2">
              <Link
                to="/reset-password"
                className="text-text-subtle text-xs hover:text-gold-primary transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-sm">
                {error}
              </p>
            )}

            <Button
              variant="solid"
              size="lg"
              type="submit"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-text-muted text-xs text-center leading-relaxed">
              Sign in with your Star Civic  credentials.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};