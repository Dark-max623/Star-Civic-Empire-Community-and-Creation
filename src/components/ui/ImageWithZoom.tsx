interface ImageWithZoomProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  /** How the image fits inside its frame. */
  fit?: 'cover' | 'contain';
  /** Optional click handler — makes the image interactive. */
  onClick?: () => void;
}

export const ImageWithZoom = ({
  src,
  alt,
  className = '',
  aspect = 'aspect-square',
  fit = 'cover',
  onClick,
}: ImageWithZoomProps) => {
  return (
    <div
      onClick={onClick}
      className={`overflow-hidden ${aspect} ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full transition-transform duration-700 ease-out hover:scale-110 ${
          fit === 'contain' ? 'object-contain' : 'object-cover'
        }`}
      />
    </div>
  );
};