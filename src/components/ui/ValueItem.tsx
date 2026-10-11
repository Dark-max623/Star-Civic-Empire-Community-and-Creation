import { motion } from 'framer-motion';

interface ValueItemProps {
  label: string;
  index: number;
}

export const ValueItem = ({ label, index }: ValueItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center gap-3"
    >
      <span className="w-8 h-1 bg-gold-primary rounded-full" />
      <span className="text-text-primary font-medium text-sm md:text-base">{label}</span>
    </motion.div>
  );
};