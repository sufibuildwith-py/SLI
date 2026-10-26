import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface HeroContentProps {
  onExploreClick: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onExploreClick }) => {
  return (
    <div className="sli-hero-content">
      {/* Eyebrow: Burgundy Dot + Label */}
      <div className="sli-eyebrow-container" aria-label="Crafted with distinction">
        <span className="sli-eyebrow-dot" aria-hidden="true" />
        <span className="sli-eyebrow-text">CRAFTED WITH DISTINCTION</span>
      </div>

      {/* Headline: 2 lines with overflow-hidden masks for GSAP reveal */}
      <h1 className="sli-headline">
        <div className="sli-headline-line-mask">
          <span className="sli-headline-line">Crafted in Leather.</span>
        </div>
        <div className="sli-headline-line-mask">
          <span className="sli-headline-line">Defined by Detail.</span>
        </div>
      </h1>

      {/* Supporting Paragraph */}
      <p className="sli-paragraph">
        Thoughtfully crafted leather goods, where intricate detailing, timeless character,
        and enduring quality come together.
      </p>

      {/* CTA Button: Dark Espresso Pill with Diagonal Arrow */}
      <div className="sli-cta-wrapper">
        <motion.button
          type="button"
          className="sli-cta-button"
          onClick={onExploreClick}
          whileHover={{ scale: 1.025, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Explore Our Collection of handcrafted leather goods"
        >
          <span className="sli-cta-text">Explore Our Collection</span>
          <span className="sli-cta-icon-wrapper" aria-hidden="true">
            <ArrowUpRight className="sli-cta-icon" strokeWidth={2} />
          </span>
        </motion.button>
      </div>
    </div>
  );
};
