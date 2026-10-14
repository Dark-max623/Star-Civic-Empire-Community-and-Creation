import { motion } from 'framer-motion';

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  hasMore: boolean;
  shown: number;
  total: number;
  label?: string;
}

export const LoadMoreButton = ({
  onClick,
  isLoading = false,
  hasMore,
  shown,
  total,
  label = 'items',
}: LoadMoreButtonProps) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-10 md:mt-14">
      <p className="text-text-muted text-xs uppercase tracking-widest">
        Showing {shown} of {total} {label}
      </p>

      {hasMore ? (
        <motion.button
          onClick={onClick}
          disabled={isLoading}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="inline-flex items-center justify-center font-semibold uppercase tracking-widest text-sm px-8 py-4 rounded-sm border border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-bg-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading…' : 'Load More'}
        </motion.button>
      ) : (
        <p className="text-text-muted text-xs">— End of list —</p>
      )}
    </div>
  );
};