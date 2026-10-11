export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  ctaLabel: string;
}

export interface Value {
  id: string;
  label: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  ctaLabel: string;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

/* ============ NEW ============ */

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  createdAt: number;
}

export interface Review {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number;       // 1-5
  status: 'pending' | 'approved';
  createdAt: number;
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'admin';
}