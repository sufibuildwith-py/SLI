import React from 'react';

/**
 * C17 — CollectionBackground
 *
 * Implements the shared photographic craftsmanship background plate
 * (/images/craftsmanship/background_clean_plate.webp) with a restrained
 * coffee-brown ambient vignette to ensure optimal contrast and readability.
 */
export const CollectionBackground: React.FC = () => {
  return (
    <div className="sli-belt-collection-bg" aria-hidden="true">
      <img
        src="/images/craftsmanship/background_clean_plate.webp"
        alt=""
        className="sli-belt-collection-bg-image"
        loading="eager"
        decoding="async"
      />
      {/* Subtle editorial coffee-brown vignette overlay */}
      <div className="sli-belt-collection-bg-overlay" />
      {/* Subtle warm ambient lighting highlight */}
      <div className="sli-belt-collection-bg-ambient" />
    </div>
  );
};
