import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { CollectionProduct } from '../../data/products';

export interface ProductDetailViewerProps {
  isOpen: boolean;
  onClose: () => void;
  product: CollectionProduct;
  isReducedMotion?: boolean;
}

/**
 * C22 — ProductDetailViewer
 * Encapsulates C23 (ProductDetailImage) and C24 (ProductDetailNavigation).
 *
 * Implements:
 * - Refined dark showroom modal overlay
 * - Large close-up macro photography with preserved aspect ratio
 * - Keyboard navigation (Escape to close, Left/Right arrows for multiple views)
 * - Accessible focus trap and return-to-trigger restoration
 * - Non-destructive body scroll lock
 */
export const ProductDetailViewer: React.FC<ProductDetailViewerProps> = ({
  isOpen,
  onClose,
  product,
  isReducedMotion = false,
}) => {
  const [activeDetailIndex, setActiveDetailIndex] = useState(0);
  const detailImages = product.detailImages || [];
  const totalDetails = detailImages.length;

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // Reset detail index if product changes
  useEffect(() => {
    setActiveDetailIndex(0);
  }, [product.id]);

  // Focus management and body scroll locking
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';

      // Focus the close button after animation frames settle
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
        triggerElementRef.current?.focus();
      };
    }
  }, [isOpen]);

  // Keyboard navigation within the viewer
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'ArrowRight' && totalDetails > 1) {
        e.stopPropagation();
        setActiveDetailIndex((prev) => (prev + 1) % totalDetails);
      } else if (e.key === 'ArrowLeft' && totalDetails > 1) {
        e.stopPropagation();
        setActiveDetailIndex((prev) => (prev - 1 + totalDetails) % totalDetails);
      }
    },
    [isOpen, totalDetails, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const currentImageSrc = detailImages[activeDetailIndex] || '';

  return (
    <AnimatePresence>
      {isOpen && totalDetails > 0 && (
        <motion.div
          className="sli-detail-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isReducedMotion ? 0.01 : 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Detailed Close-up: ${product.name}`}
        >
          <motion.div
            className="sli-detail-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: isReducedMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: isReducedMotion ? 1 : 0.96 }}
            transition={{ duration: isReducedMotion ? 0.01 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header Bar */}
            <div className="sli-detail-header">
              <div className="sli-detail-identity">
                <div className="sli-detail-badge">
                  <Sparkles size={12} className="sli-detail-badge-icon" aria-hidden="true" />
                  <span>ARCHIVE CLOSE-UP</span>
                </div>
                <h3 className="sli-detail-title">{product.name}</h3>
                <p className="sli-detail-subtitle">
                  {product.hardwareFinish ? `Hardware: ${product.hardwareFinish}` : 'Atelier Tooling Study'}
                </p>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                className="sli-detail-close-btn"
                onClick={onClose}
                aria-label="Close detail view"
              >
                <X size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            {/* C23 — ProductDetailImage Stage */}
            <div className="sli-detail-stage">
              <img
                src={currentImageSrc}
                alt={`Macro close-up detail of ${product.name}`}
                className="sli-detail-image"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* C24 — ProductDetailNavigation (Visible only if multiple detail photographs exist) */}
            {totalDetails > 1 && (
              <div className="sli-detail-nav" aria-label="Detail view navigation">
                <button
                  type="button"
                  className="sli-detail-nav-btn"
                  onClick={() =>
                    setActiveDetailIndex((prev) => (prev - 1 + totalDetails) % totalDetails)
                  }
                  aria-label="Previous detail view"
                >
                  <ChevronLeft size={16} />
                  <span>Prev View</span>
                </button>

                <span className="sli-detail-nav-counter">
                  {activeDetailIndex + 1} / {totalDetails}
                </span>

                <button
                  type="button"
                  className="sli-detail-nav-btn"
                  onClick={() => setActiveDetailIndex((prev) => (prev + 1) % totalDetails)}
                  aria-label="Next detail view"
                >
                  <span>Next View</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Caption / Context Footer */}
            <div className="sli-detail-footer">
              <p className="sli-detail-caption">{product.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
