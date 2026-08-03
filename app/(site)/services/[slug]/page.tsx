import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import FaqAccordion from '@/components/sections/FaqAccordion';
import LazyScene from '@/components/three/LazyScene';
import { getService, services, serviceSlugs } from '@/lib/services';
import { contact, siteConfig } from '@/lib/site';

interface Props {
  params: { slug: string };
}

/** All seven service pages are prerendered at build time. */
export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getService(params.slug);
  if (!service) return { title: 'Service not found' };

  const title = `${service.name} — Nashik & across India`;

  return {
    title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${siteConfig.name}`,
      description: service.summary,
      url: `/services/${service.slug}`,
    },
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getService(params.slug);
  if (!service) notFound();

  const related = service.related
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  /** Service schema so the page can win a rich result of its own. */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary,
    serviceType: service.name,
    provider: {
      '@type': 'ProfessionalService',
      name: siteConfig.name,
      telephone: contact.phoneDisplay,
      email: contact.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: contact.city,
        addressRegion: contact.region,
        addressCountry: 'IN',
      },
    },
    areaServed: 'IN',
    url: `${siteConfig.url}/services/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- structured data must be inline JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── hero ── */}
      <section className="page-hero" data-apex-3d="lattice">
        <LazyScene scene="lattice" />
        <div className="page-hero-content">
          <span className="section-tag">
            <i className={service.icon} aria-hidden="true" /> {service.name}
          </span>
          <h1>
            {service.headline}
            <br />
            <span className="highlight">{service.headlineAccent}</span>
          </h1>
          <p>{service.summary}</p>
        </div>
      </section>

      {/* ── breadcrumb ── */}
      <nav className="detail-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/services">Services</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{service.name}</span>
      </nav>

      {/* ── at a glance ── */}
      <section className="section detail-facts-section">
        <div className="detail-facts depth-scene">
          <div className="detail-fact reveal-3d" data-tilt data-tilt-max="5">
            <span className="detail-fact-label">Typical timeline</span>
            <strong className="detail-fact-value">{service.timeline}</strong>
          </div>
          <div className="detail-fact reveal-3d d1" data-tilt data-tilt-max="5">
            <span className="detail-fact-label">Starting from</span>
            <strong className="detail-fact-value">{service.priceFrom}</strong>
          </div>
          <div className="detail-fact reveal-3d d2" data-tilt data-tilt-max="5">
            <span className="detail-fact-label">Quote</span>
            <strong className="detail-fact-value">Fixed, before we build</strong>
          </div>
          <div className="detail-fact reveal-3d d3" data-tilt data-tilt-max="5">
            <span className="detail-fact-label">After launch</span>
            <strong className="detail-fact-value">30 days free fixes</strong>
          </div>
        </div>
      </section>

      {/* ── intro + best for ── */}
      <section className="section">
        <div className="detail-split">
          <div className="detail-prose reveal">
            <span className="section-tag">Overview</span>
            <h2 className="section-title">What this actually is</h2>
            {service.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <aside className="detail-aside reveal-3d d1" data-tilt data-tilt-max="4">
            <h3>Best fit if</h3>
            <ul className="detail-check">
              {service.bestFor.map((item) => (
                <li key={item}>
                  <i className="fas fa-circle-check" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="sdc-cta">
              Talk about your project <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      {/* ── what's included ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-header reveal">
          <span className="section-tag">Scope</span>
          <h2 className="section-title">What&apos;s included</h2>
          <p className="section-subtitle">
            Everything below is inside the fixed quote. Anything outside it we tell you about
            before starting, not after.
          </p>
        </div>
        <ul className="detail-grid-list">
          {service.includes.map((item) => (
            <li key={item} className="reveal">
              <i className="fas fa-check" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── how it runs ── */}
      <section className="section">
        <div className="section-header reveal">
          <span className="section-tag">Process</span>
          <h2 className="section-title">How a {service.name.toLowerCase()} project runs</h2>
          <p className="section-subtitle">
            The same four stages every time, so you always know what happens next.
          </p>
        </div>
        <div className="detail-steps depth-scene">
          {service.steps.map((step, i) => (
            <article
              key={step.title}
              className={`detail-step reveal-3d${i % 3 ? ` d${i % 3}` : ''}`}
              data-tilt
              data-tilt-max="5"
            >
              <div className="detail-step-head">
                <span className="detail-step-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="detail-step-dur">{step.duration}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── deliverables ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="detail-split">
          <div className="detail-prose reveal">
            <span className="section-tag">Handover</span>
            <h2 className="section-title">What you end up owning</h2>
            <p>
              Every engagement ends with the same handover, whether or not you continue with us
              afterwards. No hostage code, no accounts in our name.
            </p>
            <ul className="detail-check">
              {service.deliverables.map((item) => (
                <li key={item}>
                  <i className="fas fa-circle-check" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-prose reveal">
            <span className="section-tag">Stack</span>
            <h2 className="section-title">What we build it with</h2>
            <p>
              Chosen for how long you will have to live with it, not for what is fashionable this
              year.
            </p>
            <div className="tech-section">
              {service.stack.map((group) => (
                <div className="tech-category" key={group.group}>
                  <h3>{group.group}</h3>
                  <div className="tech-pills">
                    {group.items.map((item) => (
                      <span className="tech-pill" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── faq ── */}
      <section className="section">
        <div className="section-header reveal">
          <span className="section-tag">Questions</span>
          <h2 className="section-title">Asked most often</h2>
          <p className="section-subtitle">
            If yours is not here, call {contact.phoneDisplay} and ask — we would rather answer it
            before you commit.
          </p>
        </div>
        <FaqAccordion items={service.faqs} />
      </section>

      {/* ── related ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-header reveal">
          <span className="section-tag">Related</span>
          <h2 className="section-title">Often paired with</h2>
        </div>
        <div className="services-detail-grid depth-scene">
          {related.map((item, i) => (
            <article
              key={item.slug}
              className={`service-detail-card reveal-3d${i ? ' d1' : ''}`}
              data-tilt
              data-tilt-max="4"
            >
              <div className="sdc-icon">
                <i className={item.icon} aria-hidden="true" />
              </div>
              <div className="sdc-body">
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
                <Link href={`/services/${item.slug}`} className="sdc-cta">
                  Read more <i className="fas fa-arrow-right" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── closing CTA ── */}
      <section className="section detail-cta-section">
        <div className="detail-cta reveal-3d" data-tilt data-tilt-max="3">
          <div>
            <h2>Thinking about {service.name.toLowerCase()}?</h2>
            <p>
              Send a brief or call directly. You get a clear plan and a fixed price, usually the
              same day.
            </p>
          </div>
          <div className="detail-cta-actions">
            <Link href="/contact" className="cta-button">
              Start a project
            </Link>
            <a href={contact.phoneHref} className="sdc-cta">
              <i className="fas fa-phone" aria-hidden="true" /> {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
