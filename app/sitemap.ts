import type { MetadataRoute } from 'next';

import { services } from '@/lib/services';
import { routes, siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = routes.map((route) => ({
    url: `${siteConfig.url}${route.path === '/' ? '' : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Derived from the same data that renders the pages, so a new service
  // is in the sitemap the moment it exists.
  const serviceRoutes = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
