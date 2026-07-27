'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ServiceModule {
  id: string;
  mod: string;
  icon: string;
  title: string;
  body: string;
  href: string;
  /** Hidden until "View all modules" is pressed. */
  extra?: boolean;
}

/**
 * The six service cards were six near-identical markup blocks before the
 * migration; they are data now, so the card shell exists once.
 */
const MODULES: ServiceModule[] = [
  {
    id: 'web',
    mod: 'MOD.01',
    icon: 'fas fa-globe',
    title: 'Web Development',
    body: 'Online stores, admin panels, order tracking, and custom portals. We handle design, development, and launch.',
    href: '/services#web',
  },
  {
    id: 'erp',
    mod: 'MOD.02',
    icon: 'fas fa-layer-group',
    title: 'ERP Systems',
    body: 'Custom ERP that connects with Tally, POS, and your existing tools. Inventory, HR, payroll, and finance in one place.',
    href: '/services#erp',
  },
  {
    id: 'ml',
    mod: 'MOD.03',
    icon: 'fas fa-brain',
    title: 'Machine Learning',
    body: 'Predictive models, image recognition, NLP, and recommendation systems. We only add AI where it saves you actual time.',
    href: '/services#ml',
  },
  {
    id: 'analytics',
    mod: 'MOD.04',
    icon: 'fas fa-chart-line',
    title: 'Data Analytics & BI',
    body: "Power BI and Tableau dashboards, data pipelines, and live reports so you can see what's happening in your business.",
    href: '/services#analytics',
    extra: true,
  },
  {
    id: 'cloud',
    mod: 'MOD.05',
    icon: 'fas fa-cloud',
    title: 'Cloud & DevOps',
    body: "AWS, Azure, and GCP setup with Docker, Kubernetes, and CI/CD. We handle the infrastructure so you don't have to.",
    href: '/services#cloud',
    extra: true,
  },
  {
    id: 'maintenance',
    mod: 'MOD.06',
    icon: 'fas fa-tools',
    title: 'Maintenance & AMC',
    body: 'Bug fixes, updates, server monitoring, and on-site visits when needed. 98% of our clients renew their AMC every year.',
    href: '/services#maintenance',
    extra: true,
  },
];

const DELAY = ['', 'd1', 'd2'];

export default function ServicesGrid() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? MODULES : MODULES.filter((m) => !m.extra);

  return (
    <>
      <div className="services-grid depth-scene">
        {visible.map((m, i) => (
          <div key={m.id} className={`service-card reveal-3d visible ${DELAY[i % 3]}`} data-tilt="">
            <div className="svc-mod">{m.mod}</div>
            <div className="service-icon-wrap lift-2">
              <i className={`${m.icon} service-icon`} aria-hidden="true" />
            </div>
            <h3 className="lift-1">{m.title}</h3>
            <p>{m.body}</p>
            <Link href={m.href} className="learn-more">
              Learn more <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>

      <div className="services-show-more">
        <button
          className="show-more-btn"
          id="svcToggleBtn"
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          <span>{expanded ? 'Show less' : 'View all modules'}</span>
          <i
            className={expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}
            aria-hidden="true"
          />
        </button>
      </div>
    </>
  );
}
