import React, { useRef, useEffect, useState } from 'react';

interface HeroBackgroundProps {
  onVideoReady?: () => void;
  isReducedMotion?: boolean;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  onVideoReady,
  isReducedMotion = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isReducedMotion) {
      setVideoLoaded(true);
      onVideoReady?.();
      return;
    }

    const markReady = () => {
      setVideoLoaded(true);
      onVideoReady?.();
    };

    if (video.readyState >= 2) {
      markReady();
    } else {
      video.addEventListener('loadeddata', markReady, { once: true });
      video.addEventListener('canplay', markReady, { once: true });
      video.addEventListener('playing', markReady, { once: true });
    }

    // Programmatically ensure autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    // Ensure entrance timeline triggers reliably without hanging
    const safetyTimer = setTimeout(markReady, 500);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, [isReducedMotion, onVideoReady]);

  return (
    <div className="hero-bg-root" aria-hidden="true">
      {/* 1. Full-viewport background extension derived from video's actual environment */}
      <div className="hero-bg-extension-wrap">
        <img
          src="/hero-bg-extension.jpg"
          alt=""
          className="hero-bg-extension-img"
        />
      </div>

      {/* 2. Primary Video Stage anchored to bottom, preserving original 16:9 framing */}
      <div className="hero-video-stage">
        {/* Instant static poster frame fallback */}
        <img
          src="/hero-poster.jpg"
          alt="Artisanal hand surrounded by revolving burgundy leather belt"
          className="hero-media hero-poster-bg"
        />

        {!isReducedMotion && (
          <video
            ref={videoRef}
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`hero-media hero-video-element ${videoLoaded ? 'is-visible' : ''}`}
          />
        )}

        {/* 3. Desktop-only watermark concealer overlay */}
        <div className="hero-watermark-concealer" />
      </div>

      <div className="hero-ambient-warmth" />
    </div>
  );
};
