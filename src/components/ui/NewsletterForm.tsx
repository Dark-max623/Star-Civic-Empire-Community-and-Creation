import { useState, type FormEvent } from 'react';
import { Button } from './Button';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    // Wire to API here
    console.log('Subscribed:', email);
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm">
      <label htmlFor="newsletter-email" className="text-text-subtle text-sm">
        Subscribe to our newsletter
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold-primary transition-colors"
        />
        <Button variant="solid" size="sm" type="submit">
          {isSubmitted ? '✓ Sent' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};