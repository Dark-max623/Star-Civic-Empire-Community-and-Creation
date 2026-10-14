import { useState, useEffect, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';
import { apiClient, getErrorMessage } from '../api';

export const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [feedback, setFeedback] = useState('');

  // Pre-fill the subject if a ?subject= query param is present
  // (e.g. clicking "Book Now" on an event links here with the event title)
  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    if (subjectParam) {
      setForm((prev) => ({
        ...prev,
        subject: `Booking enquiry: ${subjectParam}`,
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    setFeedback('');

    try {
      await apiClient.post('/contact/', {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      setStatus('ok');
      setFeedback("Thank you! We'll be in touch shortly.");
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('err');
      setFeedback(getErrorMessage(err));
    } finally {
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <Layout>
      <PageHero title="Contact Us" subtitle="Get in Touch" breadcrumb="Contact Us" />

      <section className="section-padding bg-bg-dark">
        <div className="section-container grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Contact info cards */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="bg-bg-dark-elevated border border-white/5 rounded-sm p-6">
              <p className="text-gold-primary text-xs uppercase tracking-widest mb-2">
                Email
              </p>
              <a
                href="mailto:starcivicempire@gmail.com"
                className="text-text-primary text-sm hover:text-gold-primary transition-colors break-all"
              >
                starcivicempire@gmail.com
              </a>
            </div>
            <div className="bg-bg-dark-elevated border border-white/5 rounded-sm p-6">
              <p className="text-gold-primary text-xs uppercase tracking-widest mb-2">
                Phone
              </p>
              <a
                href="tel:+254115626611"
                className="text-text-primary text-sm hover:text-gold-primary transition-colors"
              >
                +254 115 626 611
              </a>
            </div>
            <div className="bg-bg-dark-elevated border border-white/5 rounded-sm p-6">
              <p className="text-gold-primary text-xs uppercase tracking-widest mb-2">
                Address
              </p>
              <p className="text-text-primary text-sm leading-relaxed">
                Star Civic Empire
                <br />
                Kisii, Kenya
              </p>
            </div>
          </div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2 bg-bg-dark-elevated border border-white/5 rounded-sm p-6 md:p-8 flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-text-subtle text-xs uppercase tracking-widest">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
                  disabled={status === 'sending'}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-text-subtle text-xs uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
                  disabled={status === 'sending'}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-text-subtle text-xs uppercase tracking-widest">
                Subject
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
                disabled={status === 'sending'}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-text-subtle text-xs uppercase tracking-widest">
                Message
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-transparent border border-text-muted rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors resize-none"
                disabled={status === 'sending'}
              />
            </div>

            {status === 'ok' && (
              <p className="text-green-400 text-xs bg-green-500/10 border border-green-500/30 px-3 py-2 rounded-sm">
                {feedback}
              </p>
            )}
            {status === 'err' && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-sm">
                {feedback}
              </p>
            )}

            <div className="flex justify-end">
              <Button
                variant="solid"
                size="lg"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </Button>
            </div>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};