import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TOTAL_PRODUCTS_COUNT } from '../../data/products';

interface ProductNavigationProps {
  currentIndex: number; // 0-indexed (0 to totalCount - 1)
  totalCount?: number;
  onPrevious: () => void;
  onNext: () => void;
  isInteractive?: boolean;
}

/**
 * C13 — ProductNavigation
 * Encapsulates C14 (PreviousProductButton), C15 (NextProductButton),
 * and C16 (CollectionProgress).
 *
 * Implements:
 * - Consistent zero-based index progress calculation: ((currentIndex + 1) / totalCount) * 100
 * - Bounded navigation with disabled endpoints (no infinite wrap, no autoplay)
 * - Accessible aria-valuenow and focus indicators
 */
export const ProductNavigation: React.FC<ProductNavigationProps> = ({
  currentIndex,
  totalCount = TOTAL_PRODUCTS_COUNT,
  onPrevious,
  onNext,
  isInteractive = true,
}) => {
  const safeTotal = totalCount > 0 ? totalCount : 1;
  const safeIndex = Math.max(0, Math.min(currentIndex, safeTotal - 1));

  // Consistent zero-based progress calculation: ((currentIndex + 1) / totalCount) * 100
  const progressPercent = Math.min(100, Math.max(0, ((safeIndex + 1) / safeTotal) * 100));

  const currentFormatted = String(safeIndex + 1).padStart(2, '0');
  const totalFormatted = String(safeTotal).padStart(2, '0');

  const isPrevDisabled = !isInteractive || safeIndex <= 0;
  const isNextDisabled = !isInteractive || safeIndex >= safeTotal - 1;

  return (
    <div className="sli-belt-nav-foundation" aria-label="Collection Navigation">
      {/* C14 & C15 — Navigation Buttons Row */}
      <div className="sli-belt-nav-controls">
        {/* C14 — PreviousProductButton */}
        <button
          type="button"
          className="sli-belt-nav-btn sli-belt-nav-btn-prev"
          aria-label="Previous product"
          disabled={isPrevDisabled}
          onClick={onPrevious}
        >
          <ArrowLeft className="sli-belt-nav-icon" size={18} strokeWidth={1.8} aria-hidden="true" />
          <span className="sli-belt-nav-btn-label">Previous</span>
        </button>

        {/* C15 — NextProductButton */}
        <button
          type="button"
          className="sli-belt-nav-btn sli-belt-nav-btn-next"
          aria-label="Next product"
          disabled={isNextDisabled}
          onClick={onNext}
        >
          <span className="sli-belt-nav-btn-label">Next</span>
          <ArrowRight className="sli-belt-nav-icon" size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>

      {/* C16 — CollectionProgress Indicator */}
      <div
        className="sli-belt-progress-wrapper"
        aria-label={`Product ${safeIndex + 1} of ${safeTotal}`}
      >
        <span className="sli-belt-progress-number sli-belt-progress-current">{currentFormatted}</span>
        <div
          className="sli-belt-progress-track"
          role="progressbar"
          aria-valuenow={safeIndex + 1}
          aria-valuemin={1}
          aria-valuemax={safeTotal}
        >
          <div
            className="sli-belt-progress-fill"
            style={{ width: `${progressPercent.toFixed(2)}%` }}
          />
        </div>
        <span className="sli-belt-progress-number sli-belt-progress-total">{totalFormatted}</span>
      </div>
    </div>
  );
};
