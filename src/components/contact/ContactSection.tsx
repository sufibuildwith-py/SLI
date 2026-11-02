import React from 'react';
import { ContactEditorialPanel } from './ContactEditorialPanel';
import { WhatsAppContactCard } from './WhatsAppContactCard';
import { ShowroomAddressCard } from './ShowroomAddressCard';
import { ContactHeritageSignature } from './ContactHeritageSignature';
import { ContactFooter } from './ContactFooter';

interface ContactSectionProps {
  isReducedMotion?: boolean;
}

/**
 * C29 — ContactSection
 * Final Contact Experience & Atelier Conclusion for Supreme Leather Industries
 *
 * Placed immediately below the Lookbook section (#collections) on the homepage.
 * Provides high-conversion WhatsApp integration with verified contact details.
 */
export const ContactSection: React.FC<ContactSectionProps> = ({
  isReducedMotion: _isReducedMotion = false,
}) => {
  return (
    <section
      id="contact"
      className="sli-contact-section"
      role="region"
      aria-label="Contact Supreme Leather Industries"
    >
      {/* Ambient background plate texture */}
      <div className="sli-contact-ambient-layer" aria-hidden="true" />

      <div className="sli-contact-shell">
        {/* Main Two-Part Editorial Composition */}
        <div className="sli-contact-grid">
          {/* C31 — Left: The Editorial Invitation */}
          <div className="sli-contact-col-left">
            <ContactEditorialPanel />
          </div>

          {/* Right: The Contact Destinations */}
          <div className="sli-contact-col-right">
            {/* C32 — WhatsApp Enquiry Card */}
            <WhatsAppContactCard />

            {/* C34 — Verified Showroom Address Card */}
            <ShowroomAddressCard />

            {/* C35 — Heritage Hallmark */}
            <ContactHeritageSignature />
          </div>
        </div>
      </div>

      {/* C36 — Atelier Homepage Closing Footer */}
      <ContactFooter />
    </section>
  );
};
