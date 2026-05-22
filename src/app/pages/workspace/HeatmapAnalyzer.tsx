import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Map, Activity, Filter, Radio, SlidersHorizontal, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from "recharts";
import { useTheme } from "../../context/ThemeContext";

const RED = "#E85D75";
const AMBER = "#F59E0B";
const TEAL = "#00B3A4";
const PURPLE = "#5227FF";
const GREEN = "#2FBF71";

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  bg: "#06080F",
  surface: "#0D1117",
  surfaceAlt: "#111827",
  border: "#1E2433",
  accent: "#5227FF",
  alert: "#E85D75",
  teal: "#00B3A4",
  green: "#2FBF71",
  amber: "#F59E0B",
  textPrimary: "#E8EAF0",
  textSecondary: "#6B7280",
  textMuted: "#374151",
};

// ─── City data (approximate SVG coords within 520×600 viewBox) ───────────────
const cities = [
  { name: "Mumbai",    cx: 128, cy: 380, count: 8420, type: "Loan Fraud",        intensity: 1.00 },
  { name: "Delhi",     cx: 230, cy: 135, count: 7890, type: "Identity Theft",    intensity: 0.94 },
  { name: "Bengaluru", cx: 182, cy: 450, count: 6340, type: "Document Forgery",  intensity: 0.78 },
  { name: "Hyderabad", cx: 210, cy: 400, count: 5180, type: "Loan Fraud",        intensity: 0.70 },
  { name: "Chennai",   cx: 225, cy: 470, count: 4210, type: "PAN Fraud",         intensity: 0.60 },
  { name: "Kolkata",   cx: 365, cy: 265, count: 4650, type: "Document Forgery",  intensity: 0.64 },
  { name: "Pune",      cx: 145, cy: 390, count: 3870, type: "Loan Fraud",        intensity: 0.54 },
  { name: "Ahmedabad", cx: 120, cy: 305, count: 3540, type: "Identity Theft",    intensity: 0.50 },
  { name: "Jaipur",    cx: 192, cy: 205, count: 2810, type: "PAN Fraud",         intensity: 0.42 },
  { name: "Lucknow",   cx: 270, cy: 195, count: 2430, type: "Identity Theft",    intensity: 0.36 },
  { name: "Patna",     cx: 315, cy: 220, count: 1980, type: "Document Forgery",  intensity: 0.30 },
  { name: "Bhopal",    cx: 210, cy: 285, count: 2120, type: "Loan Fraud",        intensity: 0.32 },
  { name: "Surat",     cx: 122, cy: 330, count: 2640, type: "PAN Fraud",         intensity: 0.38 },
  { name: "Nagpur",    cx: 237, cy: 330, count: 1750, type: "Document Forgery",  intensity: 0.26 },
  { name: "Kochi",     cx: 172, cy: 500, count: 1460, type: "PAN Fraud",         intensity: 0.22 },
];

const stateData = [
  { state: "Maharashtra", cases: 12290 },
  { state: "Delhi NCR",   cases: 10340 },
  { state: "Karnataka",   cases: 8720  },
  { state: "Telangana",   cases: 6180  },
  { state: "Tamil Nadu",  cases: 6430  },
  { state: "West Bengal", cases: 5490  },
  { state: "Gujarat",     cases: 5210  },
  { state: "UP",          cases: 4820  },
  { state: "Rajasthan",   cases: 3850  },
  { state: "Bihar",       cases: 2640  },
];

const FRAUD_TYPES = ["Loan Fraud", "Document Forgery", "Identity Theft", "PAN Fraud"];
const DATE_RANGES = [{ label: "Last 7d", key: "7d" }, { label: "Last 30d", key: "30d" }, { label: "Last 90d", key: "90d" }, { label: "1 Year", key: "1yr" }];

const LIVE_EVENTS_INIT = [
  { id: 1, time: "14:32:01", city: "Mumbai",    type: "Loan Fraud",        severity: "CRITICAL", detail: "₹85L app — synthetic doc" },
  { id: 2, time: "14:30:47", city: "Delhi",     type: "Identity Theft",    severity: "HIGH",     detail: "PAN in 6 simultaneous apps" },
  { id: 3, time: "14:28:12", city: "Bengaluru", type: "Document Forgery",  severity: "HIGH",     detail: "Font inconsistency detected" },
  { id: 4, time: "14:25:33", city: "Hyderabad", type: "Loan Fraud",        severity: "MEDIUM",   detail: "Income mismatch ratio 3.4×" },
  { id: 5, time: "14:22:08", city: "Pune",      type: "PAN Fraud",         severity: "HIGH",     detail: "Duplicate PAN across 4 lenders" },
  { id: 6, time: "14:18:55", city: "Chennai",   type: "Document Forgery",  severity: "MEDIUM",   detail: "Metadata modified post-creation" },
];

function intensityColor(i: number): string {
  if (i > 0.75) return RED;
  if (i > 0.45) return AMBER;
  return TEAL;
}

function severityColor(s: string): string {
  return s === "CRITICAL" ? RED : s === "HIGH" ? AMBER : TEAL;
}

function BarChartTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 6, padding: "8px 12px", fontFamily: "'IBM Plex Mono', monospace" }}>
      <div style={{ fontSize: 11, color: T.textSecondary, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13, color: RED, fontWeight: 700 }}>{payload[0]?.value?.toLocaleString()} cases</div>
    </div>
  );
}

export function HeatmapAnalyzer() {
  const { c, isDark } = useTheme();
  // Override theme-dependent tokens
  Object.assign(T, {
    bg: c.bg,
    surface: c.bgSecondary,
    surfaceAlt: c.bgCard,
    border: c.border,
    textPrimary: c.text,
    textSecondary: c.textMuted,
    textMuted: c.textDim,
  });

  const [hoveredCity, setHoveredCity] = useState<typeof cities[0] | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>({
    "Loan Fraud": true, "Document Forgery": true, "Identity Theft": true, "PAN Fraud": true,
  });
  const [dateRange, setDateRange] = useState("30d");
  const [threshold, setThreshold] = useState(20);
  const [feed, setFeed] = useState(LIVE_EVENTS_INIT);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const rotCities = ["Ahmedabad", "Jaipur", "Lucknow", "Kolkata", "Nagpur", "Surat"];
    const rotTypes  = ["Loan Fraud", "Identity Theft", "Document Forgery", "PAN Fraud"];
    const rotSev    = ["HIGH", "MEDIUM", "CRITICAL"] as const;
    const rotDetail = ["Multiple apps from single IP", "Salary slip font inconsistency", "PAN linked to multiple IDs", "Property value mismatch", "Cash flow anomaly flagged"];
    const now = new Date();
    setFeed(prev => [
      { id: Date.now(), time: now.toTimeString().slice(0, 8), city: rotCities[tick % rotCities.length], type: rotTypes[tick % rotTypes.length], severity: rotSev[tick % rotSev.length], detail: rotDetail[tick % rotDetail.length] },
      ...prev.slice(0, 5),
    ]);
  }, [tick]);

  const toggleType = (t: string) => setSelectedTypes(s => ({ ...s, [t]: !s[t] }));
  const visibleCities = cities.filter(c => selectedTypes[c.type] && c.intensity * 100 >= threshold / 5);

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: "'Space Grotesk', sans-serif", color: T.textPrimary, overflow: "hidden" }}>

      {/* ── Left Filter Panel ── */}
      <div style={{ width: 240, flexShrink: 0, borderRight: `1px solid ${T.border}`, background: T.surface, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ padding: "16px 14px 12px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <SlidersHorizontal size={14} color={PURPLE} />
          <span style={{ fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: "0.06em" }}>FILTERS</span>
        </div>

        <div style={{ padding: "14px", flex: 1 }}>
          {/* Fraud type checkboxes */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace" }}>FRAUD TYPE</div>
            {FRAUD_TYPES.map((type) => {
              const checked = selectedTypes[type];
              return (
                <div key={type} onClick={() => toggleType(type)} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${checked ? PURPLE : T.border}`, background: checked ? PURPLE : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                    {checked && <div style={{ width: 8, height: 8, borderRadius: 2, background: "#fff" }} />}
                  </div>
                  <span style={{ fontSize: 12, color: checked ? T.textPrimary : T.textSecondary }}>{type}</span>
                </div>
              );
            })}
          </div>

          {/* Date range */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace" }}>DATE RANGE</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {DATE_RANGES.map(({ label, key }) => {
                const active = dateRange === key;
                return (
                  <button key={key} onClick={() => setDateRange(key)}
                    style={{ padding: "7px 0", borderRadius: 6, border: `1px solid ${active ? PURPLE : T.border}`, background: active ? "rgba(82,39,255,0.15)" : "transparent", color: active ? "#A78BFA" : T.textSecondary, fontSize: 11, cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontWeight: active ? 700 : 400, transition: "all 0.15s" }}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intensity threshold */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: "0.08em", fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace" }}>INTENSITY THRESHOLD</div>
              <span style={{ fontSize: 10, color: PURPLE, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>{threshold}%</span>
            </div>
            <input type="range" min={0} max={80} step={10} value={threshold} onChange={e => setThreshold(Number(e.target.value))}
              style={{ width: "100%", accentColor: PURPLE, cursor: "pointer" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 9, color: T.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>All</span>
              <span style={{ fontSize: 9, color: T.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>High only</span>
            </div>
          </div>

          {/* Density legend */}
          <div>
            <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace" }}>DENSITY LEGEND</div>
            {[{ label: "High (>5000)", color: RED }, { label: "Medium (2k–5k)", color: AMBER }, { label: "Low (<2000)", color: TEAL }].map(leg => (
              <div key={leg.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: leg.color }} />
                <span style={{ fontSize: 11, color: T.textSecondary }}>{leg.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "12px 14px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: "0.08em", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4 }}>VISIBLE CITIES</div>
          <div style={{ fontSize: 24, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: PURPLE }}>{visibleCities.length}</div>
        </div>
      </div>

      {/* ── Main Area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Page header */}
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, background: T.surface, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <Map size={18} color={PURPLE} />
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontFamily: "'Syne', sans-serif", fontWeight: 800, letterSpacing: "-0.01em" }}>India Fraud Density Map</h1>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: T.textSecondary }}>{visibleCities.length} active hotspots · {DATE_RANGES.find(d => d.key === dateRange)?.label}</p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20, background: "rgba(232,93,117,0.1)", border: "1px solid rgba(232,93,117,0.2)" }}>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: "50%", background: RED }} />
            <span style={{ fontSize: 10, color: RED, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, letterSpacing: "0.06em" }}>LIVE DATA</span>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* Map + bar chart */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", padding: "16px 16px 16px 20px", gap: 16 }}>

            {/* SVG Map */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", position: "relative" }}>
              <div style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                <Filter size={12} color={T.textSecondary} />
                <span style={{ fontSize: 11, color: T.textSecondary, fontFamily: "'IBM Plex Mono', monospace" }}>Showing {visibleCities.length} of {cities.length} cities</span>
              </div>
              <div style={{ padding: "0 16px 16px", position: "relative" }}>
                <svg viewBox="60 50 400 520" width="100%" height={380} style={{ display: "block" }}>
                  <defs>
                    <pattern id="hm-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                    </pattern>
                    <radialGradient id="hm-radial" cx="50%" cy="50%" r="50%">
                      <stop key="hm-r-0" offset="0%" stopColor="rgba(82,39,255,0.05)" />
                      <stop key="hm-r-1" offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                  </defs>
                  <rect x="60" y="50" width="400" height="520" fill="url(#hm-grid)" />
                  <rect x="60" y="50" width="400" height="520" fill="url(#hm-radial)" />

                  {/* India silhouette */}
                  <path
                    d="M200,30 L280,25 L350,60 L420,90 L430,150 L420,200 L440,260 L400,300 L380,350 L360,400 L300,450 L280,510 L260,550 L240,560 L220,550 L210,510 L190,470 L150,440 L120,400 L100,350 L90,300 L80,240 L85,180 L100,130 L120,90 L160,55 Z"
                    fill="rgba(82,39,255,0.05)"
                    stroke="rgba(82,39,255,0.2)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* City dots */}
                  {visibleCities.map((city) => {
                    const r = city.intensity * 14 + 5;
                    const color = intensityColor(city.intensity);
                    const isHov = hoveredCity?.name === city.name;
                    return (
                      <g key={city.name} onMouseEnter={() => setHoveredCity(city)} onMouseLeave={() => setHoveredCity(null)} style={{ cursor: "pointer" }}>
                        {/* Outer glow */}
                        <circle cx={city.cx} cy={city.cy} r={r + 8} fill={color} opacity={0.08} />
                        <circle cx={city.cx} cy={city.cy} r={r + 4} fill={color} opacity={0.14} />
                        {/* Main dot */}
                        <circle cx={city.cx} cy={city.cy} r={r} fill={color} opacity={isHov ? 1 : 0.75} />
                        {/* Center highlight */}
                        <circle cx={city.cx} cy={city.cy} r={r * 0.35} fill="#fff" opacity={0.35} />
                        {/* Label */}
                        <text x={city.cx} y={city.cy + r + 12} textAnchor="middle" fill={isHov ? T.textPrimary : T.textSecondary} fontSize={isHov ? 9 : 8} fontFamily="'IBM Plex Mono',monospace" fontWeight={isHov ? 700 : 400}>{city.name}</text>
                        {/* Tooltip */}
                        {isHov && (
                          <g>
                            <rect x={city.cx + r + 4} y={city.cy - 26} width={106} height={50} rx={6} fill={T.surfaceAlt} stroke={`${color}50`} strokeWidth={1} />
                            <text x={city.cx + r + 57} y={city.cy - 12} textAnchor="middle" fill={T.textPrimary} fontSize={9} fontFamily="'Syne',sans-serif" fontWeight={700}>{city.name}</text>
                            <text x={city.cx + r + 57} y={city.cy + 1} textAnchor="middle" fill={color} fontSize={9} fontFamily="'IBM Plex Mono',monospace" fontWeight={700}>{city.count.toLocaleString()} cases</text>
                            <text x={city.cx + r + 57} y={city.cy + 14} textAnchor="middle" fill={T.textSecondary} fontSize={7.5} fontFamily="'Space Grotesk',sans-serif">{city.type}</text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* State bar chart */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: T.textPrimary, marginBottom: 14, letterSpacing: "0.04em" }}>
                TOP 10 STATES BY FRAUD CASES
              </div>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"} vertical={false} />
                    <XAxis dataKey="state" tick={{ fill: T.textSecondary, fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} tick={{ fill: T.textSecondary, fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<BarChartTooltip />} />
                    <Bar dataKey="cases" radius={[4, 4, 0, 0]}>
                      {stateData.map((_, index) => (
                        <Cell key={index} fill={index < 3 ? RED : index < 6 ? AMBER : TEAL} opacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ── Live Anomaly Feed ── */}
          <div style={{ width: 280, flexShrink: 0, borderLeft: `1px solid ${T.border}`, background: T.surface, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "14px 14px 12px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
              <Radio size={13} color={RED} />
              <span style={{ fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: "0.06em" }}>LIVE ANOMALY FEED</span>
              <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: RED, marginLeft: "auto" }} />
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
              <AnimatePresence initial={false}>
                {feed.map((item) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                    style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 12px", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", color: T.textMuted }}>{item.time}</span>
                      <span style={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, letterSpacing: "0.06em", color: severityColor(item.severity), background: `${severityColor(item.severity)}18`, padding: "2px 6px", borderRadius: 3 }}>
                        {item.severity}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <AlertTriangle size={11} color={severityColor(item.severity)} />
                      <span style={{ fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: T.textPrimary }}>{item.city}</span>
                      <span style={{ fontSize: 10, color: T.textMuted }}>·</span>
                      <span style={{ fontSize: 11, color: T.textSecondary }}>{item.type}</span>
                    </div>
                    <div style={{ fontSize: 10, color: T.textMuted, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.4 }}>{item.detail}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div style={{ padding: "10px 12px", borderTop: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 10, color: T.textMuted, fontFamily: "'IBM Plex Mono', monospace", textAlign: "center" }}>
                Auto-refreshing every 4.5s · {feed.length} events
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
