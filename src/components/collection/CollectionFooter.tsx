import React from 'react';

/**
 * C18 — CollectionFooter
 *
 * Optional page-specific bottom spacing and editorial atelier signature
 * that anchors the collection page experience in Supreme Leather's heritage.
 */
export const CollectionFooter: React.FC = () => {
  return (
    <footer className="sli-belt-collection-footer" role="contentinfo">
      <div className="sli-belt-footer-divider" aria-hidden="true" />
      <div className="sli-belt-footer-content">
        <div className="sli-belt-footer-left">
          <span className="sli-belt-footer-brand">SUPREME LEATHER INDUSTRIES</span>
          <span className="sli-belt-footer-atelier">ATELIER ARCHIVE • PAGE 02</span>
        </div>
        <div className="sli-belt-footer-right">
          <span className="sli-belt-footer-origin">KANPUR, INDIA — EST. 1995</span>
          <span className="sli-belt-footer-tagline">HERITAGE LEATHER CRAFTSMANSHIP</span>
        </div>
      </div>
    </footer>
  );
};
