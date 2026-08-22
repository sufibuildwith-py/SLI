import BusinessCard from "@/components/BusinessCard";

export default function Home() {
  return (
    <main className="card-page">
<div className="light-sweep" />
  <header className="brand-header">

    <div className="brand-name">
      SUPREME LEATHER INDUSTRIES
    </div>

    <div className="brand-year">
      EST. 1995
    </div>

  </header>


  <section className="hero-copy">

    <div className="hero-eyebrow">
      PREMIUM LEATHER MANUFACTURER · KANPUR · INDIA
    </div>

    <h1>
      WHERE LEATHER
      <span>MEETS LEGACY</span>
    </h1>

  </section>
<div className="light-line" />

  <BusinessCard />


  <div className="card-hint">
    CLICK TO EXPLORE
  </div>


  <footer className="presentation-footer">

    <span>SLI · KANPUR · INDIA</span>

    <span className="footer-line" />

    <span>01 — 01</span>

  </footer>

</main>
  );
}