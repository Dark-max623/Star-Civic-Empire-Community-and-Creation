import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { GalleryImage, Review, Event } from '../types';
import { galleryImages as initialGallery } from '../data/gallery';
import { events as initialEvents } from '../data/events';

interface DataContextValue {
  gallery: GalleryImage[];
  reviews: Review[];
  events: Event[];

  // Gallery
  addGalleryImages: (images: { url: string; alt: string }[]) => { ok: boolean; error?: string };
  deleteGalleryImage: (id: string) => void;

  // Reviews
  addReview: (review: Omit<Review, 'id' | 'status' | 'createdAt'>) => void;
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;

  // Events
  addEvent: (event: Omit<Event, 'id'>) => { ok: boolean; error?: string };
  deleteEvent: (id: string) => void;

  // Diagnostics
  storageUsedBytes: number;
}

const GALLERY_KEY = 'ravana_gallery_v2';
const REVIEWS_KEY = 'ravana_reviews_v2';
const EVENTS_KEY = 'ravana_events_v2';
const STORAGE_WARN = 4 * 1024 * 1024;

const DataContext = createContext<DataContextValue | undefined>(undefined);

const seedGallery: GalleryImage[] = initialGallery.map((g, i) => ({
  id: g.id,
  url: g.url,
  alt: g.alt,
  createdAt: Date.now() - i * 1000,
}));

const seedReviews: Review[] = [
  {
    id: 'r1',
    name: 'Amelia Hart',
    email: 'amelia@example.com',
    message:
      'Ravana Events made our wedding absolutely magical. Every detail was flawless!',
    rating: 5,
    status: 'approved',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'r2',
    name: 'James Okafor',
    email: 'james@example.com',
    message:
      'The banquet team exceeded all expectations. Our corporate gala was unforgettable.',
    rating: 5,
    status: 'pending',
    createdAt: Date.now() - 86400000,
  },
];

function loadOrSeed<T>(key: string, seed: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    /* noop */
  }
  return seed;
}

function approxStorageSize(): number {
  let total = 0;
  for (const key of [GALLERY_KEY, REVIEWS_KEY, EVENTS_KEY]) {
    const val = localStorage.getItem(key);
    if (val) total += val.length * 2; // rough UTF-16 estimate
  }
  return total;
}

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [gallery, setGallery] = useState<GalleryImage[]>(() =>
    loadOrSeed(GALLERY_KEY, seedGallery)
  );
  const [reviews, setReviews] = useState<Review[]>(() =>
    loadOrSeed(REVIEWS_KEY, seedReviews)
  );
  const [events, setEvents] = useState<Event[]>(() =>
    loadOrSeed(EVENTS_KEY, initialEvents)
  );
  const [storageUsedBytes, setStorageUsedBytes] = useState(approxStorageSize());

  useEffect(() => {
    try {
      localStorage.setItem(GALLERY_KEY, JSON.stringify(gallery));
      setStorageUsedBytes(approxStorageSize());
    } catch (err) {
      console.error('Failed to persist gallery:', err);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
      setStorageUsedBytes(approxStorageSize());
    } catch (err) {
      console.error('Failed to persist reviews:', err);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
      setStorageUsedBytes(approxStorageSize());
    } catch (err) {
      console.error('Failed to persist events:', err);
    }
  }, [events]);

  const addGalleryImages = (
    images: { url: string; alt: string }[]
  ): { ok: boolean; error?: string } => {
    if (images.length === 0) return { ok: false, error: 'No images provided.' };

    // Estimate new total
    const addedBytes = images.reduce(
      (sum, img) => sum + img.url.length * 2,
      0
    );

    if (storageUsedBytes + addedBytes > STORAGE_WARN) {
      return {
        ok: false,
        error:
          'Storage is nearly full. Delete some existing photos before uploading more.',
      };
    }

    const newImages: GalleryImage[] = images.map((img, i) => ({
      id: `g-${Date.now()}-${i}`,
      url: img.url,
      alt: img.alt || 'Gallery image',
      createdAt: Date.now() - i,
    }));

    setGallery((prev) => [...newImages, ...prev]);
    return { ok: true };
  };

  const deleteGalleryImage = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  const addReview = (review: Omit<Review, 'id' | 'status' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: `r-${Date.now()}`,
      status: 'pending',
      createdAt: Date.now(),
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const approveReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const addEvent = (event: Omit<Event, 'id'>): { ok: boolean; error?: string } => {
    const addedBytes = event.imageUrl.length * 2;
    if (storageUsedBytes + addedBytes > STORAGE_WARN) {
      return {
        ok: false,
        error: 'Storage is nearly full. Delete some events before adding more.',
      };
    }
    setEvents((prev) => [{ ...event, id: `e-${Date.now()}` }, ...prev]);
    return { ok: true };
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        gallery,
        reviews,
        events,
        addGalleryImages,
        deleteGalleryImage,
        addReview,
        approveReview,
        deleteReview,
        addEvent,
        deleteEvent,
        storageUsedBytes,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextValue => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};