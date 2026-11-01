import React from 'react';

interface CollectionsIntroProps {
  isReducedMotion?: boolean;
}

/**
 * CollectionsIntro — Phase 2: Editorial Introduction & Typography Layer
 *
 * Isolated presentation layer designed to transition seamlessly into
 * the Phase 3 product-detail lookbook state without component re-architecting.
 */
export const CollectionsIntro: React.FC<CollectionsIntroProps> = () => {
  return (
    <div className="sli-collections-intro-layer" aria-label="Collections Editorial Introduction">
      {/* Left Zone: Campaign Identity & Heritage Introduction */}
      <div className="sli-col-intro-left">
        {/* Eyebrow: Tracked brand & collection hallmark */}
        <div
          className="sli-col-eyebrow"
          aria-label="Supreme Leather Industries / The Collection"
        >
          <span className="sli-col-eyebrow-accent" aria-hidden="true" />
          <span className="sli-col-eyebrow-text">
            SUPREME LEATHER INDUSTRIES / THE COLLECTION
          </span>
        </div>

        {/* Primary Headline: An Expression of Permanence */}
        <h2 className="sli-col-headline">
          <span className="sli-col-headline-line-mask">
            <span className="sli-col-headline-line">An Expression</span>
          </span>
          <span className="sli-col-headline-line-mask">
            <span className="sli-col-headline-line">of Permanence.</span>
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="sli-col-paragraph">
          Some things are never meant to fade. Shaped by heritage, defined by detail, and
          made to become part of your story.
        </p>

        {/* Heritage Signature: Kanpur, India — Est. 1995 */}
        <div className="sli-col-signature">
          <span className="sli-col-signature-rule" aria-hidden="true" />
          <span className="sli-col-signature-text">KANPUR, INDIA — EST. 1995</span>
        </div>
      </div>

      {/* Right Zone: Compact Editorial Collection Marker */}
      <div className="sli-col-folio" aria-label="Folio 01 / The Collection">
        <div className="sli-col-folio-rule" aria-hidden="true" />
        <span className="sli-col-folio-number">01 / THE COLLECTION</span>
        <span className="sli-col-folio-title">CRAFTED TO ENDURE</span>
      </div>
    </div>
  );
};
