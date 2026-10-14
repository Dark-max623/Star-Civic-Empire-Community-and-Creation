import { useEffect, useRef, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';

export const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, refreshServices } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    const load = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        if (services.length === 0) {
          await refreshServices();
        }
      } finally {
        setIsLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center pt-24">
          <p className="text-text-subtle text-sm">Loading…</p>
        </div>
      </Layout>
    );
  }

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <Layout>
      <article className="pt-24 md:pt-32 pb-16 md:pb-24 bg-bg-dark">
        <div className="section-container">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-text-subtle text-xs uppercase tracking-widest hover:text-gold-primary transition-colors mb-10"
          >
            ← Back to services
          </Link>

          {/* items-stretch = both columns have the same height */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-5 justify-center"
            >
              <span className="text-subtitle">Star Civic Empire</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight text-text-primary">
                {service.title}
              </h1>
              <p className="text-gold-primary text-base md:text-lg font-medium italic">
                {service.tagline}
              </p>
              <p className="text-text-subtle text-sm md:text-base leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-3">
                <Button variant="solid" size="lg" to="/contact">
                  Get in Touch
                </Button>
                <Button variant="ghost" size="lg" to="/events">
                  Upcoming Events
                </Button>
              </div>
            </motion.div>

            {/* Right: image fills the same height as the text box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-sm overflow-hidden border-2 border-gold-primary/40 bg-black min-h-[320px]"
            >
              <img
                src={service.image_url}
                alt={service.title}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="mt-16 md:mt-24 bg-bg-dark-elevated border border-white/5 rounded-sm p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Ready to Work With {service.title}?
            </h2>
            <p className="text-text-subtle text-sm md:text-base max-w-2xl mx-auto mb-6">
              Reach out to our team for a bespoke consultation. Whether you're
              planning an intimate gathering or a landmark celebration, we'll
              craft an experience you'll remember.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="solid" size="lg" to="/contact">
                Contact Us
              </Button>
              <Button variant="ghost" size="lg" to="/">
                Explore More
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};