import React from 'react';
import { WHATSAPP_CONFIG } from './WhatsAppEnquiryBuilder';
import { WhatsAppActionButton } from './WhatsAppActionButton';

export const WhatsAppContactCard: React.FC = () => {
  return (
    <div className="sli-contact-card sli-whatsapp-card" aria-label="Direct WhatsApp Contact">
      <div className="sli-contact-card-badge">
        <span className="sli-contact-card-badge-dot" aria-hidden="true" />
        <span className="sli-contact-card-badge-text">SPEAK WITH OUR TEAM</span>
      </div>

      <div className="sli-contact-card-body">
        <div className="sli-contact-person-block">
          <span className="sli-contact-person-role">Head of Bespoke Enquiries</span>
          <h3 className="sli-contact-person-name">{WHATSAPP_CONFIG.person}</h3>
        </div>

        <div className="sli-contact-phone-block">
          <a
            href={`tel:${WHATSAPP_CONFIG.phoneInternational}`}
            className="sli-contact-phone-link"
            aria-label={`Call or save phone number ${WHATSAPP_CONFIG.phoneDisplay}`}
            title="Click to call or long press to copy"
          >
            {WHATSAPP_CONFIG.phoneDisplay}
          </a>
        </div>

        <div className="sli-whatsapp-action-wrapper">
          <WhatsAppActionButton
            options={{ type: 'general' }}
            label="START A CONVERSATION"
          />
        </div>

        <p className="sli-contact-card-subtext">
          Usually the quickest way to reach us.
        </p>
      </div>
    </div>
  );
};
