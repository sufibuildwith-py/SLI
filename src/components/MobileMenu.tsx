import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ArrowUpRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCatalogue: () => void;
  onOpenEnquire: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenCatalogue,
  onOpenEnquire,
}) => {
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Craftsmanship', href: '#craftsmanship' },
    { label: 'Collections', href: '#collections' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="sli-mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="sli-mobile-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Header in panel */}
            <div className="mobile-panel-header">
              <div className="mobile-brand">
                <span className="mobile-brand-title">SUPREME LEATHER</span>
                <span className="mobile-brand-subtitle">ATELIER ARCHIVE</span>
              </div>
              <button
                type="button"
                className="mobile-close-btn"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Navigation items */}
            <nav className="mobile-nav">
              <ul className="mobile-nav-list">
                {navLinks.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * index, duration: 0.35 }}
                  >
                    <a
                      href={item.href}
                      className="mobile-nav-link"
                      onClick={onClose}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="mobile-arrow-icon" size={16} />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Mobile Actions */}
            <div className="mobile-actions">
              <button
                type="button"
                className="sli-pill-btn sli-pill-translucent mobile-pill"
                onClick={() => {
                  onClose();
                  onOpenCatalogue();
                }}
              >
                <BookOpen className="sli-pill-icon" strokeWidth={1.8} size={16} />
                <span>Our Catalogue</span>
              </button>

              <button
                type="button"
                className="sli-pill-btn sli-pill-dark mobile-pill"
                onClick={() => {
                  onClose();
                  onOpenEnquire();
                }}
              >
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Footer note */}
            <div className="mobile-panel-footer">
              <p className="mobile-footer-tag">ESTABLISHED 1988</p>
              <p className="mobile-footer-text">Finest hand-selected hides & bespoke metalwork.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
