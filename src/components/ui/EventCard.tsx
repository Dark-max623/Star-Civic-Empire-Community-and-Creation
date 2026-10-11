import { motion } from 'framer-motion';
import type { Event } from '../../types';
import { Button } from './Button';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-sm bg-bg-dark-elevated"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-gold-primary text-xs uppercase tracking-widest mb-1">
            {event.date} · {event.location}
          </p>
          <h3 className="text-text-primary font-semibold text-lg md:text-xl">
            {event.title}
          </h3>
        </div>
        <Button variant="solid" size="sm">
          {event.ctaLabel}
        </Button>
      </div>
    </motion.div>
  );
};