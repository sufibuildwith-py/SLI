import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Configure ScrollTrigger to ignore mobile address-bar resize jitters
    ScrollTrigger.config({ ignoreMobileResize: true });

    // On touch-only mobile devices, use 100% native momentum scrolling
    const isMobileTouch =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (isMobileTouch) {
      // Native touch scrolling provides 120Hz ProMotion / GPU-composited scrolling
      // without touch event interception or scroll-blocking
      const handleAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a[href^="#"]');
        if (target) {
          const href = target.getAttribute('href');
          if (href && href.length > 1) {
            const el = document.querySelector(href);
            if (el) {
              e.preventDefault();
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);
      return () => {
        document.removeEventListener('click', handleAnchorClick);
      };
    }

    // Desktop: Initialize Lenis for smooth wheel scroll architecture
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis RAF from GSAP ticker for unified frame timing
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    // Handle anchor links (e.g. #about) smoothly with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute('href');
        if (href && href.length > 1) {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
