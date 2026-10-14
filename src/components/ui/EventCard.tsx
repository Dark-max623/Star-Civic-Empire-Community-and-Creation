import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Event } from '../../types';
import { Button } from './Button';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const timeRange =
    event.startTime && event.endTime
      ? `${event.startTime} – ${event.endTime}`
      : event.startTime
      ? `From ${event.startTime}`
      : '';

  const contactLink = `/contact?subject=${encodeURIComponent(event.title)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35 }}
      className="group flex flex-col overflow-hidden rounded-sm bg-bg-dark border border-white/5 hover:border-gold-primary/40 transition-colors duration-300"
    >
      <Link to={contactLink} className="block">
        <div className="relative h-32 md:h-36 bg-black overflow-hidden border-b border-gold-primary/30">
          <img
            src={event.imageUrl}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-1 p-2.5 flex-1">
        <p className="text-gold-primary text-[10px] uppercase tracking-widest leading-tight truncate">
          {event.date}
        </p>

        {timeRange && (
          <p className="text-text-primary text-[10px] uppercase tracking-widest leading-tight truncate">
            {timeRange}
          </p>
        )}

        <p className="text-text-muted text-[10px] uppercase tracking-widest leading-tight truncate">
          {event.location}
        </p>

        <Link to={contactLink}>
          <h3 className="text-text-primary font-semibold text-xs leading-snug mt-0.5 line-clamp-2 hover:text-gold-primary transition-colors">
            {event.title}
          </h3>
        </Link>

        <div className="mt-auto pt-2">
          <Button
            variant="solid"
            size="sm"
            to={contactLink}
            className="w-full text-[10px] py-1.5"
          >
            {event.ctaLabel}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};