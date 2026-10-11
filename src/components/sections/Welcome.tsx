import { motion } from 'framer-motion';
import { values } from '../../data/values';
import { ValueItem } from '../ui/ValueItem';

export const Welcome = () => {
  return (
    <section id="about" className="section-padding bg-bg-dark">
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-section-title">Welcome to Star Civic Empire Group</h2>

          <p className="text-gold-primary text-sm md:text-base font-medium italic">
            Unleash the Extraordinary. Embrace the Exceptional.
          </p>

          <p className="text-text-subtle text-sm md:text-base leading-relaxed">
            Welcome to Star Civic Empire Group, where we redefine entertainment, elevate taste, and
            give back to the community. With a commitment to excellence, innovation, and
            social responsibility, we invite you to explore the myriad facets of what we do.
          </p>

          <p className="text-text-subtle text-sm md:text-base leading-relaxed">
            Established in 2021, Star Civic Empire Group has evolved into a prominent entity in the Kenya,
            encompassing four distinct yet interconnected businesses. Our journey is marked
            by a dedication to redefining entertainment, lifestyle, and community engagement.
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <span className="text-subtitle">Our Values</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {values.map((value, i) => (
                <ValueItem key={value.id} label={value.label} index={i} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="aspect-square overflow-hidden rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1000&q=85"
              alt="Concert lights"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold-primary rounded-sm -z-0 hidden lg:block" />
        </motion.div>
      </div>
    </section>
  );
};