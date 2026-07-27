'use client';

import { useState } from 'react';

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * Single-open accordion, matching the original behaviour.
 *
 * Each question is a real <button> controlling its panel via
 * aria-expanded / aria-controls, so it is reachable and operable from
 * the keyboard.
 */
export default function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list reveal">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-question-${i}`;

        return (
          <div className={`faq-item${isOpen ? ' open' : ''}`} key={item.question}>
            <button
              type="button"
              className="faq-question"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              {item.question}
              <i className="fas fa-chevron-down" aria-hidden="true" />
            </button>
            <div className="faq-answer" id={panelId} role="region" aria-labelledby={buttonId}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
