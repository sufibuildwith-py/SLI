import React from 'react';
import { ContactHeader } from './ContactHeader';

export const ContactEditorialPanel: React.FC = () => {
  return (
    <div className="sli-contact-editorial-panel">
      {/* C30 — ContactHeader */}
      <ContactHeader />

      {/* Atelier Origin & Heritage Note */}
      <div className="sli-contact-origin-note">
        <div className="sli-origin-rule" aria-hidden="true" />
        <div className="sli-origin-content">
          <span className="sli-origin-badge">KANPUR, INDIA · EST. 1995</span>
          <p className="sli-origin-quote">
            “Every hide is selected by hand, burnished with intention, and finished
            to endure decades of use.”
          </p>
        </div>
      </div>
    </div>
  );
};
