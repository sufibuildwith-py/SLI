import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(Draggable, InertiaPlugin);

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
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<(HTMLElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterCurrentRef = useRef<HTMLSpanElement>(null);
  const stepDotsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  // Interaction & Layout state kept in refs for 60fps/120Hz unencumbered animation (0 React re-renders)
  const draggableInstance = useRef<globalThis.Draggable | null>(null);
  const maxDragRef = useRef<number>(0);
  const snapOffsetsRef = useRef<number[]>([]);
  const activeIndexRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const justDraggedRef = useRef<boolean>(false);
  const dragTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update UI indicators (counter, progress line, step dots, prev/next buttons) directly via DOM refs
  const updateProgressAndIndicators = useCallback((x: number) => {
    const maxDrag = maxDragRef.current;
    const clampedX = Math.max(-maxDrag, Math.min(0, x));
    const progress = maxDrag > 0 ? -clampedX / maxDrag : 0;
    const clampedProgress = Math.max(0, Math.min(1, progress));

    // 1. Progress Bar fill width
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${(clampedProgress * 100).toFixed(1)}%`;
    }

    // 2. Determine active card index (0 to CRAFTSMANSHIP_CARDS.length - 1)
    const totalCards = CRAFTSMANSHIP_CARDS.length;
    const closestIndex =
      totalCards > 1
        ? Math.min(totalCards - 1, Math.max(0, Math.round(clampedProgress * (totalCards - 1))))
        : 0;

    if (closestIndex !== activeIndexRef.current) {
      const prev = activeIndexRef.current;
      activeIndexRef.current = closestIndex;

      // Update counter text (01 to 05)
      if (counterCurrentRef.current) {
        counterCurrentRef.current.textContent = `0${closestIndex + 1}`;
      }

      // Update active card class
      const prevCard = cardsRefs.current[prev];
      if (prevCard) prevCard.classList.remove('is-active-card');
      const nextCard = cardsRefs.current[closestIndex];
      if (nextCard) nextCard.classList.add('is-active-card');

      // Update step dot active states
      const prevDot = stepDotsRef.current[prev];
      if (prevDot) {
        prevDot.classList.remove('is-active');
        prevDot.setAttribute('aria-current', 'false');
      }
      const nextDot = stepDotsRef.current[closestIndex];
      if (nextDot) {
        nextDot.classList.add('is-active');
        nextDot.setAttribute('aria-current', 'true');
      }
    }

    // 3. Arrow buttons enabled / disabled state
    if (prevBtnRef.current) {
      const isStart = clampedX >= -6;
      prevBtnRef.current.disabled = isStart;
      if (isStart) {
        prevBtnRef.current.setAttribute('disabled', '');
      } else {
        prevBtnRef.current.removeAttribute('disabled');
      }
      prevBtnRef.current.classList.toggle('is-disabled', isStart);
    }
    if (nextBtnRef.current) {
      const isEnd = clampedX <= -maxDrag + 6;
      nextBtnRef.current.disabled = isEnd;
      if (isEnd) {
        nextBtnRef.current.setAttribute('disabled', '');
      } else {
        nextBtnRef.current.removeAttribute('disabled');
      }
      nextBtnRef.current.classList.toggle('is-disabled', isEnd);
    }
  }, []);

  // Programmatic smooth scroll to target X coordinate
  const animateToX = useCallback(
    (targetX: number, duration = 0.65) => {
      if (!trackRef.current) return;
      const maxDrag = maxDragRef.current;
      const clampedX = Math.max(-maxDrag, Math.min(0, targetX));

      gsap.to(trackRef.current, {
        x: clampedX,
        duration: isReducedMotion ? 0.01 : duration,
        ease: 'power3.out',
        overwrite: 'auto',
        onUpdate: () => {
          if (!trackRef.current) return;
          const curX = gsap.getProperty(trackRef.current, 'x') as number;
          draggableInstance.current?.update();
          updateProgressAndIndicators(curX);
        },
        onComplete: () => {
          if (!trackRef.current) return;
          const finalX = gsap.getProperty(trackRef.current, 'x') as number;
          draggableInstance.current?.update();
          updateProgressAndIndicators(finalX);
        },
      });
    },
    [isReducedMotion, updateProgressAndIndicators]
  );

  // Jump to specific card by index
  const scrollToCardIndex = useCallback(
    (index: number) => {
      const offsets = snapOffsetsRef.current;
      if (index >= 0 && index < offsets.length) {
        animateToX(offsets[index]);
      }
    },
    [animateToX]
  );

  // Step card in relative direction ('prev' or 'next')
  const scrollCard = useCallback(
    (direction: 'prev' | 'next') => {
      const curIdx = activeIndexRef.current;
      const targetIdx = direction === 'next' ? curIdx + 1 : curIdx - 1;
      const clampedIdx = Math.max(0, Math.min(CRAFTSMANSHIP_CARDS.length - 1, targetIdx));
      scrollToCardIndex(clampedIdx);
    },
    [scrollToCardIndex]
  );

  // Calculate snap points and maxDrag from rendered geometry
  const measureBounds = useCallback(() => {
    if (!viewportRef.current || !trackRef.current) return;
    const viewportWidth = viewportRef.current.clientWidth;
    const trackWidth = trackRef.current.scrollWidth;

    // Maximum scrollable distance to ensure Card 05 is fully revealed without overshooting
    const maxDrag = Math.max(0, trackWidth - viewportWidth);
    maxDragRef.current = maxDrag;

    // Calculate snap offsets: 5 proportional points across the drag range
    const totalCards = CRAFTSMANSHIP_CARDS.length;
    const offsets: number[] = [];
    for (let i = 0; i < totalCards; i++) {
      const ratio = totalCards > 1 ? i / (totalCards - 1) : 0;
      offsets.push(-ratio * maxDrag);
    }
    snapOffsetsRef.current = offsets;

    // Apply updated bounds to Draggable
    if (draggableInstance.current) {
      draggableInstance.current.applyBounds({
        minX: -maxDrag,
        maxX: 0,
      });
      const curX = gsap.getProperty(trackRef.current, 'x') as number;
      if (curX < -maxDrag) {
        animateToX(-maxDrag, 0.3);
      } else if (curX > 0) {
        animateToX(0, 0.3);
      } else {
        updateProgressAndIndicators(curX);
      }
    }
  }, [animateToX, updateProgressAndIndicators]);

  // Initialize Draggable with InertiaPlugin
  useEffect(() => {
    if (!trackRef.current || !viewportRef.current) return;

    measureBounds();

    const draggable = Draggable.create(trackRef.current, {
      type: 'x',
      inertia: !isReducedMotion,
      edgeResistance: 0.85,
      dragResistance: 0,
      cursor: 'grab',
      activeCursor: 'grabbing',
      dragClickables: false,
      zIndexBoost: false,
      bounds: {
        minX: -maxDragRef.current,
        maxX: 0,
      },
      snap: {
        x: (endValue: number) => {
          if (isReducedMotion) return endValue;
          const offsets = snapOffsetsRef.current;
          if (!offsets.length) return endValue;

          // Find closest snap target to natural inertia projection
          let closest = offsets[0];
          let minDiff = Infinity;
          for (let i = 0; i < offsets.length; i++) {
            const diff = Math.abs(endValue - offsets[i]);
            if (diff < minDiff) {
              minDiff = diff;
              closest = offsets[i];
            }
          }
          return closest;
        },
      },
      onPress() {
        isDraggingRef.current = true;
        if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
      },
      onDrag() {
        justDraggedRef.current = true;
        updateProgressAndIndicators(this.x);
      },
      onThrowUpdate() {
        updateProgressAndIndicators(this.x);
      },
      onThrowComplete() {
        isDraggingRef.current = false;
        updateProgressAndIndicators(this.x);
        dragTimeoutRef.current = setTimeout(() => {
          justDraggedRef.current = false;
        }, 120);
      },
      onDragEnd() {
        if (!this.tween) {
          isDraggingRef.current = false;
          dragTimeoutRef.current = setTimeout(() => {
            justDraggedRef.current = false;
          }, 120);
        }
      },
    })[0];

    draggableInstance.current = draggable;

    // Resize observer to keep track bounds in sync with window / viewport changes
    const resizeObserver = new ResizeObserver(() => {
      measureBounds();
    });
    resizeObserver.observe(viewportRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    const handleWindowResize = () => {
      measureBounds();
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      resizeObserver.disconnect();
      if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
      draggable.kill();
      draggableInstance.current = null;
    };
  }, [isReducedMotion, measureBounds, updateProgressAndIndicators]);

  // Trackpad horizontal wheel support (does not hijack vertical page scrolling)
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (e: WheelEvent) => {
      // Engage only when user intends horizontal gesture (deltaX dominates deltaY)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
        e.preventDefault();
        if (!trackRef.current) return;

        const maxDrag = maxDragRef.current;
        const curX = gsap.getProperty(trackRef.current, 'x') as number;
        const newX = Math.max(-maxDrag, Math.min(0, curX - e.deltaX * 0.95));

        gsap.to(trackRef.current, {
          x: newX,
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto',
          onUpdate: () => {
            if (!trackRef.current) return;
            const updatedX = gsap.getProperty(trackRef.current, 'x') as number;
            draggableInstance.current?.update();
            updateProgressAndIndicators(updatedX);
          },
        });
      }
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      viewport.removeEventListener('wheel', handleWheel);
    };
  }, [updateProgressAndIndicators]);

  // Accessible keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollCard('next');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollCard('prev');
    } else if (e.key === 'Home') {
      e.preventDefault();
      scrollToCardIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      scrollToCardIndex(CRAFTSMANSHIP_CARDS.length - 1);
    }
  };

  // Preload and decode images asynchronously to avoid frame drops
  useEffect(() => {
    CRAFTSMANSHIP_CARDS.forEach((card) => {
      const img = new Image();
      img.src = card.image;
      if ('decode' in img) img.decode().catch(() => {});
    });
    const bgImg = new Image();
    bgImg.src = '/images/craftsmanship/background_clean_plate.webp';
    if ('decode' in bgImg) bgImg.decode().catch(() => {});
  }, []);

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

      {/* Main Section Content Wrapper */}
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

        {/* Horizontal Draggable Gallery Viewport */}
        <div
          ref={viewportRef}
          className="sli-craft-gallery-viewport"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Craftsmanship editorial gallery. Drag or swipe horizontally to explore cards, or use arrow keys."
          role="region"
        >
          <div ref={trackRef} className="sli-craft-gallery-track">
            {CRAFTSMANSHIP_CARDS.map((card, idx) => (
              <article
                key={card.id}
                ref={(el) => {
                  cardsRefs.current[idx] = el;
                }}
                className={`sli-craft-editorial-card ${idx === 0 ? 'is-active-card' : ''}`}
                onClick={() => {
                  // If user was actively dragging, do not trigger card selection
                  if (justDraggedRef.current) return;
                  scrollToCardIndex(idx);
                }}
                aria-label={`${card.stepNumber} ${card.category}: ${card.title} — ${card.description}`}
              >
                <div className="sli-craft-card-inner">
                  {/* High-Resolution Editorial Photography */}
                  <img
                    src={card.image}
                    alt=""
                    className="sli-card-photo"
                    loading={idx < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />

                  {/* Dual Luxury Scrims */}
                  <div className="sli-card-scrim-top" aria-hidden="true" />
                  <div className="sli-card-scrim-bottom" aria-hidden="true" />

                  {/* Card Editorial Overlay */}
                  <div className="sli-card-content">
                    {/* Top Meta: Step number & Hallmark badge */}
                    <div className="sli-card-top-meta">
                      <span className="sli-card-step-label">
                        {card.stepNumber} / {card.category}
                      </span>
                      <span className="sli-card-badge">{card.badge}</span>
                    </div>

                    {/* Bottom Info: Title, Description, Atelier Hallmark */}
                    <div className="sli-card-bottom-info">
                      <h3 className="sli-card-title">{card.title}</h3>
                      <p className="sli-card-desc">{card.description}</p>

                      <div className="sli-card-footer-hallmark">
                        <span className="sli-hallmark-monogram">SLI</span>
                        <span className="sli-hallmark-rule" aria-hidden="true" />
                        <span className="sli-hallmark-meta">ATELIER · KANPUR</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle leather edge border */}
                  <div className="sli-card-inner-border" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Minimal Editorial Footer: Counter, Progress Fill, and Prev/Next Navigation */}
        <footer className="sli-craft-footer" aria-label="Craftsmanship gallery controls and timeline">
          {/* Discreet Step Counter */}
          <div className="sli-craft-counter" aria-live="polite">
            <span ref={counterCurrentRef} className="sli-counter-curr">
              01
            </span>
            <span className="sli-counter-sep">/</span>
            <span className="sli-counter-total">05</span>
          </div>

          {/* Real-time Smooth Progress Line */}
          <div className="sli-craft-progress-track" aria-hidden="true">
            <div ref={progressBarRef} className="sli-craft-progress-fill" />
          </div>

          {/* Interactive Step Pip Dots */}
          <div className="sli-craft-step-indicators" aria-label="Card selector dots">
            {CRAFTSMANSHIP_CARDS.map((card, i) => (
              <button
                key={card.id}
                ref={(el) => {
                  stepDotsRef.current[i] = el;
                }}
                type="button"
                onClick={() => scrollToCardIndex(i)}
                className={`sli-step-dot ${i === 0 ? 'is-active' : ''}`}
                aria-label={`Jump to ${card.category}`}
                aria-current={i === 0 ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Refined Luxury Navigation Arrows */}
          <div className="sli-craft-nav-arrows">
            <button
              ref={prevBtnRef}
              type="button"
              onClick={() => scrollCard('prev')}
              className="sli-craft-arrow-btn prev is-disabled"
              aria-label="Previous craftsmanship card"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <button
              ref={nextBtnRef}
              type="button"
              onClick={() => scrollCard('next')}
              className="sli-craft-arrow-btn next"
              aria-label="Next craftsmanship card"
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
};
