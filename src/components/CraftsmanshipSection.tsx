import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface CraftCardData {
  id: string;
  stepNumber: string;
  category: string;
  title: string;
  description: string;
  image: string;
  badge: string;
}

export const CRAFTSMANSHIP_CARDS: CraftCardData[] = [
  {
    id: 'material',
    stepNumber: '01',
    category: 'THE MATERIAL',
    title: 'Where It Begins.',
    description: 'Every beautiful thing begins with something worth believing in.',
    image: '/images/craftsmanship/material.webp',
    badge: 'GRAIN SELECTION',
  },
  {
    id: 'cut',
    stepNumber: '02',
    category: 'THE CUT',
    title: 'Shaped With Intention.',
    description: 'Every line considered. Every edge given purpose.',
    image: '/images/craftsmanship/cut.webp',
    badge: 'HAND CUTTING',
  },
  {
    id: 'detail',
    stepNumber: '03',
    category: 'THE DETAIL',
    title: 'Beauty in the Smallest Things.',
    description: 'Because the details you almost miss are often the ones you remember.',
    image: '/images/craftsmanship/detail.webp',
    badge: 'EMBOSSED ARTISTRY',
  },
  {
    id: 'finish',
    stepNumber: '04',
    category: 'THE FINISH',
    title: 'The Final Touch.',
    description: 'A quiet devotion to the way something looks, feels, and lasts.',
    image: '/images/craftsmanship/finish.webp',
    badge: 'BURNISHED EDGES',
  },
  {
    id: 'legacy',
    stepNumber: '05',
    category: 'THE LEGACY',
    title: 'Made to Stay.',
    description: 'Since 1995, where leather meets legacy.',
    image: '/images/craftsmanship/legacy.webp',
    badge: 'EST. 1995 · KANPUR',
  },
];

interface CraftsmanshipSectionProps {
  isReducedMotion?: boolean;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({
  isReducedMotion = false,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<(HTMLElement | null)[]>([]);
  const stepDotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterCurrentRef = useRef<HTMLSpanElement>(null);

  // Scroll and mouse animation trackers
  const scrollProgressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const activeCardIndexRef = useRef(0);

  // Responsive card metrics and geometry cache (avoids window.innerWidth in render loop)
  const metricsRef = useRef({
    cardW: 360,
    cardH: 480,
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    isMobile: false,
    isTablet: false,
    gap: 48,
  });

  // Pure deterministic card transform pipeline: cardState = f(progress, cardIndex, metrics)
  const renderCards = useCallback((p: number) => {
    if (isReducedMotion) return;
    const cardCount = CRAFTSMANSHIP_CARDS.length;
    const clampedP = Math.max(0, Math.min(1, p));

    // Update progress bar width directly
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${(clampedP * 100).toFixed(1)}%`;
    }

    // Compute active step index for counter (01 to 05)
    const curIdx = Math.min(
      cardCount - 1,
      Math.max(0, Math.round(clampedP * (cardCount - 1)))
    );
    if (counterCurrentRef.current) {
      counterCurrentRef.current.textContent = `0${curIdx + 1}`;
    }

    const { cardW, w, isMobile, gap } = metricsRef.current;

    // Bounded progression: Initial dwell on Card 01 and final dwell on Card 05
    const startPad = 0.08;
    const endPad = 0.08;
    let rawP = (clampedP - startPad) / (1 - startPad - endPad);
    rawP = Math.max(0, Math.min(1, rawP)) * (cardCount - 1);

    // Magnetic step logic: gentle dwell at each card center
    const roundedIndex = Math.round(rawP);
    const diffFromRound = rawP - roundedIndex; // in [-0.5, 0.5]
    const easedDiff =
      Math.sign(diffFromRound) * Math.pow(Math.abs(diffFromRound) * 2, 3.4) / 2;
    const virtualActiveIndex = Math.max(0, Math.min(cardCount - 1, roundedIndex + easedDiff));

    // Update active card indicators (0 React re-renders)
    const currentActive = Math.round(virtualActiveIndex);
    if (currentActive !== activeCardIndexRef.current) {
      const prev = activeCardIndexRef.current;
      activeCardIndexRef.current = currentActive;

      const prevCard = cardsRefs.current[prev];
      if (prevCard) prevCard.classList.remove('is-active-card');
      const nextCard = cardsRefs.current[currentActive];
      if (nextCard) nextCard.classList.add('is-active-card');

      const prevDot = stepDotsRef.current[prev];
      if (prevDot) prevDot.classList.remove('is-active');
      const nextDot = stepDotsRef.current[currentActive];
      if (nextDot) nextDot.classList.add('is-active');
    }

    for (let i = 0; i < cardCount; i++) {
      const card = cardsRefs.current[i];
      if (!card) continue;

      // Non-wrapping offset relative to virtualActiveIndex
      const offset = i - virtualActiveIndex;
      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);

      // Hide cards that have traveled past the visible 3D horizon (> 2.5)
      if (absOffset > 2.5) {
        card.style.visibility = 'hidden';
        card.style.opacity = '0';
        continue;
      }

      card.style.visibility = 'visible';

      let x = 0;
      let z = 0;
      let rotY = 0;
      let opacity = 1;

      if (absOffset <= 1) {
        // Smoothstep from center card to first adjacent card
        const t = absOffset;
        const easedT = t * t * (3 - 2 * t);

        const targetX = cardW + gap;
        x = sign * easedT * targetX;

        // Depth curve: Z brings center forward (320px desktop / 180px mobile)
        const zCenter = isMobile ? 180 : 320;
        const zAdjacent = isMobile ? 40 : 80;
        z = zCenter - easedT * (zCenter - zAdjacent);

        // Concave cylindrical curvature: rotate inward toward viewer
        const maxRot = isMobile ? 24 : 34;
        rotY = -sign * (easedT * maxRot);

        opacity = 1 - easedT * 0.18;
      } else if (absOffset <= 2) {
        // Smoothstep from adjacent card to edge receding card
        const t = absOffset - 1;
        const easedT = t * t * (3 - 2 * t);

        const xStart = cardW + gap;
        const xEnd = w * 0.5 + cardW * 0.35;
        x = sign * (xStart + easedT * (xEnd - xStart));

        const zAdjacent = isMobile ? 40 : 80;
        const zReceded = isMobile ? -140 : -220;
        z = zAdjacent - easedT * (zAdjacent - zReceded);

        const maxRot1 = isMobile ? 24 : 34;
        const maxRot2 = isMobile ? 48 : 58;
        rotY = -sign * (maxRot1 + easedT * (maxRot2 - maxRot1));

        opacity = 0.82 - easedT * 0.72;
      } else {
        // Offscreen boundary transition
        const t = Math.min((absOffset - 2) / 0.5, 1);
        const xStart = w * 0.5 + cardW * 0.35;
        const xEnd = w * 0.5 + cardW * 0.85;
        x = sign * (xStart + t * (xEnd - xStart));
        z = (isMobile ? -140 : -220) - t * 100;
        rotY = -sign * (isMobile ? 54 : 64);
        opacity = Math.max(0, 0.1 - t * 0.1);
      }

      // Parallax mouse tilt applied exclusively to the active center card
      const centerFactor = Math.max(0, 1 - absOffset * 1.3);
      const maxTiltY = isMobile ? 0 : 10;
      const maxTiltX = isMobile ? 0 : 8;

      const activeTiltY = mouseRef.current.x * maxTiltY * centerFactor;
      const activeTiltX = -mouseRef.current.y * maxTiltX * centerFactor;

      const totalRotY = rotY + activeTiltY;
      const totalRotX = activeTiltX;
      const totalRotZ = -1.5;

      // Apply deterministic values unconditionally
      card.style.zIndex = Math.round(z + 600).toString();
      card.style.opacity = Math.max(0, Math.min(1, opacity)).toFixed(3);
      card.style.transform = `translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${totalRotY.toFixed(2)}deg) rotateX(${totalRotX.toFixed(2)}deg) rotateZ(${totalRotZ}deg)`;
    }
  }, [isReducedMotion]);

  // Calculate responsive card dimensions
  const updateMetrics = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    let cardW = 360;
    let cardH = 480;

    const isMobile = w < 640;
    const isTablet = w < 1024 && !isMobile;
    const gap = isMobile ? 20 : isTablet ? 36 : 48;

    if (isMobile) {
      cardW = Math.round(Math.min(w * 0.78, 280));
      cardH = Math.round(Math.min(h * 0.46, 380));
    } else if (isTablet) {
      cardW = Math.round(Math.min(w * 0.44, 320));
      cardH = Math.round(Math.min(h * 0.50, 440));
    } else {
      // Desktop: preserve luxury portrait proportions
      const heightFactor = Math.min(1.0, Math.max(0.72, h / 950));
      cardW = Math.round(380 * heightFactor);
      cardH = Math.round(500 * heightFactor);
    }

    const prevW = metricsRef.current.w;
    metricsRef.current = { cardW, cardH, w, isMobile, isTablet, gap };

    // Update anchor and card sizes directly in DOM without triggering component re-render
    if (anchorRef.current) {
      anchorRef.current.style.width = `${cardW}px`;
      anchorRef.current.style.height = `${cardH}px`;
    }
    cardsRefs.current.forEach((card) => {
      if (card) {
        card.style.width = `${cardW}px`;
        card.style.height = `${cardH}px`;
      }
    });

    // Re-render cards at current scroll position with updated metrics
    renderCards(scrollProgressRef.current);

    // Only refresh ScrollTrigger when horizontal width crosses meaningful threshold
    if (Math.abs(w - prevW) > 12) {
      ScrollTrigger.refresh();
    }
  }, [renderCards]);

  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [updateMetrics]);

  // Asynchronously decode card textures on mount to eliminate frame hitching
  useEffect(() => {
    CRAFTSMANSHIP_CARDS.forEach((card) => {
      const img = new Image();
      img.src = card.image;
      if ('decode' in img) {
        img.decode().catch(() => {});
      }
    });
    const bgImg = new Image();
    bgImg.src = '/images/craftsmanship/background_clean_plate.webp';
    if ('decode' in bgImg) {
      bgImg.decode().catch(() => {});
    }
  }, []);

  // Track mouse coordinates for interactive 3D parallax tilt (desktop fine pointers only)
  useEffect(() => {
    if (isReducedMotion) return;

    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchOnly) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { w } = metricsRef.current;
      const rx = (e.clientX - w / 2) / (w / 2);
      const ry = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouseRef.current.targetX = Math.max(-1, Math.min(1, rx));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, ry));
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isReducedMotion]);

  // Main GSAP ScrollTrigger and 3D cylinder lifecycle (Created ONCE on mount)
  useEffect(() => {
    if (isReducedMotion || !sectionRef.current) return;

    // Pin section and synchronize vertical scroll with horizontal 3D travel.
    // scrub: true ensures instantaneous 1:1 synchronization in forward and reverse scrolling.
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=3600',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: true,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
        renderCards(self.progress);
      },
      onRefresh: (self) => {
        scrollProgressRef.current = self.progress;
        renderCards(self.progress);
      },
    });

    // Immediate initial render at mount scroll position
    renderCards(trigger.progress);

    // Desktop GSAP ticker dedicated to smooth mouse-tilt inertia
    const tickerCallback = () => {
      if (metricsRef.current.isMobile || isReducedMotion) return;

      const prevMouseX = mouseRef.current.x;
      const prevMouseY = mouseRef.current.y;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mouseMoving =
        Math.abs(mouseRef.current.x - prevMouseX) > 0.0001 ||
        Math.abs(mouseRef.current.y - prevMouseY) > 0.0001;

      if (mouseMoving && trigger.isActive) {
        renderCards(scrollProgressRef.current);
      }
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
      trigger.kill();
    };
  }, [isReducedMotion, renderCards]);

  // Card thickness slices simulating genuine volumetric leather layer depth (-1.8px to +1.8px)
  const thicknessSlices = [-1.8, 1.8];

  return (
    <section
      id="craftsmanship"
      ref={sectionRef}
      className={`sli-craftsmanship-section ${isReducedMotion ? 'reduced-motion' : ''}`}
      aria-label="The Art of Craftsmanship"
    >
      {/* Background Image Plate */}
      <div className="sli-craft-bg-plate" aria-hidden="true">
        <img
          src="/images/craftsmanship/background_clean_plate.webp"
          alt=""
          className="sli-craft-bg-image"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div className="sli-craft-bg-overlay" />
      </div>

      {/* Warm ambient atmosphere & vignette */}
      <div className="sli-craft-ambient-radial" aria-hidden="true" />
      <div className="sli-craft-ambient-grain" aria-hidden="true" />

      {/* Stage Wrapper */}
      <div className="sli-craft-stage-container">
        {/* Section Header */}
        <header className="sli-craft-header">
          <div className="sli-craft-eyebrow-wrap">
            <span className="sli-craft-eyebrow-dot" aria-hidden="true" />
            <span className="sli-craft-eyebrow-text">THE ART OF CRAFTSMANSHIP</span>
          </div>

          <h2 className="sli-craft-heading">
            <span>Made by Hand.</span>
            <span>Remembered by Time.</span>
          </h2>

          <p className="sli-craft-subhead">
            A closer look at the details that make every piece worth keeping.
          </p>
        </header>

        {/* 3D Perspective Gallery Viewport */}
        <div
          ref={stageRef}
          className="sli-craft-3d-stage"
          style={{
            perspective: '1350px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* Coordinate Anchor */}
          <div
            ref={anchorRef}
            className="sli-craft-anchor"
            style={{
              width: `${metricsRef.current.cardW}px`,
              height: `${metricsRef.current.cardH}px`,
              transformStyle: 'preserve-3d',
            }}
          >
            {CRAFTSMANSHIP_CARDS.map((card, idx) => (
              <article
                key={card.id}
                ref={(el) => {
                  cardsRefs.current[idx] = el;
                }}
                className={`sli-craft-3d-card ${idx === 0 ? 'is-active-card' : ''}`}
                style={{
                  width: `${metricsRef.current.cardW}px`,
                  height: `${metricsRef.current.cardH}px`,
                  transformStyle: 'preserve-3d',
                }}
                aria-label={`${card.category}: ${card.title} — ${card.description}`}
              >
                {/* Physical 3D volumetric depth layers */}
                {thicknessSlices.map((zOffset, layerIdx) => {
                  const isFront = layerIdx === 1;
                  const isBack = layerIdx === 0;

                  return (
                    <div
                      key={layerIdx}
                      className={`sli-card-slice ${
                        isFront ? 'sli-card-front-face' : 'sli-card-back-face'
                      }`}
                      style={{
                        transform: `translate3d(0, 0, ${zOffset}px)`,
                      }}
                      aria-hidden={!isFront}
                    >
                      {/* Front face with photography, dual luxury scrims, and editorial typography */}
                      {isFront && (
                        <div className="sli-card-front-inner">
                          {/* Image */}
                          <img
                            src={card.image}
                            alt=""
                            className="sli-card-photo"
                            loading={idx < 3 ? 'eager' : 'lazy'}
                            decoding="async"
                            draggable={false}
                          />

                          {/* Atmospheric leather scrims */}
                          <div className="sli-card-scrim-top" />
                          <div className="sli-card-scrim-bottom" />

                          {/* Card Content Overlay */}
                          <div className="sli-card-content">
                            {/* Card Top: Step number & badge */}
                            <div className="sli-card-top-meta">
                              <span className="sli-card-step-label">
                                {card.stepNumber} / {card.category}
                              </span>
                              <span className="sli-card-badge">{card.badge}</span>
                            </div>

                            {/* Card Bottom: Title, description, hallmark */}
                            <div className="sli-card-bottom-info">
                              <h3 className="sli-card-title">{card.title}</h3>
                              <p className="sli-card-desc">{card.description}</p>

                              <div className="sli-card-footer-hallmark">
                                <span className="sli-hallmark-monogram">SLI</span>
                                <span className="sli-hallmark-rule" />
                                <span className="sli-hallmark-meta">ATELIER · KANPUR</span>
                              </div>
                            </div>
                          </div>

                          {/* Subtle leather edge border glow */}
                          <div className="sli-card-inner-border" />
                        </div>
                      )}

                      {/* Back face with burnished espresso leather grain and insignia */}
                      {isBack && (
                        <div className="sli-card-back-inner">
                          <div className="sli-card-back-watermark">
                            <span className="sli-back-monogram">SLI</span>
                            <span className="sli-back-sub">KANPUR · 1995</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </article>
            ))}
          </div>
        </div>

        {/* Minimal Editorial Footer: Counter & Progress Line */}
        <footer className="sli-craft-footer" aria-label="Craftsmanship timeline progress">
          <div className="sli-craft-counter">
            <span ref={counterCurrentRef} className="sli-counter-curr">
              01
            </span>
            <span className="sli-counter-sep">—</span>
            <span className="sli-counter-total">05</span>
          </div>

          <div className="sli-craft-progress-track" aria-hidden="true">
            <div ref={progressBarRef} className="sli-craft-progress-fill" />
          </div>

          {/* Quick Step Indicators */}
          <div className="sli-craft-step-indicators" aria-hidden="true">
            {CRAFTSMANSHIP_CARDS.map((_, i) => (
              <span
                key={i}
                ref={(el) => {
                  stepDotsRef.current[i] = el;
                }}
                className={`sli-step-dot ${i === 0 ? 'is-active' : ''}`}
              />
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
};
