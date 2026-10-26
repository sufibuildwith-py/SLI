import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Menu } from 'lucide-react';

interface HeaderProps {
  onOpenCatalogue: () => void;
  onOpenEnquire: () => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCatalogue,
  onOpenEnquire,
  onToggleMobileMenu,
  isMobileMenuOpen,
}) => {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Craftsmanship', href: '#craftsmanship' },
    { label: 'Collections', href: '#collections' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sli-header" role="banner">
      <div className="sli-header-inner">
        {/* Left: Refined Monogram + Brand Name */}
        <div className="sli-brand-container header-anim-item">
          <a href="/" className="sli-brand-link" aria-label="Supreme Leather Industries - Home">
            <div className="sli-monogram" aria-hidden="true">
              <span className="sli-monogram-text">SLI</span>
            </div>
            <div className="sli-brand-titles">
              <span className="sli-brand-title">SUPREME LEATHER</span>
              <span className="sli-brand-subtitle">INDUSTRIES • ATELIER</span>
            </div>
          </a>
        </div>

        {/* Centre: Desktop Navigation Links (scaled at 22s) */}
        <nav className="sli-desktop-nav header-anim-item" aria-label="Main Navigation">
          <ul className="sli-nav-list">
            {navLinks.map((link) => (
              <li key={link.label} className="sli-nav-item">
                <a href={link.href} className="sli-nav-link">
                  <span className="sli-nav-label">{link.label}</span>
                  <span className="sli-nav-dot" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Actions (Catalogue Pill + Enquire Pill) */}
        <div className="sli-header-actions header-anim-item">
          {/* Catalogue Pill */}
          <motion.button
            type="button"
            className="sli-pill-btn sli-pill-translucent"
            onClick={onOpenCatalogue}
            whileHover={{ scale: 1.025, backgroundColor: 'rgba(89, 70, 59, 0.28)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            aria-label="View atelier catalogue"
          >
            <BookOpen className="sli-pill-icon" strokeWidth={1.75} aria-hidden="true" />
            <span>Our Catalogue</span>
          </motion.button>

          {/* Enquire Now Pill */}
          <motion.button
            type="button"
            className="sli-pill-btn sli-pill-dark"
            onClick={onOpenEnquire}
            whileHover={{ scale: 1.025, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            aria-label="Enquire about bespoke craftsmanship"
          >
            <span>Enquire Now</span>
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="sli-mobile-toggle-btn"
            onClick={onToggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <Menu className="sli-menu-icon" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
};
