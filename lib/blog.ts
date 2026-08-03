/**
 * Article index for /insights/blog.
 *
 * Summaries only — these are listing entries, not full posts. When
 * individual articles are written they become /insights/blog/[slug] and
 * `href` moves off the listing anchor.
 */

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  displayDate: string;
  readTime: string;
  tags: string[];
  category: 'ERP' | 'Cloud' | 'Security' | 'Analytics' | 'Machine Learning' | 'Web';
}

export const posts: Post[] = [
  {
    id: 'erp-signals',
    title: 'Five signs your business has outgrown spreadsheets',
    excerpt:
      'Nobody decides to run operations on Excel — it happens one sheet at a time. These are the symptoms we see just before a business commits to an ERP, and the two that mean you should move now rather than next year.',
    date: '2026-07-12',
    displayDate: '12 July 2026',
    readTime: '6 min read',
    tags: ['ERP', 'Operations'],
    category: 'ERP',
  },
  {
    id: 'erp-cost',
    title: 'What an ERP actually costs an Indian SME',
    excerpt:
      'A straight breakdown of where the money goes across a ₹5L–₹30L engagement: modules, integrations, migration, training and the running costs most quotes leave out entirely.',
    date: '2026-06-28',
    displayDate: '28 June 2026',
    readTime: '9 min read',
    tags: ['ERP', 'Budgeting'],
    category: 'ERP',
  },
  {
    id: 'tally-integration',
    title: 'Integrating with Tally without replacing it',
    excerpt:
      'Your accountant does not want a new accounting system, and they are usually right. How two-way Tally sync works in practice, what it can and cannot do, and where it breaks.',
    date: '2026-06-14',
    displayDate: '14 June 2026',
    readTime: '7 min read',
    tags: ['ERP', 'Integration', 'Tally'],
    category: 'ERP',
  },
  {
    id: 'cloud-cost',
    title: 'Cutting a cloud bill nobody can explain',
    excerpt:
      'Most unmanaged AWS accounts have 30–50% of spend sitting in idle instances, oversized databases and storage nobody tiered. A practical audit order, starting with the items that take an afternoon.',
    date: '2026-05-30',
    displayDate: '30 May 2026',
    readTime: '8 min read',
    tags: ['Cloud', 'Cost'],
    category: 'Cloud',
  },
  {
    id: 'backups',
    title: 'Your backups are not backups until you restore one',
    excerpt:
      'Almost every business we audit has backups running. Far fewer have ever restored one. What we find when we actually try, and how to test yours this week without risking anything.',
    date: '2026-05-16',
    displayDate: '16 May 2026',
    readTime: '5 min read',
    tags: ['Security', 'Operations'],
    category: 'Security',
  },
  {
    id: 'security-basics',
    title: 'The security work that matters for a 20-person company',
    excerpt:
      'You do not need a SOC. You do need MFA, offsite backups, patched dependencies and an offboarding checklist. The short list that removes most of the realistic risk.',
    date: '2026-05-02',
    displayDate: '2 May 2026',
    readTime: '7 min read',
    tags: ['Security'],
    category: 'Security',
  },
  {
    id: 'one-number',
    title: 'Why sales and finance report different revenue',
    excerpt:
      'It is almost never a data problem. It is that nobody wrote down what counts as revenue, when an order is complete, and how returns net off. How to run the workshop that fixes it in an afternoon.',
    date: '2026-04-18',
    displayDate: '18 April 2026',
    readTime: '6 min read',
    tags: ['Analytics', 'BI'],
    category: 'Analytics',
  },
  {
    id: 'ml-worth-it',
    title: 'When machine learning is worth it, and when a rule wins',
    excerpt:
      'We turn down roughly half the ML enquiries we get, because a well-built report or a simple rule would solve the problem for a tenth of the cost. The test we apply before quoting.',
    date: '2026-04-04',
    displayDate: '4 April 2026',
    readTime: '8 min read',
    tags: ['Machine Learning'],
    category: 'Machine Learning',
  },
  {
    id: 'site-speed',
    title: 'What actually makes a business website slow',
    excerpt:
      'Rarely the hosting. Usually unoptimised images, render-blocking fonts and six analytics scripts. What to measure, in what order, and what each fix is realistically worth.',
    date: '2026-03-21',
    displayDate: '21 March 2026',
    readTime: '6 min read',
    tags: ['Web', 'Performance'],
    category: 'Web',
  },
];

export const postCategories = [
  'All',
  ...Array.from(new Set(posts.map((p) => p.category))),
] as const;
