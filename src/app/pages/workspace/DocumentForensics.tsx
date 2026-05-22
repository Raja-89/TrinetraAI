import { motion } from "motion/react";
import { FileSearch, PenTool, ScanLine, Cpu, Clock, X, FileUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useDocument } from "../../context/DocumentContext";

// ─── Design tokens (brand accent colors only) ──────────────────────────────
const ACCENT = "#5227FF";
const RED = "#E85D75";
const TEAL = "#00B3A4";
const GREEN = "#2FBF71";
const AMBER = "#F59E0B";
const PURPLE = "#8B5CF6";

// ─── SVG Arc Gauge (integrity — 34%) ─────────────────────────────────────────
function IntegrityGauge() {
  const { c, isDark } = useTheme();
  const { data } = useDocument();
  const SCORE = data.integrityScore;
  const R = 52;
  const CX = 65;
  const CY = 65;
  const circumference = 2 * Math.PI * R;
  const filled = circumference * (SCORE / 100);

  // Convert from top (270°) clockwise
  const startAngle = -90; // degrees
  const endAngle = startAngle + 360 * (SCORE / 100);

  function polar(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  const start = polar(CX, CY, R, startAngle);
  const end = polar(CX, CY, R, endAngle);
  const largeArc = SCORE > 50 ? 1 : 0;

  const trackD = `M ${CX} ${CY - R} A ${R} ${R} 0 1 1 ${CX - 0.001} ${CY - R}`;
  const fillD = `M ${start.x} ${start.y} A ${R} ${R} 0 ${largeArc} 1 ${end.x} ${end.y}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={130} height={130} viewBox="0 0 130 130">
        {/* Track */}
        <path d={trackD} fill="none" stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"} strokeWidth={10} strokeLinecap="round" />
        {/* Filled arc */}
        <path d={fillD} fill="none" stroke={RED} strokeWidth={10} strokeLinecap="round" />
        {/* Center text */}
        <text x={CX} y={CY - 6} textAnchor="middle" fill={RED} fontSize={22} fontFamily="'Syne', sans-serif" fontWeight={800}>
          {SCORE}%
        </text>
        <text x={CX} y={CY + 10} textAnchor="middle" fill={c.textDim} fontSize={9} fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.06em">
          INTEGRITY
        </text>
      </svg>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: SCORE < 50 ? RED : GREEN, fontWeight: 700, marginTop: -4 }}>
        {SCORE < 50 ? "CRITICALLY LOW" : SCORE < 75 ? "MODERATE" : "HIGH INTEGRITY"}
      </div>
    </div>
  );
}

// ─── SVG Arc Gauge (AI probability — 73%) ────────────────────────────────────
function AIProbGauge() {
  const { c, isDark } = useTheme();
  const { data } = useDocument();
  const PROB = data.aiProbScore;
  const R = 48;
  const CX = 65;
  const CY = 65;

  const startAngle = -90;
  const endAngle = startAngle + 360 * (PROB / 100);
  const largeArc = PROB > 50 ? 1 : 0;

  function polar(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  const start = polar(CX, CY, R, startAngle);
  const end = polar(CX, CY, R, endAngle);

  const trackD = `M ${CX} ${CY - R} A ${R} ${R} 0 1 1 ${CX - 0.001} ${CY - R}`;
  const fillD = `M ${start.x} ${start.y} A ${R} ${R} 0 ${largeArc} 1 ${end.x} ${end.y}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={130} height={130} viewBox="0 0 130 130">
        <path d={trackD} fill="none" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth={9} strokeLinecap="round" />
        <path d={fillD} fill="none" stroke={AMBER} strokeWidth={9} strokeLinecap="round" />
        <text x={CX} y={CY - 6} textAnchor="middle" fill={AMBER} fontSize={22} fontFamily="'Syne', sans-serif" fontWeight={800}>
          {PROB}%
        </text>
        <text x={CX} y={CY + 10} textAnchor="middle" fill={c.textDim} fontSize={8} fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.05em">
          AI-GENERATED
        </text>
      </svg>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: PROB > 50 ? AMBER : GREEN, fontWeight: 700, marginTop: -4 }}>
        {PROB > 50 ? "HIGH PROBABILITY" : "LOW PROBABILITY"}
      </div>
    </div>
  );
}

// ─── Pixel grid comparison ────────────────────────────────────────────────────
function PixelGrid() {
  const { isDark } = useTheme();
  const { data } = useDocument();
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 1 }}>
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: 1,
              background: data.anomalyCells.has(i)
                ? i % 2 === 0
                  ? RED
                  : "#FF7043"
                : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: data.anomalyCells.size > 0 ? RED : GREEN, fontWeight: 600 }}>
        {data.anomalyCells.size > 0 
          ? `⚠ Pixel inconsistency detected — ${data.anomalyCells.size} anomalous regions`
          : "✓ No pixel anomalies detected"}
      </div>
    </div>
  );
}

// ─── OCR highlighted text ─────────────────────────────────────────────────────
function OCRBlock() {
  const { c } = useTheme();
  const { data } = useDocument();
  const BORDER = c.border;
  return (
    <div>
      <pre
        style={{
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${BORDER}`,
          borderRadius: 6,
          padding: "12px 14px",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          color: c.textMuted,
          lineHeight: 1.9,
          margin: 0,
          whiteSpace: "pre-wrap" as const,
          wordBreak: "break-word" as const,
          overflowX: "auto",
        }}
      >
        {data.ocrText.map((item, idx) => (
          <span key={idx}>
            {item.label}
            {item.type === "normal" ? (
              item.text
            ) : (
              <span style={{ 
                background: item.type === "tampered" ? "rgba(232,93,117,0.22)" : "rgba(245,158,11,0.2)", 
                color: item.type === "tampered" ? RED : AMBER, 
                padding: "1px 4px", borderRadius: 3 
              }}>
                {item.text}
              </span>
            )}
          </span>
        ))}
      </pre>

      <div style={{ display: "flex", gap: 14, marginTop: 8, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: RED, opacity: 0.8 }} />
          <span style={{ fontSize: 10, color: c.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>Tampered</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: AMBER, opacity: 0.8 }} />
          <span style={{ fontSize: 10, color: c.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>Suspicious</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.confidenceFields.map((f) => (
          <div key={f.field}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: c.textMuted }}>
                {f.field}
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  color: f.conf < 50 ? RED : f.conf < 75 ? AMBER : GREEN,
                  fontWeight: 600,
                }}
              >
                {f.conf}%
              </span>
            </div>
            <div style={{ height: 4, background: c.border, borderRadius: 2, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${f.conf}%`,
                  background: f.conf < 50 ? RED : f.conf < 75 ? AMBER : GREEN,
                  borderRadius: 2,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: c.textDim, marginTop: 2 }}>
              {f.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function DocumentForensics() {
  const { c, isDark } = useTheme();
  const { data } = useDocument();
  const BG = c.bg;
  const PANEL = c.bgCard;
  const BORDER = c.border;
  return (
    <div style={{ minHeight: "100vh", background: BG, padding: 24, fontFamily: "'Space Grotesk', sans-serif", color: c.text }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap" as const, gap: 16 }}
        >
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28, margin: 0, letterSpacing: "-0.02em", color: c.text }}>
              {data.title}
            </h1>
            <p style={{ margin: "4px 0 0", color: c.textDim, fontSize: 14 }}>
              Document Forensics Center · Metadata · Signatures · OCR · AI Generation Detection
            </p>
          </div>
        </motion.div>

        {/* ── Section 1: Metadata Scanner + Signature Analysis ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
        >
          {/* Left: Metadata Scanner */}
          <div style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 8 }}>
              <FileSearch size={14} color={ACCENT} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: c.text }}>
                Metadata Scanner
              </span>
              <span style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: RED, background: "rgba(232,93,117,0.14)", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>
                4 ANOMALIES
              </span>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
                <tbody>
                  {data.metaRows.map((row, i) => (
                    <tr key={i} style={{ background: row.flagged ? "rgba(232,93,117,0.04)" : "transparent" }}>
                      <td style={{ padding: "8px 10px", borderBottom: `1px solid ${BORDER}`, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: c.textMuted, whiteSpace: "nowrap" as const }}>
                        {row.field}
                      </td>
                      <td style={{ padding: "8px 10px", borderBottom: `1px solid ${BORDER}`, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: row.flagged ? RED : c.text }}>
                        {row.value}
                      </td>
                      <td style={{ padding: "8px 10px", borderBottom: `1px solid ${BORDER}`, textAlign: "right" as const }}>
                        <span style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          color: row.flagged ? RED : GREEN,
                          background: row.flagged ? "rgba(232,93,117,0.14)" : "rgba(47,191,113,0.14)",
                          padding: "2px 7px",
                          borderRadius: 3,
                        }}>
                          {row.flagged ? "ANOMALY" : "OK"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <IntegrityGauge />
              </div>
            </div>
          </div>

          {/* Right: Signature Analysis */}
          <div style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 8 }}>
              <PenTool size={14} color={ACCENT} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: c.text }}>
                Signature Analysis
              </span>
              <span style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: RED, background: "rgba(232,93,117,0.14)", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>
                MISMATCH
              </span>
            </div>
            <div style={{ padding: "16px 18px" }}>
              {/* Side-by-side signature boxes */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
                {[
                  { label: "Reference Signature", borderColor: GREEN },
                  { label: "Document Signature", borderColor: RED },
                ].map((sig, idx) => (
                  <div key={idx}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: c.textMuted, marginBottom: 6 }}>
                      {sig.label}
                    </div>
                    <div
                      style={{
                        height: 90,
                        background: "rgba(255,255,255,0.02)",
                        border: `1px solid ${sig.borderColor}40`,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          fontSize: 28,
                          fontStyle: "italic",
                          color: c.textDim,
                          transform: "rotate(-6deg)",
                          userSelect: "none",
                          letterSpacing: "0.04em",
                        }}
                      >
                        R. Kumar
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pixel grid comparison */}
              <div style={{ marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: c.textMuted }}>
                Pixel comparison heatmap — 10×8 grid
              </div>
              <PixelGrid />
            </div>
          </div>
        </motion.div>

        {/* ── Section 2: OCR Layer Analysis + AI Generation Detection ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
        >
          {/* Left: OCR Layer Analysis */}
          <div style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 8 }}>
              <ScanLine size={14} color={ACCENT} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: c.text }}>
                OCR Layer Analysis
              </span>
              <span style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: AMBER, fontWeight: 600 }}>
                Avg conf: 60%
              </span>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <OCRBlock />
            </div>
          </div>

          {/* Right: AI Generation Detection */}
          <div style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 8 }}>
              <Cpu size={14} color={ACCENT} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: c.text }}>
                AI Generation Detection
              </span>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                <AIProbGauge />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {data.aiTraits.map((trait, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.07 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 12px",
                      background: "rgba(255,255,255,0.025)",
                      border: `1px solid ${BORDER}`,
                      borderRadius: 7,
                    }}
                  >
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: trait.dot, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: c.text }}>
                      {trait.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase" as const,
                        color: trait.dot,
                        background: `${trait.dot}18`,
                        padding: "2px 7px",
                        borderRadius: 3,
                      }}
                    >
                      {trait.severity}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Section 3: Forensic Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}
        >
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 8 }}>
            <Clock size={14} color={ACCENT} />
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: c.text }}>
              Forensic Timeline
            </span>
            <span style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: c.textDim }}>
              {data.timelineEvents.length} events detected
            </span>
          </div>
          <div style={{ padding: "28px 32px 24px", overflowX: "auto" }}>
            <div style={{ minWidth: 640, position: "relative" }}>
              {/* Connecting line */}
              <div
                style={{
                  position: "absolute",
                  top: 22,
                  left: "5%",
                  right: "5%",
                  height: 2,
                  background: `linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}, ${RED}, ${AMBER}, ${RED}, ${PURPLE})`,
                  zIndex: 0,
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                {data.timelineEvents.map((ev, i) => {
                  const Icon = ev.Icon;
                  return (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: `${100 / data.timelineEvents.length}%` }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: BG,
                          border: `2px solid ${ev.color}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 0 14px ${ev.color}50`,
                        }}
                      >
                        <Icon size={16} color={ev.color} />
                      </motion.div>
                      <div style={{ marginTop: 10, textAlign: "center" }}>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 11, color: ev.color, marginBottom: 3 }}>
                          {ev.label}
                        </div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: c.textDim }}>
                          {ev.ts}
                        </div>
                        {"flag" in ev && ev.flag && (
                          <div style={{ marginTop: 5, fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: ev.color, fontWeight: 700, letterSpacing: "0.06em", background: `${ev.color}15`, padding: "2px 6px", borderRadius: 3, display: "inline-block" }}>
                            {ev.flag}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
