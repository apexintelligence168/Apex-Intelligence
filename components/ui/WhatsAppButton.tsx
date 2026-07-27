import { contact } from '@/lib/site';

/** Floating WhatsApp action, present on every route. */
export default function WhatsAppButton() {
  return (
    <a
      id="whatsapp-btn"
      href={contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      aria-label="Chat with us on WhatsApp"
    >
      <i className="fab fa-whatsapp" aria-hidden="true" />
    </a>
  );
}
