import { motion } from "motion/react";
import {
  AlertTriangle,
  FileText,
  Search,
  TrendingUp,
  Activity,
  Clock,
  ChevronRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

// ─── Fixed accent colors (intentional brand colors, not theme-dependent) ───────
const PURPLE = "#5227FF";
const RED = "#E85D75";
const TEAL = "#00B3A4";
const GREEN = "#2FBF71";
const AMBER = "#F59E0B";

// ─── Chart data ───────────────────────────────────────────────────────────────
const chartData = [
  { month: "Jun", anomaly: 28, risk: 42, verification: 61 },
  { month: "Jul", anomaly: 35, risk: 38, verification: 72 },
  { month: "Aug", anomaly: 22, risk: 55, verification: 65 },
  { month: "Sep", anomaly: 49, risk: 61, verification: 58 },
  { month: "Oct", anomaly: 31, risk: 48, verification: 80 },
  { month: "Nov", anomaly: 57, risk: 70, verification: 74 },
  { month: "Dec", anomaly: 44, risk: 65, verification: 69 },
  { month: "Jan", anomaly: 62, risk: 78, verification: 83 },
  { month: "Feb", anomaly: 38, risk: 52, verification: 77 },
  { month: "Mar", anomaly: 71, risk: 85, verification: 91 },
  { month: "Apr", anomaly: 55, risk: 73, verification: 88 },
  { month: "May", anomaly: 83, risk: 92, verification: 95 },
];

// ─── Feed items ───────────────────────────────────────────────────────────────
const feedItems = [
  {
    id: 1,
    severity: "critical",
    time: "2 min ago",
    message: "⚠ Suspicious OCR layer modification detected in Case #4521",
  },
  {
    id: 2,
    severity: "high",
    time: "8 min ago",
    message: "🔗 Fraud ring connection identified — 6 entities linked to PAN AAABK2190K",
  },
  {
    id: 3,
    severity: "medium",
    time: "15 min ago",
    message: "📄 Document integrity failure: Income certificate Case #4489 (AI confidence 97.3%)",
  },
  {
    id: 4,
    severity: "high",
    time: "23 min ago",
    message: "🏠 Property valuation mismatch ₹2.1Cr discrepancy flagged in Case #4476",
  },
  {
    id: 5,
    severity: "low",
    time: "41 min ago",
    message: "✓ Verification complete — Case #4460 cleared, no anomalies detected",
  },
];

const severityColor: Record<string, string> = {
  critical: RED,
  high: AMBER,
  medium: PURPLE,
  low: GREEN,
};

// ─── Active investigations ────────────────────────────────────────────────────
const investigations = [
  {
    id: "INV-4521",
    name: "Rajesh Kumar",
    risk: 94,
    evidence: 18,
    analyst: "AK",
    status: "Escalated",
    statusColor: RED,
  },
  {
    id: "INV-4489",
    name: "Meena Sharma",
    risk: 78,
    evidence: 11,
    analyst: "PS",
    status: "Under Review",
    statusColor: AMBER,
  },
  {
    id: "INV-4476",
    name: "Harish Pillai",
    risk: 62,
    evidence: 7,
    analyst: "RM",
    status: "Under Review",
    statusColor: AMBER,
  },
  {
    id: "INV-4460",
    name: "Divya Nair",
    risk: 21,
    evidence: 5,
    analyst: "VT",
    status: "Pending",
    statusColor: TEAL,
  },
];

function riskColor(score: number) {
  if (score >= 80) return RED;
  if (score >= 55) return AMBER;
  if (score >= 35) return PURPLE;
  return GREEN;
}

// ─── Metric card ─────────────────────────────────────────────────────────────
function MetricCard({
  icon,
  label,
  value,
  accent,
  delay,
  c,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
  delay: number;
  c: ReturnType<typeof useTheme>["c"];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      style={{
        background: c.bgCard,
        border: `1px solid ${c.border}`,
        borderRadius: 16,
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        flex: 1,
        minWidth: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* accent glow */}
      <div
        style={{
          position: "absolute",
          top: -30,
          left: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: accent,
          opacity: 0.08,
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: `${accent}18`,
          border: `1px solid ${accent}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: accent,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontFamily: "Space Grotesk, sans-serif",
            color: c.textDim,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 24,
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            color: c.text,
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  const { c } = useTheme();
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: c.bgCardSolid,
        border: `1px solid ${c.border}`,
        borderRadius: 10,
        padding: "10px 14px",
        fontFamily: "IBM Plex Mono, monospace",
        fontSize: 12,
      }}
    >
      <div style={{ color: c.textMuted, marginBottom: 6 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: {p.value}
        </div>
      ))}
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  const { c } = useTheme();
  return (
    <div
      style={{
        fontFamily: "Syne, sans-serif",
        fontSize: 13,
        fontWeight: 700,
        color: c.text,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 3,
          height: 14,
          borderRadius: 2,
          background: PURPLE,
        }}
      />
      {children}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function IntelligenceHub() {
  const { c, isDark } = useTheme();
  const TEXT_DIM = c.textDim;
  const TEXT_MID = c.textMuted;
  return (
    <div
      style={{
        minHeight: "100vh",
        background: c.bg,
        padding: "24px",
        fontFamily: "Space Grotesk, sans-serif",
        color: c.text,
        boxSizing: "border-box",
      }}
    >
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: 28 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: 22,
                fontWeight: 800,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Intelligence Hub
            </h1>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 13,
                color: TEXT_DIM,
              }}
            >
              Mission Control — Real-time national fraud monitoring
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: `${GREEN}18`,
              border: `1px solid ${GREEN}30`,
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 12,
              color: GREEN,
              fontFamily: "IBM Plex Mono, monospace",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: GREEN,
              }}
            />
            LIVE
          </div>
        </div>
      </motion.div>

      {/* Metric cards */}
      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <MetricCard icon={<Search size={20} />} label="Active Investigations" value="47" accent={PURPLE} delay={0.05} c={c} />
        <MetricCard icon={<AlertTriangle size={20} />} label="High Risk Flags" value="12" accent={RED} delay={0.1} c={c} />
        <MetricCard icon={<FileText size={20} />} label="Docs Processed" value="2.4K" accent={TEAL} delay={0.15} c={c} />
        <MetricCard icon={<TrendingUp size={20} />} label="Fraud Detected" value="₹18.3Cr" accent={AMBER} delay={0.2} c={c} />
      </div>

      {/* Middle row: chart + feed */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        {/* National Fraud Pulse */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          style={{
            flex: 1,
            background: c.bgCard,
            border: `1px solid ${c.border}`,
            borderRadius: 16,
            padding: 24,
          }}
        >
          <SectionTitle>National Fraud Pulse</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradAnomaly" x1="0" y1="0" x2="0" y2="1">
                  <stop key="ga-top" offset="5%" stopColor={RED} stopOpacity={0.35} />
                  <stop key="ga-bot" offset="95%" stopColor={RED} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop key="gr-top" offset="5%" stopColor={PURPLE} stopOpacity={0.35} />
                  <stop key="gr-bot" offset="95%" stopColor={PURPLE} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradVerification" x1="0" y1="0" x2="0" y2="1">
                  <stop key="gv-top" offset="5%" stopColor={TEAL} stopOpacity={0.3} />
                  <stop key="gv-bot" offset="95%" stopColor={TEAL} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: TEXT_DIM, fontSize: 11, fontFamily: "IBM Plex Mono" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: TEXT_DIM, fontSize: 11, fontFamily: "IBM Plex Mono" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="anomaly"
                name="Anomaly Spikes"
                stroke={RED}
                strokeWidth={2}
                fill="url(#gradAnomaly)"
              />
              <Area
                type="monotone"
                dataKey="risk"
                name="Risk Score"
                stroke={PURPLE}
                strokeWidth={2}
                fill="url(#gradRisk)"
              />
              <Area
                type="monotone"
                dataKey="verification"
                name="Verification Load"
                stroke={TEAL}
                strokeWidth={2}
                fill="url(#gradVerification)"
              />
            </AreaChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div style={{ display: "flex", gap: 20, marginTop: 14 }}>
            {[
              { color: RED, label: "Anomaly Spikes" },
              { color: PURPLE, label: "Risk Score" },
              { color: TEAL, label: "Verification Load" },
            ].map(({ color, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  color: TEXT_DIM,
                  fontFamily: "IBM Plex Mono, monospace",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 16,
                    height: 2,
                    borderRadius: 1,
                    background: color,
                  }}
                />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Intelligence Feed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          style={{
            width: 360,
            background: c.bgCard,
            border: `1px solid ${c.border}`,
            borderRadius: 16,
            padding: 24,
            flexShrink: 0,
          }}
        >
          <SectionTitle>
            <Activity size={14} style={{ marginRight: 2 }} />
            AI Intelligence Feed
          </SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {feedItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom:
                    i < feedItems.length - 1 ? `1px solid ${c.border}` : "none",
                }}
              >
                {/* Pulsing dot */}
                <div
                  style={{
                    flexShrink: 0,
                    marginTop: 4,
                    position: "relative",
                    width: 10,
                    height: 10,
                  }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                    style={{
                      position: "absolute",
                      inset: -2,
                      borderRadius: "50%",
                      background: severityColor[item.severity],
                      display: "block",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      inset: 1,
                      borderRadius: "50%",
                      background: severityColor[item.severity],
                      display: "block",
                    }}
                  />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: TEXT_MID,
                      lineHeight: 1.5,
                      marginBottom: 4,
                    }}
                  >
                    {item.message}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 11,
                      color: TEXT_DIM,
                      fontFamily: "IBM Plex Mono, monospace",
                    }}
                  >
                    <Clock size={10} />
                    {item.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Active Investigations */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.4 }}
      >
        <SectionTitle>Active Investigations</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          {investigations.map((inv, i) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
              whileHover={{ borderColor: c.borderStrong }}
              style={{
                background: c.bgCard,
                border: `1px solid ${c.border}`,
                borderRadius: 14,
                padding: "18px 20px",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "IBM Plex Mono, monospace",
                      fontSize: 11,
                      color: c.textDim,
                      marginBottom: 3,
                    }}
                  >
                    {inv.id}
                  </div>
                  <div
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: c.text,
                    }}
                  >
                    {inv.name}
                  </div>
                </div>
                {/* Status pill */}
                <div
                  style={{
                    background: `${inv.statusColor}18`,
                    border: `1px solid ${inv.statusColor}35`,
                    color: inv.statusColor,
                    borderRadius: 20,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontFamily: "IBM Plex Mono, monospace",
                    whiteSpace: "nowrap",
                  }}
                >
                  {inv.status}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Risk score badge */}
                <div
                  style={{
                    background: `${riskColor(inv.risk)}18`,
                    border: `1px solid ${riskColor(inv.risk)}40`,
                    color: riskColor(inv.risk),
                    borderRadius: 8,
                    padding: "4px 10px",
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Risk {inv.risk}
                </div>

                {/* Evidence */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    color: TEXT_DIM,
                  }}
                >
                  <FileText size={12} />
                  {inv.evidence} docs
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Analyst avatar */}
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: `${PURPLE}30`,
                    border: `1.5px solid ${PURPLE}60`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: PURPLE,
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  {inv.analyst}
                </div>

                <ChevronRight size={14} style={{ color: TEXT_DIM }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
