import { useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Layout } from '../components/layout/Layout';
import { PageHero } from '../components/ui/PageHero';
import { ServiceCard } from '../components/ui/ServiceCard';

export const ServicesPage = () => {
  const { services, isLoadingServices, refreshServices } = useData();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    if (services.length === 0) {
      refreshServices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showLoading = isLoadingServices && services.length === 0;

  return (
    <Layout>
      <PageHero title="Our Services" subtitle="What We Do" breadcrumb="Services" />

      <section className="section-padding bg-bg-dark">
        <div className="section-container">
          {showLoading ? (
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 bg-bg-dark-elevated border border-white/5 rounded-sm animate-pulse"
                />
              ))}
            </div>
          ) : services.length === 0 ? (
            <p className="text-text-subtle text-sm text-center py-10">
              Services coming soon.
            </p>
          ) : (
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
          )}
        </div>
      </section>
    </Layout>
  );
};