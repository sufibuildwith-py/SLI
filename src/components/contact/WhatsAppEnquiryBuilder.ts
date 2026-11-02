/**
 * C37 — WhatsAppEnquiryBuilder
 * Centralized source of truth for Supreme Leather Industries WhatsApp communications.
 *
 * Verified official parameters:
 * - Contact Person: Arham
 * - Phone Display: +91 9580594157
 * - Phone International: 919580594157
 * - Base Destination: https://wa.me/919580594157
 * - Verified Showroom Address: 44/232 Meston Road · Misri Bazar · Kanpur
 */

export interface WhatsAppEnquiryOptions {
  type?: 'general' | 'product' | 'bespoke';
  productName?: string;
  productNumber?: number | string;
  visitorName?: string;
  visitorEmail?: string;
  visitorPhone?: string;
  customMessage?: string;
}

export const WHATSAPP_CONFIG = {
  person: 'Arham',
  phoneDisplay: '+91 9580594157',
  phoneInternational: '919580594157',
  baseUrl: 'https://wa.me/919580594157',
  address: {
    line1: '44/232 Meston Road',
    line2: 'Misri Bazar, Kanpur',
    full: '44/232 Meston Road · Misri Bazar · Kanpur',
  },
  established: 1995,
  brandName: 'Supreme Leather Industries',
} as const;

/**
 * Builds clean, human-readable prefilled text for WhatsApp
 */
export function buildWhatsAppMessage(options: WhatsAppEnquiryOptions = {}): string {
  const {
    type = 'general',
    productName,
    productNumber,
    visitorName,
    visitorEmail,
    customMessage,
  } = options;

  if (type === 'product' && productName) {
    const formattedNum = productNumber ? String(productNumber).padStart(2, '0') : '';
    const numberSuffix = formattedNum ? ` (No. ${formattedNum})` : '';
    return `Hello Supreme Leather Industries, I would like to enquire about the ${productName} belt${numberSuffix} from your collection.`;
  }

  if (type === 'bespoke') {
    if (visitorName || customMessage) {
      const parts: string[] = [
        'Hello Supreme Leather Industries, I am interested in discussing a bespoke leather product.',
      ];
      if (visitorName && visitorName.trim()) {
        parts.push(`Name: ${visitorName.trim()}`);
      }
      if (visitorEmail && visitorEmail.trim()) {
        parts.push(`Email: ${visitorEmail.trim()}`);
      }
      if (customMessage && customMessage.trim()) {
        parts.push(`Scope / Message: ${customMessage.trim()}`);
      }
      return parts.join('\n\n');
    }
    return 'Hello Supreme Leather Industries, I am interested in discussing a bespoke leather product.';
  }

  // General enquiry default
  if (customMessage && customMessage.trim().length > 0) {
    return customMessage.trim();
  }

  return 'Hello Supreme Leather Industries, I would like to know more about your leather collection.';
}

/**
 * Generates the fully encoded wa.me URL
 */
export function buildWhatsAppUrl(options: WhatsAppEnquiryOptions = {}): string {
  const rawMessage = buildWhatsAppMessage(options);
  const encoded = encodeURIComponent(rawMessage);
  return `${WHATSAPP_CONFIG.baseUrl}?text=${encoded}`;
}
