import { motion, type HTMLMotionProps } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type ButtonVariant = 'ghost' | 'solid';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** If set, renders an <a href> for in-page anchors. */
  href?: string;
  /** If set, renders a React Router <Link to>. */
  to?: string;
}

type ButtonProps = BaseProps & Omit<HTMLMotionProps<'button'>, 'children'>;

const sizeMap: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const variantMap: Record<ButtonVariant, string> = {
  ghost:
    'border border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-bg-dark',
  solid: 'bg-gold-primary text-bg-dark hover:bg-gold-hover',
};

export const Button = ({
  children,
  variant = 'ghost',
  size = 'md',
  className = '',
  href,
  to,
  type,
  ...rest
}: ButtonProps) => {
  const base =
    'inline-flex items-center justify-center font-semibold uppercase tracking-widest transition-colors duration-300 rounded-sm';
  const classes = `${base} ${variantMap[variant]} ${sizeMap[size]} ${className}`;

  // In-page anchor
  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  // React Router link
  if (to) {
    return (
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="inline-block"
      >
        <Link to={to} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  // Real <button> — needed for form submission
  return (
    <motion.button
      type={type || 'button'}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={classes}
      {...rest}
    >
      {children}
    </motion.button>
  );
};