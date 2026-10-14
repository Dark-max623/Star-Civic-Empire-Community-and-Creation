import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { ImageUploader, type UploadedImage } from '../components/ui/ImageUploader';

export const GalleryPage = () => {
  const {
    gallery,
    isLoadingGallery,
    refreshGallery,
    uploadGalleryImages,
    deleteGalleryImage,
  } = useData();

  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    refreshGallery();
  }, [refreshGallery]);

  const handleUpload = async (images: UploadedImage[]) => {
    setIsUploading(true);
    const payload = images.map((img) => ({ file: img.file, alt: img.alt }));
    const result = await uploadGalleryImages(payload);
    setIsUploading(false);

    if (result.ok) {
      setNotice({
        type: 'ok',
        msg: `${images.length} image${images.length > 1 ? 's' : ''} uploaded.`,
      });
      // Clean up preview URLs
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    } else {
      setNotice({ type: 'err', msg: result.error || 'Upload failed.' });
    }
    setTimeout(() => setNotice(null), 4000);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteGalleryImage(id);
    } catch (err) {
      setNotice({ type: 'err', msg: 'Failed to delete image.' });
      setTimeout(() => setNotice(null), 4000);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Gallery Manager
        </h1>
        <p className="text-text-subtle text-sm">
          Upload photos to display on the public Gallery section.
        </p>
      </header>

      <div className="mb-10">
        <ImageUploader onUpload={handleUpload} maxFiles={10} />
      </div>

      {isUploading && (
        <p className="text-gold-primary text-xs uppercase tracking-widest mb-4">
          Uploading…
        </p>
      )}

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

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-text-primary font-semibold">
          Uploaded Photos ({gallery.length})
        </h2>
      </div>

      {isLoadingGallery ? (
        <p className="text-text-subtle text-sm text-center py-10">Loading…</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {gallery.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative aspect-square overflow-hidden rounded-sm bg-bg-dark-elevated border border-white/5"
              >
                <img
                  src={img.image_url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-3 text-center">
                  <p className="text-text-primary text-xs line-clamp-2">{img.alt}</p>
                  <button
                    onClick={() => handleDelete(img.id)}
                    disabled={deletingId === img.id}
                    className="bg-red-500/90 hover:bg-red-500 disabled:opacity-50 text-white text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm"
                  >
                    {deletingId === img.id ? 'Deleting…' : 'Delete'}
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
      )}
    </div>
  );
};