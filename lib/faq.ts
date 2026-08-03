/**
 * Grouped FAQ content for /insights/faq.
 *
 * The short five-question set on /insights lives in lib/content.ts and
 * is a subset of this; this is the full list, grouped so a visitor can
 * find their section rather than scrolling all of it.
 */

import type { FaqEntry } from '@/components/sections/FaqAccordion';

export interface FaqGroup {
  id: string;
  title: string;
  icon: string;
  intro: string;
  items: FaqEntry[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: 'working-together',
    title: 'Working together',
    icon: 'fas fa-handshake',
    intro: 'How an engagement starts, who you deal with, and what we expect from each other.',
    items: [
      {
        question: 'How do we start?',
        answer:
          'A call or a site visit, at no cost. We look at what you do today and what is not working. If we think we can help, you get a scope document and a fixed quote — usually within a couple of days. If we do not think we are the right fit, we will say so and point you elsewhere.',
      },
      {
        question: 'Who will we actually be dealing with?',
        answer:
          'One of the four founders is on every project and on every call. There is no account manager relaying messages to a delivery team you never meet. For AMC clients there is also a named engineer who knows your system.',
      },
      {
        question: 'Do you only work in Nashik?',
        answer:
          'We are based in Nashik and prefer to visit in person for kickoffs anywhere in Maharashtra. For other states we start remotely and travel for the milestones that benefit from being in the room. Plenty of our work is fully remote.',
      },
      {
        question: 'How involved do we need to be?',
        answer:
          'More at the start than at the end. Discovery needs real access to the people doing the work — usually a few hours across the first week. During the build it is a weekly demo of about an hour. Projects that go wrong are almost always the ones where nobody on the client side had time.',
      },
      {
        question: 'What if we already have a developer?',
        answer:
          'That is fine and often ideal. We have worked alongside in-house teams, taken over from previous agencies, and handed projects to a client team afterwards. We will document to whatever standard your team needs.',
      },
    ],
  },
  {
    id: 'scope-pricing',
    title: 'Scope and pricing',
    icon: 'fas fa-file-invoice',
    intro: 'What things cost, how the quote works, and what happens when the scope moves.',
    items: [
      {
        question: 'How much does a typical project cost?',
        answer:
          'Web projects start from ₹2L. ERP work usually runs between ₹5L and ₹30L depending on modules and integrations. Enterprise apps start around ₹4L. Analytics from ₹2.5L. Machine learning is scoped case by case after a paid feasibility phase. You get a fixed number in writing after the first call — not a range.',
      },
      {
        question: 'Why fixed quotes rather than hourly?',
        answer:
          'Because hourly billing puts the risk of our estimating error onto you, and gives us no incentive to be quick. We do the scoping work up front, commit to a number, and absorb it if we got the estimate wrong. The trade-off is that we are strict about what is in scope.',
      },
      {
        question: 'What happens if we want changes mid-project?',
        answer:
          'Small things get absorbed. Anything that materially changes the scope gets quoted as a change before we start it, so it is your decision rather than a surprise on the invoice. We tell you which bucket a request falls into when you raise it.',
      },
      {
        question: 'What are the payment terms?',
        answer:
          'Typically 30% to start, 40% at the working-demo milestone, 30% on go-live. Larger programmes are split per module so you are never far ahead of delivered value.',
      },
      {
        question: 'Is there an ongoing cost after launch?',
        answer:
          'Hosting and any third-party services, which are in your name and usually a few thousand rupees a month. An AMC is optional and starts at ₹15,000/month. Everything else is one-off.',
      },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery and timelines',
    icon: 'fas fa-gauge-high',
    intro: 'How long things take and what you see along the way.',
    items: [
      {
        question: 'How quickly will we see something working?',
        answer:
          'A working demo within 14 days of kickoff on every project. Not wireframes or a slide deck — software you can click. After that you get a demo every week until launch.',
      },
      {
        question: 'How long does a full project take?',
        answer:
          'A business website or store, 3–8 weeks. An enterprise app, 6–14 weeks. A full ERP, 10–20 weeks depending on modules. Cloud migrations, 3–6 weeks. The scope document gives you a specific date range before you commit.',
      },
      {
        question: 'What if you are late?',
        answer:
          'We tell you as soon as we know rather than at the deadline, with the revised date and the reason. It happens; hiding it is what damages a project. Our fixed quote does not change because we took longer than we estimated.',
      },
      {
        question: 'What happens at launch?',
        answer:
          'Migration, domain cutover and a parallel run alongside your old process where that makes sense. Then 30 days of hypercare, during which any fix is free and we are watching the logs rather than waiting for you to call.',
      },
    ],
  },
  {
    id: 'technical',
    title: 'Technical',
    icon: 'fas fa-code',
    intro: 'Ownership, integrations, hosting and what happens to the code.',
    items: [
      {
        question: 'Do we own the code?',
        answer:
          'Entirely. It sits in your Git repository under your account from day one, along with the cloud and domain accounts. There is no proprietary runtime of ours in the middle. You can take any project to another team without asking us for anything.',
      },
      {
        question: 'Can you integrate with our existing systems?',
        answer:
          'Usually yes. We regularly connect to Tally, POS systems, legacy SQL databases, Excel exports, payment gateways and WhatsApp Business. If the data is reachable in some form, we can normally get to it. If it genuinely is not, we will tell you at the audit stage rather than after you have paid.',
      },
      {
        question: 'Cloud or on-premise?',
        answer:
          'Either. Cloud is cheaper to run and easier to reach across multiple sites, and it is what most clients choose. On-premise makes sense where connectivity is unreliable or policy requires it. We deploy both, and the recommendation comes from your situation rather than our preference.',
      },
      {
        question: 'What technology will you use?',
        answer:
          'Mostly Next.js and React on the front, Node.js or Python behind, PostgreSQL for data, and AWS or Azure for hosting. We pick boring, well-understood tools for the parts you have to live with, so your next developer can pick it up. The full list is on our tech stack page.',
      },
      {
        question: 'Will it work on mobile?',
        answer:
          'Everything we build is mobile-first and tested on real devices, not just a resized browser window. For field and warehouse work we build progressive web apps that keep working offline and sync when the connection returns.',
      },
    ],
  },
  {
    id: 'support',
    title: 'Support and maintenance',
    icon: 'fas fa-tools',
    intro: 'What happens after launch, and what an AMC covers.',
    items: [
      {
        question: 'What support is included?',
        answer:
          '30 days of free fixes and training after every launch. After that, most clients move to an annual maintenance contract; a few take the documentation and run it themselves, which is a perfectly good outcome.',
      },
      {
        question: 'What does an AMC cover?',
        answer:
          'Bug fixes within agreed response times, security patches, dependency updates, uptime monitoring, backup verification, small enhancements within a monthly allowance, and on-site visits across Maharashtra when needed. New modules and redesigns are quoted separately.',
      },
      {
        question: 'What are your response times?',
        answer:
          'Critical — the system is down — within 4 working hours. High priority within one working day. Everything else within three. These are written into the contract rather than promised on a call.',
      },
      {
        question: 'Will you maintain software you did not build?',
        answer:
          'Yes, after a paid audit so we know what we are taking on. If the code is in a state where maintaining it will cost more than replacing it, we will tell you that instead of billing you monthly to keep it alive.',
      },
      {
        question: 'Can we cancel the AMC?',
        answer:
          'With 30 days’ notice, and you keep everything — code, credentials, documentation and monitoring configuration. 98% of clients renew, and we would rather that be because the service is worth it.',
      },
    ],
  },
];

/** Flattened, for the FAQPage structured data. */
export const allFaqs = faqGroups.flatMap((g) => g.items);
