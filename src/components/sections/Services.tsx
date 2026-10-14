import { useData } from '../../context/DataContext';
import { SectionHeader } from '../ui/SectionHeader';
import { ServiceCard } from '../ui/ServiceCard';

export const Services = () => {
  const { services, isLoadingServices } = useData();

  const showLoading = isLoadingServices && services.length === 0;

  return (
    <section id="services" className="section-padding bg-bg-dark">
      <div className="section-container">
        <SectionHeader
          subtitle="Experience the Extraordinary"
          title="Our Services"
        />

        {showLoading ? (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-72 bg-bg-dark-elevated border border-white/5 rounded-sm animate-pulse"
              />
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={{
                  id: service.id,
                  title: service.title,
                  slug: service.slug,          // ← added
                  tagline: service.tagline,
                  description: service.description,
                  imageUrl: service.image_url,
                  ctaLabel: service.cta_label,
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-text-subtle text-sm text-center py-10">
            Services coming soon.
          </p>
        )}
      </div>
    </section>
  );
};