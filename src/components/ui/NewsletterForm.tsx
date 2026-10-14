import { useState, type FormEvent } from 'react';
import { newsletterApi, getErrorMessage } from '../../api';
import { Button } from './Button';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const trimmed = email.trim().toLowerCase();
    console.log('📧 Newsletter submit fired with:', trimmed);

    if (!trimmed) {
      setStatus('err');
      setFeedback('Please enter an email address.');
      return;
    }

    setIsSubmitting(true);
    setFeedback('');

    try {
      console.log('📡 POSTing to /newsletter/subscribe/');
      const res = await newsletterApi.subscribe(trimmed);
      console.log('✅ Newsletter response:', res);

      setStatus('ok');
      setFeedback(res.message || 'Subscribed successfully.');
      setEmail('');
    } catch (err) {
      console.error('❌ Newsletter error:', err);
      setStatus('err');
      setFeedback(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full max-w-sm"
      noValidate
    >
      <label htmlFor="newsletter-email" className="text-text-subtle text-sm">
        Subscribe to our newsletter
      </label>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isSubmitting}
          autoComplete="email"
          className="flex-1 bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold-primary transition-colors"
        />

        <Button variant="solid" size="sm" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '…' : 'Submit'}
        </Button>
      </div>

      {status === 'ok' && (
        <p className="text-green-400 text-xs">{feedback}</p>
      )}
      {status === 'err' && (
        <p className="text-red-400 text-xs">{feedback}</p>
      )}
    </form>
  );
};