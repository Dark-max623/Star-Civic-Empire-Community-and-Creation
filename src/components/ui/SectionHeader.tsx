import { motion } from 'framer-motion';

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader = ({
  subtitle,
  title,
  align = 'left',
  className = '',
}: SectionHeaderProps) => {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col ${alignClass} gap-3 mb-10 md:mb-14 ${className}`}
    >
      {subtitle && <span className="text-subtitle">{subtitle}</span>}
      <h2 className="text-section-title">{title}</h2>
    </motion.div>
  );
};