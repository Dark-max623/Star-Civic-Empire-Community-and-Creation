import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=85"
          alt="Community and creativity"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      <div className="relative z-10 section-container flex flex-col items-center text-center gap-5 md:gap-7 pt-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-text-primary text-sm md:text-base font-light tracking-[0.3em] uppercase"
        >
          Community &amp; Creation
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-tight max-w-5xl"
        >
          Empowering Talent.
          <br />
          Inspiring Creativity.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="text-text-subtle text-sm md:text-base max-w-2xl leading-relaxed"
        >
          A community-driven platform where individuals discover their potential,
          showcase their abilities, and turn their dreams into reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Button variant="ghost" size="lg" href="#about">
            Discover More
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-subtle text-[10px] tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-gold-primary"
        />
      </motion.div>
    </section>
  );
};