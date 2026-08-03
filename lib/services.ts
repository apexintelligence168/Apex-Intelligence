/**
 * Content for the seven service detail pages.
 *
 * Each entry drives one route under /services/[slug] and one card on the
 * /services overview, so the two can never drift apart. Copy is written
 * in the same plain, specific register as the rest of the site — what we
 * build, what you get, what it costs, how long it takes.
 */

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceStep {
  title: string;
  duration: string;
  body: string;
}

export interface ServiceDetail {
  slug: string;
  /** Nav + card label */
  name: string;
  /** <h1> — split across two lines by `headlineAccent` */
  headline: string;
  headlineAccent: string;
  icon: string;
  /** One-line summary used on cards, meta descriptions and OG tags */
  summary: string;
  /** Longer intro, 2–3 paragraphs */
  intro: string[];
  /** "What's included" checklist */
  includes: string[];
  /** Concrete things handed over at the end */
  deliverables: string[];
  /** Named technologies, grouped */
  stack: { group: string; items: string[] }[];
  /** How a project runs */
  steps: ServiceStep[];
  /** Typical engagement shape */
  timeline: string;
  priceFrom: string;
  bestFor: string[];
  faqs: ServiceFaq[];
  /** Slugs of two related services */
  related: string[];
}

export const services: ServiceDetail[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'web-development',
    name: 'Web Development',
    headline: 'Websites and web apps',
    headlineAccent: 'built to be used daily',
    icon: 'fas fa-globe',
    summary:
      'E-commerce stores, admin panels, order tracking and custom portals — designed, built and launched end to end.',
    intro: [
      'Most business websites are brochures. The ones we build are tools: the shop that takes the order, the panel your team logs into every morning, the portal your customers check for their delivery status.',
      'We handle the whole thing — design, build, payment gateway, hosting, launch. You get a working demo inside 14 days of kickoff, and we keep iterating on it with you rather than disappearing until launch day.',
      'Everything is mobile-first because that is where your customers actually are, and everything is measured, because a site nobody can find is a site nobody uses.',
    ],
    includes: [
      'E-commerce stores with inventory, variants and coupons',
      'Admin panels and internal dashboards',
      'Order handling, tracking and status notifications',
      'Custom CMS so your team edits content without us',
      'Payment gateway integration (Razorpay, PayU, Stripe)',
      'Mobile-responsive layouts tested on real devices',
      'On-page SEO, sitemap, structured data and analytics',
      'Speed work — image optimisation, caching, Core Web Vitals',
    ],
    deliverables: [
      'Live site on your domain with SSL',
      'Admin access with roles for your team',
      'Source code in your Git repository',
      'A short training session, recorded',
      'Written handover: hosting, credentials, how to update',
      '30 days of free fixes after launch',
    ],
    stack: [
      { group: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
      { group: 'Backend', items: ['Node.js', 'Express', 'Python', 'Django'] },
      { group: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
      { group: 'Commerce', items: ['Razorpay', 'PayU', 'Stripe', 'Shiprocket'] },
      { group: 'Hosting', items: ['Vercel', 'AWS', 'Cloudflare', 'Netlify'] },
    ],
    steps: [
      {
        title: 'Discovery and scope',
        duration: 'Day 1–3',
        body: 'A site visit or call to map how you sell, what your team touches daily, and which of it should be online. You get the scope in writing before anything is built.',
      },
      {
        title: 'Wireframes and fixed quote',
        duration: 'Day 4–7',
        body: 'Clickable screens for every page, plus a fixed price. Changes at this stage cost nothing, so this is where we get it right.',
      },
      {
        title: 'Build with weekly demos',
        duration: 'Week 2–6',
        body: 'You see working software every week, not status reports. Feedback goes into the next build rather than a backlog.',
      },
      {
        title: 'Launch and hypercare',
        duration: 'Launch + 30 days',
        body: 'We migrate content, point the domain, watch the logs, and fix anything that surfaces for a month at no charge.',
      },
    ],
    timeline: '3–8 weeks depending on scope',
    priceFrom: '₹2,00,000',
    bestFor: [
      'Retailers moving from WhatsApp orders to a real store',
      'Businesses whose site has not been touched in five years',
      'Teams tracking orders in a spreadsheet',
    ],
    faqs: [
      {
        question: 'Can you work with our existing design or brand?',
        answer:
          'Yes. If you have a brand book or a designer, we build to it. If you do not, we design it as part of the project — that is included, not an extra line item.',
      },
      {
        question: 'Do we own the code?',
        answer:
          'You do, completely. It goes in your Git repository under your account, and you keep it whether or not you continue working with us.',
      },
      {
        question: 'What about hosting and domain?',
        answer:
          'We set both up in your name, on your accounts. You are never locked into hosting you cannot access or move.',
      },
      {
        question: 'Can you take over a site someone else built?',
        answer:
          'Usually. We start with a paid audit of what exists, then quote the fix. If the honest answer is that a rebuild is cheaper, we will say so.',
      },
    ],
    related: ['enterprise-apps', 'erp-systems'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'enterprise-apps',
    name: 'Enterprise Apps',
    headline: 'Internal software',
    headlineAccent: 'that fits how you work',
    icon: 'fas fa-cube',
    summary:
      'Custom internal tools, workflow apps and role-based portals for teams that have outgrown spreadsheets.',
    intro: [
      'There is a point where a spreadsheet stops being a tool and starts being a liability — three people editing the same file, a formula nobody understands, a version that lives on someone’s desktop.',
      'Enterprise apps are what replace that. Role-based access so the right people see the right things, an audit trail so you know who changed what, and workflows that match how your business actually runs rather than how software vendors think it should.',
      'We build these to be boring in the best sense: fast, predictable, and usable by someone who was hired for their trade, not their software skills.',
    ],
    includes: [
      'Role-based access control and permissions',
      'Approval workflows and multi-step forms',
      'Complete audit trail of every change',
      'Document and file management',
      'Notifications by email, SMS and WhatsApp',
      'Offline-capable progressive web apps where needed',
      'Bulk import from your existing Excel files',
      'Exports to Excel and PDF for the people who still want them',
    ],
    deliverables: [
      'Deployed application with your user accounts loaded',
      'Admin console for managing users and roles',
      'Data migrated from your current spreadsheets',
      'Role-by-role training for each team',
      'API documentation if other systems will connect',
      '30 days of free fixes after launch',
    ],
    stack: [
      { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'React Native'] },
      { group: 'Backend', items: ['Node.js', 'NestJS', 'Python', 'FastAPI'] },
      { group: 'Data', items: ['PostgreSQL', 'MySQL', 'Redis', 'S3'] },
      { group: 'Auth', items: ['JWT', 'OAuth 2.0', 'Active Directory', 'Google Workspace'] },
      { group: 'Infra', items: ['Docker', 'AWS', 'Azure', 'GitHub Actions'] },
    ],
    steps: [
      {
        title: 'Workflow mapping',
        duration: 'Day 1–5',
        body: 'We sit with the people who will use it and write down what actually happens, including the workarounds. That document is the specification.',
      },
      {
        title: 'Prototype and fixed quote',
        duration: 'Week 2',
        body: 'A clickable prototype of the core workflow so the team can react to something real, then a fixed price for the build.',
      },
      {
        title: 'Build, module by module',
        duration: 'Week 3–10',
        body: 'We ship one working module at a time so value arrives before the whole thing is finished, and so course corrections are cheap.',
      },
      {
        title: 'Rollout and training',
        duration: 'Week 10–12',
        body: 'Data migration, role-by-role training, and a parallel run alongside the old process until everyone trusts the new one.',
      },
    ],
    timeline: '6–14 weeks depending on module count',
    priceFrom: '₹4,00,000',
    bestFor: [
      'Teams where the "system" is four linked spreadsheets',
      'Businesses with an approval chain that runs on email',
      'Operations that need an audit trail for compliance',
    ],
    faqs: [
      {
        question: 'How is this different from an ERP?',
        answer:
          'An ERP covers the standard back office — inventory, finance, HR — as connected modules. An enterprise app solves one workflow that is specific to you and has no off-the-shelf equivalent. Plenty of clients end up with both.',
      },
      {
        question: 'Will our team actually use it?',
        answer:
          'That depends almost entirely on whether they were involved in designing it, which is why we start with the people doing the work rather than with management. We also run in parallel with the old process rather than forcing a hard switch.',
      },
      {
        question: 'Can it work offline?',
        answer:
          'Yes, where it matters. Field and warehouse apps are built as progressive web apps that queue changes locally and sync when the connection returns.',
      },
      {
        question: 'Can it connect to Tally or our POS?',
        answer:
          'Yes. We have integrated with Tally, several POS systems and legacy SQL databases. If the data is reachable, we can usually get to it.',
      },
    ],
    related: ['erp-systems', 'web-development'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'erp-systems',
    name: 'ERP Systems',
    headline: 'One system',
    headlineAccent: 'instead of six tools',
    icon: 'fas fa-layer-group',
    summary:
      'Custom ERP covering inventory, sales, purchase, HR, payroll and finance — connected to Tally and your POS.',
    intro: [
      'Off-the-shelf ERP asks you to change your business to match the software. Ours goes the other way: we build the modules you need, in the order you need them, around the way you already work.',
      'Most clients start with the two modules causing the most pain — usually inventory and sales — and add the rest once the first ones are earning their keep. That keeps the initial cost sane and means you are never waiting a year to see value.',
      'It connects to Tally so your accountant keeps the workflow they know, and to your POS so stock is accurate without anyone rekeying it.',
    ],
    includes: [
      'Inventory with multi-location stock and batch tracking',
      'Sales orders, invoicing and GST-compliant billing',
      'Purchase orders, vendor management and payables',
      'HR: attendance, leave, payroll and payslips',
      'Finance: ledgers, receivables, cash flow',
      'Two-way Tally integration',
      'POS and barcode scanner support',
      'Role-based dashboards for owners, managers and staff',
    ],
    deliverables: [
      'Deployed ERP with your master data loaded',
      'Tally and POS integrations live and reconciling',
      'Module-by-module user manuals in plain language',
      'Training for each department',
      'Backup and disaster-recovery setup',
      '30 days of free fixes, then an optional AMC',
    ],
    stack: [
      { group: 'Application', items: ['React', 'Next.js', 'Node.js', 'Python'] },
      { group: 'Data', items: ['PostgreSQL', 'MySQL', 'Redis', 'TimescaleDB'] },
      { group: 'Integrations', items: ['Tally XML/ODBC', 'POS APIs', 'GSTN', 'WhatsApp Business'] },
      { group: 'Reporting', items: ['Power BI', 'Metabase', 'Excel export', 'Scheduled PDFs'] },
      { group: 'Infra', items: ['Docker', 'AWS', 'On-premise', 'Automated backups'] },
    ],
    steps: [
      {
        title: 'Process audit',
        duration: 'Week 1',
        body: 'We walk the floor — receiving, storage, dispatch, billing — and document how stock and money actually move today, including the parts nobody wrote down.',
      },
      {
        title: 'Module plan and fixed quote',
        duration: 'Week 2',
        body: 'We agree which modules come first, what each will do, and what the whole programme costs. You approve before we build.',
      },
      {
        title: 'Build and integrate',
        duration: 'Week 3–14',
        body: 'Modules ship one at a time, each connected to Tally and your POS as it lands, so nothing is left to a big-bang integration at the end.',
      },
      {
        title: 'Parallel run and cutover',
        duration: 'Week 14–18',
        body: 'You run old and new side by side until the numbers match for a full cycle. Only then do we retire the old process.',
      },
    ],
    timeline: '10–20 weeks depending on module count',
    priceFrom: '₹5,00,000',
    bestFor: [
      'Businesses juggling Tally, Excel, a POS and WhatsApp',
      'Multi-location retailers with unreliable stock figures',
      'Manufacturers who need batch traceability',
    ],
    faqs: [
      {
        question: 'Do we have to replace Tally?',
        answer:
          'No, and most clients do not. Tally stays as the accounting system of record; the ERP feeds it and reads from it. Your accountant keeps the workflow they know.',
      },
      {
        question: 'How much does an ERP cost?',
        answer:
          'Typically ₹5L to ₹30L depending on how many modules and integrations are in scope. You get a fixed quote after the process audit, not a range.',
      },
      {
        question: 'Cloud or on-premise?',
        answer:
          'Either. Cloud is cheaper to run and easier to reach from multiple sites. On-premise makes sense where connectivity is poor or policy requires it. We deploy both.',
      },
      {
        question: 'What happens to our existing data?',
        answer:
          'We migrate it. Stock, customers, vendors, open orders and historical transactions get cleaned and imported, and we reconcile the totals with you before going live.',
      },
    ],
    related: ['data-analytics', 'enterprise-apps'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'machine-learning',
    name: 'Machine Learning',
    headline: 'AI where it saves time',
    headlineAccent: 'and nowhere else',
    icon: 'fas fa-brain',
    summary:
      'Forecasting, image recognition, document extraction and recommendations — scoped against a number that matters.',
    intro: [
      'Plenty of ML projects produce an impressive model and no business change. We start from the opposite end: which decision is being made badly today, how often, and what would it be worth to make it better?',
      'If the honest answer is that a rule or a well-built report would fix it, we will tell you that and save you the budget. We only build a model where a model genuinely wins.',
      'When we do build one, it goes into production with monitoring, retraining and a fallback — because a model that silently drifts is worse than no model at all.',
    ],
    includes: [
      'Demand and inventory forecasting',
      'Image recognition and defect detection',
      'Document extraction from invoices and forms (OCR)',
      'Recommendation engines for e-commerce',
      'Churn and lead-scoring models',
      'Natural language classification and chat assistants',
      'Model monitoring with drift alerts',
      'Scheduled retraining pipelines',
    ],
    deliverables: [
      'Model deployed behind an API your systems can call',
      'A written baseline: what the model beats, and by how much',
      'Monitoring dashboard with drift and accuracy alerts',
      'Retraining pipeline that runs on a schedule',
      'Documented fallback for when the model is unavailable',
      'Handover notes covering the data assumptions',
    ],
    stack: [
      { group: 'Modelling', items: ['Python', 'scikit-learn', 'PyTorch', 'XGBoost'] },
      { group: 'NLP & Vision', items: ['Hugging Face', 'spaCy', 'OpenCV', 'Tesseract'] },
      { group: 'LLM', items: ['Claude API', 'RAG pipelines', 'pgvector', 'LangChain'] },
      { group: 'Serving', items: ['FastAPI', 'Docker', 'AWS SageMaker', 'ONNX'] },
      { group: 'Ops', items: ['MLflow', 'Airflow', 'Prometheus', 'Grafana'] },
    ],
    steps: [
      {
        title: 'Feasibility and data audit',
        duration: 'Week 1–2',
        body: 'We look at the data you actually have, not the data you wish you had, and tell you plainly whether it can support the outcome you want.',
      },
      {
        title: 'Baseline and success metric',
        duration: 'Week 2',
        body: 'We agree the number the model has to beat and by how much to be worth running. Everything after this is measured against it.',
      },
      {
        title: 'Model development',
        duration: 'Week 3–8',
        body: 'Iterative training and evaluation against a held-out set, with results shared in business terms rather than F1 scores alone.',
      },
      {
        title: 'Deploy and monitor',
        duration: 'Week 8–10',
        body: 'The model ships behind an API with drift monitoring, alerting and a documented fallback path.',
      },
    ],
    timeline: '6–12 weeks, scoped case by case',
    priceFrom: 'Scoped per project',
    bestFor: [
      'Retailers guessing at reorder quantities',
      'Manufacturers doing visual quality checks by hand',
      'Teams keying data out of hundreds of invoices a week',
    ],
    faqs: [
      {
        question: 'How much data do we need?',
        answer:
          'It depends on the problem. Forecasting usually needs two years of clean history; document extraction can work from a few hundred labelled examples. The data audit answers this in week one, before you commit to a build.',
      },
      {
        question: 'What if the model does not work?',
        answer:
          'The feasibility phase is deliberately short and separately priced so you can stop there. We would rather lose the build than sell you a model that cannot hit the number.',
      },
      {
        question: 'Do you use ChatGPT or Claude for this?',
        answer:
          'Where a large language model is the right tool — document understanding, summarisation, chat assistants — yes, usually with retrieval over your own data. For forecasting and classification, a smaller purpose-trained model is normally cheaper and more accurate.',
      },
      {
        question: 'Who owns the model?',
        answer:
          'You do — the weights, the training code and the pipeline. If you later take it in-house, everything transfers.',
      },
    ],
    related: ['data-analytics', 'cloud-devops'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'data-analytics',
    name: 'Data Analytics & BI',
    headline: 'Numbers you trust',
    headlineAccent: 'without chasing them',
    icon: 'fas fa-chart-line',
    summary:
      'Power BI and Tableau dashboards, data pipelines and live reporting built on one agreed definition of each metric.',
    intro: [
      'The usual problem is not a shortage of data. It is that sales, finance and operations each have their own number for the same thing, and the first twenty minutes of every meeting go on arguing about which is right.',
      'We fix that by agreeing the definitions first — what counts as revenue, when an order is complete, which returns net off — and then building pipelines that compute them one way, in one place.',
      'What you end up with is a dashboard that opens in the morning with last night’s numbers already in it, and no one asking where they came from.',
    ],
    includes: [
      'Power BI and Tableau dashboards',
      'Automated ETL pipelines from your source systems',
      'A single agreed definition per metric, documented',
      'Live sales, stock and cash-flow views',
      'Scheduled reports by email and WhatsApp',
      'Drill-down from summary to individual transaction',
      'Multi-location and multi-entity roll-ups',
      'Historical cleanup and back-loading',
    ],
    deliverables: [
      'Dashboards published to your BI workspace',
      'Documented metric definitions everyone has signed off',
      'Pipelines running on a schedule with failure alerts',
      'A data dictionary describing every field',
      'Training so your team can build their own views',
      '30 days of free fixes after handover',
    ],
    stack: [
      { group: 'BI', items: ['Power BI', 'Tableau', 'Metabase', 'Looker Studio'] },
      { group: 'Pipelines', items: ['Python', 'dbt', 'Airflow', 'Azure Data Factory'] },
      { group: 'Warehouse', items: ['PostgreSQL', 'BigQuery', 'Snowflake', 'ClickHouse'] },
      { group: 'Sources', items: ['Tally', 'POS', 'MySQL', 'Excel', 'REST APIs'] },
      { group: 'Delivery', items: ['Scheduled email', 'WhatsApp', 'Embedded dashboards'] },
    ],
    steps: [
      {
        title: 'Metric workshop',
        duration: 'Week 1',
        body: 'We get sales, finance and operations in one room and write down a single definition for each number that matters. This is the part that actually fixes the arguments.',
      },
      {
        title: 'Source audit and pipeline design',
        duration: 'Week 2',
        body: 'We trace every metric back to a source system and design the pipeline that will produce it, including how to handle the messy history.',
      },
      {
        title: 'Build and validate',
        duration: 'Week 3–6',
        body: 'Dashboards are built and then reconciled against your existing reports until the differences are explained rather than ignored.',
      },
      {
        title: 'Rollout and training',
        duration: 'Week 6–8',
        body: 'Access by role, training so people can answer their own questions, and scheduled delivery for those who prefer it in their inbox.',
      },
    ],
    timeline: '4–8 weeks',
    priceFrom: '₹2,50,000',
    bestFor: [
      'Owners who cannot see yesterday’s numbers until next week',
      'Teams where two departments report different revenue',
      'Multi-branch businesses consolidating by hand',
    ],
    faqs: [
      {
        question: 'Do we need a data warehouse?',
        answer:
          'Not always. For a single source and modest volumes we can report directly against a read replica. Once you have several systems or years of history, a warehouse pays for itself quickly.',
      },
      {
        question: 'Power BI or Tableau?',
        answer:
          'Power BI for most Indian SMEs — it is cheaper, and if you are on Microsoft 365 you may already have it. Tableau is worth it when visual exploration is the main use. We will recommend based on your licences and team.',
      },
      {
        question: 'How current is the data?',
        answer:
          'Usually a nightly refresh, which is enough for most decisions. Near-real-time is possible where it changes a decision — live stock during a sale, for instance — and we scope it separately because it costs more to run.',
      },
      {
        question: 'Can we build our own dashboards afterwards?',
        answer:
          'Yes, that is the intent. We hand over a clean, documented data model precisely so your team is not dependent on us for every new chart.',
      },
    ],
    related: ['erp-systems', 'machine-learning'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    headline: 'Infrastructure that',
    headlineAccent: 'stops being your problem',
    icon: 'fas fa-cloud',
    summary:
      'AWS, Azure and GCP setup with Docker, CI/CD, monitoring and backups you have actually tested.',
    intro: [
      'Infrastructure gets noticed twice: when it breaks, and when the bill arrives. The rest of the time it should be invisible, and that is what we build towards.',
      'That means deployments that run from a Git push rather than someone’s laptop, monitoring that pages a human before a customer notices, and backups that have been restored at least once so you know they work.',
      'We also spend real time on cost. Right-sizing, reserved capacity and killing the instances nobody remembers starting typically takes 30–50% off an unmanaged cloud bill.',
    ],
    includes: [
      'AWS, Azure and GCP architecture and setup',
      'Docker containerisation and Kubernetes where it is warranted',
      'CI/CD pipelines with automated tests and rollback',
      'Infrastructure as code so environments are reproducible',
      'Monitoring, log aggregation and on-call alerting',
      'Automated backups with tested restores',
      'SSL, WAF, secrets management and hardening',
      'Cost review and right-sizing',
    ],
    deliverables: [
      'Infrastructure defined as code in your repository',
      'CI/CD pipeline from commit to production',
      'Monitoring dashboards and alert routing',
      'A restore you have watched us perform',
      'Runbooks for the failures most likely to happen',
      'Cost report with the savings identified',
    ],
    stack: [
      { group: 'Cloud', items: ['AWS', 'Azure', 'Google Cloud', 'DigitalOcean'] },
      { group: 'Containers', items: ['Docker', 'Kubernetes', 'ECS', 'Helm'] },
      { group: 'IaC', items: ['Terraform', 'CloudFormation', 'Ansible', 'Pulumi'] },
      { group: 'CI/CD', items: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'ArgoCD'] },
      { group: 'Observability', items: ['Grafana', 'Prometheus', 'CloudWatch', 'Sentry'] },
    ],
    steps: [
      {
        title: 'Infrastructure audit',
        duration: 'Week 1',
        body: 'What is running, what it costs, what happens when it fails, and whether anyone has ever restored the backups. The findings are usually uncomfortable and always useful.',
      },
      {
        title: 'Target architecture',
        duration: 'Week 2',
        body: 'A design sized to your actual traffic and budget, with the migration sequenced so nothing goes dark.',
      },
      {
        title: 'Build and migrate',
        duration: 'Week 3–6',
        body: 'Infrastructure as code, pipelines, monitoring, then a rehearsed migration — usually out of hours, always with a rollback path.',
      },
      {
        title: 'Handover or AMC',
        duration: 'Week 6+',
        body: 'Runbooks and training for your team, or we keep monitoring it under an AMC. Plenty of clients start with the second and move to the first.',
      },
    ],
    timeline: '3–6 weeks for a typical migration',
    priceFrom: '₹1,50,000',
    bestFor: [
      'Anyone deploying by copying files onto a server',
      'Teams with a cloud bill nobody can explain',
      'Businesses with backups nobody has ever restored',
    ],
    faqs: [
      {
        question: 'Which cloud should we use?',
        answer:
          'AWS for the broadest service range, Azure if you are already a Microsoft shop, GCP if data and ML are central. For a small deployment, DigitalOcean is often cheaper and entirely sufficient. We recommend against what you already have, not in favour of a partner tier.',
      },
      {
        question: 'Do we need Kubernetes?',
        answer:
          'Probably not. Most businesses this size are better served by simpler container hosting. We suggest Kubernetes only where scale or team structure genuinely calls for it, because someone has to run it afterwards.',
      },
      {
        question: 'Can you reduce our cloud bill?',
        answer:
          'Usually by 30–50% on infrastructure nobody has reviewed. Right-sizing, reserved instances, storage tiering and shutting down forgotten resources. The audit tells you the number before you commit.',
      },
      {
        question: 'What if something breaks at 2am?',
        answer:
          'Under an AMC, alerts route to us and we respond within the agreed window. Without one, you get the runbooks and the monitoring, and your team handles it.',
      },
    ],
    related: ['maintenance-amc', 'enterprise-apps'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'maintenance-amc',
    name: 'Maintenance & AMC',
    headline: 'Someone who answers',
    headlineAccent: 'after the project ends',
    icon: 'fas fa-tools',
    summary:
      'Bug fixes, updates, monitoring and on-site visits under a fixed annual contract. 98% of clients renew.',
    intro: [
      'The month after launch is when most agencies go quiet. That is also when the real usage starts and the awkward problems surface — the edge case nobody tested, the report that is wrong at month end, the server that fills up.',
      'An AMC is the arrangement that covers that. A fixed annual fee, a defined response time, and a named person who already knows your system rather than a ticket queue.',
      'It covers fixes, security patches, monitoring, backups and small changes. Bigger work is quoted separately, and we will always tell you which bucket a request falls into before we start.',
    ],
    includes: [
      'Bug fixes with an agreed response time',
      'Security patches and dependency updates',
      'Uptime and error monitoring, 24/7',
      'Backup verification with periodic test restores',
      'Small enhancements within the monthly allowance',
      'On-site visits across Maharashtra when needed',
      'Quarterly health report on performance and cost',
      'Priority access for new work',
    ],
    deliverables: [
      'Written SLA with response and resolution times',
      'A named engineer who knows your system',
      'Monitoring dashboard you can see too',
      'Monthly summary of what was fixed and changed',
      'Quarterly health and cost review',
      'Documented escalation path',
    ],
    stack: [
      { group: 'Monitoring', items: ['Grafana', 'UptimeRobot', 'Sentry', 'CloudWatch'] },
      { group: 'Support', items: ['Ticket portal', 'WhatsApp', 'Phone', 'On-site'] },
      { group: 'Backups', items: ['Automated snapshots', 'Offsite copies', 'Test restores'] },
      { group: 'Security', items: ['Dependency scanning', 'SSL renewal', 'Access review'] },
    ],
    steps: [
      {
        title: 'System handover',
        duration: 'Week 1',
        body: 'We document what you run, where it lives and how it fails — whether we built it or inherited it from someone else.',
      },
      {
        title: 'Monitoring and baseline',
        duration: 'Week 2',
        body: 'Alerting goes in, backups get verified with an actual restore, and we record what "normal" looks like so drift is visible.',
      },
      {
        title: 'Ongoing support',
        duration: 'Continuous',
        body: 'Fixes, patches and small changes within the agreed response times, with a monthly summary of everything that happened.',
      },
      {
        title: 'Quarterly review',
        duration: 'Every 3 months',
        body: 'Performance, cost, security and what is worth improving next — a conversation about the system rather than a list of tickets.',
      },
    ],
    timeline: 'Annual contract, renewable',
    priceFrom: '₹15,000 / month',
    bestFor: [
      'Anyone whose developer has become uncontactable',
      'Businesses running software with no monitoring',
      'Teams without an in-house technical person',
    ],
    faqs: [
      {
        question: 'Will you maintain software you did not build?',
        answer:
          'Yes, after a paid audit so we know what we are taking on. If the code is in a state where maintaining it costs more than replacing it, we will say so rather than bill you monthly for the privilege.',
      },
      {
        question: 'What response times do we get?',
        answer:
          'Critical issues — the system is down — within 4 working hours. High priority within one working day. Everything else within three. It is written into the contract, not a promise.',
      },
      {
        question: 'What is not covered?',
        answer:
          'New modules, redesigns and integrations with new systems are quoted separately. Small changes fall inside the monthly allowance. We tell you which one a request is before starting, never after.',
      },
      {
        question: 'Can we cancel?',
        answer:
          'With 30 days’ notice, and you keep everything — code, credentials, documentation and monitoring configuration. 98% of clients renew, but not because they are locked in.',
      },
    ],
    related: ['cloud-devops', 'erp-systems'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const serviceSlugs = services.map((s) => s.slug);
