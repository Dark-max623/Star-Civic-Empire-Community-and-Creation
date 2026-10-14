import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ValueItem } from '../components/ui/ValueItem';
import { FeatureCard } from '../components/ui/FeatureCard';
import { values } from '../data/values';
import { features } from '../data/features';
import welcomeImage from '../assets/images/MR.T.jpg';

export const AboutPage = () => {
  return (
    <Layout>
      <PageHero
        title=""
        subtitle=""
        breadcrumb="About Us"
      />

      <section className="section-padding bg-bg-dark">
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-section-title">Star Civic Empire</h2>

            <p className="text-gold-primary text-sm md:text-base font-medium italic">
              Community &amp; Creation
            </p>

            <p className="text-text-subtle text-sm md:text-base leading-relaxed">
              Star Civic Empire Community &amp; Creation is a community-driven
              organization dedicated to empowering individuals, nurturing talent,
              promoting creativity, and creating opportunities for growth and
              development.
            </p>

            <p className="text-text-subtle text-sm md:text-base leading-relaxed">
              We bring people together through entertainment, fashion, modelling,
              cultural events, talent development, and community initiatives.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <span className="text-subtitle">Our Values</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {values.map((value, i) => (
                  <ValueItem key={value.id} label={value.label} index={i} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-sm">
              <img
                src={welcomeImage}
                alt="Star Civic Empire community"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold-primary rounded-sm -z-0 hidden lg:block" />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-bg-dark-elevated">
        <div className="section-container">
          <SectionHeader
            subtitle="What Drives Us"
            title="Mission & Vision"
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-bg-dark border border-white/5 rounded-sm p-8 flex flex-col gap-4">
              <p className="text-gold-primary text-xs uppercase tracking-widest">
                Our Mission
              </p>
              <p className="text-text-subtle text-sm md:text-base leading-relaxed">
                To provide a platform where people can discover their potential,
                showcase their abilities, build confidence, and turn their dreams
                into reality. Through collaboration, innovation, and meaningful
                engagement, we strive to create opportunities that inspire positive
                change and strengthen our communities.
              </p>
            </div>

            <div className="bg-bg-dark border border-white/5 rounded-sm p-8 flex flex-col gap-4">
              <p className="text-gold-primary text-xs uppercase tracking-widest">
                Our Vision
              </p>
              <p className="text-text-subtle text-sm md:text-base leading-relaxed">
                To become a leading platform for talent development, entertainment,
                creativity, and community empowerment — where every individual has
                the space to shine.
              </p>
            </div>
          </div>

          <div className="mt-10 md:mt-14 text-center">
            <p className="text-gold-primary font-semibold text-lg md:text-xl tracking-wide italic">
              Empowering Talent. Inspiring Creativity. Transforming Communities.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-bg-dark">
        <div className="section-container">
          <SectionHeader
            subtitle="What Sets Us Apart"
            title="Why Star Civic Empire"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={feature.id} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};