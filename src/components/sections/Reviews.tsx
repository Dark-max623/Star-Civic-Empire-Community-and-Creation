import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';

export const Reviews = () => {
  const { reviews, addReview } = useData();
  const approved = reviews.filter((r) => r.status === 'approved');

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    addReview(form);
    setForm({ name: '', email: '', message: '', rating: 5 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="reviews" className="section-padding bg-bg-dark">
      <div className="section-container">
        <SectionHeader
          subtitle="What Our Clients Say"
          title="Reviews & Comments"
          align="center"
        />

        {/* Approved Reviews Grid */}
        {approved.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {approved.slice(0, 6).map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-bg-dark-elevated border border-white/5 rounded-sm p-6 flex flex-col gap-3"
              >
                <span className="text-gold-primary text-sm">
                  {'★'.repeat(review.rating)}
                  <span className="text-text-muted">
                    {'★'.repeat(5 - review.rating)}
                  </span>
                </span>
                <p className="text-text-subtle text-sm leading-relaxed flex-1">
                  "{review.message}"
                </p>
                <p className="text-text-primary text-sm font-semibold">
                  — {review.name}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Submit Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-bg-dark-elevated border border-white/5 rounded-sm p-6 md:p-8 flex flex-col gap-5"
        >
          <h3 className="text-text-primary text-xl font-semibold text-center">
            Share Your Experience
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold-primary transition-colors"
            />
            <input
              type="email"
              required
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-text-subtle text-xs uppercase tracking-widest mr-2">
              Rating:
            </span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setForm({ ...form, rating: n })}
                className={`text-2xl transition-colors ${
                  n <= form.rating ? 'text-gold-primary' : 'text-text-muted'
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            required
            rows={4}
            placeholder="Tell us about your experience..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold-primary transition-colors resize-none"
          />

          {submitted && (
            <p className="text-green-400 text-sm text-center bg-green-500/10 border border-green-500/30 py-2 rounded-sm">
              Thank you! Your review is awaiting approval.
            </p>
          )}

          <Button variant="solid" size="lg" type="submit" className="self-center">
            Submit Review
          </Button>
        </motion.form>
      </div>
    </section>
  );
};