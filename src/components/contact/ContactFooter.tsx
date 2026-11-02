import React from 'react';
import { ArrowUp } from 'lucide-react';
import { WHATSAPP_CONFIG } from './WhatsAppEnquiryBuilder';

export const ContactFooter: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="sli-contact-footer" role="contentinfo" aria-label="Site Footer">
      <div className="sli-contact-footer-divider" aria-hidden="true" />

      <div className="sli-contact-footer-inner">
        {/* Left: Brand & Address */}
        <div className="sli-footer-brand-col">
          <div className="sli-footer-brand-title">SUPREME LEATHER INDUSTRIES</div>
          <div className="sli-footer-address-text">{WHATSAPP_CONFIG.address.full}</div>
        </div>

        {/* Center: Heritage & Tagline */}
        <div className="sli-footer-heritage-col">
          <span className="sli-footer-tagline">ATELIER ARCHIVE · HANDCRAFTED LEATHER GOODS</span>
          <span className="sli-footer-est">ESTABLISHED 1995 · KANPUR, INDIA</span>
        </div>

        {/* Right: Back to top & copyright */}
        <div className="sli-footer-actions-col">
          <button
            type="button"
            className="sli-footer-top-btn"
            onClick={scrollToTop}
            aria-label="Return to top of page"
          >
            <span>Return to top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
          <div className="sli-footer-copyright">
            © 1995–{currentYear} Supreme Leather Industries. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
