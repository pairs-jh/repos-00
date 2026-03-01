import { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Area, AreaChart } from "recharts";

const peData = [
  { date: "Nov 2022", pe: 62.1, event: "ChatGPT launches — AI hype begins" },
  { date: "Dec 2022", pe: 70.4, event: null },
  { date: "Jan 2023", pe: 74.2, event: null },
  { date: "Feb 2023", pe: 76.8, event: null },
  { date: "Mar 2023", pe: 119.5, event: "GPT-4 released" },
  { date: "Apr 2023", pe: 138.8, event: "Peak P/E — earnings still catching up" },
  { date: "May 2023", pe: 211.4, event: "NVDA earnings blowout +Q2 guidance shock" },
  { date: "Jun 2023", pe: 196.1, event: null },
  { date: "Jul 2023", pe: 218.5, event: null },
  { date: "Aug 2023", pe: 112.3, event: "Earnings catch-up begins crushing P/E" },
  { date: "Sep 2023", pe: 108.7, event: null },
  { date: "Oct 2023", pe: 101.2, event: null },
  { date: "Nov 2023", pe: 97.4, event: null },
  { date: "Dec 2023", pe: 65.1, event: null },
  { date: "Jan 2024", pe: 79.3, event: null },
  { date: "Feb 2024", pe: 74.1, event: "Stock +240% YTD as earnings scale up" },
  { date: "Mar 2024", pe: 73.6, event: null },
  { date: "Apr 2024", pe: 72.2, event: null },
  { date: "May 2024", pe: 69.4, event: "Blackwell announced" },
  { date: "Jun 2024", pe: 67.8, event: null },
  { date: "Jul 2024", pe: 65.0, event: null },
  { date: "Aug 2024", pe: 68.5, event: null },
  { date: "Sep 2024", pe: 61.2, event: null },
  { date: "Oct 2024", pe: 57.8, event: null },
  { date: "Nov 2024", pe: 53.4, event: "Post-election AI optimism" },
  { date: "Dec 2024", pe: 53.1, event: null },
  { date: "Jan 2025", pe: 50.6, event: "DeepSeek shock — cheap AI model rattles market" },
  { date: "Feb 2025", pe: 46.2, event: null },
  { date: "Mar 2025", pe: 43.7, event: null },
  { date: "Apr 2025", pe: 45.1, event: null },
  { date: "May 2025", pe: 44.8, event: null },
  { date: "Jun 2025", pe: 43.2, event: null },
  { date: "Jul 2025", pe: 44.5, event: null },
  { date: "Aug 2025", pe: 46.1, event: null },
  { date: "Sep 2025", pe: 45.3, event: null },
  { date: "Oct 2025", pe: 44.1, event: null },
  { date: "Nov 2025", pe: 49.2, event: null },
  { date: "Dec 2025", pe: 50.8, event: null },
  { date: "Jan 2026", pe: 47.5, event: null },
  { date: "Feb 2026", pe: 36.2, event: "Tariff fears + macro headwinds" },
];

const tableData = [
  { period: "Nov 2022", pe: 62.1, stockPrice: "~$16", eps_ttm: "~$0.26", notes: "Pre-AI-boom baseline" },
  { period: "May 2023", pe: 211.4, stockPrice: "~$40", eps_ttm: "~$0.19", notes: "🚀 Peak mania — price soared, earnings lagged" },
  { period: "Aug 2023", pe: 112.3, stockPrice: "~$50", eps_ttm: "~$0.45", notes: "Earnings catch-up begins" },
  { period: "Dec 2023", pe: 65.1, stockPrice: "~$49", eps_ttm: "~$0.75", notes: "P/E normalized as EPS surged" },
  { period: "Jun 2024", pe: 67.8, stockPrice: "~$125", eps_ttm: "~$1.85", notes: "Both stock and EPS soaring together" },
  { period: "Jan 2025", pe: 50.6, stockPrice: "~$137", eps_ttm: "~$2.71", notes: "DeepSeek threatens AI GPU demand narrative" },
  { period: "Jun 2025", pe: 43.2, stockPrice: "~$130", eps_ttm: "~$3.01", notes: "Market re-rates on macro fears" },
  { period: "Feb 2026", pe: 36.2, stockPrice: "~$177", eps_ttm: "~$4.90", notes: "💡 P/E near decade low despite record EPS" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const d = peData.find(x => x.date === label);
    return (
      <div style={{
        background: "#0a0a0f",
        border: "1px solid #76b900",
        borderRadius: "8px",
        padding: "12px 16px",
        fontFamily: "'Courier New', monospace",
        maxWidth: 240
      }}>
        <div style={{ color: "#76b900", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{label}</div>
        <div style={{ color: "#e8ff00", fontSize: 20, fontWeight: 900 }}>P/E: {payload[0].value.toFixed(1)}x</div>
        {d?.event && <div style={{ color: "#aaa", fontSize: 11, marginTop: 6, lineHeight: 1.4 }}>⚡ {d.event}</div>}
      </div>
    );
  }
  return null;
};

export default function NvidiaPEDashboard() {
  const [activeTab, setActiveTab] = useState("chart");
  const [highlighted, setHighlighted] = useState(null);

  const maxPE = Math.max(...peData.map(d => d.pe));
  const minPE = Math.min(...peData.map(d => d.pe));
  const currentPE = peData[peData.length - 1].pe;

  const phases = [
    { label: "PHASE 1", title: "Pre-Hype Baseline", period: "Nov 2022 – Feb 2023", color: "#4a9fff", pe: "62–77x",
      body: "NVDA was already expensive by normal standards, but this was its 'normal' — a premium GPU maker riding gaming and data center growth. Then ChatGPT hit the world." },
    { label: "PHASE 2", title: "The Parabolic Spike", period: "Mar – Jul 2023", color: "#ff6b35", pe: "119–218x",
      body: "The P/E went vertical. The stock price exploded (NVDA went from ~$16 to ~$50 split-adjusted) while earnings hadn't caught up yet. Investors were paying 200x earnings for a company they believed would rule AI infrastructure. This is pure speculative premium — the market was pricing in years of future profits." },
    { label: "PHASE 3", title: "Earnings Catch-Up Compression", period: "Aug 2023 – early 2024", color: "#76b900", pe: "65–113x",
      body: "NVIDIA actually delivered. Revenue exploded 200%+ year-over-year. EPS surged so fast that even as the stock rose, the P/E compressed dramatically. The stock went up and the P/E went DOWN simultaneously — because earnings grew even faster than price. Classic 'grow into your valuation.'" },
    { label: "PHASE 4", title: "The New Normal", period: "2024", color: "#c084fc", pe: "60–80x",
      body: "Both price and earnings continued to grow roughly in tandem. P/E stabilized in the 60–80x range — still expensive, but increasingly justified by actual cash flows from data center GPU demand (H100, H200). Hyperscalers were spending $50B+ annually on NVIDIA chips." },
    { label: "PHASE 5", title: "Re-Rating Lower", period: "Jan 2025 – Feb 2026", color: "#fbbf24", pe: "36–50x",
      body: "DeepSeek emerged — a Chinese AI model that claimed to match GPT-4 performance at a fraction of training cost. If AI models get cheaper to train, the argument for infinite GPU demand weakens. Tariff risks, macro fears, and slowing hyperscaler capex guidance all piled on. P/E has compressed to near its decade low DESPITE record earnings." },
  ];

  return (
    <div style={{
      background: "#080810",
      minHeight: "100vh",
      fontFamily: "'Courier New', monospace",
      color: "#e0e0e0",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #111122 100%)",
        borderBottom: "2px solid #76b900",
        padding: "28px 32px 20px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, width: 300, height: "100%",
          background: "radial-gradient(ellipse at 80% 50%, rgba(118,185,0,0.08) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#76b900", marginBottom: 6, textTransform: "uppercase" }}>
              NVDA / NASDAQ
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 900, margin: 0, letterSpacing: -1, lineHeight: 1 }}>
              <span style={{ color: "#76b900" }}>NVIDIA</span> P/E RATIO
            </h1>
            <div style={{ color: "#888", fontSize: 13, marginTop: 6 }}>Nov 2022 → Feb 2026 · TTM Trailing Twelve Months</div>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { label: "PEAK P/E", value: "~218x", sub: "Jul 2023", color: "#ff6b35" },
              { label: "CURRENT P/E", value: `${currentPE}x`, sub: "Feb 2026", color: "#76b900" },
              { label: "CHANGE FROM PEAK", value: "-83%", sub: "compression", color: "#fbbf24" },
            ].map(s => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, padding: "10px 16px", textAlign: "center"
              }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: "#666", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#555" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #1e1e2e", padding: "0 32px" }}>
        {["chart", "table", "analysis"].map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              background: "none",
              border: "none",
              borderBottom: activeTab === t ? "2px solid #76b900" : "2px solid transparent",
              color: activeTab === t ? "#76b900" : "#555",
              padding: "14px 20px",
              cursor: "pointer",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: "'Courier New', monospace",
              transition: "all 0.2s"
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ padding: "28px 32px" }}>

        {/* CHART TAB */}
        {activeTab === "chart" && (
          <div>
            <div style={{ marginBottom: 16, color: "#555", fontSize: 12 }}>
              Hover over data points to see key events
            </div>
            <ResponsiveContainer width="100%" height={420}>
              <AreaChart data={peData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id="peGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#76b900" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#76b900" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#555", fontSize: 10 }}
                  tickLine={false}
                  interval={3}
                  angle={-35}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tick={{ fill: "#555", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={v => `${v}x`}
                  domain={[0, 240]}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={100} stroke="#ff6b3540" strokeDasharray="4 4" label={{ value: "100x", fill: "#ff6b3560", fontSize: 10, position: "right" }} />
                <ReferenceLine y={50} stroke="#fbbf2430" strokeDasharray="4 4" label={{ value: "50x", fill: "#fbbf2440", fontSize: 10, position: "right" }} />
                <Area
                  type="monotone"
                  dataKey="pe"
                  stroke="#76b900"
                  strokeWidth={2.5}
                  fill="url(#peGradient)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#e8ff00", stroke: "#76b900", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Phase legend */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
              {phases.map(p => (
                <div key={p.label} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${p.color}44`,
                  borderLeft: `3px solid ${p.color}`,
                  borderRadius: 6, padding: "6px 12px",
                  fontSize: 11
                }}>
                  <span style={{ color: p.color, fontWeight: 700 }}>{p.label}</span>
                  <span style={{ color: "#888", marginLeft: 6 }}>{p.period}</span>
                  <span style={{ color: "#555", marginLeft: 6 }}>({p.pe})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TABLE TAB */}
        {activeTab === "table" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #76b900" }}>
                  {["Period", "P/E Ratio", "Stock Price", "TTM EPS (est.)", "Context"].map(h => (
                    <th key={h} style={{
                      textAlign: "left", padding: "10px 16px",
                      color: "#76b900", fontSize: 11, letterSpacing: 2, fontWeight: 700
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr
                    key={i}
                    onMouseEnter={() => setHighlighted(i)}
                    onMouseLeave={() => setHighlighted(null)}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      background: highlighted === i ? "rgba(118,185,0,0.06)" : "transparent",
                      transition: "background 0.15s"
                    }}
                  >
                    <td style={{ padding: "12px 16px", color: "#aaa", fontWeight: 600 }}>{row.period}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        color: row.pe > 150 ? "#ff6b35" : row.pe > 80 ? "#fbbf24" : "#76b900",
                        fontSize: 16, fontWeight: 900
                      }}>{row.pe}x</span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#888" }}>{row.stockPrice}</td>
                    <td style={{ padding: "12px 16px", color: "#888" }}>{row.eps_ttm}</td>
                    <td style={{ padding: "12px 16px", color: "#666", fontSize: 12 }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: 24, background: "rgba(118,185,0,0.05)", border: "1px solid rgba(118,185,0,0.2)", borderRadius: 8, padding: 16, fontSize: 12, color: "#888", lineHeight: 1.7 }}>
              <span style={{ color: "#76b900" }}>📌 Key insight:</span> From Nov 2022 to Feb 2026, NVDA's EPS grew ~19x (from ~$0.26 to ~$4.90). The stock price grew ~11x. The P/E actually <span style={{ color: "#fbbf24" }}>compressed</span> — investors paid less per dollar of earnings in 2026 than in 2022, despite the stock being dramatically higher. Earnings grew faster than price.
            </div>
          </div>
        )}

        {/* ANALYSIS TAB */}
        {activeTab === "analysis" && (
          <div style={{ maxWidth: 800 }}>
            <h2 style={{ color: "#76b900", fontSize: 20, marginBottom: 24, letterSpacing: -0.5 }}>
              WTF Is Going On — Explained
            </h2>

            <div style={{ marginBottom: 32, padding: 16, background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 8 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#ff6b35", marginBottom: 8 }}>THE BIG PICTURE</div>
              <p style={{ margin: 0, lineHeight: 1.8, color: "#ccc", fontSize: 14 }}>
                NVIDIA's P/E chart tells a story about what happens when the market suddenly decides a company is the <em style={{ color: "#ff6b35" }}>infrastructure of civilization</em>. The P/E spike to 200x+ was the market pricing in an AI supercycle years in advance. What followed was one of the most remarkable "grow into your valuation" stories in stock market history — and now a re-rating that says the market isn't sure the party continues.
              </p>
            </div>

            {phases.map((p, i) => (
              <div key={i} style={{
                marginBottom: 20,
                borderLeft: `3px solid ${p.color}`,
                paddingLeft: 20,
                paddingBottom: 4,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ color: p.color, fontSize: 10, fontWeight: 900, letterSpacing: 3 }}>{p.label}</span>
                  <span style={{ color: "#eee", fontSize: 15, fontWeight: 700 }}>{p.title}</span>
                  <span style={{ color: "#555", fontSize: 11 }}>{p.period} · {p.pe}</span>
                </div>
                <p style={{ margin: 0, color: "#999", lineHeight: 1.75, fontSize: 13 }}>{p.body}</p>
              </div>
            ))}

            <div style={{ marginTop: 32, padding: 20, background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 10 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#fbbf24", marginBottom: 12 }}>THE BOTTOM LINE</div>
              <p style={{ margin: "0 0 12px", color: "#ccc", lineHeight: 1.8, fontSize: 13 }}>
                <strong style={{ color: "#fff" }}>The P/E didn't collapse because NVIDIA failed.</strong> It collapsed because NVIDIA <em>succeeded so spectacularly</em> that earnings caught up to the speculative price. In a weird way, a falling P/E here was the <em>bullish</em> outcome for most of 2023–2024.
              </p>
              <p style={{ margin: "0 0 12px", color: "#ccc", lineHeight: 1.8, fontSize: 13 }}>
                <strong style={{ color: "#fff" }}>The current ~36x P/E is near a decade low,</strong> even as NVDA prints record earnings ($4.90 EPS TTM). This means the market is no longer giving them much growth premium. The question is whether hyperscaler AI capex sustains, whether Blackwell demand holds, and whether DeepSeek-style efficiency gains reduce GPU demand.
              </p>
              <p style={{ margin: 0, color: "#ccc", lineHeight: 1.8, fontSize: 13 }}>
                <strong style={{ color: "#fff" }}>Either NVDA's earnings continue to grow</strong> (making the current P/E cheap in hindsight), <strong style={{ color: "#fff" }}>or growth slows</strong> and the stock has to fall to maintain even this P/E. That's the trillion-dollar bet the market is currently making.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}