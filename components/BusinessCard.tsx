"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import "./BusinessCard.css";


const silverText: CSSProperties = {
  backgroundImage:
    "linear-gradient(105deg,#ffffff 0%,#cfcfd1 32%,#747477 62%,#eeeeee 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export default function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="card-scene">
      <div
        className={`card-flipper ${isFlipped ? "is-flipped" : ""}`}
        onClick={() => setIsFlipped((prev) => !prev)}
      >

        {/* ================= FRONT ================= */}

        <div className="card-face card-front">
          <div className="business-card front">
            <div className="card-bg" />

            <div className="front-border" />

            <div className="front-minimal">
              <div className="front-company">
                <span>SUPREME LEATHER</span>
                <span className="company-industries">
                  INDUSTRIES
                </span>
              </div>

              <div className="front-slogan">
                WHERE LEATHER MEETS LEGACY
              </div>
            </div>

            <div className="front-website">
              supremeleatherindustries.com
            </div>

            <div className="micro-mark">
              ARHAM · KANPUR · INDIA
            </div>
          </div>
        </div>


        {/* ================= BACK ================= */}

        <div className="card-face card-back">
          <div className="business-card back">

            <div className="card-bg" />
            <div className="back-overlay" />
            <div className="back-border" />

            <div className="back-content">

              <div className="back-header">
                <div className="back-brand">
                  SUPREME LEATHER
                </div>

                <div className="back-brand-sub">
                  INDUSTRIES
                </div>
              </div>

              <div className="back-description">
                <span className="back-kicker">
                  PREMIUM QUALITY · LEATHER BELTS
                </span>

                <p>
                  From carefully selected leather to precision
                  manufacturing, refined finishing and dependable
                  dispatch, we manage every stage with meticulous
                  attention to detail. Serving both domestic and
                  international clients, we deliver leather goods
                  built around consistency, craftsmanship and
                  professional reliability.
                </p>
              </div>

              <div className="back-divider" />

              <div className="back-owners">

                <div className="owner">
                  <span className="owner-label">
                    OWNER
                  </span>

                  <span className="owner-name">
                    ARHAM
                  </span>

                  <span className="owner-phone">
                    +91 95805 94157
                  </span>
                </div>

                <div className="owner">
                  <span className="owner-label">
                    OWNER
                  </span>

                  <span className="owner-name">
                    ABDULLAH
                  </span>

                  <span className="owner-phone">
                    +91 93694 3871
                  </span>
                </div>

              </div>

              <div className="back-footer">

                <div className="back-contact">
                  <span>
                    supremeleatherindustries1@gmail.com
                  </span>

                  <span>
                    Instagram · Sli_kanpur
                  </span>
                </div>

                <div className="back-address">
                  44/232 Meston Road · Misri Bazar · Kanpur
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

      <div className="card-hint">
        {isFlipped ? "CLICK TO RETURN" : "CLICK TO EXPLORE"}
      </div>
    </div>
  );
}