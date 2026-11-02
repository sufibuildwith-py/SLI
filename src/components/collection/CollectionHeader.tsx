import React from 'react';

/**
 * C02 — CollectionHeader
 * Encapsulates C03 (Eyebrow), C04 (Title), and C05 (Description)
 *
 * Provides a restrained, editorial introduction to the belt collection
 * without competing visually with the primary product presentation stage.
 */
export const CollectionHeader: React.FC = () => {
  return (
    <header className="sli-belt-collection-header">
      {/* C03 — CollectionEyebrow */}
      <div className="sli-belt-collection-eyebrow" aria-label="The Collection">
        <span className="sli-belt-eyebrow-accent" aria-hidden="true" />
        <span className="sli-belt-eyebrow-text">THE COLLECTION</span>
      </div>

      {/* C04 — CollectionTitle */}
      <h1 className="sli-belt-collection-title">Crafted to be distinct.</h1>

      {/* C05 — CollectionDescription */}
      <p className="sli-belt-collection-desc">
        Every belt carries its own character. Explore a collection shaped by intricate
        detailing, expressive patterns and distinctive hardware.
      </p>
    </header>
  );
};
