import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const Journey = () => {
  return (
    <section className="section-padding bg-bg-dark">
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-5"
        >
          <span className="text-subtitle">Begin Your Story</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight">
            Embark on Your Journey <br />
            <span className="text-gold-primary">with Star Civic Empire Group</span>
          </h2>
          <p className="text-text-subtle text-sm md:text-base leading-relaxed max-w-lg">
            Whether you're planning an unforgettable event, seeking a refined dining
            experience, exploring our fashion line, or looking to make a difference through
            our foundation — your journey begins here.
          </p>
          <div className="pt-2">
            <Button variant="solid" size="lg">
              Get Started
            </Button>
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="aspect-[4/3] overflow-hidden rounded-sm"
        >
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85"
            alt="Two people dining"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};