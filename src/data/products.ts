/**
 * Supreme Leather Industries — Belt Collection Architecture (C19)
 * Centralized Product Data Configuration
 *
 * Inventory:
 * - 14 Primary Products (P01 – P14)
 * - 3 Supporting Detail Close-Up Photographs
 * Total: 17 files in /public/belts/
 */

export interface CollectionProduct {
  id: string;
  index: number;
  productNumber: string; // e.g. "01"
  name: string;
  description: string;
  image: string;
  detailImages?: string[];
  visualCategory: string;
  hardwareFinish?: string;
}

export interface DetailPhotograph {
  asset: string;
  associatedProductId: string;
  description: string;
}

/**
 * Supporting Detail Photographs (3 files)
 * Verified against primary product features
 */
export const SUPPORTING_DETAIL_PHOTOS: DetailPhotograph[] = [
  {
    asset: '/belts/WhatsApp Image 2026-10-31 at 10.08.44 (2).jpeg',
    associatedProductId: 'copper-filigree',
    description: 'Close-up of sculpted antique buckle and embossed floral leather tooling',
  },
  {
    asset: '/belts/WhatsApp Image 2026-10-31 at 10.08.46.jpeg',
    associatedProductId: 'turquoise-bloom',
    description: 'Macro detail of turquoise-inlaid floral relief and buckle connection',
  },
  {
    asset: '/belts/WhatsApp Image 2026-10-31 at 10.08.47 (2).jpeg',
    associatedProductId: 'ruby-medallion',
    description: 'Macro view of the central illustrated medallion buckle and border stitching',
  },
];

/**
 * Primary Belt Collection Products (14 unique pieces)
 */
export const COLLECTION_PRODUCTS: CollectionProduct[] = [
  {
    id: 'ember-scroll',
    index: 1,
    productNumber: '01',
    name: 'Ember Scroll',
    description:
      'A richly detailed scrollwork design with a distinctive antique-finish buckle.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.41 (1).jpeg',
    visualCategory: 'reddish-brown-scrollwork',
    hardwareFinish: 'Antique Bronze',
    detailImages: [],
  },
  {
    id: 'turquoise-relic',
    index: 2,
    productNumber: '02',
    name: 'Turquoise Relic',
    description:
      'Brown straps accented with turquoise inlays and prominent medallion detailing.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.41.jpeg',
    visualCategory: 'turquoise-inlay',
    hardwareFinish: 'Patinated Brass',
    detailImages: [],
  },
  {
    id: 'verdant-heritage',
    index: 3,
    productNumber: '03',
    name: 'Verdant Heritage',
    description:
      'Dark leather with green accents and an illustrated central motif.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.42 (1).jpeg',
    visualCategory: 'green-accent',
    hardwareFinish: 'Darkened Bronze',
    detailImages: [],
  },
  {
    id: 'azure-crest',
    index: 4,
    productNumber: '04',
    name: 'Azure Crest',
    description:
      'Blue and reddish floral detailing anchored by a prominent circular buckle.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.42.jpeg',
    visualCategory: 'blue-floral',
    hardwareFinish: 'Circular Antique Silver',
    detailImages: [],
  },
  {
    id: 'burgundy-sovereign',
    index: 5,
    productNumber: '05',
    name: 'Burgundy Sovereign',
    description:
      'Deep burgundy floral design paired with ornate, antique-patinated hardware.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.43 (1).jpeg',
    visualCategory: 'burgundy-floral',
    hardwareFinish: 'Ornate Antique Gold',
    detailImages: [],
  },
  {
    id: 'cobalt-vine',
    index: 6,
    productNumber: '06',
    name: 'Cobalt Vine',
    description:
      'Bright blue floral scrollwork highlighted with warm gold-toned hardware.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.43.jpeg',
    visualCategory: 'cobalt-scrollwork',
    hardwareFinish: 'Polished Brass',
    detailImages: [],
  },
  {
    id: 'antique-seal',
    index: 7,
    productNumber: '07',
    name: 'Antique Seal',
    description:
      'Dark brown embossed pattern framed by a rectangular medallion-style buckle.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.44 (1).jpeg',
    visualCategory: 'dark-brown-geometric',
    hardwareFinish: 'Antique Silver Medallion',
    detailImages: [],
  },
  {
    id: 'copper-filigree',
    index: 8,
    productNumber: '08',
    name: 'Copper Filigree',
    description:
      'Warm copper-red embossed floral tooling accompanied by an intricately sculpted buckle.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.44.jpeg',
    visualCategory: 'copper-red-floral',
    hardwareFinish: 'Sculpted Antique Silver',
    detailImages: ['/belts/WhatsApp Image 2026-10-31 at 10.08.44 (2).jpeg'],
  },
  {
    id: 'saffron-bloom',
    index: 9,
    productNumber: '09',
    name: 'Saffron Bloom',
    description:
      'Brown and orange floral detailing complemented by turquoise and gold accents.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.45 (1).jpeg',
    visualCategory: 'saffron-turquoise-floral',
    hardwareFinish: 'Antique Gold',
    detailImages: [],
  },
  {
    id: 'crimson-scroll',
    index: 10,
    productNumber: '10',
    name: 'Crimson Scroll',
    description:
      'Deep red embossed floral scrollwork executed with continuous symmetry.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.45 (2).jpeg',
    visualCategory: 'crimson-scrollwork',
    hardwareFinish: 'Antique Silver Floral',
    detailImages: [],
  },
  {
    id: 'turquoise-bloom',
    index: 11,
    productNumber: '11',
    name: 'Turquoise Bloom',
    description:
      'Bright turquoise floral pattern etched with dark contrasting borders.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.45.jpeg',
    visualCategory: 'turquoise-floral',
    hardwareFinish: 'Silver & Turquoise Accent',
    detailImages: ['/belts/WhatsApp Image 2026-10-31 at 10.08.46.jpeg'],
  },
  {
    id: 'amber-medallion',
    index: 12,
    productNumber: '12',
    name: 'Amber Medallion',
    description:
      'Orange-brown embossed tooling centered on a prominent oval medallion buckle.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.46 (1).jpeg',
    visualCategory: 'amber-medallion',
    hardwareFinish: 'Oval Antique Medallion',
    detailImages: [],
  },
  {
    id: 'ruby-medallion',
    index: 13,
    productNumber: '13',
    name: 'Ruby Medallion',
    description:
      'Red embossed floral design with a silver-toned central medallion buckle.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.47 (1).jpeg',
    visualCategory: 'ruby-silver-medallion',
    hardwareFinish: 'Chiseled Silver Medallion',
    detailImages: ['/belts/WhatsApp Image 2026-10-31 at 10.08.47 (2).jpeg'],
  },
  {
    id: 'burnished-ember',
    index: 14,
    productNumber: '14',
    name: 'Burnished Ember',
    description:
      'Orange-brown patterned belt finished with a contrasting dual-tone buckle arrangement.',
    image: '/belts/WhatsApp Image 2026-10-31 at 10.08.47.jpeg',
    visualCategory: 'orange-brown-pattern',
    hardwareFinish: 'Dual-Tone Antique',
    detailImages: [],
  },
];

export const TOTAL_PRODUCTS_COUNT = COLLECTION_PRODUCTS.length;
