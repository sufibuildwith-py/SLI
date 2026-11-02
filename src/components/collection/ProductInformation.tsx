import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { CollectionProduct, TOTAL_PRODUCTS_COUNT } from '../../data/products';
import { ProductNavigation } from './ProductNavigation';

interface ProductInformationProps {
  product: CollectionProduct;
  totalCount?: number;
  currentIndex: number; // 0-indexed
  direction: 1 | -1;
  onPrevious: () => void;
  onNext: () => void;
  onInquire?: (product: CollectionProduct) => void;
  isReducedMotion?: boolean;
}

/**
 * C09 — ProductInformation
 * Encapsulates C10 (ProductCounter), C11 (ProductName), C12 (ProductDescription),
 * C26 (ProductInquiryAction), and coordinates C13 (ProductNavigation).
 *
 * Synchronized with the active product:
 * All visual metadata updates atomically with direction-aware transitions.
 */
export const ProductInformation: React.FC<ProductInformationProps> = ({
  product,
  totalCount = TOTAL_PRODUCTS_COUNT,
  currentIndex,
  direction,
  onPrevious,
  onNext,
  onInquire,
  isReducedMotion = false,
}) => {
  const currentFormatted = String(currentIndex + 1).padStart(2, '0');
  const totalFormatted = String(totalCount).padStart(2, '0');

  const textVariants = {
    enter: (dir: number) => ({
      y: isReducedMotion ? 0 : dir > 0 ? 10 : -10,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isReducedMotion ? 0.01 : 0.28,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir: number) => ({
      y: isReducedMotion ? 0 : dir > 0 ? -10 : 10,
      opacity: 0,
      transition: {
        duration: isReducedMotion ? 0.01 : 0.18,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="sli-belt-info-panel">
      {/* C10 — ProductCounter (Atomic synchronization) */}
      <div
        className="sli-belt-counter"
        aria-label={`Item ${currentIndex + 1} of ${totalCount}`}
        aria-live="polite"
      >
        <span className="sli-belt-counter-current">{currentFormatted}</span>
        <span className="sli-belt-counter-divider" aria-hidden="true">
          /
        </span>
        <span className="sli-belt-counter-total">{totalFormatted}</span>
      </div>

      {/* C11 & C12 — Animated Editorial Copy Region */}
      <div className="sli-belt-copy-frame">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={product.id}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="sli-belt-copy-group"
          >
            {/* C11 — ProductName */}
            <h2 className="sli-belt-product-name">{product.name}</h2>

            {/* C12 — ProductDescription */}
            <p className="sli-belt-product-desc">{product.description}</p>

            {/* Visual Micro-Interactions: Verified hardware and tooling details */}
            <div className="sli-belt-specs-row" aria-label="Product attributes">
              {product.hardwareFinish && (
                <div
                  className="sli-belt-meta-tag"
                  aria-label={`Hardware: ${product.hardwareFinish}`}
                  title="Buckle and hardware finish"
                >
                  <span className="sli-belt-meta-dot" aria-hidden="true" />
                  <span className="sli-belt-meta-text">{product.hardwareFinish}</span>
                </div>
              )}
              {product.visualCategory && (
                <div
                  className="sli-belt-meta-tag sli-belt-meta-tag-secondary"
                  aria-label={`Motif: ${product.visualCategory.replace(/-/g, ' ')}`}
                  title="Verified tooling & motif style"
                >
                  <span className="sli-belt-meta-dot sli-belt-meta-dot-accent" aria-hidden="true" />
                  <span className="sli-belt-meta-text">
                    {product.visualCategory.replace(/-/g, ' ')}
                  </span>
                </div>
              )}
            </div>

            {/* C26 — ProductInquiryAction: Direct inquiry action */}
            <div className="sli-belt-inquiry-container">
              <button
                type="button"
                className="sli-belt-inquiry-btn"
                onClick={() => onInquire?.(product)}
                aria-label={`Enquire about the ${product.name} belt`}
              >
                <MessageSquare size={13} strokeWidth={1.8} aria-hidden="true" />
                <span>Enquire About This Belt</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* C13 — ProductNavigation Controls */}
      <ProductNavigation
        currentIndex={currentIndex}
        totalCount={totalCount}
        onPrevious={onPrevious}
        onNext={onNext}
        isInteractive={true}
      />
    </div>
  );
};
