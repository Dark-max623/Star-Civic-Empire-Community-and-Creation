import { motion } from 'framer-motion';
import type { Service } from '../../types';
import { ImageWithZoom } from './ImageWithZoom';
import { Button } from './Button';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="group flex flex-col bg-bg-dark-elevated rounded-sm overflow-hidden"
    >
      <ImageWithZoom
        src={service.imageUrl}
        alt={service.title}
        aspect="aspect-[4/3]"
        className="w-full"
      />

      <div className="flex flex-col gap-3 p-6 md:p-7 flex-1">
        <h3 className="text-xl md:text-2xl font-semibold text-gold-primary">
          {service.title}
        </h3>
        <p className="text-text-subtle text-xs md:text-sm uppercase tracking-wider">
          {service.tagline}
        </p>
        <p className="text-text-subtle text-sm leading-relaxed flex-1">
          {service.description}
        </p>

        <div className="pt-2">
          <Button variant="solid" size="sm" className="group-hover:bg-gold-hover">
            {service.ctaLabel} &gt;&gt;
          </Button>
        </div>
      </div>
    </motion.article>
  );
};