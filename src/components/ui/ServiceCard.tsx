import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Service } from '../../types';
import { Button } from './Button';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const slug = service.slug;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35 }}
      className="group flex flex-col bg-bg-dark-elevated rounded-sm overflow-hidden border border-white/5 hover:border-gold-primary/40 transition-colors"
    >
      <Link to={`/services/${slug}`} className="block">
        <div className="relative h-48 md:h-52 bg-black overflow-hidden border-b-2 border-gold-primary/40">
          <img
            src={service.imageUrl}
            alt={service.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-1.5 p-4 md:p-5 flex-1">
        <Link to={`/services/${slug}`}>
          <h3 className="text-base md:text-lg font-semibold text-gold-primary hover:text-gold-hover transition-colors leading-snug">
            {service.title}
          </h3>
        </Link>

        <p className="text-text-subtle text-[10px] md:text-xs uppercase tracking-wider">
          {service.tagline}
        </p>

        <p className="text-text-subtle text-xs md:text-sm leading-relaxed flex-1 line-clamp-3">
          {service.description}
        </p>

        <div className="pt-2">
          <Button variant="solid" size="sm" to={`/services/${slug}`}>
            {service.ctaLabel} &gt;&gt;
          </Button>
        </div>
      </div>
    </motion.article>
  );
};