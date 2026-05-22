import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Building,
  Receipt,
  CreditCard,
  IdCard,
  MapPin,
  Lock,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Brain,
  TrendingUp,
  ShieldAlert,
  User,
  Activity,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// ─── Design tokens (brand accent colors – static) ────────────────────────────
// T.bg, T.surface, T.border, T.textPrimary, T.textSecondary, T.textMuted
// are computed dynamically inside InvestigationWorkspace from useTheme.
const T_ACCENT = "#5227FF";
const T_ALERT = "#E85D75";
const T_TEAL = "#00B3A4";
const T_GREEN = "#2FBF71";
const T_AMBER = "#F59E0B";
// Placeholder T for components defined before InvestigationWorkspace;
// will be overridden by the runtime theme in the main export.
const T = {
  bg: "#06080F",
  surface: "#0D1117",
  surfaceAlt: "#111827",
  border: "#1E2433",
  accent: T_ACCENT,
  alert: T_ALERT,
  teal: T_TEAL,
  green: T_GREEN,
  amber: T_AMBER,
  textPrimary: "#E8EAF0",
  textSecondary: "#6B7280",
  textMuted: "#374151",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const EVIDENCE_ITEMS = [
  { id: 1, icon: FileText, name: "Salary_Slip_Q4.pdf", status: "Suspicious", anomalies: 3, size: "284 KB", date: "Oct 12", type: "PDF Document" },
  { id: 2, icon: Building, name: "Bank_Statement_2023.pdf", status: "Suspicious", anomalies: 2, size: "1.1 MB", date: "Oct 14", type: "PDF Document" },
  { id: 3, icon: Receipt, name: "GST_Filing_FY23.pdf", status: "Verified", anomalies: 0, size: "542 KB", date: "Oct 15", type: "Tax Record" },
  { id: 4, icon: CreditCard, name: "Loan_Application.pdf", status: "Pending", anomalies: 0, size: "189 KB", date: "Oct 18", type: "Form Data" },
  { id: 5, icon: IdCard, name: "Aadhaar_Copy.jpg", status: "Suspicious", anomalies: 1, size: "892 KB", date: "Oct 19", type: "Image" },
  { id: 6, icon: MapPin, name: "Address_Proof.pdf", status: "Verified", anomalies: 0, size: "310 KB", date: "Oct 20", type: "Utility Bill" },
];

const STATUS_CONFIG = {
  Verified: { color: T.green, bg: "rgba(47,191,113,0.12)" },
  Suspicious: { color: T.alert, bg: "rgba(232,93,117,0.12)" },
  Pending: { color: T.amber, bg: "rgba(245,158,11,0.12)" },
};

const REASONING_CARDS = [
  {
    id: 1,
    icon: TrendingUp,
    title: "Income Mismatch",
    confidence: 87,
    risk: "HIGH RISK",
    riskColor: T.alert,
    riskBg: "rgba(232,93,117,0.12)",
    bullets: [
      { color: T.alert, text: "Declared salary ₹42,000/mo vs bank deposits ₹18,200/mo average" },
      { color: T.alert, text: "GST turnover inconsistent with employed status" },
      { color: T.amber, text: "3 months show zero payroll credit" },
    ],
  },
  {
    id: 2,
    icon: ShieldAlert,
    title: "Document Forgery Risk",
    confidence: 91,
    risk: "DETECTED",
    riskColor: T.alert,
    riskBg: "rgba(232,93,117,0.12)",
    bullets: [
      { color: T.alert, text: "Font inconsistency in salary amount field (2 fonts detected)" },
      { color: T.alert, text: "EXIF metadata shows document edited 3× after creation" },
      { color: T.amber, text: "Digital signature hash mismatch with issuer" },
    ],
  },
  {
    id: 3,
    icon: User,
    title: "Identity Verification",
    confidence: 72,
    risk: "NORMAL",
    riskColor: T.teal,
    riskBg: "rgba(0,179,164,0.12)",
    bullets: [
      { color: T.green, text: "Aadhaar biometric match: 94.2%" },
      { color: T.amber, text: "PAN linked to 2 other applications" },
      { color: T.green, text: "Photo verification passed" },
    ],
  },
  {
    id: 4,
    icon: Activity,
    title: "Behavioral Anomaly",
    confidence: 65,
    risk: "HIGH RISK",
    riskColor: T.alert,
    riskBg: "rgba(232,93,117,0.12)",
    bullets: [
      { color: T.amber, text: "Application submitted at 02:14 AM" },
      { color: T.alert, text: "IP geolocation differs from declared residence (340 km)" },
      { color: T.amber, text: "Device fingerprint matched to 4 prior fraud applications" },
    ],
  },
];

type ForensicsMode = "Original" | "OCR" | "Metadata" | "Forgery Heatmap" | "Timeline";

// ─── Left panel: Evidence item ────────────────────────────────────────────────
function EvidenceItem({
  item,
  isActive,
  onClick,
}: {
  item: (typeof EVIDENCE_ITEMS)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  const statusCfg = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ x: 2 }}
      style={{
        padding: "10px 12px",
        borderRadius: 8,
        cursor: "pointer",
        border: `1px solid ${isActive ? T.accent : T.border}`,
        background: isActive ? "rgba(82,39,255,0.08)" : "transparent",
        marginBottom: 6,
        transition: "border-color 0.15s, background 0.15s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <Icon size={14} color={isActive ? T.accent : T.textSecondary} />
        <span
          style={{
            fontSize: 12,
            fontFamily: "'Space Grotesk', sans-serif",
            color: isActive ? T.textPrimary : T.textSecondary,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.name}
        </span>
        {item.anomalies > 0 && (
          <span
            style={{
              background: T.alert,
              color: "#fff",
              borderRadius: 10,
              padding: "1px 6px",
              fontSize: 10,
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 700,
            }}
          >
            {item.anomalies}
          </span>
        )}
      </div>
      <div style={{ fontSize: 10, color: T.textSecondary, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8 }}>
        {item.type} • Uploaded {item.date}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: 10,
            fontFamily: "'IBM Plex Mono', monospace",
            color: statusCfg.color,
            background: statusCfg.bg,
            padding: "2px 7px",
            borderRadius: 4,
            letterSpacing: "0.04em",
          }}
        >
          {item.status.toUpperCase()}
        </span>
        <span style={{ fontSize: 10, color: T.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>
          {item.size}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Center Panel views ───────────────────────────────────────────────────────
function OriginalView() {
  return (
    <div style={{ padding: "24px 28px", fontFamily: "'IBM Plex Mono', monospace" }}>
      <div style={{ borderBottom: `1px solid ${T.border}`, paddingBottom: 16, marginBottom: 20, display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 14, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: T.textPrimary, letterSpacing: "0.08em" }}>
            NEXGEN SYSTEMS PRIVATE LIMITED
          </div>
          <div style={{ fontSize: 11, color: T.textSecondary, marginTop: 3 }}>CIN: U72200MH2015PTC265891</div>
          <div style={{ fontSize: 11, color: T.textSecondary }}>Plot 47, MIDC Andheri East, Mumbai – 400093</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: T.textSecondary }}>Pay Slip — Q4 FY2023</div>
          <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>Employee ID: EMP-2847</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[
          ["Employee Name", "Rajesh Kumar"], ["Designation", "Senior Software Engineer"],
          ["Department", "Product Engineering"], ["Pay Period", "Oct – Dec 2023"],
          ["Account No.", "XXXX XXXX 4821"], ["PAN", "ABCPK1234E"],
        ].map(([label, value]) => (
          <div key={label}>
            <div style={{ fontSize: 10, color: T.textSecondary, marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 12, color: T.textPrimary }}>{value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 6, border: `1px solid ${T.border}`, overflow: "hidden", marginBottom: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "rgba(255,255,255,0.03)", padding: "8px 14px", borderBottom: `1px solid ${T.border}` }}>
          {["Earnings", "Amount (₹)", "Deductions", "Amount (₹)"].map((h) => (
            <div key={h} style={{ fontSize: 10, color: T.textSecondary, fontWeight: 600 }}>{h}</div>
          ))}
        </div>
        {[
          ["Basic Salary", "25,000", "PF (Employee)", "3,000"],
          ["HRA", "10,000", "Professional Tax", "200"],
          ["Transport", "1,600", "TDS", "1,800"],
          ["Special Allow.", "5,400", "—", "—"],
        ].map(([e, ea, d, da], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "7px 14px", borderBottom: i < 3 ? `1px solid rgba(30,36,51,0.5)` : "none" }}>
            <div style={{ fontSize: 11, color: T.textSecondary }}>{e}</div>
            <div style={{ fontSize: 11, color: T.textPrimary }}>{ea}</div>
            <div style={{ fontSize: 11, color: T.textSecondary }}>{d}</div>
            <div style={{ fontSize: 11, color: T.textPrimary }}>{da}</div>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "8px 14px", borderTop: `1px solid ${T.border}`, background: "rgba(255,255,255,0.03)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.textPrimary }}>Gross Pay</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.green }}>42,000</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.textPrimary }}>Total Deductions</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.alert }}>5,000</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 11, color: T.textSecondary }}>Net Salary Payable</div>
        <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Syne', sans-serif", color: T.textPrimary }}>₹37,000</div>
      </div>
    </div>
  );
}

function OCRView() {
  const lines = [
    { words: [{ w: "NEXGEN SYSTEMS PRIVATE LIMITED", flag: null }] },
    { words: [{ w: "Pay Slip Q4 FY2023", flag: null }] },
    { words: [{ w: "Employee: Rajesh Kumar | EMP-2847", flag: null }] },
    { words: [{ w: "Basic Salary: ", flag: null }, { w: "₹25,000", flag: "yellow" }] },
    { words: [{ w: "Gross Pay: ", flag: null }, { w: "₹42,000", flag: "red" }] },
    { words: [{ w: "Account: XXXX4821 | IFSC: ", flag: null }, { w: "HDFC0001234", flag: "yellow" }] },
    { words: [{ w: "PAN: ABCPK1234E", flag: null }] },
    { words: [{ w: "Authorized Signatory: ", flag: null }, { w: "[SIGNATURE]", flag: "red" }] },
  ];
  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, color: T.textSecondary, fontFamily: "'Space Grotesk', sans-serif" }}>OCR Confidence:</span>
        <span style={{ fontSize: 11, color: T.amber, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>73.2%</span>
        <span style={{ marginLeft: 8, fontSize: 10, background: "rgba(245,158,11,0.12)", color: T.amber, padding: "2px 8px", borderRadius: 4, fontFamily: "'IBM Plex Mono', monospace" }}>
          8 REGIONS FLAGGED
        </span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${T.border}`, borderRadius: 6, padding: 16 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, marginBottom: 8, lineHeight: 1.6 }}>
            {line.words.map((word, j) => (
              <span key={j} style={{
                color: word.flag === "red" ? T.alert : word.flag === "yellow" ? T.amber : T.textSecondary,
                background: word.flag === "red" ? "rgba(232,93,117,0.15)" : word.flag === "yellow" ? "rgba(245,158,11,0.15)" : "transparent",
                borderRadius: word.flag ? 3 : 0,
                padding: word.flag ? "0 3px" : 0,
              }}>{word.w}</span>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 16 }}>
        {[{ bg: "rgba(232,93,117,0.4)", label: "Tampered / Low confidence" }, { bg: "rgba(245,158,11,0.4)", label: "Suspicious value" }].map((leg) => (
          <div key={leg.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: leg.bg, display: "inline-block" }} />
            <span style={{ fontSize: 10, color: T.textSecondary, fontFamily: "'Space Grotesk', sans-serif" }}>{leg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetadataView() {
  const rows = [
    { label: "Creator", value: "Microsoft Word 16.0", flag: false },
    { label: "Modified Date", value: "2024-01-09 02:31:17 UTC", flag: true },
    { label: "PDF Producer", value: "Adobe Acrobat 11.0 (modified)", flag: true },
    { label: "Page Count", value: "2", flag: false },
    { label: "Author", value: "NexGen HR Portal", flag: false },
    { label: "Modification Count", value: "7 revisions", flag: true },
    { label: "Digital Signature", value: "INVALID – Hash mismatch", flag: true },
    { label: "Encryption", value: "None", flag: false },
  ];
  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 11, background: "rgba(232,93,117,0.12)", color: T.alert, padding: "3px 10px", borderRadius: 4, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
          4 ANOMALIES DETECTED
        </span>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Field", "Value", "Status"].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 10, color: T.textSecondary, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: "0.06em", borderBottom: `1px solid ${T.border}`, background: "rgba(255,255,255,0.02)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: row.flag ? "rgba(232,93,117,0.05)" : "transparent" }}>
              <td style={{ padding: "9px 12px", fontSize: 11, color: T.textSecondary, fontFamily: "'IBM Plex Mono', monospace", borderBottom: `1px solid rgba(30,36,51,0.5)` }}>{row.label}</td>
              <td style={{ padding: "9px 12px", fontSize: 11, color: row.flag ? T.alert : T.textPrimary, fontFamily: "'IBM Plex Mono', monospace", borderBottom: `1px solid rgba(30,36,51,0.5)` }}>{row.value}</td>
              <td style={{ padding: "9px 12px", borderBottom: `1px solid rgba(30,36,51,0.5)` }}>
                <span style={{ fontSize: 10, background: row.flag ? "rgba(232,93,117,0.12)" : "rgba(47,191,113,0.10)", color: row.flag ? T.alert : T.green, padding: "2px 7px", borderRadius: 4, fontFamily: "'IBM Plex Mono', monospace", fontWeight: row.flag ? 700 : 400 }}>
                  {row.flag ? "ANOMALY" : "NORMAL"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ForgeryHeatmapView() {
  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null);
  const regions = [
    { top: 88, left: 180, width: 120, height: 18, label: "Font inconsistency detected" },
    { top: 148, left: 60, width: 200, height: 20, label: "Suspicious OCR region" },
    { top: 200, left: 160, width: 100, height: 18, label: "Copy-paste artifact" },
    { top: 248, left: 220, width: 140, height: 18, label: "Pixel density anomaly" },
  ];
  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: 12, display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 11, background: "rgba(232,93,117,0.12)", color: T.alert, padding: "3px 10px", borderRadius: 4, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
          FORGERY RISK: 91%
        </span>
        <span style={{ fontSize: 10, color: T.textSecondary, fontFamily: "'Space Grotesk', sans-serif" }}>4 suspicious regions highlighted</span>
      </div>
      <div style={{ position: "relative", background: "rgba(255,255,255,0.025)", border: `1px solid ${T.border}`, borderRadius: 6, padding: "20px 24px", minHeight: 300, overflow: "hidden" }}>
        {[
          { top: 20, width: "60%", height: 14 }, { top: 44, width: "40%", height: 10 },
          { top: 80, width: "90%", height: 10 }, { top: 100, width: "85%", height: 10 },
          { top: 120, width: "55%", height: 10 }, { top: 140, width: "92%", height: 10 },
          { top: 160, width: "78%", height: 10 }, { top: 195, width: "45%", height: 10 },
          { top: 215, width: "90%", height: 10 }, { top: 235, width: "80%", height: 10 },
          { top: 255, width: "65%", height: 10 },
        ].map((line, i) => (
          <div key={i} style={{ position: "absolute", top: line.top, left: 24, width: line.width, height: line.height, background: "rgba(108,114,132,0.12)", borderRadius: 2 }} />
        ))}
        {regions.map((r, i) => (
          <div key={i} onMouseEnter={() => setHoveredRegion(i)} onMouseLeave={() => setHoveredRegion(null)}
            style={{ position: "absolute", top: r.top, left: r.left, width: r.width, height: r.height, background: hoveredRegion === i ? "rgba(232,93,117,0.45)" : "rgba(232,93,117,0.28)", border: `1px solid ${T.alert}`, borderRadius: 2, cursor: "pointer", transition: "background 0.15s" }}>
            {hoveredRegion === i && (
              <div style={{ position: "absolute", top: -32, left: 0, background: "#1A0D2E", border: `1px solid ${T.alert}`, borderRadius: 4, padding: "4px 8px", fontSize: 10, color: T.alert, fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "nowrap", zIndex: 10 }}>
                {r.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineView() {
  const events = [
    { date: "2023-09-14 11:22", label: "Document Created", color: T.green },
    { date: "2023-10-01 23:47", label: "Metadata Modified", color: T.alert },
    { date: "2023-10-02 00:13", label: "OCR Layer Injected", color: T.alert },
    { date: "2023-11-15 14:30", label: "Signature Added", color: T.amber },
    { date: "2024-01-09 02:31", label: "Final Edit", color: T.alert },
    { date: "2024-01-09 09:05", label: "Uploaded to Portal", color: T.teal },
  ];
  return (
    <div style={{ padding: "32px 28px" }}>
      <div style={{ position: "relative", paddingLeft: 24 }}>
        <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: `linear-gradient(to bottom, ${T.green}, ${T.alert})`, borderRadius: 2 }} />
        {events.map((ev, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
            style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: ev.color, border: `2px solid ${T.bg}`, marginLeft: -6, marginTop: 2, flexShrink: 0, boxShadow: `0 0 8px ${ev.color}60` }} />
            <div>
              <div style={{ fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", color: T.textPrimary, fontWeight: 600 }}>{ev.label}</div>
              <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", color: T.textSecondary, marginTop: 2 }}>{ev.date}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Right panel: Reasoning card ─────────────────────────────────────────────
function ReasoningCard({ card }: { card: (typeof REASONING_CARDS)[0] }) {
  const [expanded, setExpanded] = useState(true);
  const Icon = card.icon;
  return (
    <motion.div layout style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
      <div onClick={() => setExpanded(!expanded)} style={{ padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(82,39,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={14} color={T.accent} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
            <span style={{ fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: T.textPrimary }}>{card.title}</span>
            <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: T.accent, fontWeight: 700 }}>{card.confidence}%</span>
          </div>
          <span style={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", color: card.riskColor, background: card.riskBg, padding: "2px 6px", borderRadius: 3, letterSpacing: "0.08em", fontWeight: 700 }}>
            {card.risk}
          </span>
        </div>
        <div style={{ color: T.textMuted }}>{expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <div style={{ padding: "10px 14px 14px", borderTop: `1px solid ${T.border}` }}>
              {card.bullets.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 7 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: b.color, marginTop: 4, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", color: T.textSecondary, lineHeight: 1.5 }}>{b.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function InvestigationWorkspace() {
  const { c, isDark } = useTheme();
  // Override theme-dependent tokens at runtime
  Object.assign(T, {
    bg: c.bg,
    surface: c.bgSecondary,
    surfaceAlt: c.bgCard,
    border: c.border,
    textPrimary: c.text,
    textSecondary: c.textMuted,
    textMuted: c.textDim,
  });

  const [activeEvidence, setActiveEvidence] = useState(1);
  const [activeMode, setActiveMode] = useState<ForensicsMode>("Original");
  const MODES: ForensicsMode[] = ["Original", "OCR", "Metadata", "Forgery Heatmap", "Timeline"];

  const renderCenter = () => {
    switch (activeMode) {
      case "Original": return <OriginalView />;
      case "OCR": return <OCRView />;
      case "Metadata": return <MetadataView />;
      case "Forgery Heatmap": return <ForgeryHeatmapView />;
      case "Timeline": return <TimelineView />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: "'Space Grotesk', sans-serif", overflow: "hidden" }}>

      {/* ── Left: Evidence Locker ── */}
      <div style={{ width: 240, flexShrink: 0, borderRight: `1px solid ${T.border}`, background: T.surface, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "16px 14px 12px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <Lock size={14} color={T.accent} />
          <span style={{ fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: T.textPrimary, letterSpacing: "0.06em", flex: 1 }}>EVIDENCE LOCKER</span>
          <span style={{ background: T.accent, color: "#fff", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>6 files</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
          {EVIDENCE_ITEMS.map((item) => (
            <EvidenceItem key={item.id} item={item} isActive={activeEvidence === item.id} onClick={() => setActiveEvidence(item.id)} />
          ))}
        </div>
        <div style={{ padding: "10px 14px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 12 }}>
          {[{ label: "Verified", color: T.green, count: 2 }, { label: "Suspicious", color: T.alert, count: 3 }, { label: "Pending", color: T.amber, count: 1 }].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: s.color }}>{s.count}</div>
              <div style={{ fontSize: 9, color: T.textMuted, letterSpacing: "0.04em" }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Center: Forensics Viewer ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 6, background: T.surface, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: T.textSecondary, marginRight: 6, display: "flex", alignItems: "center" }}>View:</span>
          {MODES.map((mode) => (
            <button key={mode} onClick={() => setActiveMode(mode)} style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${activeMode === mode ? T.accent : T.border}`, background: activeMode === mode ? "rgba(82,39,255,0.18)" : "transparent", color: activeMode === mode ? T.accent : T.textSecondary, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer", fontWeight: activeMode === mode ? 700 : 400, transition: "all 0.15s" }}>
              {mode}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: "auto", background: "rgba(255,255,255,0.005)" }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeMode} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
              {renderCenter()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Right: AI Reasoning ── */}
      <div style={{ width: 300, flexShrink: 0, borderLeft: `1px solid ${T.border}`, background: T.surface, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "16px 14px 12px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <Brain size={14} color={T.accent} />
          <span style={{ fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: T.textPrimary, letterSpacing: "0.06em" }}>AI INVESTIGATION REASONING</span>
        </div>
        <div style={{ margin: "12px 12px 4px", padding: "10px 12px", background: "rgba(232,93,117,0.08)", border: `1px solid rgba(232,93,117,0.25)`, borderRadius: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, color: T.textSecondary, letterSpacing: "0.06em", fontFamily: "'IBM Plex Mono', monospace" }}>OVERALL RISK SCORE</div>
              <div style={{ fontSize: 28, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: T.alert, lineHeight: 1.2 }}>
                84<span style={{ fontSize: 14, color: T.textSecondary }}>/100</span>
              </div>
            </div>
            <AlertTriangle size={28} color={T.alert} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 12px" }}>
          {REASONING_CARDS.map((card) => <ReasoningCard key={card.id} card={card} />)}
        </div>
        <div style={{ padding: "10px 12px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 8 }}>
          <button style={{ flex: 1, padding: "8px", background: T.accent, border: "none", borderRadius: 6, color: "#fff", fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em" }}>
            Escalate Case
          </button>
          <button style={{ flex: 1, padding: "8px", background: "transparent", border: `1px solid ${T.border}`, borderRadius: 6, color: T.textSecondary, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer" }}>
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}
