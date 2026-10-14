import { useEffect, useState, type FormEvent } from 'react';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { ImageUploader, type UploadedImage } from '../components/ui/ImageUploader';

export const ServicesAdminPage = () => {
  const {
    services,
    refreshServices,
    createService,
    deleteService,
    isLoadingServices,
  } = useData();

  const [form, setForm] = useState({
    title: '',
    tagline: '',
    description: '',
    ctaLabel: 'Discover More',
    order: 1,
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    refreshServices();
  }, [refreshServices]);

  const handleUpload = (images: UploadedImage[]) => {
    if (images[0]) {
      setImage(images[0].file);
      setPreview(images[0].previewUrl);
    }
  };

  const clearImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.title || !form.tagline || !form.description) {
      setError('Please fill in title, tagline, and description.');
      return;
    }
    if (!image) {
      setError('Please upload a service image.');
      return;
    }

    setIsSubmitting(true);
    const result = await createService({ ...form, image });
    setIsSubmitting(false);

    if (result.ok) {
      setForm({
        title: '',
        tagline: '',
        description: '',
        ctaLabel: 'Discover More',
        order: services.length + 2,
      });
      clearImage();
    } else {
      setError(result.error || 'Failed to add service.');
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this service permanently?')) return;
    setDeletingId(slug);
    try {
      await deleteService(slug);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Services Manager
        </h1>
        <p className="text-text-subtle text-sm">
          Add or remove the four service verticals shown on the public site.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-bg-dark-elevated border border-white/5 rounded-sm p-6 mb-10 flex flex-col gap-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-text-subtle text-xs uppercase tracking-widest">
              Title
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Star Civic Events"
              className="bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-text-subtle text-xs uppercase tracking-widest">
              Tagline
            </label>
            <input
              type="text"
              required
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              placeholder="e.g. Moments Redefined"
              className="bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-text-subtle text-xs uppercase tracking-widest">
              Order
            </label>
            <input
              type="number"
              min={1}
              value={form.order}
              onChange={(e) =>
                setForm({ ...form, order: parseInt(e.target.value) || 1 })
              }
              className="bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-text-subtle text-xs uppercase tracking-widest">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors resize-none"
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-text-subtle text-xs uppercase tracking-widest">
              CTA Label
            </label>
            <input
              type="text"
              value={form.ctaLabel}
              onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })}
              className="bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-text-subtle text-xs uppercase tracking-widest">
            Service Image
          </label>
          {preview ? (
            <div className="flex items-center gap-3 bg-bg-dark border border-text-muted rounded-sm p-3">
              <img
                src={preview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-sm"
              />
              <div className="flex-1">
                <p className="text-text-primary text-xs font-medium">Image ready</p>
              </div>
              <button
                type="button"
                onClick={clearImage}
                className="text-red-400 text-xs uppercase tracking-widest hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ) : (
            <ImageUploader onUpload={handleUpload} maxFiles={1} label="Upload service image" />
          )}
        </div>

        {error && (
          <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-sm">
            {error}
          </p>
        )}

        <div className="flex justify-end">
          <Button variant="solid" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing…' : 'Add Service'}
          </Button>
        </div>
      </form>

      <h2 className="text-text-primary font-semibold mb-4">
        Current Services ({services.length})
      </h2>

      {isLoadingServices && services.length === 0 ? (
        <p className="text-text-subtle text-sm text-center py-10">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-bg-dark-elevated border border-white/5 rounded-sm p-4 flex gap-4"
            >
              <img
                src={s.image_url}
                alt={s.title}
                className="w-24 h-24 object-cover rounded-sm shrink-0"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-text-primary font-semibold truncate">{s.title}</p>
                <p className="text-gold-primary text-xs uppercase tracking-widest truncate">
                  {s.tagline}
                </p>
                <p className="text-text-muted text-xs mt-1 line-clamp-2">
                  {s.description}
                </p>
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => handleDelete(s.slug)}
                    disabled={deletingId === s.slug}
                    className="border border-red-500/50 text-red-400 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm hover:bg-red-500/10 disabled:opacity-50 transition-colors"
                  >
                    {deletingId === s.slug ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <p className="text-text-subtle text-sm text-center py-10 md:col-span-2">
              No services yet. Add one above.
            </p>
          )}
        </div>
      )}
    </div>
  );
};