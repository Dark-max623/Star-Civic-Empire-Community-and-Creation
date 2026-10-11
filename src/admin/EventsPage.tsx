import { useState, type FormEvent } from 'react';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { SingleImageUploader } from '../components/ui/SingleImageUploader';

export const EventsPage = () => {
  const { events, addEvent, deleteEvent } = useData();
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    imageUrl: '',
    ctaLabel: 'Book Now',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.title || !form.date || !form.location) {
      setError('Please fill in title, date, and location.');
      return;
    }
    if (!form.imageUrl) {
      setError('Please upload an event image.');
      return;
    }

    const result = addEvent(form);
    if (!result.ok) {
      setError(result.error || 'Failed to add event.');
      return;
    }

    setForm({ title: '', date: '', location: '', imageUrl: '', ctaLabel: 'Book Now' });
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
          {([
            ['title', 'Event Title', 'text'],
            ['date', 'Date (e.g. 15 Dec 2025)', 'text'],
            ['location', 'Location', 'text'],
            ['ctaLabel', 'CTA Label', 'text'],
          ] as const).map(([key, label, type]) => (
            <div key={key} className="flex flex-col gap-2">
              <label className="text-text-subtle text-xs uppercase tracking-widest">
                {label}
              </label>
              <input
                type={type}
                required={key !== 'ctaLabel'}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="bg-transparent border border-text-muted rounded-sm px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-primary transition-colors"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-text-subtle text-xs uppercase tracking-widest">
            Event Image
          </label>
          <SingleImageUploader
            value={form.imageUrl}
            onChange={(url) => setForm({ ...form, imageUrl: url })}
          />
        </div>

        {error && (
          <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-sm">
            {error}
          </p>
        )}

        <div className="flex justify-end">
          <Button variant="solid" type="submit">
            Publish Event
          </Button>
        </div>
      </form>

      <h2 className="text-text-primary font-semibold mb-4">
        Published Events ({events.length})
      </h2>

      <div className="flex flex-col gap-3">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-bg-dark-elevated border border-white/5 rounded-sm p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between"
          >
            <div className="flex gap-4 items-center">
              <img
                src={ev.imageUrl}
                alt={ev.title}
                className="w-20 h-20 object-cover rounded-sm shrink-0"
              />
              <div>
                <p className="text-text-primary font-semibold">{ev.title}</p>
                <p className="text-gold-primary text-xs uppercase tracking-widest">
                  {ev.date} · {ev.location}
                </p>
              </div>
            </div>
            <button
              onClick={() => deleteEvent(ev.id)}
              className="border border-red-500/50 text-red-400 text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:bg-red-500/10 transition-colors self-start md:self-auto"
            >
              Delete
            </button>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-text-subtle text-sm text-center py-10">
            No events yet. Publish one above.
          </p>
        )}
      </div>
    </div>
  );
};