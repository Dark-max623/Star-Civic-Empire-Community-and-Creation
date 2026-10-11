interface ImageWithZoomProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
}

export const ImageWithZoom = ({
  src,
  alt,
  className = '',
  aspect = 'aspect-square',
}: ImageWithZoomProps) => {
  return (
    <div className={`overflow-hidden ${aspect} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
      />
    </div>
  );
};