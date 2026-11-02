/**
 * C38 — GlobalEnquiryRouter
 * Centralized navigation router that directs all website enquiry entry points
 * to the official Supreme Leather Industries WhatsApp channel.
 */
import { buildWhatsAppUrl, WhatsAppEnquiryOptions } from './WhatsAppEnquiryBuilder';

export const GlobalEnquiryRouter = {
  /**
   * Opens the WhatsApp enquiry link in a new tab safely with noopener,noreferrer
   */
  open(options: WhatsAppEnquiryOptions = {}, target: '_blank' | '_self' = '_blank'): void {
    const url = buildWhatsAppUrl(options);
    if (typeof window !== 'undefined') {
      window.open(url, target, 'noopener,noreferrer');
    }
  },

  /**
   * General collection inquiry
   */
  openGeneral(): void {
    this.open({ type: 'general' });
  },

  /**
   * Specific belt product inquiry
   */
  openProduct(productName: string, productNumber?: number | string): void {
    this.open({
      type: 'product',
      productName,
      productNumber,
    });
  },

  /**
   * Bespoke atelier inquiry
   */
  openBespoke(visitorName?: string, visitorEmail?: string, customMessage?: string): void {
    this.open({
      type: 'bespoke',
      visitorName,
      visitorEmail,
      customMessage,
    });
  },

  /**
   * Direct URL retrieval
   */
  getUrl(options: WhatsAppEnquiryOptions = {}): string {
    return buildWhatsAppUrl(options);
  },
};
