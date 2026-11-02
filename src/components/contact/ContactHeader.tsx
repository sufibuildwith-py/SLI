import React from 'react';

export const ContactHeader: React.FC = () => {
  return (
    <div className="sli-contact-header" aria-label="Contact Invitation">
      {/* Eyebrow */}
      <div className="sli-contact-eyebrow" aria-label="We would love to hear from you">
        <span className="sli-contact-eyebrow-accent" aria-hidden="true" />
        <span className="sli-contact-eyebrow-text">WE'D LOVE TO HEAR FROM YOU</span>
      </div>

      {/* Primary Editorial Headline */}
      <h2 className="sli-contact-headline">
        Let’s Create Something Worth Keeping.
      </h2>

      {/* Supporting Copy */}
      <p className="sli-contact-desc">
        Whether you’re exploring our collection, looking for a particular design,
        or enquiring about a custom piece, we’d be glad to hear from you.
      </p>
    </div>
  );
};
