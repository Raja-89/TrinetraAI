import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  FileWarning,
  User,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

// ─── Design tokens (brand accents only) ───────────────────────────────────────────
// C.bg, C.surface, C.border, C.text, C.subtle, C.muted overridden via useTheme
const C = {
  bg: "#06080F",
  surface: "#0D1117",
  surface2: "#111827",
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

// ─── Types ────────────────────────────────────────────────────────────────────
type CompStatus = "Compliant" | "Pending" | "Non-Compliant";
type MAPStatus = "On Track" | "At Risk" | "Overdue";

// ─── Section 1: RBI Compliance table ─────────────────────────────────────────
const RBI_ROWS: {
  requirement: string;
  status: CompStatus;
  lastChecked: string;
}[] = [
  { requirement: "KYC Verification", status: "Compliant", lastChecked: "22 May 2026, 09:14" },
  { requirement: "AML Screening", status: "Compliant", lastChecked: "22 May 2026, 09:14" },
  { requirement: "PAN Verification", status: "Pending", lastChecked: "21 May 2026, 17:42" },
  { requirement: "Income Proof", status: "Non-Compliant", lastChecked: "20 May 2026, 11:30" },
  { requirement: "Credit Check", status: "Compliant", lastChecked: "22 May 2026, 08:55" },
  { requirement: "Property Docs", status: "Pending", lastChecked: "19 May 2026, 14:20" },
  { requirement: "GST Compliance", status: "Non-Compliant", lastChecked: "18 May 2026, 10:05" },
  { requirement: "Digital Signature", status: "Compliant", lastChecked: "22 May 2026, 09:14" },
];

const statusConfig: Record<CompStatus, { color: string; bg: string; icon: React.ReactNode }> = {
  Compliant: {
    color: C.green,
    bg: "rgba(47,191,113,0.1)",
    icon: <CheckCircle2 size={13} />,
  },
  Pending: {
    color: C.amber,
    bg: "rgba(245,158,11,0.1)",
    icon: <Clock size={13} />,
  },
  "Non-Compliant": {
    color: C.red,
    bg: "rgba(232,93,117,0.1)",
    icon: <XCircle size={13} />,
  },
};

// ─── Section 2: Missing KYC cases ────────────────────────────────────────────
const KYC_CASES = [
  {
    id: "#4531",
    name: "Arvind Mehta",
    missing: ["Address Proof", "Bank Statement"],
  },
  {
    id: "#4528",
    name: "Sunita Reddy",
    missing: ["PAN Card"],
  },
  {
    id: "#4519",
    name: "Deepak Joshi",
    missing: ["Income Proof", "ITR"],
  },
  {
    id: "#4511",
    name: "Kavitha Pillai",
    missing: ["Property Docs", "NOC"],
  },
  {
    id: "#4498",
    name: "Rahul Banerjee",
    missing: ["Digital Signature", "CIBIL Report"],
  },
];

// ─── Section 2: AML risk flags ────────────────────────────────────────────────
const AML_FLAGS = [
  { txId: "TXN-8821", entity: "Horizon Infra Pvt Ltd", amount: "₹82.4 L", score: 91, color: C.red },
  { txId: "TXN-8809", entity: "Arvind Mehta (Self)", amount: "₹14.2 L", score: 78, color: C.red },
  { txId: "TXN-8774", entity: "K.V. Constructions", amount: "₹37.0 L", score: 72, color: C.amber },
  { txId: "TXN-8750", entity: "Prism Holdings LLP", amount: "₹55.6 L", score: 68, color: C.amber },
  { txId: "TXN-8733", entity: "Meenakshi Nair", amount: "₹9.8 L", score: 61, color: C.amber },
  { txId: "TXN-8701", entity: "Sunrise Properties", amount: "₹28.1 L", score: 55, color: C.teal },
];

// ─── Section 3: MAPs ──────────────────────────────────────────────────────────
const MAPS: {
  title: string;
  deadline: string;
  owner: string;
  initials: string;
  avatarColor: string;
  progress: number;
  status: MAPStatus;
}[] = [
  {
    title: "Implement enhanced PAN linking for all pending cases",
    deadline: "30 May 2026",
    owner: "Priya Kumar",
    initials: "PK",
    avatarColor: C.accent,
    progress: 68,
    status: "On Track",
  },
  {
    title: "Re-verify income documents for Non-Compliant flagged applicants",
    deadline: "25 May 2026",
    owner: "Rohit Sharma",
    initials: "RS",
    avatarColor: C.teal,
    progress: 42,
    status: "At Risk",
  },
  {
    title: "Update AML watchlist integration with CERSAI feed",
    deadline: "20 May 2026",
    owner: "Deepa Nair",
    initials: "DN",
    avatarColor: C.amber,
    progress: 15,
    status: "Overdue",
  },
  {
    title: "GST compliance audit for Q1 corporate loan portfolio",
    deadline: "05 Jun 2026",
    owner: "Amit Verma",
    initials: "AV",
    avatarColor: C.green,
    progress: 82,
    status: "On Track",
  },
];

const mapStatusConfig: Record<MAPStatus, { color: string; bg: string }> = {
  "On Track": { color: C.green, bg: "rgba(47,191,113,0.1)" },
  "At Risk": { color: C.amber, bg: "rgba(245,158,11,0.1)" },
  Overdue: { color: C.red, bg: "rgba(232,93,117,0.1)" },
};

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ label, accent = C.accent }: { label: string; accent?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 16,
      }}
    >
      <div style={{ width: 3, height: 18, background: accent, borderRadius: 2 }} />
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          margin: 0,
          letterSpacing: "-0.01em",
          color: C.text,
        }}
      >
        {label}
      </h2>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Compliance() {
  const { c } = useTheme();
  // Override theme-dependent tokens
  Object.assign(C, {
    bg: c.bg,
    surface: c.bgSecondary,
    surface2: c.bgCard,
    border: c.border,
    text: c.text,
    subtle: c.textMuted,
    muted: c.textDim,
  });

  const [_hoveredRow, setHoveredRow] = useState<number | null>(null);

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
      {/* Page title */}
      <div style={{ marginBottom: 30 }}>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            margin: "0 0 4px",
            letterSpacing: "-0.01em",
          }}
        >
          Compliance &amp; Regulatory Center
        </h1>
        <p style={{ fontSize: 13, color: C.subtle, margin: 0 }}>
          RBI guidelines, KYC status, AML flags and measurable action points
        </p>
      </div>

      {/* ── Section 1: RBI Compliance Tracker ── */}
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          marginBottom: 24,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px 24px",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <SectionHeader label="RBI Compliance Tracker" accent={C.teal} />
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Requirement", "Status", "Last Checked", "Action"].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "10px 24px",
                      textAlign: "left",
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: C.subtle,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RBI_ROWS.map((row, i) => {
                const cfg = statusConfig[row.status];
                return (
                  <tr
                    key={row.requirement}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      borderBottom: i < RBI_ROWS.length - 1 ? `1px solid ${C.border}` : "none",
                      transition: "background 0.15s",
                    }}
                  >
                    <td
                      style={{
                        padding: "14px 24px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 13,
                        color: C.text,
                        fontWeight: 500,
                      }}
                    >
                      {row.requirement}
                    </td>
                    <td style={{ padding: "14px 24px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 11,
                          color: cfg.color,
                          background: cfg.bg,
                          border: `1px solid ${cfg.color}30`,
                          borderRadius: 6,
                          padding: "3px 10px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cfg.icon}
                        {row.status}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "14px 24px",
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 11,
                        color: C.subtle,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.lastChecked}
                    </td>
                    <td style={{ padding: "14px 24px" }}>
                      <button
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          fontFamily: "'Syne', sans-serif",
                          fontSize: 11,
                          fontWeight: 600,
                          color:
                            row.status === "Compliant"
                              ? C.subtle
                              : row.status === "Pending"
                              ? C.amber
                              : C.red,
                          background: "transparent",
                          border: `1px solid ${
                            row.status === "Compliant"
                              ? C.border
                              : row.status === "Pending"
                              ? C.amber + "40"
                              : C.red + "40"
                          }`,
                          borderRadius: 6,
                          padding: "5px 12px",
                          cursor: "pointer",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {row.status === "Compliant" ? "View" : "Remediate"}
                        <ChevronRight size={11} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 2: 2-col ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Missing KYC Detection */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}` }}>
            <SectionHeader label="Missing KYC Detection" accent={C.amber} />
          </div>
          <div>
            {KYC_CASES.map((kase, i) => (
              <div
                key={kase.id}
                style={{
                  padding: "14px 24px",
                  borderBottom: i < KYC_CASES.length - 1 ? `1px solid ${C.border}` : "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: "rgba(245,158,11,0.1)",
                    border: "1px solid rgba(245,158,11,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.amber,
                    flexShrink: 0,
                  }}
                >
                  <FileWarning size={15} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 10,
                        color: C.subtle,
                      }}
                    >
                      {kase.id}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color: C.text,
                      }}
                    >
                      {kase.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {kase.missing.map((doc) => (
                      <span
                        key={doc}
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 10,
                          color: C.amber,
                          background: "rgba(245,158,11,0.08)",
                          border: "1px solid rgba(245,158,11,0.2)",
                          borderRadius: 4,
                          padding: "2px 8px",
                        }}
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: C.subtle,
                    cursor: "pointer",
                    padding: 4,
                    flexShrink: 0,
                  }}
                >
                  <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AML Risk Flags */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}` }}>
            <SectionHeader label="AML Risk Flags" accent={C.red} />
          </div>
          <div>
            {AML_FLAGS.map((flag, i) => (
              <div
                key={flag.txId}
                style={{
                  padding: "13px 24px",
                  borderBottom: i < AML_FLAGS.length - 1 ? `1px solid ${C.border}` : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: `${flag.color}12`,
                    border: `1px solid ${flag.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: flag.color,
                    flexShrink: 0,
                  }}
                >
                  <AlertTriangle size={14} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 10,
                        color: C.subtle,
                      }}
                    >
                      {flag.txId}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        color: C.text,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {flag.entity}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 11,
                      color: C.subtle,
                    }}
                  >
                    {flag.amount}
                  </span>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: flag.color,
                      lineHeight: 1,
                    }}
                  >
                    {flag.score}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 9,
                      color: C.muted,
                      marginTop: 2,
                      letterSpacing: "0.06em",
                    }}
                  >
                    AML SCORE
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 3: MAPs ── */}
      <div>
        <div style={{ marginBottom: 16 }}>
          <SectionHeader label="MAPs — Measurable Action Points" accent={C.accent} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {MAPS.map((map, idx) => {
            const sc = mapStatusConfig[map.status];
            return (
              <motion.div
                key={map.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: "20px 22px",
                }}
              >
                {/* Card header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 14,
                    gap: 12,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      color: C.text,
                      margin: 0,
                      lineHeight: 1.5,
                      flex: 1,
                    }}
                  >
                    {map.title}
                  </p>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: sc.color,
                      background: sc.bg,
                      border: `1px solid ${sc.color}30`,
                      borderRadius: 4,
                      padding: "3px 8px",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {map.status.toUpperCase()}
                  </span>
                </div>

                {/* Owner + deadline */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: map.avatarColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {map.initials}
                  </div>
                  <span style={{ fontSize: 12, color: C.subtle }}>{map.owner}</span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 10,
                      color: C.muted,
                    }}
                  >
                    Due {map.deadline}
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontSize: 11, color: C.muted }}>Progress</span>
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 11,
                        color: sc.color,
                      }}
                    >
                      {map.progress}%
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
                      animate={{ width: `${map.progress}%` }}
                      transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 + idx * 0.1 }}
                      style={{
                        height: "100%",
                        background: sc.color,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
