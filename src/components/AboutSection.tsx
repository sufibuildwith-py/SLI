import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STORY_TEXT =
  "There are things time takes away, and things it makes more beautiful. Since 1995, in the heart of Kanpur, Supreme Leather Industries has believed that leather belongs to the latter. Every grain carries a story, every detail holds a promise, and every belt we craft is made to outlive the moment it was chosen. From our hands to homes across India and beyond, we don't simply make leather goods. We make something worth holding on to.";

interface AboutSectionProps {
  isReducedMotion?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isReducedMotion = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const words = STORY_TEXT.split(' ');

  useEffect(() => {
    if (!paragraphRef.current || !sectionRef.current) return;

    const wordElements = paragraphRef.current.querySelectorAll('.sli-story-word');
    if (!wordElements || wordElements.length === 0) return;

    if (isReducedMotion) {
      gsap.set(wordElements, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Word-by-word scroll-linked reveal
      gsap.fromTo(
        wordElements,
        { opacity: 0.28 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 82%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="about"
      className="sli-about-section"
      ref={sectionRef}
      aria-label="About Supreme Leather Industries"
    >
      <div className="sli-about-ambient-grain" aria-hidden="true" />

      <div className="sli-about-container">
        {/* Top establishment eyebrow */}
        <div className="sli-about-eyebrow-wrap">
          <span className="sli-about-eyebrow-line" aria-hidden="true" />
          <span className="sli-about-eyebrow-text">OUR STORY — EST. 1995</span>
          <span className="sli-about-eyebrow-line" aria-hidden="true" />
        </div>

        {/* Main poetic editorial heading */}
        <h2 className="sli-about-heading">
          Where Leather Meets Legacy.
        </h2>

        {/* Delicate decorative emblem */}
        <div className="sli-about-divider" aria-hidden="true">
          <span className="sli-about-divider-ornament">✦</span>
        </div>

        {/* Central animated story paragraph with scroll-driven word reveal */}
        <p
          ref={paragraphRef}
          className="sli-about-paragraph"
          aria-label={STORY_TEXT}
        >
          {words.map((word, idx) => (
            <span key={idx} className="sli-story-word">
              {word}
            </span>
          ))}
        </p>

        {/* Subtle heritage signature */}
        <div className="sli-about-signature">
          <div className="sli-signature-monogram" aria-hidden="true">
            <span>SLI</span>
          </div>
          <div className="sli-signature-details">
            <span className="sli-signature-brand">SUPREME LEATHER INDUSTRIES</span>
            <span className="sli-signature-meta">KANPUR, INDIA · SINCE 1995</span>
          </div>
        </div>
      </div>
    </section>
  );
};
