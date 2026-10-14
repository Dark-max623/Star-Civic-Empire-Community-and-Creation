import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export const PageHero = ({ title, subtitle, breadcrumb }: PageHeroProps) => {
  return (
    <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 bg-bg-dark border-b border-white/5">
      <div className="section-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-text-muted mb-5">
          <Link to="/" className="hover:text-gold-primary transition-colors">
            Home
          </Link>
          <span className="text-text-muted">/</span>
          <span className="text-gold-primary">{breadcrumb || title}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          {subtitle && <span className="text-subtitle">{subtitle}</span>}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-text-primary">
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
};