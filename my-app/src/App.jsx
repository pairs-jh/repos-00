import { useState } from "react";
import NvdaDashboard from "./NvdaDashboard";

const SITE = {
  name: "Ukhona",
  tagline: "Your tagline goes here",
  nav: ["Home", "NVDA", "Workout", "STEM", "DMT"],
};

const CARDS = [
  {
    title: "Workout Analysis",
    desc: "Track splits, stacks, and performance data across sessions.",
    tag: "Fitness",
    color: "#76b900",
    page: "Workout",
  },
  {
    title: "STEM X",
    desc: "Math, science, and experimental learning tools.",
    tag: "Education",
    color: "#4a9fff",
    page: "STEM",
  },
  {
    title: "DMT",
    desc: "Deep mapping and tracking.",
    tag: "Research",
    color: "#c084fc",
    page: "DMT",
  },
  {
    title: "NVDA P/E Dashboard",
    desc: "NVIDIA P/E ratio Nov 2022 → Feb 2026. Chart, table, and analysis.",
    tag: "Finance",
    color: "#fbbf24",
    page: "NVDA",
  },
];

// ---- old HTML pages served from public/ukhona/ ----
const HTML_PAGES = {
  Workout: "/repos-00/ukhona/html/workout-analysis.html",
  STEM:    "/repos-00/ukhona/html/stemx.html",
  DMT:     "/repos-00/ukhona/html/dmt.html",
};

function Header({ activePage, setActivePage }) {
  return (
    <header style={{
      background: "#0a0a10",
      borderBottom: "1px solid #1e1e2e",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 60,
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div
        onClick={() => setActivePage("Home")}
        style={{ fontSize: 20, fontWeight: 900, color: "#76b900", fontFamily: "monospace", letterSpacing: -1, cursor: "pointer" }}
      >
        {SITE.name}
      </div>

      <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {SITE.nav.map(page => {
          // if this nav item maps to an old HTML page, render as <a>
          if (HTML_PAGES[page]) {
            return (
              <a
                key={page}
                href={HTML_PAGES[page]}
                style={{
                  border: "1px solid transparent",
                  borderRadius: 6,
                  color: "#777",
                  padding: "6px 14px",
                  fontSize: 13,
                  fontFamily: "monospace",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => e.target.style.color = "#aaa"}
                onMouseLeave={e => e.target.style.color = "#777"}
              >
                {page}
              </a>
            );
          }
          // otherwise it's an internal React page
          return (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              style={{
                background: activePage === page ? "#76b90020" : "none",
                border: activePage === page ? "1px solid #76b900" : "1px solid transparent",
                borderRadius: 6,
                color: activePage === page ? "#76b900" : "#777",
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "monospace",
                transition: "all 0.2s",
              }}
            >
              {page}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section style={{
      padding: "80px 24px 60px",
      maxWidth: 700,
      margin: "0 auto",
      textAlign: "center",
    }}>
      <div style={{
        display: "inline-block",
        background: "#76b90015",
        border: "1px solid #76b90040",
        borderRadius: 20,
        padding: "4px 14px",
        fontSize: 11,
        color: "#76b900",
        letterSpacing: 3,
        marginBottom: 20,
        fontFamily: "monospace",
      }}>
        LIVE ON GITHUB PAGES
      </div>
      <h1 style={{
        fontSize: "clamp(32px, 6vw, 56px)",
        fontWeight: 900,
        color: "#fff",
        margin: "0 0 16px",
        lineHeight: 1.1,
        fontFamily: "monospace",
      }}>
        {SITE.name}
      </h1>
      <p style={{ color: "#666", fontSize: 16, lineHeight: 1.7, margin: "0 auto", maxWidth: 480 }}>
        {SITE.tagline}
      </p>
    </section>
  );
}

function Card({ title, desc, tag, color, page, setActivePage }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (HTML_PAGES[page]) {
      window.location.href = HTML_PAGES[page];
    } else {
      setActivePage(page);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#111118" : "#0d0d14",
        border: `1px solid ${hovered ? color + "60" : "#1e1e2e"}`,
        borderRadius: 12,
        padding: 24,
        cursor: "pointer",
        transition: "all 0.2s",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 8px 32px ${color}15` : "none",
      }}
    >
      <div style={{
        display: "inline-block",
        background: color + "15",
        border: `1px solid ${color}30`,
        borderRadius: 5,
        padding: "2px 10px",
        fontSize: 10,
        color: color,
        letterSpacing: 2,
        marginBottom: 14,
        fontFamily: "monospace",
      }}>
        {tag}
      </div>
      <h3 style={{ color: "#e0e0e0", fontSize: 17, fontWeight: 700, margin: "0 0 8px", fontFamily: "monospace" }}>
        {title}
      </h3>
      <p style={{ color: "#555", fontSize: 13, margin: 0, lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  );
}

function CardGrid({ setActivePage }) {
  return (
    <section style={{
      maxWidth: 900,
      margin: "0 auto",
      padding: "0 24px 80px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: 16,
    }}>
      {CARDS.map(card => (
        <Card key={card.title} {...card} setActivePage={setActivePage} />
      ))}
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid #1e1e2e",
      padding: "24px",
      textAlign: "center",
      color: "#333",
      fontSize: 12,
      fontFamily: "monospace",
    }}>
      {SITE.name} · Built with React · Hosted on GitHub Pages
    </footer>
  );
}

function HomePage({ setActivePage }) {
  return (
    <>
      <Hero />
      <CardGrid setActivePage={setActivePage} />
    </>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("Home");

  const renderPage = () => {
    switch (activePage) {
      case "Home": return <HomePage setActivePage={setActivePage} />;
      case "NVDA": return <NvdaDashboard />;
      default:     return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div style={{ background: "#080810", minHeight: "100vh", color: "#fff" }}>
      <Header activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
      <Footer />
    </div>
  );
}