import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../Header';
import { MobileMenu } from '../MobileMenu';
import { Modals } from '../Modals';
import { ModalType } from '../../types';
import { COLLECTION_PRODUCTS, TOTAL_PRODUCTS_COUNT, CollectionProduct } from '../../data/products';
import { CollectionBackground } from './CollectionBackground';
import { CollectionHeader } from './CollectionHeader';
import { ProductStage } from './ProductStage';
import { CollectionFooter } from './CollectionFooter';
import { ProductDetailViewer } from './ProductDetailViewer';
import { useAdjacentImagePrefetch } from './useAdjacentImagePrefetch';
import { GlobalEnquiryRouter } from '../contact';

interface CollectionPageProps {
  onNavigateHome?: () => void;
  isReducedMotion?: boolean;
}

/**
 * C01 — CollectionPage
 * Primary Page Composition for Collection — Page 02
 *
 * Phase 2 Implementation:
 * - Single authoritative slider state (currentIndex, 0-indexed)
 * - Direction-aware transitions (1: Next, -1: Previous)
 * - Bounded navigation (disabled at endpoints, no infinite wrap, no autoplay)
 * - Keyboard navigation (ArrowLeft, ArrowRight) with input guard
 * - Full synchronization between image, counter, copy, and progress bar
 */
export const CollectionPage: React.FC<CollectionPageProps> = ({
  isReducedMotion: propReducedMotion,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(Boolean(propReducedMotion));
  const [isDetailViewerOpen, setIsDetailViewerOpen] = useState(false);
  const [enquiryMessage, setEnquiryMessage] = useState<string>('');

  // Scroll to top on collection page entry
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof propReducedMotion === 'boolean') {
      setIsReducedMotion(propReducedMotion);
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [propReducedMotion]);

  const totalProducts = TOTAL_PRODUCTS_COUNT;

  // Single authoritative source of truth: active product derived from index
  const activeProduct = COLLECTION_PRODUCTS[currentIndex];

  // C25 — Adjacent product image prefetching
  useAdjacentImagePrefetch(currentIndex, totalProducts, COLLECTION_PRODUCTS);

  // Transition lock synchronized with animation lifecycle
  const isTransitioningRef = React.useRef(false);
  const safetyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const releaseLock = useCallback(() => {
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
    isTransitioningRef.current = false;
    if (typeof window !== 'undefined') {
      (window as any).__isTransitioning = false;
    }
  }, []);

  // Cleanup safety timeout on unmount
  useEffect(() => {
    return () => {
      if (safetyTimeoutRef.current) {
        clearTimeout(safetyTimeoutRef.current);
      }
    };
  }, []);

  // Stable reference to current index to prevent stale closures and unnecessary callback churn
  const currentIndexRef = React.useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  const goToPrevious = useCallback(() => {
    if (isTransitioningRef.current) {
      return;
    }
    if (currentIndexRef.current <= 0) {
      return;
    }

    if (!isReducedMotion) {
      isTransitioningRef.current = true;
      if (typeof window !== 'undefined') {
        (window as any).__isTransitioning = true;
      }
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = setTimeout(releaseLock, 360);
    }
    setDirection(-1);
    setCurrentIndex(currentIndexRef.current - 1);
  }, [isReducedMotion, releaseLock]);

  const goToNext = useCallback(() => {
    if (isTransitioningRef.current) {
      return;
    }
    if (currentIndexRef.current >= totalProducts - 1) {
      return;
    }

    if (!isReducedMotion) {
      isTransitioningRef.current = true;
      if (typeof window !== 'undefined') {
        (window as any).__isTransitioning = true;
      }
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = setTimeout(releaseLock, 360);
    }
    setDirection(1);
    setCurrentIndex(currentIndexRef.current + 1);
  }, [totalProducts, isReducedMotion, releaseLock]);

  // C26 & C27 — Dynamic direct product inquiry handler routed to WhatsApp
  const handleInquire = useCallback((product: CollectionProduct) => {
    GlobalEnquiryRouter.openProduct(product.name, product.index);
  }, []);

  // Keyboard navigation (ArrowLeft & ArrowRight with input focus guards)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  return (
    <div className="sli-collection-page-root" id="collection-page-top">
      {/* C17 — Shared Photographic Background Asset */}
      <CollectionBackground />

      {/* Reusable Site Header with Brand Navigation */}
      <Header
        onOpenCatalogue={() => setActiveModal('catalogue')}
        onOpenEnquire={() => GlobalEnquiryRouter.openGeneral()}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Editorial Content Composition */}
      <main className="sli-belt-collection-main">
        <div className="sli-belt-collection-shell">
          {/* C02 — Collection Introduction Header */}
          <CollectionHeader />

          {/* C06 — Featured Product Stage */}
          <ProductStage
            product={activeProduct}
            totalCount={totalProducts}
            currentIndex={currentIndex}
            direction={direction}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onTransitionComplete={releaseLock}
            onOpenDetail={() => setIsDetailViewerOpen(true)}
            onInquire={handleInquire}
            isReducedMotion={isReducedMotion}
          />
        </div>
      </main>

      {/* C18 — Collection Editorial Footer */}
      <CollectionFooter />

      {/* C22 — ProductDetailViewer (Archive Close-Up Modal) */}
      <ProductDetailViewer
        isOpen={isDetailViewerOpen}
        onClose={() => setIsDetailViewerOpen(false)}
        product={activeProduct}
        isReducedMotion={isReducedMotion}
      />

      {/* Reusable Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenCatalogue={() => setActiveModal('catalogue')}
        onOpenEnquire={() => GlobalEnquiryRouter.openGeneral()}
      />

      {/* Reusable Modals for Catalogue & Bespoke Enquiry (Prefilled with selected product) */}
      <Modals
        activeModal={activeModal}
        onClose={() => {
          setActiveModal(null);
          setEnquiryMessage('');
        }}
        initialMessage={enquiryMessage}
      />
    </div>
  );
};
