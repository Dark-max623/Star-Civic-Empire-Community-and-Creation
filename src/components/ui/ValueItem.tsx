import { motion } from 'framer-motion';

interface ValueItemProps {
  label: string;
  index: number;
}

export const ValueItem = ({ label, index }: ValueItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center gap-3"
    >
      <span className="w-2 h-2 rounded-full bg-gold-primary shrink-0" />
      <span className="text-text-primary font-medium text-sm md:text-base">
        {label}
      </span>
    </motion.div>
  );
};