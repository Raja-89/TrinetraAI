import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  AlertTriangle,
  Zap,
  Clock,
  Activity,
  ShieldAlert,
  Network,
  FileX,
  UserX,
  RefreshCw,
  Server,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

// ─── Design tokens (brand accent colors – static defaults) ────────────────────
// C.bg, C.surface, C.border, C.text, C.subtle, C.muted overridden via useTheme
const C = {
  bg: "#06080F",
  surface: "#0D1117",
  border: "#1A2235",
  accent: "#5227FF",
  red: "#E85D75",
  teal: "#00B3A4",
  green: "#2FBF71",
  amber: "#F59E0B",
  muted: "#4A5568",
  text: "#E2E8F0",
  subtle: "#8892A4",
};

// ─── Throughput data ──────────────────────────────────────────────────────────
const throughputData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  value: Math.floor(400 + Math.random() * 600 + (i > 8 && i < 20 ? 300 : 0)),
}));

// ─── Live feed seed data ──────────────────────────────────────────────────────
type Severity = "CRITICAL" | "HIGH" | "MEDIUM";

interface FeedEvent {
  id: number;
  type: string;
  icon: React.ReactNode;
  severity: Severity;
  description: string;
  source: string;
  ts: string;
}

const severityColor: Record<Severity, string> = {
  CRITICAL: C.red,
  HIGH: C.amber,
  MEDIUM: C.teal,
};

const severityBg: Record<Severity, string> = {
  CRITICAL: "rgba(232,93,117,0.12)",
  HIGH: "rgba(245,158,11,0.12)",
  MEDIUM: "rgba(0,179,164,0.12)",
};

function makeTs() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
}

const EVENT_POOL: Omit<FeedEvent, "id" | "ts">[] = [
  {
    type: "Identity Mismatch",
    icon: <UserX size={14} />,
    severity: "CRITICAL",
    description: "PAN photo does not match applicant selfie — confidence 97.3%",
    source: "192.168.11.42",
  },
  {
    type: "Income Inflation",
    icon: <FileX size={14} />,
    severity: "CRITICAL",
    description: "Salary slip font metadata mismatch across 3 documents",
    source: "10.0.4.17",
  },
  {
    type: "Network Anomaly",
    icon: <Network size={14} />,
    severity: "HIGH",
    description: "Shared device fingerprint across 7 applications",
    source: "172.16.0.9",
  },
  {
    type: "AML Flag",
    icon: <AlertTriangle size={14} />,
    severity: "HIGH",
    description: "Applicant linked to watchlist entity via 2-hop graph",
    source: "10.0.8.31",
  },
  {
    type: "OCR Anomaly",
    icon: <ShieldAlert size={14} />,
    severity: "MEDIUM",
    description: "Bank statement balance inconsistency detected — Q3 gap",
    source: "10.2.1.55",
  },
  {
    type: "Velocity Alert",
    icon: <Zap size={14} />,
    severity: "HIGH",
    description: "Same address used across 14 loan applications this week",
    source: "172.20.0.4",
  },
  {
    type: "GST Mismatch",
    icon: <RefreshCw size={14} />,
    severity: "MEDIUM",
    description: "GST turnover contradicts declared income by ₹18.2 L",
    source: "192.168.3.77",
  },
  {
    type: "Deep Fake Risk",
    icon: <UserX size={14} />,
    severity: "CRITICAL",
    description: "Video KYC artifact patterns consistent with synthetic media",
    source: "10.0.12.6",
  },
  {
    type: "Shell Entity",
    icon: <Network size={14} />,
    severity: "HIGH",
    description: "Employer GSTIN registered 11 days before application",
    source: "172.16.5.2",
  },
  {
    type: "Cluster Alert",
    icon: <Server size={14} />,
    severity: "MEDIUM",
    description: "New fraud ring candidate — 5 applicants, shared guarantor",
    source: "10.0.7.88",
  },
];

function buildInitialFeed(): FeedEvent[] {
  return EVENT_POOL.map((e, i) => ({ ...e, id: i + 1, ts: makeTs() }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MetricTile({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderTop: `2px solid ${accent}`,
        borderRadius: 10,
        padding: "18px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: C.subtle,
          }}
        >
          {label}
        </span>
        <span style={{ color: accent, opacity: 0.8 }}>{icon}</span>
      </div>
      <span
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 28,
          fontWeight: 700,
          color: C.text,
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function SeverityBadge({ sev }: { sev: Severity }) {
  return (
    <span
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: "0.1em",
        color: severityColor[sev],
        background: severityBg[sev],
        border: `1px solid ${severityColor[sev]}33`,
        borderRadius: 4,
        padding: "2px 7px",
        whiteSpace: "nowrap",
      }}
    >
      {sev}
    </span>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: "#111827",
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "8px 14px",
        }}
      >
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: C.subtle, margin: 0 }}>
          {label}
        </p>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, color: C.accent, margin: "2px 0 0" }}>
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// ─── Main component ───────────────────────────────────────────────────────────

export function RealTimeMonitoring() {
  const { c } = useTheme();
  // Override theme-dependent tokens at runtime
  Object.assign(C, {
    bg: c.bg,
    surface: c.bgSecondary,
    border: c.border,
    text: c.text,
    subtle: c.textMuted,
    muted: c.textDim,
  });

  const [feed, setFeed] = useState<FeedEvent[]>(buildInitialFeed);
  const nextId = useRef(EVENT_POOL.length + 1);

  // Inject a new event every ~4 s
  useEffect(() => {
    const timer = setInterval(() => {
      const pool = EVENT_POOL[Math.floor(Math.random() * EVENT_POOL.length)];
      const newEvent: FeedEvent = {
        ...pool,
        id: nextId.current++,
        ts: makeTs(),
      };
      setFeed((prev) => [newEvent, ...prev.slice(0, 9)]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100%",
        padding: "28px 32px",
        fontFamily: "'Space Grotesk', sans-serif",
        color: C.text,
        boxSizing: "border-box",
      }}
    >
      {/* Page header */}
      <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: C.green,
            boxShadow: `0 0 10px ${C.green}`,
            animation: "pulse 2s infinite",
          }}
        />
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Real-Time Monitoring Center
        </h1>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: C.green,
            background: "rgba(47,191,113,0.1)",
            border: `1px solid rgba(47,191,113,0.25)`,
            borderRadius: 6,
            padding: "3px 10px",
          }}
        >
          LIVE
        </span>
      </div>

      {/* Metric tiles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <MetricTile label="Events / sec" value="847" icon={<Activity size={16} />} accent={C.accent} />
        <MetricTile label="Active Alerts" value="23" icon={<AlertTriangle size={16} />} accent={C.red} />
        <MetricTile label="Processing Queue" value="142" icon={<Server size={16} />} accent={C.amber} />
        <MetricTile label="Avg Latency" value="340ms" icon={<Clock size={16} />} accent={C.teal} />
      </div>

      {/* Main 2-col grid */}
      <div style={{ display: "grid", gridTemplateColumns: "60% 40%", gap: 16, marginBottom: 24 }}>
        {/* Live Anomaly Feed */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 22px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Zap size={15} color={C.accent} />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.02em",
              }}
            >
              Live Anomaly Feed
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                color: C.subtle,
              }}
            >
              AUTO-REFRESH
            </span>
          </div>

          <div style={{ padding: "8px 0", maxHeight: 420, overflowY: "auto" }}>
            <AnimatePresence initial={false}>
              {feed.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: -18, scaleY: 0.92 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "12px 22px",
                    borderBottom: `1px solid ${C.border}`,
                    borderLeft: `3px solid ${severityColor[event.severity]}`,
                  }}
                >
                  <span
                    style={{
                      color: severityColor[event.severity],
                      marginTop: 2,
                      flexShrink: 0,
                    }}
                  >
                    {event.icon}
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 4,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: 12,
                          fontWeight: 600,
                          color: C.text,
                        }}
                      >
                        {event.type}
                      </span>
                      <SeverityBadge sev={event.severity} />
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        color: C.subtle,
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {event.description}
                    </p>
                  </div>

                  <div style={{ flexShrink: 0, textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 10,
                        color: C.subtle,
                        marginBottom: 4,
                      }}
                    >
                      {event.ts}
                    </div>
                    <div
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 9,
                        color: C.muted,
                      }}
                    >
                      {event.source}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* System Intelligence */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "16px 22px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Activity size={15} color={C.teal} />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              System Intelligence
            </span>
          </div>

          {/* Chart */}
          <div style={{ padding: "20px 16px 8px" }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 11,
                color: C.subtle,
                margin: "0 0 12px 6px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Verification Throughput — 24h
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={throughputData} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  tick={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fill: C.muted }}
                  interval={5}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fill: C.muted }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={C.accent}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: C.accent }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* AI Processing Metrics */}
          <div style={{ padding: "16px 22px", borderTop: `1px solid ${C.border}`, flex: 1 }}>
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: C.subtle,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: "0 0 16px",
              }}
            >
              AI Processing Metrics
            </p>
            {[
              { label: "Document OCR", pct: 78, color: C.teal },
              { label: "Risk Scoring", pct: 94, color: C.green },
              { label: "Graph Analysis", pct: 61, color: C.accent },
            ].map((m) => (
              <div key={m.label} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 12, color: C.text }}>{m.label}</span>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 11,
                      color: m.color,
                    }}
                  >
                    {m.pct}%
                  </span>
                </div>
                <div
                  style={{
                    height: 4,
                    background: C.border,
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.pct}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    style={{
                      height: "100%",
                      background: m.color,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { label: "Risk Escalations", value: "12", sub: "today", color: C.red, icon: <AlertTriangle size={18} /> },
          { label: "Fraud Rings Identified", value: "3", sub: "active", color: C.amber, icon: <Network size={18} /> },
          { label: "Documents Quarantined", value: "47", sub: "pending review", color: C.teal, icon: <FileX size={18} /> },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "18px 22px",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: `${card.color}18`,
                border: `1px solid ${card.color}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: card.color,
                flexShrink: 0,
              }}
            >
              {card.icon}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 26,
                  fontWeight: 700,
                  color: card.color,
                  lineHeight: 1,
                }}
              >
                {card.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: C.subtle,
                  marginTop: 4,
                }}
              >
                {card.label}{" "}
                <span style={{ color: C.muted }}>— {card.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
