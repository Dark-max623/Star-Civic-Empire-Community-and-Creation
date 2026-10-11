import { features } from '../../data/features';
import { SectionHeader } from '../ui/SectionHeader';
import { FeatureCard } from '../ui/FeatureCard';

export const WhyUs = () => {
  return (
    <section className="section-padding bg-bg-dark-elevated">
      <div className="section-container">
        <SectionHeader subtitle="What Sets Us Apart" title="Why Star Civic Group" align="center" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};