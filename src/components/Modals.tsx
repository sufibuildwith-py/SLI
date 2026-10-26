import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { ModalType } from '../types';

interface ModalsProps {
  activeModal: ModalType;
  onClose: () => void;
}

export const Modals: React.FC<ModalsProps> = ({ activeModal, onClose }) => {
  const [enquirySent, setEnquirySent] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySent(true);
    setTimeout(() => {
      setEnquirySent(false);
      onClose();
      setFormState({ name: '', email: '', message: '' });
    }, 2200);
  };

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          className="sli-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="sli-modal-container"
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="modal-close-trigger"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <X size={18} strokeWidth={2} />
            </button>

            {activeModal === 'catalogue' && (
              <div className="modal-inner">
                <div className="modal-badge">
                  <Sparkles size={13} className="modal-badge-icon" />
                  <span>2026 ATELIER COMPENDIUM</span>
                </div>
                <h3 className="modal-title">Supreme Leather Catalogue</h3>
                <p className="modal-desc">
                  Explore our comprehensive archive of vegetable-tanned full-grain hides, hand-embossed motifs, and custom antique-finish solid brass buckle hardware.
                </p>
                <div className="catalogue-preview-card">
                  <div className="catalogue-thumb-info">
                    <span className="catalogue-folio">SLI / VOL. XXIV</span>
                    <span className="catalogue-name">Artisanal Craftsmanship & Heritage Goods</span>
                    <span className="catalogue-meta">PDF Format • High Resolution • 48 Pages</span>
                  </div>
                </div>
                <div className="modal-actions">
                  <a
                    href="#download"
                    className="sli-cta-button full-width"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Supreme Leather Industries Catalogue (Vol. XXIV) download started.');
                      onClose();
                    }}
                  >
                    <Download size={16} />
                    <span>Download Compendium (PDF)</span>
                  </a>
                </div>
              </div>
            )}

            {activeModal === 'enquire' && (
              <div className="modal-inner">
                <div className="modal-badge">
                  <span className="modal-dot" />
                  <span>BESPOKE INQUIRY</span>
                </div>
                <h3 className="modal-title">Connect with our Atelier</h3>
                <p className="modal-desc">
                  Whether for private commissions, architectural leather installations, or curated commercial collections, our master craftsmen are at your service.
                </p>

                {enquirySent ? (
                  <div className="enquiry-success-box">
                    <CheckCircle2 size={36} className="success-icon" />
                    <h4>Inquiry Received</h4>
                    <p>Our head craft liaison will contact you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="enquiry-form">
                    <div className="form-group">
                      <label htmlFor="sli-name">Full Name</label>
                      <input
                        id="sli-name"
                        type="text"
                        required
                        placeholder="e.g. Lord Sterling Vance"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sli-email">Email Address</label>
                      <input
                        id="sli-email"
                        type="email"
                        required
                        placeholder="client@atelier.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sli-msg">Project Scope or Piece of Interest</label>
                      <textarea
                        id="sli-msg"
                        rows={3}
                        required
                        placeholder="Detail your requirements or inquiry..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      />
                    </div>
                    <button type="submit" className="sli-cta-button full-width">
                      <Send size={15} />
                      <span>Transmit Request</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeModal === 'collections' && (
              <div className="modal-inner">
                <div className="modal-badge">
                  <span className="modal-dot" />
                  <span>PERMANENT COLLECTION</span>
                </div>
                <h3 className="modal-title">The Heritage Collection</h3>
                <p className="modal-desc">
                  A study in textural balance: hand-tooled burgundy hides, patinated bridle leathers, and precision-cast antique hardware crafted for lifetimes of character.
                </p>
                <div className="collection-highlights">
                  <div className="collection-item">
                    <span className="item-title">Embossed Burgundy Belt</span>
                    <span className="item-desc">Double-dyed saddle leather with hand-carved floral tooling & antique buckle.</span>
                  </div>
                  <div className="collection-item">
                    <span className="item-title">Atelier Travel Holdall</span>
                    <span className="item-desc">Hand-stitched full-grain bovine leather with burnished edges.</span>
                  </div>
                  <div className="collection-item">
                    <span className="item-title">Patinated Folio & Desk Suite</span>
                    <span className="item-desc">Architectural leather goods for discerning workspaces.</span>
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="sli-cta-button full-width"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <span>Return to Atelier Hero</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
