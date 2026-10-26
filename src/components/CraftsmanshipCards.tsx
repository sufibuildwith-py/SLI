import React from 'react';
import { motion } from 'framer-motion';

export interface CardItem {
  id: string;
  category: string;
  label: string;
  display: string;
  subLabel: string;
}

export const CRAFTSMANSHIP_DATA: CardItem[] = [
  {
    id: 'material',
    category: 'MATERIAL',
    label: 'LEATHER',
    display: 'GENUINE',
    subLabel: 'SELECTED MATERIALS',
  },
  {
    id: 'craft',
    category: 'CRAFT',
    label: 'DETAILING',
    display: 'REFINED',
    subLabel: 'IN EVERY FINISH',
  },
  {
    id: 'design',
    category: 'DESIGN',
    label: 'CHARACTER',
    display: 'TIMELESS',
    subLabel: 'MADE TO ENDURE',
  },
];

// Bespoke minimal line icons matching artisanal leathercraft
const CardIcon: React.FC<{ type: string }> = ({ type }) => {
  if (type === 'material') {
    // Artisanal leather hide contour icon
    return (
      <svg
        className="card-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C8 2 6 4 5 7c-1 3-3 4-3 6s2 3 3 6c1 3 3 5 7 5s6-2 7-5c1-3 3-4 3-6s-2-3-3-6c-1-3-3-5-7-5z" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    );
  }
  if (type === 'craft') {
    // Precision saddle stitch / diamond awl icon
    return (
      <svg
        className="card-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" />
        <line x1="12" y1="8" x2="12" y2="16" strokeDasharray="2 2" />
        <line x1="8" y1="10" x2="16" y2="14" strokeDasharray="2 2" />
      </svg>
    );
  }
  // Artisanal hallmark / compass of character
  return (
    <svg
      className="card-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M7 12h10" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
};

interface CraftsmanshipCardsProps {
  onCardClick?: (card: CardItem) => void;
}

export const CraftsmanshipCards: React.FC<CraftsmanshipCardsProps> = ({ onCardClick }) => {
  return (
    <aside className="sli-cards-column" aria-label="Craftsmanship brand qualities">
      {CRAFTSMANSHIP_DATA.map((card) => (
        <motion.article
          key={card.id}
          className="sli-craft-card"
          tabIndex={0}
          onClick={() => onCardClick?.(card)}
          whileHover={{
            y: -3,
            backgroundColor: 'rgba(247, 243, 237, 0.52)',
            transition: { duration: 0.25, ease: 'easeOut' },
          }}
          whileTap={{ scale: 0.98 }}
          role="region"
          aria-label={`${card.label}: ${card.display} - ${card.subLabel}`}
        >
          {/* Card Header: Icon + Small Uppercase Tracked Label */}
          <div className="card-top-row">
            <div className="card-label-group">
              <span className="card-icon-wrap" aria-hidden="true">
                <CardIcon type={card.id} />
              </span>
              <span className="card-label-text">{card.label}</span>
            </div>
            <span className="card-category-indicator">{card.category}</span>
          </div>

          {/* Card Middle: Large Lightweight Display Text */}
          <div className="card-center-row">
            <span className="card-display-text">{card.display}</span>
          </div>

          {/* Card Bottom: Small Uppercase Supporting Label */}
          <div className="card-bottom-row">
            <span className="card-sublabel-text">{card.subLabel}</span>
          </div>
        </motion.article>
      ))}
    </aside>
  );
};
