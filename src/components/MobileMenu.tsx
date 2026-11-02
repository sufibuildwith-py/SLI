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

  const isCollectionPage =
    typeof window !== 'undefined' &&
    (window.location.pathname.toLowerCase().startsWith('/collection') ||
      window.location.pathname.toLowerCase() === '/collection-02' ||
      window.location.pathname.toLowerCase() === '/belts');

  const navLinks = [
    { label: 'About', href: isCollectionPage ? '/#about' : '#about' },
    { label: 'Craftsmanship', href: isCollectionPage ? '/#craftsmanship' : '#craftsmanship' },
    { label: 'Collections', href: '/collection' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { label: string; href: string }) => {
    onClose();

    if (link.label === 'Collections' || link.href === '/collection') {
      e.preventDefault();
      if (!isCollectionPage) {
        window.history.pushState({}, '', '/collection');
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (link.label === 'Contact' || link.href === '#contact') {
      e.preventDefault();
      onOpenEnquire();
      return;
    }

    if (link.href.startsWith('/#')) {
      e.preventDefault();
      window.history.pushState({}, '', link.href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      const targetId = link.href.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
              <a
                href="/"
                className="mobile-brand"
                style={{ textDecoration: 'none' }}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  if (window.location.pathname !== '/' || window.location.search || window.location.hash) {
                    window.history.pushState({}, '', '/');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span className="mobile-brand-title">SUPREME LEATHER</span>
                <span className="mobile-brand-subtitle">ATELIER ARCHIVE</span>
              </a>
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
                      onClick={(e) => handleNavClick(e, item)}
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
              <p className="mobile-footer-tag">ESTABLISHED 1995</p>
              <p className="mobile-footer-text">Finest hand-selected hides & bespoke metalwork.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
