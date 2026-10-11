import type { FooterLinkGroup, SocialLink } from '../types';

export const footerLinks: FooterLinkGroup[] = [
  {
    title: 'Useful Links',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About Us', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Client Portal', href: '#portal' },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: '#', icon: 'f' },
  { label: 'Twitter', href: '#', icon: '𝕏' },
  { label: 'Instagram', href: '#', icon: '◉' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
];