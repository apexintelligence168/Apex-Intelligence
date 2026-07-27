import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';

import ThemeScript from '@/components/layout/ThemeScript';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { siteConfig, contact } from '@/lib/site';

import '@/styles/base.css';
import '@/styles/3d.css';

/**
 * Fonts are self-hosted by next/font — no render-blocking request to
 * Google, and no layout shift. The CSS variables below are what
 * globals.css / home.css reference.
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F4EE' },
    { media: '(prefers-color-scheme: dark)', color: '#15120F' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Web, ERP & ML Development — Nashik`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    'web development Nashik',
    'ERP development India',
    'machine learning company Nashik',
    'custom software development',
    'data analytics dashboards',
    'cloud and DevOps services',
    'AMC software support',
    'ecommerce website development',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Web, ERP & ML Development — Nashik`,
    description: siteConfig.description,
    images: [
      {
        url: '/opengraph-image.svg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — software studio in Nashik`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Web, ERP & ML Development — Nashik`,
    description: siteConfig.description,
    images: ['/opengraph-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  formatDetection: { telephone: true, email: true, address: true },
};

/** Organisation schema, so search engines get the NAP details verbatim. */
const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  email: contact.email,
  telephone: contact.phoneDisplay,
  foundingDate: String(siteConfig.founded),
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.addressLines[0],
    addressLocality: contact.city,
    addressRegion: contact.region,
    addressCountry: 'IN',
  },
  areaServed: 'IN',
  serviceType: [
    'Web Development',
    'ERP Systems',
    'Machine Learning',
    'Data Analytics',
    'Cloud & DevOps',
    'Software Maintenance',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Font Awesome supplies every icon in the design. Preconnect keeps
            the round-trip off the critical path. */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- structured data must be inline JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </head>
      <body>
        <ThemeScript />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
