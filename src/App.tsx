import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useLenis } from './hooks/useLenis';
import { Header } from './components/Header';
import { HeroContent } from './components/HeroContent';
import { CraftsmanshipCards, CardItem } from './components/CraftsmanshipCards';
import { HeroBackground } from './components/HeroBackground';
import { AboutSection } from './components/AboutSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { CollectionsSection } from './components/CollectionsSection';
import { CollectionPage } from './components/collection/CollectionPage';
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

    // Initial state setup: small, restrained motion distances for luxury feel
    gsap.set('.header-anim-item', { y: -20, opacity: 0 });
    gsap.set('.sli-eyebrow-dot', {
      clipPath: 'circle(0% at 50% 50%)',
      scale: 0.4,
      opacity: 0,
    });
    gsap.set('.sli-eyebrow-text', { y: 6, opacity: 0 });
    gsap.set('.sli-headline-line', { y: '105%' });
    gsap.set('.sli-paragraph', { y: 12, opacity: 0 });
    gsap.set('.sli-cta-wrapper', { y: 14, opacity: 0 });
    gsap.set('.sli-craft-card', { y: 28, opacity: 0 });

    // Step 1: Header elements drop in gently from top, staggered
    tl.to(
      '.header-anim-item',
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.06,
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
        duration: 0.45,
        ease: 'power2.out',
      },
      0.18
    );

    tl.to(
      '.sli-eyebrow-text',
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
      },
      0.22
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
        duration: 0.7,
      },
      0.38
    );

    // Step 5: CTA follows with subtle upward reveal
    tl.to(
      '.sli-cta-wrapper',
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
      },
      0.46
    );

    // Step 6: Three craftsmanship cards rise into position
    tl.to(
      '.sli-craft-card',
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
      },
      0.32
    );

    return () => {
      tl.kill();
    };
  }, [isVideoReady, isFontsReady, isReducedMotion]);

  const handleCardClick = (card: CardItem) => {
    console.log(`Craftsmanship Pillar Selected: ${card.category} - ${card.display}`);
    setActiveModal('collections');
  };

  // Synchronized client routing for Page 02 (Belt Collection)
  const [activePage, setActivePage] = useState<'home' | 'collection'>(() => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    const pageParam = search.get('page');
    const sectionParam = search.get('section');
    if (
      path === '/collection' ||
      path === '/collection-02' ||
      path === '/belts' ||
      pageParam === 'collection' ||
      pageParam === 'collection-02' ||
      sectionParam === 'collection-02' ||
      sectionParam === 'belts'
    ) {
      return 'collection';
    }
    return 'home';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const search = new URLSearchParams(window.location.search);
      const pageParam = search.get('page');
      const sectionParam = search.get('section');
      if (
        path === '/collection' ||
        path === '/collection-02' ||
        path === '/belts' ||
        pageParam === 'collection' ||
        pageParam === 'collection-02' ||
        sectionParam === 'collection-02' ||
        sectionParam === 'belts'
      ) {
        setActivePage('collection');
      } else {
        setActivePage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to targeted anchor hash when returning or landing on home
  useEffect(() => {
    if (activePage === 'home' && typeof window !== 'undefined' && window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, [activePage]);

  const navigateToCollection = () => {
    window.history.pushState({}, '', '/collection');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section filter query parameter for targeted visual verification & testing
  const sectionFilter =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('section')
      : null;

  if (activePage === 'collection' || sectionFilter === 'collection-02') {
    return (
      <div className="sli-page-root">
        <CollectionPage
          onNavigateHome={() => {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
          isReducedMotion={isReducedMotion}
        />
      </div>
    );
  }

  if (sectionFilter === 'collections') {
    return (
      <div className="sli-page-root">
        <CollectionsSection isReducedMotion={true} />
      </div>
    );
  }

  if (sectionFilter === 'about') {
    return (
      <div className="sli-page-root">
        <AboutSection isReducedMotion={true} />
      </div>
    );
  }

  if (sectionFilter === 'craftsmanship') {
    return (
      <div className="sli-page-root">
        <CraftsmanshipSection isReducedMotion={false} />
      </div>
    );
  }

  return (
    <div className="sli-page-root">
      {/* 1. Hero Viewport Section */}
      <section className="sli-hero-root" id="hero">
        {/* Background Video with 16:9 framing, bottom anchoring, and soft edge blending */}
        <HeroBackground
          onVideoReady={handleVideoReady}
          isReducedMotion={isReducedMotion}
        />

        {/* Header with Monogram, Centred 22s Nav, and Right Action Pills */}
        <Header
          onOpenCatalogue={() => setActiveModal('catalogue')}
          onOpenEnquire={() => setActiveModal('enquire')}
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Stage Body: Left Copy & Right Vertical Craftsmanship Cards */}
        <main className="sli-hero-stage-body">
          {/* Left Copy: Eyebrow, Two-Line 69s Headline, Paragraph, Dark Espresso CTA */}
          <HeroContent onExploreClick={navigateToCollection} />

          {/* Right: Three 222x160s Frosted-Glass Craftsmanship Cards */}
          <CraftsmanshipCards onCardClick={handleCardClick} />
        </main>
      </section>

      {/* 2. Editorial About Us / Our Story Section with Scroll-Triggered Word Reveal */}
      <AboutSection isReducedMotion={isReducedMotion} />

      {/* 3. Pinned 3D Horizontal Craftsmanship Cylinder Showcase */}
      <CraftsmanshipSection isReducedMotion={isReducedMotion} />

      {/* 4. Luxury Collections Editorial Background Stage */}
      <CollectionsSection isReducedMotion={isReducedMotion} />

      {/* 5. Responsive Mobile Drawer (< 820px) */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenCatalogue={() => setActiveModal('catalogue')}
        onOpenEnquire={() => setActiveModal('enquire')}
      />

      {/* 4. Luxury Modals for Catalogue, Bespoke Enquiry, and Collections */}
      <Modals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
