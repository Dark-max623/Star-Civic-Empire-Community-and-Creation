import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import journeyImage from '../../assets/images/STAR_CIVIC_LOGO.png';

export const Journey = () => {
  return (
    <section className="section-padding bg-bg-dark">
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-5 justify-center"
        >
          <span className="text-subtitle">Our Vision</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight">
            To Become a Leading Platform <br />
            <span className="text-gold-primary">
              for Talent, Creativity &amp; Community
            </span>
          </h2>
          <p className="text-text-subtle text-sm md:text-base leading-relaxed max-w-lg">
            At Star Civic Empire, we believe every individual has unique potential
            worth nurturing. We are committed to building a community where talent
            is recognized, creativity thrives, and opportunities are created for
            everyone to shine.
          </p>
          <div className="pt-2">
            <Button variant="solid" size="lg" to="/contact">
              Join the Community
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="relative bg-bg-dark-elevated border border-white/5 rounded-sm overflow-hidden min-h-[320px] md:min-h-[400px]"
        >
          <img
            src={journeyImage}
            alt="Star Civic Empire Logo"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain p-8 md:p-12"
          />
        </motion.div>
      </div>
    </section>
  );
};