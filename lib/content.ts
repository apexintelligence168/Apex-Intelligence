/**
 * FAQ content for /insights.
 *
 * Lifted out of the markup so the same entries can feed both the
 * accordion and the FAQPage structured data without drifting apart.
 */

import type { FaqEntry } from '@/components/sections/FaqAccordion';

export const faqs: FaqEntry[] = [
  {
    question: "What types of websites do you build?",
    answer:
      "We build e-commerce stores, business websites, admin panels, order management systems, customer portals, and custom web apps. Every site is mobile-responsive, fast, and built for your specific workflow.",
  },
  {
    question: "How much does a typical enterprise application cost?",
    answer:
      "ERP work usually runs between ₹5L and ₹30L depending on scope. Web projects start from ₹2L. ML is scoped case by case. You'll get a written quote after our first call.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes. Every project includes 30 days of free fixes and training after launch. Most clients then move to an AMC for ongoing updates and support.",
  },
  {
    question: "Do you only work in Nashik?",
    answer:
      "We're based in Nashik and prefer to visit in person for kickoffs in Maharashtra. For other states we start remotely and travel for key milestones.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer:
      "Yes. We connect to Tally, Excel exports, POS systems, and legacy SQL databases regularly. If the data exists somewhere, we can usually get to it.",
  },
];
