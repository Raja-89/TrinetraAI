import { useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import {
  FileText,
  ShieldAlert,
  ClipboardList,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ImageIcon,
  Fingerprint,
  ScanLine,
  BookOpen,
  Circle,
  User,
  Calendar,
  Hash,
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

// ─── Design tokens ────────────────────────────────────────────────────────────
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

// ─── Report types ─────────────────────────────────────────────────────────────
const REPORT_TYPES = [
  { id: "fraud", label: "Fraud Investigation", icon: ShieldAlert, color: C.red },
  { id: "underwriting", label: "Underwriting Report", icon: FileText, color: C.accent },
  { id: "compliance", label: "Compliance Summary", icon: ClipboardList, color: C.teal },
  { id: "risk", label: "Risk Escalation", icon: TrendingUp, color: C.amber },
] as const;

type ReportId = (typeof REPORT_TYPES)[number]["id"];

const confidenceData = [{ name: "Confidence", value: 94, fill: C.red }];

const EVIDENCE = [
  { icon: <ScanLine size={22} />, label: "PAN Card Scan", tag: "OCR", color: C.red },
  { icon: <ImageIcon size={22} />, label: "Selfie vs ID", tag: "BIOMETRIC", color: C.amber },
  { icon: <BookOpen size={22} />, label: "Salary Slips ×3", tag: "DOCUMENTS", color: C.teal },
  { icon: <Fingerprint size={22} />, label: "Device Fingerprint", tag: "DIGITAL", color: C.accent },
];

const FINDINGS = [
  { sev: C.red, text: "Facial mismatch between PAN photo and video KYC — confidence 97.3%" },
  { sev: C.red, text: "Salary slip metadata shows three distinct editing sessions post-generation" },
  { sev: C.amber, text: "Employer GSTIN registered 11 days prior to loan application date" },
  { sev: C.amber, text: "Device fingerprint shared across 7 applications from same fraud ring cluster" },
  { sev: C.teal, text: "Bank account activity inconsistent with declared ₹14 L annual income profile" },
];

function PlaceholderReport({ title, color }: { title: string; color: string }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        color: C.subtle,
        padding: 48,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: `${color}18`,
          border: `1px solid ${color}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
        }}
      >
        <FileText size={28} />
      </div>
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 18,
          fontWeight: 600,
          color: C.text,
          margin: 0,
        }}
      >
        {title}
      </p>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, margin: 0, textAlign: "center", color: C.subtle }}>
        Select a case from the queue to generate this report.
      </p>
    </div>
  );
}

function FraudInvestigationContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}
    >
      {/* Report header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
          gap: 20,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              margin: "0 0 12px",
              color: C.text,
              letterSpacing: "-0.02em",
            }}
          >
            Fraud Investigation Report
          </h2>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {[
              { icon: <Hash size={11} />, label: "Case", value: "#TRI-2024-4521" },
              { icon: <Calendar size={11} />, label: "Date", value: "22 May 2026" },
              { icon: <User size={11} />, label: "Analyst", value: "Priya Kumar" },
            ].map((meta) => (
              <div
                key={meta.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                }}
              >
                <span style={{ color: C.muted }}>{meta.icon}</span>
                <span style={{ color: C.muted }}>{meta.label}:</span>
                <span style={{ color: C.text }}>{meta.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            background: "rgba(232,93,117,0.12)",
            border: `1px solid rgba(232,93,117,0.35)`,
            borderRadius: 8,
            padding: "8px 18px",
            fontFamily: "'Syne', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: C.red,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          FRAUD CONFIRMED
        </div>
      </div>

      {/* Executive Summary + radial */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 190px",
          gap: 28,
          marginBottom: 28,
          background: C.surface2,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: "22px 24px",
          alignItems: "center",
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: C.subtle,
              margin: "0 0 14px",
            }}
          >
            Executive Summary
          </h3>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              lineHeight: 1.75,
              color: C.text,
              margin: "0 0 12px",
            }}
          >
            TRINETRA's multi-modal analysis of Case #TRI-2024-4521 has returned a fraud probability
            score of{" "}
            <strong style={{ color: C.red }}>94.2%</strong>, triggering an automatic CRITICAL
            escalation. The applicant presented a home loan application for ₹72 lakhs using a
            synthetic identity with fabricated income documentation across three tampered salary slips.
          </p>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              lineHeight: 1.75,
              color: C.subtle,
              margin: 0,
            }}
          >
            The device fingerprint associated with this application appears in 6 prior flagged cases.
            Graph analysis links the applicant to a known fraud syndicate operating across 3 states.
            All supporting documents are recommended for forensic examination. Immediate loan rejection
            and regulatory reporting under PMLA are strongly advised.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative", width: 150, height: 150 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="90%"
                startAngle={90}
                endAngle={-270}
                data={confidenceData}
                barSize={12}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  background={{ fill: C.border }}
                  dataKey="value"
                  angleAxisId={0}
                  cornerRadius={6}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: C.red,
                  lineHeight: 1,
                }}
              >
                94%
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 9,
                  color: C.subtle,
                  marginTop: 5,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Risk Conf.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Gallery */}
      <div style={{ marginBottom: 28 }}>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: C.subtle,
            margin: "0 0 14px",
          }}
        >
          Evidence Gallery
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {EVIDENCE.map((ev) => (
            <div
              key={ev.label}
              style={{
                background: C.surface2,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: "20px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = ev.color + "55";
                (e.currentTarget as HTMLDivElement).style.background = ev.color + "08";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
                (e.currentTarget as HTMLDivElement).style.background = C.surface2;
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 10,
                  background: `${ev.color}15`,
                  border: `1px solid ${ev.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: ev.color,
                }}
              >
                {ev.icon}
              </div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 11,
                  color: C.text,
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {ev.label}
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 9,
                  color: ev.color,
                  background: `${ev.color}15`,
                  border: `1px solid ${ev.color}30`,
                  borderRadius: 4,
                  padding: "2px 7px",
                  letterSpacing: "0.08em",
                }}
              >
                {ev.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Findings */}
      <div style={{ marginBottom: 28 }}>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: C.subtle,
            margin: "0 0 14px",
          }}
        >
          Key Findings
        </h3>
        <div
          style={{
            background: C.surface2,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {FINDINGS.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: "14px 20px",
                borderBottom: i < FINDINGS.length - 1 ? `1px solid ${C.border}` : "none",
              }}
            >
              <Circle
                size={8}
                fill={f.sev}
                color={f.sev}
                style={{ marginTop: 5, flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  color: C.text,
                  lineHeight: 1.6,
                }}
              >
                {f.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Action */}
      <div
        style={{
          background: "rgba(232,93,117,0.06)",
          border: `1px solid rgba(232,93,117,0.22)`,
          borderRadius: 12,
          padding: "22px 24px",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <ShieldAlert size={34} color={C.red} style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: C.red,
              margin: "0 0 6px",
            }}
          >
            Recommended Action: REJECT &amp; REPORT
          </p>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              color: C.subtle,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Reject the loan application and file a suspicious transaction report under PMLA. Escalate
            to the Central Fraud Registry and flag the associated device fingerprint and applicant
            network cluster for continuous monitoring.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button
            style={{
              background: C.red,
              border: "none",
              borderRadius: 8,
              padding: "10px 22px",
              fontFamily: "'Syne', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              letterSpacing: "0.04em",
            }}
          >
            <XCircle size={14} /> Reject
          </button>
          <button
            style={{
              background: "transparent",
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: "10px 22px",
              fontFamily: "'Syne', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: C.subtle,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <CheckCircle2 size={14} /> Override
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Reports() {
  const { c } = useTheme();
  Object.assign(C, {
    bg: c.bg,
    surface: c.bgSecondary,
    surface2: c.bgCard,
    border: c.border,
    text: c.text,
    subtle: c.textMuted,
    muted: c.textDim,
  });
  const [active, setActive] = useState<ReportId>("fraud");

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100%",
        display: "flex",
        fontFamily: "'Space Grotesk', sans-serif",
        color: C.text,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 300,
          flexShrink: 0,
          background: C.surface,
          borderRight: `1px solid ${C.border}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "28px 24px 20px",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              margin: "0 0 4px",
              letterSpacing: "-0.01em",
            }}
          >
            Reports &amp; Decision Center
          </h1>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              color: C.subtle,
              margin: 0,
            }}
          >
            Executive-level investigation output
          </p>
        </div>

        <div style={{ paddingTop: 12 }}>
          {REPORT_TYPES.map((rt) => {
            const isActive = active === rt.id;
            const Icon = rt.icon;
            return (
              <button
                key={rt.id}
                onClick={() => setActive(rt.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  width: "100%",
                  padding: "13px 24px",
                  background: isActive ? `${rt.color}0D` : "transparent",
                  border: "none",
                  borderLeft: isActive ? `3px solid ${rt.color}` : "3px solid transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.18s",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: isActive ? `${rt.color}1A` : "#111827",
                    border: `1px solid ${isActive ? rt.color + "44" : C.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isActive ? rt.color : C.subtle,
                    flexShrink: 0,
                    transition: "all 0.18s",
                  }}
                >
                  <Icon size={15} />
                </div>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? C.text : C.subtle,
                    transition: "color 0.18s",
                  }}
                >
                  {rt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content pane */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {active === "fraud" && <FraudInvestigationContent />}
        {active === "underwriting" && <PlaceholderReport title="Underwriting Report" color={C.accent} />}
        {active === "compliance" && <PlaceholderReport title="Compliance Summary" color={C.teal} />}
        {active === "risk" && <PlaceholderReport title="Risk Escalation" color={C.amber} />}
      </div>
    </div>
  );
}
