import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Upload,
  ScanLine,
  GitCompare,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sun,
  Moon,
  ArrowRight,
  User,
  Building,
  Home,
  CreditCard,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MatrixCell {
  checked: boolean;
  partial?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FRAUD_TYPES = [
  "Synthetic Identity",
  "Income Inflation",
  "Document Forgery",
  "Land Title Fraud",
  "Employer Fraud Ring",
  "AI-Generated Docs",
];

const DETECTION_METHODS = [
  "OCR Analysis",
  "Metadata Scan",
  "Cross-Doc Engine",
  "Graph Analysis",
  "Behavioral AI",
];

// [fraud_type][method] = { checked, partial }
const MATRIX: MatrixCell[][] = [
  // Synthetic Identity
  [
    { checked: true },
    { checked: true },
    { checked: true },
    { checked: true },
    { checked: true },
  ],
  // Income Inflation
  [
    { checked: true },
    { checked: false },
    { checked: true },
    { checked: false },
    { checked: true },
  ],
  // Document Forgery
  [
    { checked: true },
    { checked: true },
    { checked: false },
    { checked: false },
    { checked: false },
  ],
  // Land Title Fraud
  [
    { checked: false },
    { checked: true },
    { checked: true },
    { checked: true },
    { checked: false },
  ],
  // Employer Fraud Ring
  [
    { checked: false },
    { checked: false },
    { checked: true },
    { checked: true },
    { checked: true },
  ],
  // AI-Generated Docs
  [
    { checked: true, partial: true },
    { checked: true },
    { checked: false },
    { checked: false },
    { checked: true },
  ],
];

const CASE_DISCOVERIES = [
  {
    icon: <User size={20} />,
    title: "Identity Cross-Check",
    finding:
      "PAN ABCDE1234F linked to 3 other active loan applications across 2 different banks. Address on Aadhaar does not match any bank statement address.",
    severity: "high",
  },
  {
    icon: <CreditCard size={20} />,
    title: "Income vs Bank Inflow",
    finding:
      "Salary slip declares ₹1,40,000/month from Zenith Tech Pvt Ltd. Bank statement shows average monthly credit of ₹38,400. 12-month inflow total: ₹4.6L vs declared annual: ₹16.8L.",
    severity: "high",
  },
  {
    icon: <Building size={20} />,
    title: "Employer Verification",
    finding:
      "Zenith Tech Pvt Ltd incorporated April 2023. Applicant's salary slip dated January 2023 — 3 months before the company existed. MCA records confirm CIN mismatch.",
    severity: "high",
  },
  {
    icon: <Home size={20} />,
    title: "Property Timeline",
    finding:
      "Applicant declared no existing property in loan application. ITR 2022-23 shows 'Income from House Property' of ₹2.4L. Registry metadata confirms ownership of property in Sector 42, Gurugram.",
    severity: "medium",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Fraud Graph Connection",
    finding:
      "Rajesh Kumar shares employer, guarantor, and phone number with 4 other applicants flagged as HIGH RISK in Q3 2023. All 4 were rejected. Network cluster density: 0.87.",
    severity: "high",
  },
];

const ANALYSIS_BARS = [
  { label: "OCR & Text Extraction", progress: 100, color: "#5227FF" },
  { label: "Metadata Timeline Verification", progress: 100, color: "#5227FF" },
  { label: "Pixel-Level Forgery Detection", progress: 100, color: "#E85D75" },
  { label: "Digital Signature Validation", progress: 100, color: "#2FBF71" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function PageNav() {
  const { c, isDark, toggleTheme } = useTheme();
  return (
    <nav
      style={{
        background: c.navBg,
        borderBottom: `1px solid ${c.border}`,
        backdropFilter: "blur(16px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: c.text,
              letterSpacing: "-0.5px",
            }}
          >
            TRINETRA AI
          </span>
          <Link
            to="/"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              color: c.textMuted,
              textDecoration: "none",
            }}
          >
            ← Landing
          </Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={toggleTheme}
            style={{
              background: "transparent",
              border: `1px solid ${c.border}`,
              borderRadius: 8,
              padding: "6px 10px",
              cursor: "pointer",
              color: c.textMuted,
              display: "flex",
              alignItems: "center",
            }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Link
            to="/workspace/hub"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              background: c.accent,
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Open Workspace <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const { c } = useTheme();
  return (
    <section style={{ background: c.bg, padding: "100px 24px 80px", textAlign: "center" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: c.accentLight,
              border: `1px solid ${c.accent}40`,
              borderRadius: 100,
              padding: "6px 16px",
              marginBottom: 28,
            }}
          >
            <ScanLine size={14} color={c.accent} />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                color: c.accent,
                fontWeight: 500,
              }}
            >
              4-Stage Pipeline
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
              lineHeight: 1.1,
              color: c.text,
              marginBottom: 20,
              letterSpacing: "-1px",
            }}
          >
            From Document Upload to
            <br />
            <span style={{ color: c.accent }}>Fraud Verdict in Under 2 Minutes</span>
          </h1>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 18,
              color: c.textMuted,
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            TRINETRA's four-stage pipeline — Ingest, Analyze, Cross-Reference, and Report —
            transforms raw documents into structured fraud verdicts with full evidence chains.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PipelineStage({
  number,
  title,
  icon,
  color,
  subtitle,
  details,
  children,
  delay,
}: {
  number: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  subtitle: string;
  details: string[];
  children: React.ReactNode;
  delay: number;
}) {
  const { c } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{ display: "flex", gap: 32, alignItems: "flex-start" }}
    >
      {/* Left: connector line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: color + "18",
            border: `2px solid ${color}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color,
            position: "relative",
          }}
        >
          {icon}
          <span
            style={{
              position: "absolute",
              top: -10,
              right: -10,
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: color,
              color: "#fff",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {number}
          </span>
        </div>
      </div>
      {/* Right: content */}
      <div style={{ flex: 1, paddingBottom: 56 }}>
        <div style={{ marginBottom: 4 }}>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: color,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            STAGE {number}
          </span>
        </div>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 24,
            color: c.text,
            marginBottom: 8,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 15,
            color: c.textMuted,
            marginBottom: 20,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {details.map((d) => (
            <span
              key={d}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: c.textDim,
                background: c.bgCard,
                border: `1px solid ${c.border}`,
                borderRadius: 6,
                padding: "4px 10px",
              }}
            >
              {d}
            </span>
          ))}
        </div>
        {children}
      </div>
    </motion.div>
  );
}

function UploadMock() {
  const { c } = useTheme();
  const docs = ["salary_slip_nov23.pdf", "bank_statement_q3.pdf", "itr_ay2324.pdf"];
  return (
    <div
      style={{
        border: `2px dashed ${c.accent}50`,
        borderRadius: 12,
        padding: 24,
        background: c.accentLight,
        maxWidth: 480,
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
          color: c.accent,
        }}
      >
        <Upload size={28} style={{ margin: "0 auto 8px" }} />
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            color: c.textMuted,
            margin: 0,
          }}
        >
          Drag documents here or click to browse
        </p>
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            color: c.textDim,
            margin: "4px 0 0",
          }}
        >
          PDF, JPG, PNG · Max 50MB per file
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {docs.map((doc) => (
          <div
            key={doc}
            style={{
              background: c.bgCard,
              border: `1px solid ${c.border}`,
              borderRadius: 8,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FileText size={16} color={c.accent} />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: c.textMuted,
              }}
            >
              {doc}
            </span>
            <CheckCircle2 size={14} color="#2FBF71" style={{ marginLeft: "auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisMock() {
  const { c } = useTheme();
  return (
    <div
      style={{
        background: c.bgCard,
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        padding: 24,
        maxWidth: 480,
      }}
    >
      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          color: c.textDim,
          marginBottom: 20,
        }}
      >
        // forensic_analysis.run(doc_batch_8f3a)
      </p>
      {ANALYSIS_BARS.map((bar, i) => (
        <div key={bar.label} style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                color: c.textMuted,
              }}
            >
              {bar.label}
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: bar.color,
              }}
            >
              DONE
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: c.bgSecondary,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${bar.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              style={{
                height: "100%",
                background: bar.color,
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CrossReferenceMock() {
  const { c } = useTheme();
  const comparisons = [
    { label: "Declared Monthly Salary", a: "₹1,40,000", b: "₹38,400", match: false },
    { label: "Employer Founded", a: "Jan 2023", b: "Apr 2023", match: false },
    { label: "Reported Address", a: "Sector 14, Delhi", b: "Sector 42, Gurugram", match: false },
    { label: "PAN", a: "ABCDE1234F", b: "ABCDE1234F", match: true },
  ];
  return (
    <div
      style={{
        background: c.bgCard,
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        overflow: "hidden",
        maxWidth: 520,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr auto",
          background: c.bgSecondary,
          padding: "10px 16px",
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        {["Field", "Document A", "Document B", ""].map((h) => (
          <span
            key={h}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: c.textDim,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {h}
          </span>
        ))}
      </div>
      {comparisons.map((row) => (
        <div
          key={row.label}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr auto",
            padding: "12px 16px",
            borderBottom: `1px solid ${c.border}`,
            background: row.match ? "transparent" : c.redLight,
          }}
        >
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: c.textMuted }}>{row.label}</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: c.text }}>{row.a}</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: c.text }}>{row.b}</span>
          <span>
            {row.match ? (
              <CheckCircle2 size={16} color="#2FBF71" />
            ) : (
              <XCircle size={16} color={c.red} />
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

function ReportMock() {
  const { c } = useTheme();
  return (
    <div
      style={{
        background: c.bgCard,
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        overflow: "hidden",
        maxWidth: 480,
      }}
    >
      <div
        style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${c.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: c.textDim,
              margin: "0 0 4px",
            }}
          >
            INVESTIGATION REPORT · INV-2024-4521
          </p>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              color: c.textMuted,
              margin: 0,
            }}
          >
            Rajesh Kumar · Loan Application #94721
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 36,
              color: c.red,
              lineHeight: 1,
            }}
          >
            94
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: c.red,
            }}
          >
            / 100 RISK SCORE
          </div>
        </div>
      </div>
      <div style={{ padding: "16px 24px" }}>
        {[
          { label: "Contradictions Found", value: "7", color: c.red },
          { label: "Forgery Flags", value: "2", color: c.red },
          { label: "Fraud Ring Connections", value: "4 entities", color: c.amber },
          { label: "Evidence Confidence", value: "96.2%", color: "#2FBF71" },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: `1px solid ${c.border}`,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                color: c.textMuted,
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
                fontWeight: 600,
                color: item.color,
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
        <div
          style={{
            marginTop: 16,
            padding: "10px 14px",
            background: c.redLight,
            border: `1px solid ${c.red}30`,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <AlertTriangle size={16} color={c.red} />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: c.red,
            }}
          >
            VERDICT: HIGH RISK — Recommend Rejection
          </span>
        </div>
      </div>
    </div>
  );
}

function Pipeline() {
  const { c } = useTheme();
  const stages = [
    {
      number: "1",
      title: "INGEST",
      icon: <Upload size={24} />,
      color: c.accent,
      subtitle:
        "Users upload any combination of PDFs, scanned images, and bank statement exports. The ingestion engine handles format normalization, file validation, and multi-page document splitting.",
      details: ["OCR preprocessing", "File validation", "Metadata extraction", "Page segmentation"],
      child: <UploadMock />,
    },
    {
      number: "2",
      title: "ANALYZE",
      icon: <ScanLine size={24} />,
      color: "#E85D75",
      subtitle:
        "AI forensics runs in parallel across every document. Pixel-level analysis detects alterations invisible to the human eye, while metadata verification catches timeline inconsistencies.",
      details: [
        "Pixel-level forgery detection",
        "Font inconsistency analysis",
        "Metadata timeline verification",
        "Digital signature validation",
      ],
      child: <AnalysisMock />,
    },
    {
      number: "3",
      title: "CROSS-REFERENCE",
      icon: <GitCompare size={24} />,
      color: "#F59E0B",
      subtitle:
        "The contradiction engine projects all extracted figures onto a shared timeline and entity graph. Every income figure, date, name, and identifier is compared across all documents simultaneously.",
      details: [
        "Income vs bank inflow",
        "Property timeline validation",
        "Employer consistency check",
        "Behavioral pattern analysis",
      ],
      child: <CrossReferenceMock />,
    },
    {
      number: "4",
      title: "REPORT",
      icon: <FileText size={24} />,
      color: "#2FBF71",
      subtitle:
        "A structured investigation report is generated with a calibrated risk score, full evidence gallery, AI reasoning chain, and actionable recommendations — ready for analyst review or regulatory filing.",
      details: ["Risk score calibration", "Evidence gallery", "AI reasoning chain", "Regulatory-ready format"],
      child: <ReportMock />,
    },
  ];

  return (
    <section style={{ background: c.bgSecondary, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              color: c.text,
              marginBottom: 12,
              letterSpacing: "-0.5px",
            }}
          >
            The 4-Stage Pipeline
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 16,
              color: c.textMuted,
            }}
          >
            From raw documents to actionable verdict — every step transparent and auditable.
          </p>
        </div>
        <div style={{ position: "relative" }}>
          {/* Vertical connector line */}
          <div
            style={{
              position: "absolute",
              left: 27,
              top: 56,
              bottom: 56,
              width: 2,
              background: `linear-gradient(to bottom, ${c.accent}, #E85D75, #F59E0B, #2FBF71)`,
              opacity: 0.3,
            }}
          />
          {stages.map((stage, i) => (
            <PipelineStage
              key={stage.number}
              number={stage.number}
              title={stage.title}
              icon={stage.icon}
              color={stage.color}
              subtitle={stage.subtitle}
              details={stage.details}
              delay={i * 0.1}
            >
              {stage.child}
            </PipelineStage>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetectionMatrix() {
  const { c } = useTheme();
  return (
    <section style={{ background: c.bg, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              color: c.text,
              marginBottom: 12,
              letterSpacing: "-0.5px",
            }}
          >
            Detection Capabilities Matrix
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 16,
              color: c.textMuted,
            }}
          >
            Which detection methods catch which fraud types.
          </p>
        </div>
        <div
          style={{
            background: c.bgCard,
            border: `1px solid ${c.border}`,
            borderRadius: 16,
            overflow: "auto",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr>
                <th
                  style={{
                    padding: "14px 20px",
                    textAlign: "left",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color: c.text,
                    borderBottom: `1px solid ${c.border}`,
                    background: c.bgSecondary,
                  }}
                >
                  Fraud Type
                </th>
                {DETECTION_METHODS.map((m) => (
                  <th
                    key={m}
                    style={{
                      padding: "14px 16px",
                      textAlign: "center",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontWeight: 600,
                      fontSize: 11,
                      color: c.textMuted,
                      borderBottom: `1px solid ${c.border}`,
                      background: c.bgSecondary,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FRAUD_TYPES.map((fraud, fi) => (
                <motion.tr
                  key={fraud}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: fi * 0.06 }}
                  style={{
                    borderBottom: fi < FRAUD_TYPES.length - 1 ? `1px solid ${c.border}` : "none",
                  }}
                >
                  <td
                    style={{
                      padding: "14px 20px",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 14,
                      color: c.text,
                      fontWeight: 500,
                    }}
                  >
                    {fraud}
                  </td>
                  {MATRIX[fi].map((cell, mi) => (
                    <td
                      key={mi}
                      style={{
                        padding: "14px 16px",
                        textAlign: "center",
                      }}
                    >
                      {cell.checked ? (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CheckCircle2
                            size={18}
                            color={cell.partial ? c.amber : "#2FBF71"}
                          />
                          {cell.partial && (
                            <span
                              style={{
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontSize: 9,
                                color: c.amber,
                                marginLeft: 2,
                              }}
                            >
                              ~
                            </span>
                          )}
                        </div>
                      ) : (
                        <span
                          style={{
                            width: 20,
                            height: 2,
                            background: c.border,
                            display: "inline-block",
                            borderRadius: 1,
                          }}
                        />
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              padding: "12px 20px",
              borderTop: `1px solid ${c.border}`,
              display: "flex",
              gap: 20,
              background: c.bgSecondary,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle2 size={14} color="#2FBF71" />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: c.textDim }}>
                Detected
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle2 size={14} color={c.amber} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: c.textDim }}>
                Partial / Probabilistic
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 16, height: 2, background: c.border, display: "inline-block", borderRadius: 1 }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: c.textDim }}>
                Not applicable
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  const { c } = useTheme();
  const [expanded, setExpanded] = useState<number | null>(null);

  const severityColor = (s: string) =>
    s === "high" ? c.red : s === "medium" ? c.amber : c.green;

  return (
    <section style={{ background: c.bgSecondary, padding: "80px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              color: c.text,
              marginBottom: 12,
              letterSpacing: "-0.5px",
            }}
          >
            Real Case Study
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 16,
              color: c.textMuted,
            }}
          >
            How TRINETRA unraveled a multi-layered fraud attempt.
          </p>
        </div>
        {/* Case header */}
        <div
          style={{
            background: c.bgCard,
            border: `1px solid ${c.border}`,
            borderRadius: 12,
            padding: "20px 24px",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: c.textDim,
                margin: "0 0 4px",
              }}
            >
              CASE #4521 · Home Loan Application · ₹85L
            </p>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: c.text,
                margin: 0,
              }}
            >
              Rajesh Kumar
            </h3>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14,
                color: c.textMuted,
                margin: "4px 0 0",
              }}
            >
              Sr. Software Engineer · Zenith Tech Pvt Ltd · Delhi
            </p>
          </div>
          <div
            style={{
              background: c.redLight,
              border: `1px solid ${c.red}30`,
              borderRadius: 8,
              padding: "8px 16px",
              textAlign: "center",
            }}
          >
            <Shield size={16} color={c.red} style={{ margin: "0 auto 4px" }} />
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: c.red,
              }}
            >
              94
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                color: c.red,
              }}
            >
              RISK SCORE
            </div>
          </div>
        </div>
        {/* Discoveries */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CASE_DISCOVERIES.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                background: c.bgCard,
                border: `1px solid ${expanded === i ? severityColor(d.severity) + "50" : c.border}`,
                borderLeft: `3px solid ${severityColor(d.severity)}`,
                borderRadius: 10,
                padding: "16px 20px",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: severityColor(d.severity) }}>{d.icon}</span>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: c.text,
                    flex: 1,
                  }}
                >
                  Discovery {i + 1}: {d.title}
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 10,
                    color: severityColor(d.severity),
                    textTransform: "uppercase",
                    background: severityColor(d.severity) + "15",
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                >
                  {d.severity}
                </span>
              </div>
              {expanded === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 14,
                    color: c.textMuted,
                    lineHeight: 1.7,
                    marginTop: 12,
                    marginBottom: 0,
                  }}
                >
                  {d.finding}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
        {/* Verdict */}
        <div
          style={{
            marginTop: 24,
            background: c.redLight,
            border: `1px solid ${c.red}30`,
            borderRadius: 12,
            padding: "20px 24px",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <AlertTriangle size={20} color={c.red} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: c.red,
                margin: "0 0 6px",
              }}
            >
              Final Verdict: HIGH RISK — Recommend Rejection
            </p>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14,
                color: c.textMuted,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              TRINETRA identified 7 contradictions, 2 document forgery flags, and a fraud ring
              connection to 4 previously rejected applicants. Total investigation time: 94 seconds.
              The case was referred to the bank's Special Investigation Unit with a full evidence
              dossier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { c } = useTheme();
  return (
    <section style={{ background: c.bg, padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            color: c.text,
            marginBottom: 16,
            letterSpacing: "-0.5px",
          }}
        >
          Try It In The Workspace
        </h2>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 16,
            color: c.textMuted,
            marginBottom: 32,
            lineHeight: 1.65,
          }}
        >
          Upload real documents and walk through all four stages of the TRINETRA pipeline in the
          live workspace environment.
        </p>
        <Link
          to="/workspace/hub"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: c.accent,
            color: "#fff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            padding: "14px 32px",
            borderRadius: 10,
            textDecoration: "none",
          }}
        >
          Open Workspace <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HowItWorksPage() {
  const { c } = useTheme();
  return (
    <div style={{ background: c.bg, minHeight: "100vh" }}>
      <PageNav />
      <Hero />
      <Pipeline />
      <DetectionMatrix />
      <CaseStudy />
      <CTA />
    </div>
  );
}
