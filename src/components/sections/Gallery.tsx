import { useData } from '../../context/DataContext';
import { SectionHeader } from '../ui/SectionHeader';

export const Gallery = () => {
  const { gallery, isLoadingGallery } = useData();

  const showLoading = isLoadingGallery && gallery.length === 0;

  return (
    <section id="gallery" className="pb-16 md:pb-24 bg-bg-dark">
      <div className="section-container">
        <SectionHeader
          subtitle="A Glimpse Into Our World"
          title="Our Gallery"
          align="center"
        />

        <p className="text-text-subtle text-sm md:text-base leading-relaxed text-center max-w-2xl mx-auto -mt-6 md:-mt-8 mb-10 md:mb-14">
          From electrifying concert nights and elegant banquet celebrations to the
          craftsmanship behind our fashion line and the lives touched by our
          foundation — these are the moments that define Star Civic Empire.
        </p>

        {showLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-32 md:h-36 bg-bg-dark-elevated animate-pulse rounded-sm border border-white/10"
              />
            ))}
          </div>
        ) : gallery.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {gallery.slice(0, 10).map((img) => (
              <div
                key={img.id}
                className="group h-32 md:h-36 rounded-sm border-2 border-gold-primary/40 hover:border-gold-primary bg-black overflow-hidden transition-colors duration-300"
              >
                <img
                  src={img.image_url}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-sm">
            <p className="text-text-subtle text-sm">
              Our gallery is being curated. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};