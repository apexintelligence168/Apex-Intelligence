/**
 * Single source of truth for site-wide constants.
 *
 * Contact details in particular were duplicated across eight HTML files
 * before the migration; they now live here only.
 */

import type { NavGroup, SocialLink } from '@/types';

export const siteConfig = {
  name: 'Apex Intelligence',
  tagline: '// Systems Studio',
  /**
   * Used to build canonical URLs, OpenGraph tags and the sitemap.
   * On Vercel this resolves automatically from the deployment URL;
   * set NEXT_PUBLIC_SITE_URL for a custom domain.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://apexintelligence.in'),
  description:
    'Apex Intelligence builds websites, ERP systems, and ML solutions for businesses in Nashik and across India. Fixed quotes, fast delivery, real support.',
  locale: 'en_IN',
  founded: 2025,
} as const;

export const contact = {
  phoneDisplay: '+91 91453 10264',
  phoneHref: 'tel:+919145310264',
  whatsappNumber: '919145310264',
  whatsappHref: 'https://wa.me/919145310264',
  email: 'info@apexintelligence.in',
  emailHref: 'mailto:info@apexintelligence.in',
  addressLines: ['G-square Jatra Hotel', 'Nashik, Maharashtra'],
  city: 'Nashik',
  region: 'Maharashtra',
  country: 'India',
} as const;

export const navigation: NavGroup[] = [
  {
    label: 'Company',
    href: '/about',
    items: [
      { label: 'About Us', href: '/about', icon: 'fas fa-building' },
      { label: 'How We Work', href: '/process', icon: 'fas fa-sitemap' },
      { divider: true },
      { label: 'Contact Us', href: '/contact', icon: 'fas fa-envelope' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    items: [
      { label: 'Web Development', href: '/services/web-development', icon: 'fas fa-globe' },
      { label: 'Enterprise Apps', href: '/services/enterprise-apps', icon: 'fas fa-cube' },
      { label: 'ERP Systems', href: '/services/erp-systems', icon: 'fas fa-layer-group' },
      { label: 'Machine Learning', href: '/services/machine-learning', icon: 'fas fa-brain' },
      { label: 'Data Analytics', href: '/services/data-analytics', icon: 'fas fa-chart-line' },
      { label: 'Cloud & DevOps', href: '/services/cloud-devops', icon: 'fas fa-cloud' },
      { label: 'Maintenance & AMC', href: '/services/maintenance-amc', icon: 'fas fa-tools' },
    ],
  },
  {
    label: 'Work',
    href: '/products',
    items: [
      { label: 'Case Studies', href: '/products/case-studies', icon: 'fas fa-briefcase' },
      { label: 'Tech Stack', href: '/products/tech-stack', icon: 'fas fa-code' },
      { divider: true },
      { label: 'Start a Project', href: '/contact', icon: 'fas fa-paper-plane' },
    ],
  },
  {
    label: 'Insights',
    href: '/insights',
    items: [
      { label: 'Blog', href: '/insights/blog', icon: 'fas fa-newspaper' },
      { label: 'FAQ', href: '/insights/faq', icon: 'fas fa-question-circle' },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: '#', icon: 'fab fa-linkedin-in' },
  { label: 'Twitter', href: '#', icon: 'fab fa-twitter' },
  { label: 'Instagram', href: '#', icon: 'fab fa-instagram' },
];

export const homeFooterSocials: SocialLink[] = [
  { label: 'Facebook', href: '#', icon: 'fab fa-facebook-f' },
  { label: 'Twitter', href: '#', icon: 'fab fa-twitter' },
  { label: 'LinkedIn', href: '#', icon: 'fab fa-linkedin-in' },
  { label: 'Instagram', href: '#', icon: 'fab fa-instagram' },
];

/**
 * Routes included in the generated sitemap.
 *
 * Service detail pages are appended from lib/services.ts in
 * app/sitemap.ts so the two lists can never fall out of step.
 */
export const routes = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/products', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/case-studies', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products/tech-stack', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/process', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/insights', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/insights/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/insights/faq', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
] as const;
