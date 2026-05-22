import { motion } from "motion/react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

// ─── Design tokens ──────────────────────────────────────────────────────────────
// BG/PANEL/BORDER/DIM are computed at runtime from useTheme inside the export
const ACCENT = "#5227FF";
const RED = "#E85D75";
const TEAL = "#00B3A4";
const GREEN = "#2FBF71";
const AMBER = "#F59E0B";

// ─── Types ────────────────────────────────────────────────────────────────────
type CellStatus = "ok" | "error" | "warn" | "missing";

interface MatrixCell {
  value: string;
  status: CellStatus;
}

interface MatrixRow {
  attribute: string;
  salarySlip: MatrixCell;
  bankStatement: MatrixCell;
  gstFiling: MatrixCell;
  itr2023: MatrixCell;
}

interface TimelineEvent {
  date: string;
  description: string;
  warning?: string;
  position: "above" | "below";
  color: string;
}

interface InsightCard {
  text: string;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const matrixRows: MatrixRow[] = [
  {
    attribute: "Monthly Income",
    salarySlip: { value: "₹1,20,000 ✓", status: "ok" },
    bankStatement: { value: "₹38,000 ✗", status: "error" },
    gstFiling: { value: "—", status: "missing" },
    itr2023: { value: "₹3,60,000/yr ⚠", status: "warn" },
  },
  {
    attribute: "Annual Turnover",
    salarySlip: { value: "—", status: "missing" },
    bankStatement: { value: "₹4,56,000", status: "ok" },
    gstFiling: { value: "₹2,10,000 ✗", status: "error" },
    itr2023: { value: "₹3,60,000 ⚠", status: "warn" },
  },
  {
    attribute: "Property Ownership",
    salarySlip: { value: "—", status: "missing" },
    bankStatement: { value: "—", status: "missing" },
    gstFiling: { value: "—", status: "missing" },
    itr2023: { value: "Not declared ✗", status: "error" },
  },
  {
    attribute: "EMI Capacity",
    salarySlip: { value: "₹42,000 ✓", status: "ok" },
    bankStatement: { value: "₹12,000 ✗", status: "error" },
    gstFiling: { value: "—", status: "missing" },
    itr2023: { value: "₹10,000 ✗", status: "error" },
  },
  {
    attribute: "Tax Paid",
    salarySlip: { value: "—", status: "missing" },
    bankStatement: { value: "—", status: "missing" },
    gstFiling: { value: "₹8,400", status: "ok" },
    itr2023: { value: "₹0 ✗", status: "error" },
  },
];

const timelineEvents: TimelineEvent[] = [
  {
    date: "Jan 2019",
    description: "Started employment at TechSolve Pvt Ltd",
    position: "above",
    color: TEAL,
  },
  {
    date: "Mar 2020",
    description: "Property purchased — Plot 44, Andheri (₹45L)",
    position: "below",
    color: AMBER,
  },
  {
    date: "Jun 2021",
    description: "Annual income declared: ₹3.6L/yr in ITR",
    warning: "Property purchased BEFORE sufficient income could exist — 14-month gap",
    position: "above",
    color: RED,
  },
  {
    date: "Aug 2022",
    description: "Second property acquired — Flat 12B, Powai (₹38L)",
    position: "below",
    color: AMBER,
  },
  {
    date: "Nov 2023",
    description: "GST turnover registered: ₹2.1L/yr",
    position: "above",
    color: TEAL,
  },
  {
    date: "Feb 2024",
    description: "Loan application submitted — ₹52L",
    position: "below",
    color: ACCENT,
  },
];

const chartData = [
  { month: "Mar", declaredIncome: 120000, bankInflows: 38000, cashWithdrawals: 15000 },
  { month: "Apr", declaredIncome: 120000, bankInflows: 41000, cashWithdrawals: 18000 },
  { month: "May", declaredIncome: 120000, bankInflows: 36000, cashWithdrawals: 12000 },
  { month: "Jun", declaredIncome: 120000, bankInflows: 39000, cashWithdrawals: 20000 },
  { month: "Jul", declaredIncome: 120000, bankInflows: 35000, cashWithdrawals: 22000 },
  { month: "Aug", declaredIncome: 120000, bankInflows: 42000, cashWithdrawals: 19000 },
  { month: "Sep", declaredIncome: 120000, bankInflows: 37000, cashWithdrawals: 25000 },
  { month: "Oct", declaredIncome: 120000, bankInflows: 40000, cashWithdrawals: 89000 },
  { month: "Nov", declaredIncome: 120000, bankInflows: 38000, cashWithdrawals: 95000 },
  { month: "Dec", declaredIncome: 120000, bankInflows: 34000, cashWithdrawals: 28000 },
  { month: "Jan", declaredIncome: 120000, bankInflows: 36000, cashWithdrawals: 21000 },
  { month: "Feb", declaredIncome: 120000, bankInflows: 39000, cashWithdrawals: 17000 },
];

const insightCards: InsightCard[] = [
  { text: "Income-spend mismatch for 8 consecutive months", color: RED },
  { text: "Cash withdrawal spike coincides with property registration", color: AMBER },
  { text: "Behavioral pattern inconsistent with declared income", color: RED },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function cellStyle(status: CellStatus): React.CSSProperties {
  switch (status) {
    case "ok":
      return { background: "rgba(47,191,113,0.13)", color: GREEN, fontWeight: 600 };
    case "error":
      return { background: "rgba(232,93,117,0.15)", color: RED, fontWeight: 600 };
    case "warn":
      return { background: "rgba(245,158,11,0.13)", color: AMBER, fontWeight: 600 };
    case "missing":
      return { color: "rgba(150,150,150,0.7)", fontStyle: "italic" };
  }
}

// ─── Cross-Document Matrix ────────────────────────────────────────────────────
function MatrixTable() {
  const { c, isDark } = useTheme();
  const BORDER = c.border;
  const DIM = c.textDim;
  const colHeaders = ["Salary Slip", "Bank Statement", "GST Filing", "ITR 2023"];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>
        <thead>
          <tr>
            <th style={{ padding: "10px 16px", textAlign: "left", color: c.textMuted, fontWeight: 500, borderBottom: `1px solid ${BORDER}`, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, textTransform: "uppercase" as const, letterSpacing: "0.08em", whiteSpace: "nowrap" as const }}>
              Document Source
            </th>
            {colHeaders.map((h) => (
              <th key={h} style={{ padding: "10px 16px", textAlign: "center", color: c.textMuted, fontWeight: 500, borderBottom: `1px solid ${BORDER}`, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, textTransform: "uppercase" as const, letterSpacing: "0.08em", whiteSpace: "nowrap" as const }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrixRows.map((row, i) => {
            const cells = [row.salarySlip, row.bankStatement, row.gstFiling, row.itr2023];
            return (
              <tr key={row.attribute} style={{ background: i % 2 === 0 ? (isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)") : "transparent" }}>
                <td style={{ padding: "10px 16px", color: c.text, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500, borderBottom: `1px solid ${BORDER}`, whiteSpace: "nowrap" as const }}>
                  {row.attribute}
                </td>
                {cells.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 16px", textAlign: "center", borderBottom: `1px solid ${BORDER}`, whiteSpace: "nowrap" as const }}>
                    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 4, fontSize: 11, ...cellStyle(cell.status) }}>
                      {cell.value}
                    </span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: 14, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" as const }}>
        <span style={{ background: "rgba(232,93,117,0.14)", border: `1px solid ${RED}`, color: RED, padding: "4px 14px", borderRadius: 20, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 700 }}>
          Contradiction Score: 7 / 12 fields
        </span>
        <span style={{ color: DIM, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif" }}>
          <span style={{ color: RED }}>✗</span> Contradiction &nbsp;
          <span style={{ color: AMBER }}>⚠</span> Warning &nbsp;
          <span style={{ color: GREEN }}>✓</span> Match
        </span>
      </div>
    </div>
  );
}

// ─── Timeline Intelligence ────────────────────────────────────────────────────
function TimelineStrip() {
  const { c } = useTheme();
  const BORDER = c.border;
  const BG = c.bg;
  return (
    <div style={{ position: "relative", padding: "72px 0 72px 0" }}>
      {/* Horizontal line */}
      <div style={{ position: "absolute", top: "50%", left: "4%", right: "4%", height: 2, background: `linear-gradient(90deg, ${BORDER}, rgba(82,39,255,0.5), ${BORDER})`, transform: "translateY(-50%)" }} />

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${timelineEvents.length}, 1fr)`, position: "relative" }}>
        {timelineEvents.map((evt, i) => {
          const isAbove = evt.position === "above";
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Above area */}
              <div style={{ height: 100, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", paddingBottom: 14, paddingLeft: 6, paddingRight: 6 }}>
                {isAbove && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: evt.color, fontWeight: 700, marginBottom: 3 }}>{evt.date}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: c.textMuted, lineHeight: 1.4, maxWidth: 130 }}>{evt.description}</div>
                    {evt.warning && (
                      <div style={{ marginTop: 6, background: "rgba(232,93,117,0.12)", border: `1px solid ${RED}40`, borderRadius: 4, padding: "4px 7px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: RED, lineHeight: 1.4, maxWidth: 140 }}>
                        ⚠ {evt.warning}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 220 }}
                style={{ width: 14, height: 14, borderRadius: "50%", background: evt.color, border: `3px solid ${BG}`, boxShadow: `0 0 10px ${evt.color}70`, flexShrink: 0, zIndex: 2 }}
              />

              {/* Below area */}
              <div style={{ height: 100, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", paddingTop: 14, paddingLeft: 6, paddingRight: 6 }}>
                {!isAbove && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: evt.color, fontWeight: 700, marginBottom: 3 }}>{evt.date}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: c.textMuted, lineHeight: 1.4, maxWidth: 130 }}>{evt.description}</div>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Chart tooltip ────────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label }: any) {
  const { c } = useTheme();
  const BORDER = c.border;
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: c.bgCard, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px 14px", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: c.text }}>
      <div style={{ marginBottom: 6, color: c.textMuted, fontSize: 11 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: ₹{Number(p.value).toLocaleString("en-IN")}
        </div>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ContradictionEngine() {
  const { c, isDark } = useTheme();
  const BG = c.bg;
  const PANEL = c.bgCard;
  const BORDER = c.border;
  const DIM = c.textDim;
  return (
    <div style={{ minHeight: "100vh", background: BG, padding: 24, fontFamily: "'Space Grotesk', sans-serif", color: c.text }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>

        {/* ── Page header ── */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} style={{ marginBottom: 18 }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28, margin: 0, letterSpacing: "-0.02em", color: c.text }}>
            Contradiction Engine
          </h1>
          <p style={{ margin: "4px 0 0", color: c.textDim, fontSize: 14, letterSpacing: "0.03em" }}>
            Financial Story Verification
          </p>
        </motion.div>

        {/* ── Subject info bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          style={{ display: "flex", alignItems: "center", gap: 16, background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 20px", marginBottom: 24, flexWrap: "wrap" as const }}
        >
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: c.textMuted, flex: 1, minWidth: 200 }}>
            Case #4521 &nbsp;·&nbsp; Rajesh Kumar &nbsp;·&nbsp; Application: Home Loan ₹52L
          </div>
          <div style={{ background: "rgba(232,93,117,0.14)", border: `1px solid ${RED}`, color: RED, padding: "5px 16px", borderRadius: 20, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap" as const }}>
            CRITICAL: 94 / 100
          </div>
        </motion.div>

        {/* ── Section 1: Cross-Document Matrix ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.13 }}
          style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, marginBottom: 20 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, margin: 0, color: "#fff" }}>
              Cross-Document Matrix
            </h2>
            <span style={{ background: "rgba(82,39,255,0.14)", border: `1px solid ${ACCENT}40`, color: ACCENT, padding: "2px 9px", borderRadius: 4, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600 }}>
              LIVE ANALYSIS
            </span>
          </div>
          <MatrixTable />
        </motion.section>

        {/* ── Section 2: Timeline Intelligence ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "24px 32px", marginBottom: 20, overflow: "hidden" }}
        >
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 2px", color: "#fff" }}>
            Timeline Intelligence
          </h2>
          <p style={{ margin: "0 0 0", fontSize: 12, color: c.textDim, fontFamily: "'Space Grotesk', sans-serif" }}>
            Chronological event analysis · Bloomberg-style event strip
          </p>
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: 720 }}>
              <TimelineStrip />
            </div>
          </div>
        </motion.section>

        {/* ── Section 3: Behavioral Financial Analysis ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.23 }}
          style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, margin: 0, color: "#fff" }}>
              Behavioral Financial Analysis
            </h2>
            <span style={{ background: "rgba(245,158,11,0.14)", border: `1px solid ${AMBER}40`, color: AMBER, padding: "2px 9px", borderRadius: 4, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600, marginLeft: "auto" }}>
              ANOMALY: OCT–NOV
            </span>
          </div>
          <p style={{ margin: "0 0 18px", fontSize: 12, color: c.textDim }}>
            12-month declared income vs bank inflows · cash withdrawal pattern
          </p>

          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: c.textDim as string, fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} tick={{ fill: c.textDim as string, fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }} axisLine={false} tickLine={false} width={38} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ paddingTop: 10, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: c.textDim }} />
                <Bar dataKey="declaredIncome" name="Declared Income" fill={ACCENT} fillOpacity={0.7} radius={[2, 2, 0, 0]} barSize={9} />
                <Bar dataKey="bankInflows" name="Bank Inflows" fill={TEAL} fillOpacity={0.7} radius={[2, 2, 0, 0]} barSize={9} />
                <Line type="monotone" dataKey="cashWithdrawals" name="Cash Withdrawals" stroke={AMBER} strokeWidth={2} dot={{ r: 3, fill: AMBER, strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Insight cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 18 }}>
            {insightCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.28 + i * 0.07 }}
                style={{ background: `${card.color}0D`, border: `1px solid ${card.color}35`, borderLeft: `3px solid ${card.color}`, borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: card.color, marginTop: 6, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: c.textMuted, lineHeight: 1.5 }}>
                  {card.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}
