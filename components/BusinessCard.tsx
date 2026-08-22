import type { CSSProperties } from "react";
import "./BusinessCard.css";

type Side = "front" | "back";

const silverText: CSSProperties = {
  backgroundImage:
    "linear-gradient(105deg,#ffffff 0%,#cfcfd1 32%,#747477 62%,#eeeeee 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

function CornerBuckle() {
  return (
    <svg
      className="corner-buckle"
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <rect
        x="18"
        y="18"
        width="84"
        height="84"
        rx="19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />

      <rect
        x="30"
        y="30"
        width="60"
        height="60"
        rx="14"
        fill="none"
        stroke="currentColor"
        strokeWidth=".65"
      />

      <path
        d="M18 60h24M78 60h24M60 18v24M60 78v24"
        stroke="currentColor"
        strokeWidth=".65"
      />
    </svg>
  );
}

export default function BusinessCard({ side }: { side: Side }) {
  if (side === "front") {
  return (
    <section
      className="business-card front"
      aria-label="Front of business card"
    >
      <div className="card-bg" />

      <div className="front-border" />

      <div className="front-minimal">
       <div className="front-company">
  <span>SUPREME LEATHER</span>
  <span className="company-industries">INDUSTRIES</span>
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
      </section>
    );
  }

return (
  <section
    className="business-card back"
    aria-label="Back of business card"
  >
    <div className="business-card back">

   <div className="card-bg" />
  <div className="back-overlay" />
  <div className="back-border" />

  <div className="back-content">

    {/* Brand header */}
    <div className="back-header">
      <div className="back-brand">
        SUPREME LEATHER
      </div>

      <div className="back-brand-sub">
        INDUSTRIES
      </div>
    </div>

    {/* Business literature */}
    <div className="back-description">
      <span className="back-kicker">
        PREMIUM QUALITY · LEATHER BELTS
      </span>

      <p>
        From carefully selected leather to precision manufacturing,
        refined finishing and dependable dispatch, we manage every
        stage with meticulous attention to detail. Serving both
        domestic and international clients, we deliver leather goods
        built around consistency, craftsmanship and professional
        reliability.
      </p>
    </div>

    {/* Divider */}
    <div className="back-divider" />

    {/* Owners */}
    <div className="back-owners">

      <div className="owner">
        <span className="owner-label">OWNER</span>
        <span className="owner-name">ARHAM</span>
        <span className="owner-phone">+91 95805 94157</span>
      </div>

      <div className="owner">
        <span className="owner-label">OWNER</span>
        <span className="owner-name">ABDULLAH</span>
        <span className="owner-phone">+91 93694 3871</span>
      </div>

    </div>

    {/* Bottom information */}
    <div className="back-footer">

      <div className="back-contact">
        <span>supremeleatherindustries1@gmail.com</span>
        <span>Instagram · Sli_kanpur</span>
      </div>

      <div className="back-address">
        44/232 Meston Road · Misri Bazar · Kanpur
      </div>

    </div>

  </div>
</div>

  </section>
);}