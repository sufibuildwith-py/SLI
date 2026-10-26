import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useLenis } from './hooks/useLenis';
import { Header } from './components/Header';
import { HeroContent } from './components/HeroContent';
import { CraftsmanshipCards, CardItem } from './components/CraftsmanshipCards';
import { HeroBackground } from './components/HeroBackground';
import { MobileMenu } from './components/MobileMenu';
import { Modals } from './components/Modals';
import { ModalType } from './types';

export default function App() {
  // Initialize Lenis smooth scroll for future website sections
  useLenis();

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isFontsReady, setIsFontsReady] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const entranceTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Monitor font readiness
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          setIsFontsReady(true);
        })
        .catch(() => {
          setIsFontsReady(true);
        });
    } else {
      setIsFontsReady(true);
    }
  }, []);

  // Video ready callback from HeroBackground
  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  // Coordinated GSAP Entrance Sequence
  useEffect(() => {
    // Only run if both fonts and video first frame are ready, and haven't animated yet
    if (!isVideoReady || !isFontsReady || hasAnimatedRef.current) return;

    const isInstant =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('instant');

    if (isReducedMotion || isInstant) {
      hasAnimatedRef.current = true;
      gsap.set('.header-anim-item', { y: 0, opacity: 1 });
      gsap.set('.sli-eyebrow-dot', {
        clipPath: 'circle(100% at 50% 50%)',
        scale: 1,
        opacity: 1,
      });
      gsap.set('.sli-eyebrow-text', { x: 0, opacity: 1 });
      gsap.set('.sli-headline-line', { y: '0%' });
      gsap.set('.sli-paragraph', { y: 0, opacity: 1 });
      gsap.set('.sli-cta-wrapper', { y: 0, opacity: 1 });
      gsap.set('.sli-craft-card', { y: 0, opacity: 1 });
      return;
    }

    hasAnimatedRef.current = true;

    // Single coordinated master GSAP entrance timeline
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
      onComplete: () => {
        // Settle elements into authored CSS positions without leaving unwanted transforms
        gsap.set(
          [
            '.header-anim-item',
            '.sli-eyebrow-text',
            '.sli-paragraph',
            '.sli-cta-wrapper',
            '.sli-craft-card',
          ],
          { clearProps: 'transform' }
        );
      },
    });

    entranceTimelineRef.current = tl;

    // Initial state setup
    gsap.set('.header-anim-item', { y: -28, opacity: 0 });
    gsap.set('.sli-eyebrow-dot', {
      clipPath: 'circle(0% at 50% 50%)',
      scale: 0.3,
      opacity: 0,
    });
    gsap.set('.sli-eyebrow-text', { x: -16, opacity: 0 });
    gsap.set('.sli-headline-line', { y: '105%' });
    gsap.set('.sli-paragraph', { y: 22, opacity: 0 });
    gsap.set('.sli-cta-wrapper', { y: 24, opacity: 0 });
    gsap.set('.sli-craft-card', { y: 44, opacity: 0 });

    // Step 1: Header elements drop in gently from top, staggered
    tl.to(
      '.header-anim-item',
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power2.out',
      },
      0.08
    );

    // Step 2: Small burgundy eyebrow dot reveals through circular clip, followed by label
    tl.to(
      '.sli-eyebrow-dot',
      {
        clipPath: 'circle(100% at 50% 50%)',
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.2
    );

    tl.to(
      '.sli-eyebrow-text',
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
      },
      0.26
    );

    // Step 3: Each headline line rises independently inside an overflow-hidden text mask
    tl.to(
      '.sli-headline-line',
      {
        y: '0%',
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
      },
      0.22
    );

    // Step 4: Supporting paragraph fades and settles upward
    tl.to(
      '.sli-paragraph',
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
      },
      0.4
    );

    // Step 5: CTA follows with subtle upward reveal
    tl.to(
      '.sli-cta-wrapper',
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
      },
      0.5
    );

    // Step 6: Three craftsmanship cards rise into position one after another
    tl.to(
      '.sli-craft-card',
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      },
      0.35
    );

    return () => {
      tl.kill();
    };
  }, [isVideoReady, isFontsReady, isReducedMotion]);

  const handleCardClick = (card: CardItem) => {
    console.log(`Craftsmanship Pillar Selected: ${card.category} - ${card.display}`);
    setActiveModal('collections');
  };

  return (
    <div className="sli-hero-root">
      {/* 1. Hero Background Video with 16:9 framing, bottom anchoring, and soft edge blending */}
      <HeroBackground
        onVideoReady={handleVideoReady}
        isReducedMotion={isReducedMotion}
      />

      {/* 2. Header with Monogram, Centred 22s Nav, and Right Action Pills */}
      <Header
        onOpenCatalogue={() => setActiveModal('catalogue')}
        onOpenEnquire={() => setActiveModal('enquire')}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* 3. Stage Body: Left Copy & Right Vertical Craftsmanship Cards */}
      <main className="sli-hero-stage-body">
        {/* Left Copy: Eyebrow, Two-Line 69s Headline, Paragraph, Dark Espresso CTA */}
        <HeroContent onExploreClick={() => setActiveModal('collections')} />

        {/* Right: Three 222x160s Frosted-Glass Craftsmanship Cards */}
        <CraftsmanshipCards onCardClick={handleCardClick} />
      </main>

      {/* 4. Responsive Mobile Drawer (< 820px) */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenCatalogue={() => setActiveModal('catalogue')}
        onOpenEnquire={() => setActiveModal('enquire')}
      />

      {/* 5. Luxury Modals for Catalogue, Bespoke Enquiry, and Collections */}
      <Modals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
