import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authApi, getErrorMessage } from '../api';
import { Button } from '../components/ui/Button';

export const PasswordResetRequestPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await authApi.requestPasswordReset(email.trim().toLowerCase());
      setDone(true);
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
          <div className="flex items-center gap-2 mb-8 justify-center">
            <span className="text-gold-primary font-extrabold text-2xl tracking-tight">
              STAR CIVIC
            </span>
            <span className="text-text-primary text-xs tracking-widest">EMPIRE</span>
          </div>

          <h1 className="text-text-primary text-2xl font-bold mb-2 text-center">
            Reset Password
          </h1>
          <p className="text-text-subtle text-sm text-center mb-8">
            Enter your email and we'll send you a reset link.
          </p>

          {done ? (
            <p className="text-green-400 text-sm text-center bg-green-500/10 border border-green-500/30 px-4 py-3 rounded-sm">
              If that email is registered, you'll receive a reset link shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@starcivic.com"
                className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
              />
              {error && (
                <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-sm">
                  {error}
                </p>
              )}
              <Button variant="solid" size="lg" type="submit" className="w-full mt-2" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send Reset Link'}
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};