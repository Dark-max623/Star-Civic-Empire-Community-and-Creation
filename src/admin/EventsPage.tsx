import { useState, useEffect, type FormEvent } from 'react';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { ImageUploader, type UploadedImage } from '../components/ui/ImageUploader';

export const EventsPage = () => {
  const {
    events,
    isLoadingEvents,
    refreshEvents,
    createEvent,
    deleteEvent,
  } = useData();

  const [form, setForm] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    ctaLabel: 'Book Now',
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

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

    if (!form.title || !form.date || !form.location) {
      setError('Please fill in title, date, and location.');
      return;
    }
    if (!form.startTime) {
      setError('Please specify a start time.');
      return;
    }
    if (!image) {
      setError('Please upload an event image.');
      return;
    }

    setIsSubmitting(true);
    const result = await createEvent({ ...form, image });
    setIsSubmitting(false);

    if (result.ok) {
      setForm({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        ctaLabel: 'Book Now',
      });
      clearImage();
    } else {
      setError(result.error || 'Failed to add event.');
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteEvent(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Events Manager
        </h1>
        <p className="text-text-subtle text-sm">
          Upload event details and cover image. Published instantly.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-bg-dark-elevated border border-white/5 rounded-sm p-6 mb-10 flex flex-col gap-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-text-subtle text-xs uppercase tracking-widest">
              Event Title
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className="text-text-subtle text-xs uppercase tracking-widest">
              Date
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 15 Dec 2025"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="text-text-subtle text-xs uppercase tracking-widest">
              Location
            </label>
            <input
              type="text"
              required
              placeholder="e.g. The O2, London"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>

          {/* Start Time */}
          <div className="flex flex-col gap-2">
            <label className="text-text-subtle text-xs uppercase tracking-widest">
              Start Time
            </label>
            <input
              type="time"
              required
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              className="bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>

          {/* End Time */}
          <div className="flex flex-col gap-2">
            <label className="text-text-subtle text-xs uppercase tracking-widest">
              End Time
            </label>
            <input
              type="time"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              className="bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>

          {/* CTA Label */}
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

        {/* Image */}
        <div className="flex flex-col gap-2">
          <label className="text-text-subtle text-xs uppercase tracking-widest">
            Event Image
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
            <ImageUploader
              onUpload={handleUpload}
              maxFiles={1}
              label="Upload event image"
            />
          )}
        </div>

        {error && (
          <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-sm">
            {error}
          </p>
        )}

        <div className="flex justify-end">
          <Button variant="solid" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing…' : 'Publish Event'}
          </Button>
        </div>
      </form>

      <h2 className="text-text-primary font-semibold mb-4">
        Published Events ({events.length})
      </h2>

      {isLoadingEvents ? (
        <p className="text-text-subtle text-sm text-center py-10">Loading…</p>
      ) : (
        <div className="flex flex-col gap-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-bg-dark-elevated border border-white/5 rounded-sm p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={ev.image_url}
                  alt={ev.title}
                  className="w-20 h-20 object-cover rounded-sm shrink-0"
                />
                <div>
                  <p className="text-text-primary font-semibold">{ev.title}</p>
                  <p className="text-gold-primary text-xs uppercase tracking-widest">
                    {ev.date}
                    {ev.start_time && ` · ${ev.start_time}`}
                    {ev.end_time && `–${ev.end_time}`}
                  </p>
                  <p className="text-text-muted text-xs">{ev.location}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(ev.id)}
                disabled={deletingId === ev.id}
                className="border border-red-500/50 text-red-400 text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:bg-red-500/10 disabled:opacity-50 transition-colors self-start md:self-auto"
              >
                {deletingId === ev.id ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-text-subtle text-sm text-center py-10">
              No events yet. Publish one above.
            </p>
          )}
        </div>
      )}
    </div>
  );
};