import React from 'react';
import { MapPin } from 'lucide-react';
import { WHATSAPP_CONFIG } from './WhatsAppEnquiryBuilder';

export const ShowroomAddressCard: React.FC = () => {
  return (
    <div className="sli-contact-card sli-address-card" aria-label="Atelier Showroom Address">
      <div className="sli-contact-card-badge">
        <MapPin size={13} className="sli-contact-badge-icon" aria-hidden="true" />
        <span className="sli-contact-card-badge-text">VISIT OUR SHOWROOM</span>
      </div>

      <div className="sli-contact-card-body">
        <div className="sli-address-block">
          <span className="sli-address-line sli-address-street">
            {WHATSAPP_CONFIG.address.line1}
          </span>
          <span className="sli-address-line sli-address-city">
            {WHATSAPP_CONFIG.address.line2}
          </span>
        </div>

        <div className="sli-address-exact-banner" aria-label="Official showroom address">
          <span className="sli-address-exact-text">
            {WHATSAPP_CONFIG.address.full}
          </span>
        </div>

        <p className="sli-contact-card-subtext">
          By appointment for private viewings, material selection and custom commissions.
        </p>
      </div>
    </div>
  );
};
