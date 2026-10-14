import { motion } from 'framer-motion';
import type { Feature } from '../../types';

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="flex flex-col rounded-sm overflow-hidden bg-bg-dark-elevated"
    >
      <div className="bg-gold-primary text-bg-dark px-5 py-3 font-bold uppercase tracking-wider text-sm">
        {feature.title}
      </div>
      <div className="p-6 flex flex-col gap-3">
        <div className="text-3xl">{feature.icon}</div>
        <h4 className="text-text-primary font-semibold text-lg">{feature.title}</h4>
        <p className="text-text-subtle text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};