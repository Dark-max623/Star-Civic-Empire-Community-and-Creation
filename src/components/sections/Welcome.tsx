import { motion } from 'framer-motion';
import { values } from '../../data/values';
import { ValueItem } from '../ui/ValueItem';
import welcomeImage from '../../assets/images/MR.T.jpg';

export const Welcome = () => {
  return (
    <section id="about" className="section-padding bg-bg-dark">
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-section-title">About Star Civic Empire</h2>

          <p className="text-gold-primary text-sm md:text-base font-medium italic">
            Community &amp; Creation
          </p>

          <p className="text-text-subtle text-sm md:text-base leading-relaxed">
            Star Civic Empire Community &amp; Creation is a community-driven
            organization dedicated to empowering individuals, nurturing talent,
            promoting creativity, and creating opportunities for growth and
            development.
          </p>

          <p className="text-text-subtle text-sm md:text-base leading-relaxed">
            We bring people together through entertainment, fashion, modelling,
            cultural events, talent development, and community initiatives.
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

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="aspect-square overflow-hidden rounded-sm">
            <img
              src={welcomeImage}
              alt="Star Civic Empire community"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold-primary rounded-sm -z-0 hidden lg:block" />
        </motion.div>
      </div>
    </section>
  );
};