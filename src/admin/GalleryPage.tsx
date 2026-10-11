import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { ImageUploader, type UploadedImage } from '../components/ui/ImageUploader';
import { formatBytes, STORAGE_WARN_BYTES } from '../utils/imageUpload';

export const GalleryPage = () => {
  const { gallery, addGalleryImages, deleteGalleryImage, storageUsedBytes } = useData();
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

  const handleUpload = (images: UploadedImage[]) => {
    const result = addGalleryImages(
      images.map((img) => ({ url: img.url, alt: img.alt }))
    );
    if (result.ok) {
      setNotice({
        type: 'ok',
        msg: `${images.length} image${images.length > 1 ? 's' : ''} uploaded successfully.`,
      });
    } else {
      setNotice({ type: 'err', msg: result.error || 'Upload failed.' });
    }
    setTimeout(() => setNotice(null), 4000);
  };

  const usagePercent = Math.min(
    100,
    Math.round((storageUsedBytes / STORAGE_WARN_BYTES) * 100)
  );
  const usageColor =
    usagePercent > 85
      ? 'bg-red-500'
      : usagePercent > 60
      ? 'bg-yellow-500'
      : 'bg-gold-primary';

  return (
    <div className="p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Gallery Manager
        </h1>
        <p className="text-text-subtle text-sm">
          Upload photos to display on the public Gallery section. Changes appear instantly.
        </p>
      </header>

      {/* Storage Meter */}
      <div className="mb-8 bg-bg-dark-elevated border border-white/5 rounded-sm p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-text-subtle text-xs uppercase tracking-widest">
            Storage Used
          </span>
          <span className="text-text-primary text-xs font-medium">
            {formatBytes(storageUsedBytes)} / {formatBytes(STORAGE_WARN_BYTES)}
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${usagePercent}%` }}
            className={`h-full ${usageColor}`}
          />
        </div>
        {usagePercent > 85 && (
          <p className="text-red-400 text-xs mt-2">
            Storage is nearly full. Delete some photos to free space.
          </p>
        )}
      </div>

      {/* Upload Zone */}
      <div className="mb-10">
        <ImageUploader onUpload={handleUpload} maxFiles={10} />
      </div>

      {/* Notice */}
      <AnimatePresence>
        {notice && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`text-xs px-4 py-3 rounded-sm mb-6 border ${
              notice.type === 'ok'
                ? 'text-green-400 bg-green-500/10 border-green-500/30'
                : 'text-red-400 bg-red-500/10 border-red-500/30'
            }`}
          >
            {notice.msg}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Photos Grid */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-text-primary font-semibold">
          Uploaded Photos ({gallery.length})
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {gallery.map((img) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="group relative aspect-square overflow-hidden rounded-sm bg-bg-dark-elevated border border-white/5"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-3 text-center">
                <p className="text-text-primary text-xs line-clamp-2">{img.alt}</p>
                <p className="text-text-muted text-[10px]">
                  {formatBytes(img.url.length * 2)}
                </p>
                <button
                  onClick={() => deleteGalleryImage(img.id)}
                  className="bg-red-500/90 hover:bg-red-500 text-white text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {gallery.length === 0 && (
          <p className="text-text-subtle text-sm col-span-full text-center py-10">
            No photos yet. Upload some above.
          </p>
        )}
      </div>
    </div>
  );
};