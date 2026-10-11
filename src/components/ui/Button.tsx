import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'ghost' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export const Button = ({
  children,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...rest
}: ButtonProps) => {
  const base =
    'inline-flex items-center justify-center font-semibold uppercase tracking-widest transition-colors duration-300 rounded-sm';

  const variants = {
    ghost:
      'border border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-bg-dark',
    solid: 'bg-gold-primary text-bg-dark hover:bg-gold-hover',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${base} ${variants[variant]} ${sizeMap[size]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
};