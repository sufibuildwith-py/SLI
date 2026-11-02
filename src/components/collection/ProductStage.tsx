import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { CollectionProduct } from '../../data/products';
import { ProductInformation } from './ProductInformation';

interface ProductStageProps {
  product: CollectionProduct;
  totalCount: number;
  currentIndex: number;
  direction: 1 | -1;
  onPrevious: () => void;
  onNext: () => void;
  onTransitionComplete?: () => void;
  onOpenDetail?: () => void;
  onInquire?: (product: CollectionProduct) => void;
  isReducedMotion?: boolean;
}

/**
 * C06 — ProductStage
 * Encapsulates C07 (ProductImageContainer), C08 (FeaturedProductImage),
 * C21 (ProductDetailTrigger), and coordinates C09 (ProductInformation).
 *
 * Implements:
 * - Direction-aware entrance and exit motion (Next: moves left/enters from right)
 * - Zero layout shifts via stable image stage frame
 * - Horizontal touch swipe gestures without impeding vertical scrolling
 * - C21 ProductDetailTrigger when verified detail photographs exist
 * - Accessible aria-live feedback
 */
export const ProductStage: React.FC<ProductStageProps> = ({
  product,
  totalCount,
  currentIndex,
  direction,
  onPrevious,
  onNext,
  onTransitionComplete,
  onOpenDetail,
  onInquire,
  isReducedMotion = false,
}) => {
  // Touch & pointer swipe gesture tracking (horizontal only, non-blocking for vertical scroll)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const startGesture = (clientX: number, clientY: number) => {
    touchStartX.current = clientX;
    touchStartY.current = clientY;
  };

  const endGesture = (clientX: number, clientY: number) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = clientX - touchStartX.current;
    const deltaY = clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    // Minimum 40px swipe with horizontal priority so vertical page scrolling is never hijacked
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // Swipe left -> advance to next belt
        onNext();
      } else {
        // Swipe right -> return to previous belt
        onPrevious();
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      startGesture(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length) {
      endGesture(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') {
      startGesture(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') {
      endGesture(e.clientX, e.clientY);
    }
  };

  const imageVariants = {
    enter: (dir: number) => ({
      x: isReducedMotion ? 0 : dir > 0 ? 36 : -36,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: isReducedMotion ? 0.01 : 0.32,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir: number) => ({
      x: isReducedMotion ? 0 : dir > 0 ? -36 : 36,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: isReducedMotion ? 0.01 : 0.22,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      className="sli-belt-stage"
      aria-label="Featured Belt Presentation"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* C07 — ProductImageContainer */}
      <div className="sli-belt-image-container">
        {/* Ambient showroom plinth ground shadow */}
        <div className="sli-belt-image-plinth" aria-hidden="true" />

        {/* C08 — FeaturedProductImage with directional motion */}
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={product.id}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="sli-belt-image-frame"
            onAnimationComplete={(definition) => {
              if (definition === 'center' || typeof definition !== 'string') {
                onTransitionComplete?.();
              }
            }}
          >
            <img
              src={product.image}
              alt={`${product.name} — Handcrafted leather belt with ${product.hardwareFinish || 'custom hardware'}`}
              className="sli-belt-featured-image"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* C21 — ProductDetailTrigger (Appears ONLY when verified detail images exist) */}
        {product.detailImages && product.detailImages.length > 0 && (
          <button
            type="button"
            className="sli-belt-detail-trigger"
            onClick={onOpenDetail}
            aria-label={`View close-up detail photography for ${product.name}`}
          >
            <Search size={13} strokeWidth={2} aria-hidden="true" />
            <span>View Details</span>
          </button>
        )}
      </div>

      {/* C09 — ProductInformation Area */}
      <ProductInformation
        product={product}
        totalCount={totalCount}
        currentIndex={currentIndex}
        direction={direction}
        onPrevious={onPrevious}
        onNext={onNext}
        onInquire={onInquire}
        isReducedMotion={isReducedMotion}
      />
    </section>
  );
};
