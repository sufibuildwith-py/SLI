import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CollectionsIntro } from './CollectionsIntro';

gsap.registerPlugin(ScrollTrigger);

/**
 * Normalized reference landmarks on the original 3840 x 2160 source image (collection.png)
 * Aspect Ratio: 16:9 (1.7778)
 *
 * These coordinates provide the mathematically invariant foundation for Phase 2 & 3
 * product overlays (belt placement, buckle positioning, left/right info zones).
 */
export const COLLECTION_STAGE_METRICS = {
  naturalWidth: 3840,
  naturalHeight: 2160,
  aspectRatio: 16 / 9,

  // Model physical bounds in normalized percentages [0, 100]
  modelBounds: {
    leftPercent: 35.15, // True silhouette start X: 1350px
    rightPercent: 74.48, // X: 2860px
    topPercent: 8.15, // Y: 176px
    bottomPercent: 96.53, // Y: 2085px
    centerXPct: 49.48, // Visual center of model torso & waist
  },

  // Model waist / belt overlay target anchor coordinates for Phase 3 integration
  waistAnchor: {
    // Exact center point of the belt buckle & waistband
    xPercent: 49.48, // X: 1900px / 3840px
    yPercent: 40.51, // Y: 875px / 2160px
    // Center of metallic buckle
    buckleXPercent: 48.96, // X: 1880px / 3840px
    buckleYPercent: 39.81, // Y: 860px / 2160px
    // Normalized belt strap width span
    strapWidthPercent: 8.33, // ~320px / 3840px
  },

  // Reserved editorial negative space zones
  zones: {
    leftIntroMaxRightPct: 32.0, // Left campaign introduction area
    rightFolioMinLeftPct: 78.0, // Right collection folio area
  },
} as const;

interface CollectionsSectionProps {
  isReducedMotion?: boolean;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  isReducedMotion = false,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const artboardRef = useRef<HTMLDivElement>(null);

  // Subtle coordinated entrance sequence for Collections Phase 2 editorial layer
  useEffect(() => {
    if (!stageRef.current || !sectionRef.current) return;

    if (isReducedMotion) {
      gsap.set(stageRef.current, { opacity: 1 });
      gsap.set(
        [
          '.sli-col-eyebrow',
          '.sli-col-headline-line',
          '.sli-col-paragraph',
          '.sli-col-signature',
          '.sli-col-folio',
        ],
        { opacity: 1, y: 0, transform: 'none' }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Stage ambient settle
      tl.fromTo(
        stageRef.current,
        { opacity: 0.9 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        0
      );

      // 1. Eyebrow fades upward
      tl.fromTo(
        '.sli-col-eyebrow',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
        0.12
      );

      // 2. Headline reveals gently, line by line
      tl.fromTo(
        '.sli-col-headline-line',
        { y: '108%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' },
        0.24
      );

      // 3. Supporting paragraph settles into place
      tl.fromTo(
        '.sli-col-paragraph',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' },
        0.52
      );

      // 4. Heritage signature appears
      tl.fromTo(
        '.sli-col-signature',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
        0.68
      );

      // 5. Right-side collection identifier fades in
      tl.fromTo(
        '.sli-col-folio',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' },
        0.78
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="sli-collections-section"
      aria-label="Collections Lookbook"
    >
      {/* Ambient editorial grain matching About Us section */}
      <div className="sli-collections-ambient-grain" aria-hidden="true" />

      {/* Full-bleed stage with seamless warm ivory backdrop extension */}
      <div ref={stageRef} className="sli-collections-stage">
        {/* 
          The Image Artboard:
          Maintains strict 16:9 aspect ratio across all viewports.
          Serves as the shared reference frame for base image and future Phase 3 belt product overlays.
        */}
        <div ref={artboardRef} className="sli-collections-artboard">
          {/* Base Photograph Layer */}
          <img
            src="/collection.png"
            alt="Supreme Leather Industries Luxury Collections Campaign"
            className="sli-collections-image"
            loading="eager"
            decoding="async"
            draggable={false}
          />

          {/* 
            Phase 3 Overlay Anchor Layer:
            Shares exact 1:1 coordinate space with the 3840x2160 photograph.
            Phase 3 will mount transparent belt overlays directly inside this container
            using normalized percentage coordinates from COLLECTION_STAGE_METRICS.waistAnchor.
          */}
          <div
            className="sli-collections-overlay-layer"
            aria-hidden="true"
          >
            {/* Reserved for Phase 3 belt overlay */}
          </div>
        </div>

        {/* Phase 2: Editorial Introduction & Typography Layer */}
        <CollectionsIntro isReducedMotion={isReducedMotion} />
      </div>
    </section>
  );
};
