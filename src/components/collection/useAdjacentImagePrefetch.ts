import { useEffect, useRef } from 'react';
import { CollectionProduct } from '../../data/products';

/**
 * C25 — ProductImagePrefetcher
 *
 * Prepares upcoming product images before navigation.
 * Strategy:
 * 1. Prioritizes next product (currentIndex + 1)
 * 2. Follows with previous product (currentIndex - 1)
 * 3. Preloads verified detail images for the active belt if present
 * 4. Memory-safe: Tracks preloaded URLs in a persistent ref Set to avoid redundant network requests
 * 5. Non-blocking: Executes asynchronously after layout render
 */
export function useAdjacentImagePrefetch(
  currentIndex: number,
  totalCount: number,
  products: CollectionProduct[]
) {
  const prefetchedUrls = useRef<Set<string>>(new Set());

  useEffect(() => {
    const urlsToPrefetch: string[] = [];

    // Next product primary image
    if (currentIndex + 1 < totalCount && products[currentIndex + 1]) {
      urlsToPrefetch.push(products[currentIndex + 1].image);
    }

    // Previous product primary image
    if (currentIndex - 1 >= 0 && products[currentIndex - 1]) {
      urlsToPrefetch.push(products[currentIndex - 1].image);
    }

    // Active product detail images
    const currentProduct = products[currentIndex];
    if (currentProduct && currentProduct.detailImages) {
      currentProduct.detailImages.forEach((url) => urlsToPrefetch.push(url));
    }

    // Next product detail images (if available)
    if (currentIndex + 1 < totalCount && products[currentIndex + 1]?.detailImages) {
      products[currentIndex + 1].detailImages?.forEach((url) => urlsToPrefetch.push(url));
    }

    urlsToPrefetch.forEach((url) => {
      if (url && !prefetchedUrls.current.has(url)) {
        prefetchedUrls.current.add(url);
        const img = new Image();
        img.src = url;
      }
    });
  }, [currentIndex, totalCount, products]);
}
