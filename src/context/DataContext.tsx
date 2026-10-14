import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  galleryApi,
  reviewsApi,
  eventsApi,
  servicesApi,
  getErrorMessage,
} from '../api';
import type {
  ApiAdminReview,
  ApiEvent,
  ApiGalleryImage,
  ApiReview,
  ApiService,
} from '../api';

interface DataContextValue {
  gallery: ApiGalleryImage[];
  galleryTotal: number;
  galleryHasMore: boolean;
  isLoadingGallery: boolean;
  refreshGallery: () => Promise<void>;
  loadMoreGallery: () => Promise<void>;
  uploadGalleryImages: (
    files: { file: File; alt: string }[]
  ) => Promise<{ ok: boolean; error?: string }>;
  deleteGalleryImage: (id: string) => Promise<void>;

  reviews: ApiAdminReview[];
  reviewsTotal: number;
  reviewsHasMore: boolean;
  isLoadingReviews: boolean;
  refreshReviews: () => Promise<void>;
  loadMoreReviews: () => Promise<void>;
  approveReview: (id: string) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;

  publicReviews: ApiReview[];
  refreshPublicReviews: () => Promise<void>;
  submitReview: (payload: {
    name: string;
    email: string;
    message: string;
    rating: number;
  }) => Promise<{ ok: boolean; error?: string }>;

  events: ApiEvent[];
  eventsTotal: number;
  eventsHasMore: boolean;
  isLoadingEvents: boolean;
  refreshEvents: () => Promise<void>;
  loadMoreEvents: () => Promise<void>;
  createEvent: (payload: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    ctaLabel: string;
    image: File;
  }) => Promise<{ ok: boolean; error?: string }>;
  deleteEvent: (id: string) => Promise<void>;

  services: ApiService[];
  isLoadingServices: boolean;
  refreshServices: () => Promise<void>;
  createService: (payload: {
    title: string;
    tagline: string;
    description: string;
    ctaLabel: string;
    order: number;
    image: File;
  }) => Promise<{ ok: boolean; error?: string }>;
  deleteService: (slug: string) => Promise<void>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

const GALLERY_PAGE_SIZE = 12;
const EVENTS_PAGE_SIZE = 10;
const REVIEWS_PAGE_SIZE = 15;

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [gallery, setGallery] = useState<ApiGalleryImage[]>([]);
  const [galleryTotal, setGalleryTotal] = useState(0);
  const [galleryPage, setGalleryPage] = useState(1);
  const [galleryHasMore, setGalleryHasMore] = useState(false);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);

  const [reviews, setReviews] = useState<ApiAdminReview[]>([]);
  const [reviewsTotal, setReviewsTotal] = useState(0);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsHasMore, setReviewsHasMore] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  const [publicReviews, setPublicReviews] = useState<ApiReview[]>([]);

  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [eventsTotal, setEventsTotal] = useState(0);
  const [eventsPage, setEventsPage] = useState(1);
  const [eventsHasMore, setEventsHasMore] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  const [services, setServices] = useState<ApiService[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  const bootstrapped = useRef(false);

  // ---------- Gallery ----------
  const refreshGallery = useCallback(async () => {
    setIsLoadingGallery(true);
    try {
      const data = await galleryApi.list(1, GALLERY_PAGE_SIZE);
      setGallery(data.results);
      setGalleryTotal(data.count);
      setGalleryPage(1);
      setGalleryHasMore(!!data.next);
    } finally {
      setIsLoadingGallery(false);
    }
  }, []);

  const loadMoreGallery = useCallback(async () => {
    if (!galleryHasMore || isLoadingGallery) return;
    setIsLoadingGallery(true);
    try {
      const nextPage = galleryPage + 1;
      const data = await galleryApi.list(nextPage, GALLERY_PAGE_SIZE);
      setGallery((prev) => [...prev, ...data.results]);
      setGalleryPage(nextPage);
      setGalleryHasMore(!!data.next);
    } finally {
      setIsLoadingGallery(false);
    }
  }, [galleryHasMore, galleryPage, isLoadingGallery]);

  const uploadGalleryImages = async (
    items: { file: File; alt: string }[]
  ): Promise<{ ok: boolean; error?: string }> => {
    try {
      const uploaded: ApiGalleryImage[] = [];
      for (const item of items) {
        const img = await galleryApi.upload(item.file, item.alt);
        uploaded.push(img);
      }
      setGallery((prev) => [...uploaded, ...prev]);
      setGalleryTotal((prev) => prev + uploaded.length);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err) };
    }
  };

  const deleteGalleryImage = async (id: string) => {
    await galleryApi.remove(id);
    setGallery((prev) => prev.filter((g) => g.id !== id));
    setGalleryTotal((prev) => Math.max(0, prev - 1));
  };

  // ---------- Reviews ----------
  const refreshReviews = useCallback(async () => {
    setIsLoadingReviews(true);
    try {
      const data = await reviewsApi.listAll(1, REVIEWS_PAGE_SIZE);
      setReviews(data.results);
      setReviewsTotal(data.count);
      setReviewsPage(1);
      setReviewsHasMore(!!data.next);
    } finally {
      setIsLoadingReviews(false);
    }
  }, []);

  const loadMoreReviews = useCallback(async () => {
    if (!reviewsHasMore || isLoadingReviews) return;
    setIsLoadingReviews(true);
    try {
      const nextPage = reviewsPage + 1;
      const data = await reviewsApi.listAll(nextPage, REVIEWS_PAGE_SIZE);
      setReviews((prev) => [...prev, ...data.results]);
      setReviewsPage(nextPage);
      setReviewsHasMore(!!data.next);
    } finally {
      setIsLoadingReviews(false);
    }
  }, [reviewsHasMore, reviewsPage, isLoadingReviews]);

  const refreshPublicReviews = useCallback(async () => {
    const data = await reviewsApi.listPublic(1, 15);
    setPublicReviews(data.results);
  }, []);

  const submitReview = async (payload: {
    name: string;
    email: string;
    message: string;
    rating: number;
  }): Promise<{ ok: boolean; error?: string }> => {
    try {
      await reviewsApi.submit(payload);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err) };
    }
  };

  const approveReview = async (id: string) => {
    const updated = await reviewsApi.approve(id);
    setReviews((prev) => prev.map((r) => (r.id === id ? updated : r)));
    await refreshPublicReviews();
  };

  const deleteReview = async (id: string) => {
    await reviewsApi.remove(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setReviewsTotal((prev) => Math.max(0, prev - 1));
  };

  // ---------- Events ----------
  const refreshEvents = useCallback(async () => {
    setIsLoadingEvents(true);
    try {
      const data = await eventsApi.list(1, EVENTS_PAGE_SIZE);
      setEvents(data.results);
      setEventsTotal(data.count);
      setEventsPage(1);
      setEventsHasMore(!!data.next);
    } finally {
      setIsLoadingEvents(false);
    }
  }, []);

  const loadMoreEvents = useCallback(async () => {
    if (!eventsHasMore || isLoadingEvents) return;
    setIsLoadingEvents(true);
    try {
      const nextPage = eventsPage + 1;
      const data = await eventsApi.list(nextPage, EVENTS_PAGE_SIZE);
      setEvents((prev) => [...prev, ...data.results]);
      setEventsPage(nextPage);
      setEventsHasMore(!!data.next);
    } finally {
      setIsLoadingEvents(false);
    }
  }, [eventsHasMore, eventsPage, isLoadingEvents]);

  const createEvent = async (payload: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    ctaLabel: string;
    image: File;
  }): Promise<{ ok: boolean; error?: string }> => {
    try {
      const created = await eventsApi.create(payload);
      setEvents((prev) => [created, ...prev]);
      setEventsTotal((prev) => prev + 1);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err) };
    }
  };

  const deleteEvent = async (id: string) => {
    await eventsApi.remove(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setEventsTotal((prev) => Math.max(0, prev - 1));
  };

  // ---------- Services ----------
  const refreshServices = useCallback(async () => {
    setIsLoadingServices(true);
    try {
      const data = await servicesApi.list();
      setServices(data);
    } finally {
      setIsLoadingServices(false);
    }
  }, []);

  const createService = async (payload: {
    title: string;
    tagline: string;
    description: string;
    ctaLabel: string;
    order: number;
    image: File;
  }): Promise<{ ok: boolean; error?: string }> => {
    try {
      const created = await servicesApi.create(payload);
      setServices((prev) =>
        [...prev, created].sort((a, b) => a.order - b.order)
      );
      return { ok: true };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err) };
    }
  };

  const deleteService = async (slug: string) => {
    await servicesApi.remove(slug);
    setServices((prev) => prev.filter((s) => s.slug !== slug));
  };

  // ---------- Bootstrap (parallel, runs once) ----------
  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    const bootstrap = async () => {
      try {
        await Promise.all([
          refreshGallery(),
          refreshEvents(),
          refreshServices(),
          refreshPublicReviews(),
        ]);
      } catch (err) {
        console.error('Bootstrap failed:', err);
      }
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataContext.Provider
      value={{
        gallery, galleryTotal, galleryHasMore, isLoadingGallery,
        refreshGallery, loadMoreGallery, uploadGalleryImages, deleteGalleryImage,

        reviews, reviewsTotal, reviewsHasMore, isLoadingReviews,
        refreshReviews, loadMoreReviews, approveReview, deleteReview,

        publicReviews, refreshPublicReviews, submitReview,

        events, eventsTotal, eventsHasMore, isLoadingEvents,
        refreshEvents, loadMoreEvents, createEvent, deleteEvent,

        services, isLoadingServices, refreshServices, createService, deleteService,
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