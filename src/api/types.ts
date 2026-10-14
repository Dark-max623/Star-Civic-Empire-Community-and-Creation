export interface ApiUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  date_joined: string;
}

export interface ApiGalleryImage {
  id: string;
  image_url: string;
  alt: string;
  order: number;
  created_at: string;
}

export interface ApiReview {
  id: string;
  name: string;
  message: string;
  rating: number;
  created_at: string;
}

export interface ApiAdminReview extends ApiReview {
  email: string;
  status: 'pending' | 'approved';
  updated_at: string;
}

export interface ApiEvent {
  id: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  image_url: string;
  cta_label: string;
  is_active: boolean;
  created_at: string;
}

export interface ApiService {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  image_url: string;
  cta_label: string;
  order: number;
  is_active: boolean;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: ApiUser;
}

export interface DashboardStats {
  gallery_count: number;
  reviews_total: number;
  reviews_pending: number;
  events_count: number;
  services_count: number;
  unread_messages: number;
  subscribers_count: number;
}

export interface ApiContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ApiSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}