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