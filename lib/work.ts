/**
 * Content for /products/case-studies and /products/tech-stack.
 *
 * Client names are withheld by default — most of this work is internal
 * systems and the businesses would rather not advertise their operations.
 * Sector, location and outcome are real enough to be useful.
 */

export interface CaseResult {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  sector: string;
  place: string;
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  results: CaseResult[];
  stack: string[];
  service: { label: string; href: string };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'retail-erp',
    sector: 'Retail',
    place: 'Nashik, 6 outlets',
    title: 'Six outlets, one stock figure everybody trusts',
    challenge:
      'Stock lived in three places — a POS at each branch, a central Excel file, and whatever the branch manager remembered. Transfers between outlets were recorded on WhatsApp. Month-end reconciliation took four days and never fully balanced.',
    approach:
      'We audited the physical flow first, then built inventory and sales modules that read directly from each POS and write back to Tally. Branch transfers became a two-tap action with an audit trail. Rolled out one outlet at a time over five weeks.',
    outcome:
      'Stock is now accurate to the previous night across all six outlets. Month-end closes in half a day. The owner sees live sales per branch on a phone dashboard instead of waiting for a Monday summary.',
    results: [
      { value: '4 days → 4 hrs', label: 'Month-end close' },
      { value: '6', label: 'Outlets on one system' },
      { value: '~92%', label: 'Stock accuracy, from 60s' },
    ],
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Tally ODBC', 'AWS'],
    service: { label: 'ERP Systems', href: '/services/erp-systems' },
  },
  {
    id: 'ecommerce-store',
    sector: 'E-commerce',
    place: 'Maharashtra',
    title: 'From WhatsApp orders to a store that runs itself',
    challenge:
      'Orders arrived as WhatsApp messages and were copied into a spreadsheet by hand. Two people spent most of their day on data entry, and roughly one order in twenty was lost or duplicated.',
    approach:
      'A storefront with proper inventory, variants and coupons, plus an admin panel built around how their team already worked. Razorpay for payments, Shiprocket for dispatch, and automatic WhatsApp status updates so customers stopped calling to ask.',
    outcome:
      'Live in three weeks. Order entry is gone as a job. The two staff moved to customer service and packing, and "where is my order" calls dropped sharply because the update now arrives before the customer thinks to ask.',
    results: [
      { value: '3 weeks', label: 'Concept to live' },
      { value: '0', label: 'Manual order entry' },
      { value: '~70%', label: 'Fewer status calls' },
    ],
    stack: ['Next.js', 'PostgreSQL', 'Razorpay', 'Shiprocket', 'Vercel'],
    service: { label: 'Web Development', href: '/services/web-development' },
  },
  {
    id: 'construction-dashboard',
    sector: 'Construction',
    place: 'Nashik & Pune',
    title: 'Site progress the director can see without a phone call',
    challenge:
      'Progress on eleven active sites was reported by phone every evening. Material consumption was reconciled monthly, by which point overspend was already sunk. Nobody could compare sites on the same basis.',
    approach:
      'A field app site engineers use on their phones — works offline, syncs when signal returns — feeding a consolidated dashboard. We spent the first week agreeing what "percent complete" actually means, which turned out to be the hard part.',
    outcome:
      'Progress and material consumption update daily instead of monthly. Overspend surfaces while it can still be acted on. Site comparison is now like-for-like because everyone measures the same way.',
    results: [
      { value: '11', label: 'Sites live' },
      { value: 'Monthly → daily', label: 'Material visibility' },
      { value: 'Offline', label: 'Works without signal' },
    ],
    stack: ['React', 'PWA', 'Node.js', 'PostgreSQL', 'Power BI'],
    service: { label: 'Data Analytics & BI', href: '/services/data-analytics' },
  },
  {
    id: 'manufacturing-quality',
    sector: 'Manufacturing',
    place: 'Nashik MIDC',
    title: 'Visual quality checks that do not depend on who is on shift',
    challenge:
      'Surface defects were caught by eye at the end of the line. Detection varied by operator and by hour of the shift, and rejects were often found only after packing, when rework cost the most.',
    approach:
      'We ran a two-week feasibility on their existing photographs before proposing anything. Once the data supported it, a vision model was trained on labelled samples and deployed on a small edge device beside the line, flagging suspect pieces for a human to confirm.',
    outcome:
      'Detection is consistent across shifts and defects are caught before packing rather than after. The model assists the operator rather than replacing them — every flag is still confirmed by a person.',
    results: [
      { value: 'Pre-pack', label: 'Defects now caught' },
      { value: 'Consistent', label: 'Across all shifts' },
      { value: '2 weeks', label: 'Feasibility before build' },
    ],
    stack: ['Python', 'PyTorch', 'OpenCV', 'Edge device', 'FastAPI'],
    service: { label: 'Machine Learning', href: '/services/machine-learning' },
  },
  {
    id: 'hospitality-portal',
    sector: 'Hospitality',
    place: 'Nashik',
    title: 'One booking view across properties and channels',
    challenge:
      'Bookings arrived from three OTAs, a phone line and walk-ins. Each channel had its own screen. Double-bookings happened often enough to be budgeted for, and rate changes had to be made five times.',
    approach:
      'A single reservation view that pulls from every channel, with rate and availability pushed back out. Housekeeping and maintenance were added as a second phase once the booking side had proved itself.',
    outcome:
      'Availability is consistent across channels, so double-bookings stopped being a routine cost. Rates change once and propagate everywhere.',
    results: [
      { value: '5 → 1', label: 'Screens to check' },
      { value: 'Single', label: 'Rate update point' },
      { value: '2 phases', label: 'Booking, then ops' },
    ],
    stack: ['Next.js', 'Node.js', 'MySQL', 'Channel APIs', 'AWS'],
    service: { label: 'Enterprise Apps', href: '/services/enterprise-apps' },
  },
  {
    id: 'healthcare-records',
    sector: 'Healthcare',
    place: 'Maharashtra',
    title: 'Patient records that load before the consultation starts',
    challenge:
      'Records were split between paper files and an ageing desktop application that only ran on one machine. Retrieving a returning patient’s history took long enough that consultations regularly started without it.',
    approach:
      'A web-based records system with role-based access and a full audit trail, plus a structured digitisation of the back catalogue. Access control was designed with the practice before anything was built, given the sensitivity.',
    outcome:
      'History is on screen before the patient sits down. Access is logged per user. Backups are automated and have been restored under supervision, so the practice knows they work.',
    results: [
      { value: 'Instant', label: 'History retrieval' },
      { value: 'Per-user', label: 'Access audit trail' },
      { value: 'Tested', label: 'Backup restores' },
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Encrypted storage', 'Azure'],
    service: { label: 'Enterprise Apps', href: '/services/enterprise-apps' },
  },
];

/* ------------------------------------------------------------------ */

export interface TechGroup {
  title: string;
  icon: string;
  blurb: string;
  items: { name: string; note: string }[];
}

export const techStack: TechGroup[] = [
  {
    title: 'Frontend',
    icon: 'fab fa-react',
    blurb:
      'React and Next.js for anything that has to be fast, indexable and maintainable by whoever comes after us.',
    items: [
      { name: 'Next.js', note: 'Default for websites and portals' },
      { name: 'React', note: 'Interactive dashboards and apps' },
      { name: 'TypeScript', note: 'On every project, no exceptions' },
      { name: 'Tailwind CSS', note: 'When a design system is needed fast' },
      { name: 'React Native', note: 'When a real mobile app is justified' },
      { name: 'three.js', note: 'WebGL where it earns its bundle size' },
    ],
  },
  {
    title: 'Backend',
    icon: 'fab fa-node-js',
    blurb:
      'Node for most services, Python where the work is data or model shaped. Both, when that is the honest answer.',
    items: [
      { name: 'Node.js', note: 'APIs and real-time services' },
      { name: 'NestJS', note: 'Larger applications that need structure' },
      { name: 'Python', note: 'Data pipelines and ML services' },
      { name: 'FastAPI', note: 'Model serving' },
      { name: 'Django', note: 'Admin-heavy internal tools' },
      { name: 'REST & GraphQL', note: 'Chosen per integration, not per fashion' },
    ],
  },
  {
    title: 'Data',
    icon: 'fas fa-database',
    blurb:
      'Postgres unless there is a specific reason not to. Most "we need NoSQL" turns out to be a schema problem.',
    items: [
      { name: 'PostgreSQL', note: 'Default relational database' },
      { name: 'MySQL', note: 'Where the existing stack requires it' },
      { name: 'MongoDB', note: 'Genuinely document-shaped data' },
      { name: 'Redis', note: 'Caching, queues, sessions' },
      { name: 'BigQuery', note: 'Analytics at volume' },
      { name: 'TimescaleDB', note: 'Sensor and time-series workloads' },
    ],
  },
  {
    title: 'Machine Learning',
    icon: 'fas fa-brain',
    blurb:
      'Classical models where they win, large language models where they genuinely help. Measured against a baseline either way.',
    items: [
      { name: 'PyTorch', note: 'Vision and deep learning' },
      { name: 'scikit-learn', note: 'Forecasting and classification' },
      { name: 'XGBoost', note: 'Tabular problems, usually the winner' },
      { name: 'Hugging Face', note: 'Pretrained NLP models' },
      { name: 'Claude API', note: 'Document understanding, assistants' },
      { name: 'MLflow', note: 'Experiment tracking and registry' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'fas fa-cloud',
    blurb:
      'Infrastructure as code, deployments from Git, and monitoring that pages a human before a customer notices.',
    items: [
      { name: 'AWS', note: 'Most deployments' },
      { name: 'Azure', note: 'Microsoft-centric clients' },
      { name: 'Docker', note: 'Everything ships containerised' },
      { name: 'Terraform', note: 'Reproducible environments' },
      { name: 'GitHub Actions', note: 'CI/CD by default' },
      { name: 'Grafana & Prometheus', note: 'Monitoring and alerting' },
    ],
  },
  {
    title: 'Integrations',
    icon: 'fas fa-plug',
    blurb:
      'The systems Indian SMEs actually run on. If the data is reachable, we have usually connected to it before.',
    items: [
      { name: 'Tally', note: 'Two-way sync via XML and ODBC' },
      { name: 'Razorpay & PayU', note: 'Payments and subscriptions' },
      { name: 'WhatsApp Business', note: 'Order and status notifications' },
      { name: 'Shiprocket', note: 'Dispatch and tracking' },
      { name: 'GSTN', note: 'Compliant invoicing' },
      { name: 'POS systems', note: 'Stock and sales sync' },
    ],
  },
];

/** Principles that govern the choices above. */
export const techPrinciples = [
  {
    icon: 'fas fa-scale-balanced',
    title: 'Boring where it counts',
    body: 'The database, the auth and the deployment path should be things thousands of people already understand. Novelty belongs in the parts of the product your customers notice.',
  },
  {
    icon: 'fas fa-key',
    title: 'No lock-in',
    body: 'Code in your repository, cloud accounts in your name, no proprietary runtime of ours in the middle. You can take any project elsewhere without asking us for anything.',
  },
  {
    icon: 'fas fa-gauge-high',
    title: 'Sized to the problem',
    body: 'A three-person business does not need Kubernetes. We pick the smallest thing that solves it, because someone has to run it after we hand over.',
  },
  {
    icon: 'fas fa-rotate',
    title: 'Built to be handed over',
    body: 'Documented, typed and tested to the level the project warrants — so your next developer can pick it up without a rewrite.',
  },
];
