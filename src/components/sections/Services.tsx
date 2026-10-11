import { services } from '../../data/services';
import { SectionHeader } from '../ui/SectionHeader';
import { ServiceCard } from '../ui/ServiceCard';

export const Services = () => {
  return (
    <section id="services" className="section-padding bg-bg-dark">
      <div className="section-container">
        <SectionHeader subtitle="Experience the Extraordinary" title="Our Services" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};