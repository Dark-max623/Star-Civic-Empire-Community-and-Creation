import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authApi, getErrorMessage } from '../api';
import { Button } from '../components/ui/Button';

export const PasswordResetConfirmPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const uid = searchParams.get('uid') || '';
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 10) {
      setError('Password must be at least 10 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!uid || !token) {
      setError('Invalid reset link.');
      return;
    }

    setIsSubmitting(true);
    try {
      await authApi.confirmPasswordReset({ uid, token, new_password: password });
      navigate('/login', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
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
          to="/login"
          className="inline-flex items-center gap-2 text-text-subtle text-xs uppercase tracking-widest hover:text-gold-primary transition-colors mb-8"
        >
          ← Back to login
        </Link>

        <div className="bg-bg-dark-elevated rounded-sm p-8 md:p-10 border border-white/5">
          <h1 className="text-text-primary text-2xl font-bold mb-2 text-center">
            Set New Password
          </h1>
          <p className="text-text-subtle text-sm text-center mb-8">
            Choose a strong password of at least 10 characters.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
            />
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
            />
            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-sm">
                {error}
              </p>
            )}
            <Button variant="solid" size="lg" type="submit" className="w-full mt-2" disabled={isSubmitting}>
              {isSubmitting ? 'Updating…' : 'Update Password'}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};