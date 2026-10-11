import { galleryImages } from '../../data/gallery';
import { ImageWithZoom } from '../ui/ImageWithZoom';

export const Gallery = () => {
  return (
    <section className="pb-16 md:pb-24 bg-bg-dark">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img) => (
            <ImageWithZoom
              key={img.id}
              src={img.url}
              alt={img.alt}
              aspect="aspect-square"
              className="rounded-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
};