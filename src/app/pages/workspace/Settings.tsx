import { useState } from "react";
import {
  Brain,
  SlidersHorizontal,
  Map,
  Bell,
  ShieldCheck,
  Save,
  Check,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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

const PURPLE = C.accent;
const GREEN = C.green;

const categories = [
  { id: "ai", label: "AI Model", icon: Brain },
  { id: "thresholds", label: "Detection Thresholds", icon: SlidersHorizontal },
  { id: "regional", label: "Regional Templates", icon: Map },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "access", label: "Access Control", icon: ShieldCheck },
];

const MODEL_OPTIONS = [
  "TRINETRA-Vision-v2.3 (Latest)",
  "TRINETRA-Vision-v2.1",
  "TRINETRA-Classic-v1.8",
  "TRINETRA-Lite-v1.5",
];

const SLIDER_DEFS: { label: string; key: keyof typeof DEFAULT_SLIDERS; color: string }[] = [
  { label: "Forgery Detection Aggressiveness", key: "forgery", color: C.accent },
  { label: "Income Contradiction Sensitivity", key: "income", color: C.teal },
  { label: "Identity Verification Strictness", key: "identity", color: C.red },
  { label: "Graph Fraud Detection Radius", key: "graph", color: C.amber },
];

const DEFAULT_SLIDERS = { forgery: 75, income: 68, identity: 82, graph: 55 };

const TOGGLE_DEFS: { label: string; key: keyof typeof DEFAULT_TOGGLES; desc: string }[] = [
  {
    label: "Auto-escalation above 85%",
    key: "autoEscalate",
    desc: "Automatically escalate cases when risk score exceeds 85% threshold",
  },
  {
    label: "Enable OCR deep scan",
    key: "deepScan",
    desc: "Run multi-pass OCR with metadata forensics on all uploaded documents",
  },
  {
    label: "Cross-document reasoning",
    key: "crossDoc",
    desc: "Enable AI to reason across documents and identify contradictions",
  },
  {
    label: "Behavioral analysis",
    key: "behavioral",
    desc: "Analyse applicant interaction patterns for anomaly detection",
  },
];

const DEFAULT_TOGGLES = { autoEscalate: true, deepScan: true, crossDoc: true, behavioral: false };

function StyledSlider({
  label,
  value,
  onChange,
  color,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  color: string;
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: C.text }}>{label}</span>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color }}>{value}%</span>
      </div>
      <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: C.border, borderRadius: 4 }} />
        <div style={{ position: "absolute", left: 0, width: `${value}%`, height: 4, background: color, borderRadius: 4, transition: "width 0.1s" }} />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ position: "absolute", left: 0, right: 0, width: "100%", opacity: 0, height: 20, cursor: "pointer", margin: 0 }}
        />
        <div
          style={{
            position: "absolute",
            left: `calc(${value}% - 8px)`,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: color,
            border: `2px solid ${C.surface}`,
            boxShadow: `0 0 8px ${color}66`,
            pointerEvents: "none",
            transition: "left 0.1s",
          }}
        />
      </div>
    </div>
  );
}

function StyledToggle({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "15px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 500, color: C.text, margin: "0 0 3px" }}>{label}</p>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, color: C.muted, margin: 0, lineHeight: 1.5 }}>{desc}</p>
      </div>
      <button
        onClick={onChange}
        style={{
          width: 42,
          height: 24,
          borderRadius: 12,
          background: value ? C.accent : C.surface2,
          border: `1px solid ${value ? C.accent : C.border}`,
          cursor: "pointer",
          position: "relative",
          flexShrink: 0,
          transition: "background 0.22s, border-color 0.22s",
        }}
      >
        <motion.div
          animate={{ x: value ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{ position: "absolute", top: 3, width: 16, height: 16, borderRadius: "50%", background: value ? "#fff" : C.muted }}
        />
      </button>
    </div>
  );
}

export function Settings() {
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
  const [activeCategory, setActiveCategory] = useState("ai");
  const [selectedModel, setSelectedModel] = useState(MODEL_OPTIONS[0]);
  const [modelDropOpen, setModelDropOpen] = useState(false);
  const [sliders, setSliders] = useState({ ...DEFAULT_SLIDERS });
  const [toggles, setToggles] = useState({ ...DEFAULT_TOGGLES });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const activeCat = categories.find((c) => c.id === activeCategory)!;

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
      {/* Left nav */}
      <div
        style={{
          width: 260,
          flexShrink: 0,
          background: C.surface,
          borderRight: `1px solid ${C.border}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "28px 24px 20px", borderBottom: `1px solid ${C.border}` }}>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              margin: "0 0 4px",
              letterSpacing: "-0.01em",
            }}
          >
            Settings &amp; Model Control
          </h1>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: C.subtle, margin: 0 }}>
            Configure AI sensitivity and system behaviour
          </p>
        </div>

        <nav style={{ paddingTop: 12 }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "12px 24px",
                  background: isActive ? "rgba(82,39,255,0.08)" : "transparent",
                  border: "none",
                  borderLeft: isActive ? `3px solid ${C.accent}` : "3px solid transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.18s",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 7,
                    background: isActive ? "rgba(82,39,255,0.15)" : C.surface2,
                    border: `1px solid ${isActive ? C.accent + "44" : C.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isActive ? C.accent : C.subtle,
                    flexShrink: 0,
                    transition: "all 0.18s",
                  }}
                >
                  <Icon size={14} />
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
                  {cat.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", padding: "20px 24px", borderTop: `1px solid ${C.border}` }}>
          <div
            style={{
              background: C.surface2,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: "10px 14px",
            }}
          >
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: C.muted, margin: "0 0 4px", letterSpacing: "0.08em" }}>
              SYSTEM VERSION
            </p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: C.teal, margin: 0 }}>
              TRINETRA OS v4.1.2
            </p>
          </div>
        </div>
      </div>

      {/* Right content pane */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {activeCategory === "ai" ? (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ padding: "32px 36px" }}
          >
            <div style={{ marginBottom: 28 }}>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "0 0 4px",
                  letterSpacing: "-0.01em",
                }}
              >
                AI Model Configuration
              </h2>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: C.subtle, margin: 0 }}>
                Tune TRINETRA's core detection models and sensitivity parameters
              </p>
            </div>

            {/* Model version selector */}
            <div
              style={{
                background: C.surface2,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "22px 24px",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: C.subtle,
                  margin: "0 0 14px",
                }}
              >
                Model Version
              </p>

              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setModelDropOpen((v) => !v)}
                  style={{
                    width: "100%",
                    background: C.surface,
                    border: `1px solid ${modelDropOpen ? C.accent + "77" : C.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    color: C.text,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 13,
                    transition: "border-color 0.2s",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Brain size={14} color={C.accent} />
                    {selectedModel}
                  </span>
                  <ChevronDown
                    size={14}
                    color={C.subtle}
                    style={{
                      transform: modelDropOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>

                <AnimatePresence>
                  {modelDropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: 0,
                        right: 0,
                        background: C.surface,
                        border: `1px solid ${C.border}`,
                        borderRadius: 8,
                        overflow: "hidden",
                        zIndex: 20,
                        boxShadow: "0 16px 40px rgba(0,0,0,0.55)",
                      }}
                    >
                      {MODEL_OPTIONS.map((opt, i) => (
                        <button
                          key={opt}
                          onClick={() => { setSelectedModel(opt); setModelDropOpen(false); }}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            background: opt === selectedModel ? "rgba(82,39,255,0.1)" : "transparent",
                            border: "none",
                            borderBottom: i < MODEL_OPTIONS.length - 1 ? `1px solid ${C.border}` : "none",
                            textAlign: "left",
                            cursor: "pointer",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 13,
                            color: opt === selectedModel ? C.accent : C.text,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {opt}
                          {opt === selectedModel && <Check size={13} color={C.accent} />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sliders */}
            <div
              style={{
                background: C.surface2,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "22px 24px",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: C.subtle,
                  margin: "0 0 20px",
                }}
              >
                Detection Sensitivity
              </p>
              {SLIDER_DEFS.map((s) => (
                <StyledSlider
                  key={s.key}
                  label={s.label}
                  value={sliders[s.key]}
                  onChange={(v) => setSliders((prev) => ({ ...prev, [s.key]: v }))}
                  color={s.color}
                />
              ))}
            </div>

            {/* Toggles */}
            <div
              style={{
                background: C.surface2,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "22px 24px",
                marginBottom: 28,
              }}
            >
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: C.subtle,
                  margin: "0 0 4px",
                }}
              >
                Model Confidence Tuning
              </p>
              {TOGGLE_DEFS.map((tog) => (
                <StyledToggle
                  key={tog.key}
                  label={tog.label}
                  desc={tog.desc}
                  value={toggles[tog.key]}
                  onChange={() => setToggles((prev) => ({ ...prev, [tog.key]: !prev[tog.key] }))}
                />
              ))}
            </div>

            {/* Save */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={handleSave}
                style={{
                  background: saved ? GREEN : PURPLE,
                  border: "none",
                  borderRadius: 10,
                  padding: "13px 30px",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  letterSpacing: "0.05em",
                  transition: "background 0.25s",
                  boxShadow: `0 0 24px ${saved ? GREEN + "55" : PURPLE + "55"}`,
                }}
              >
                {saved ? <><Check size={15} /> Saved</> : <><Save size={15} /> Save Changes</>}
              </button>
            </div>
          </motion.div>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              padding: 60,
              minHeight: "100%",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 14,
                background: "rgba(82,39,255,0.08)",
                border: `1px solid rgba(82,39,255,0.2)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.accent,
              }}
            >
              <activeCat.icon size={26} />
            </div>
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: C.text,
                margin: 0,
              }}
            >
              {activeCat.label}
            </p>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                color: C.subtle,
                margin: 0,
                textAlign: "center",
                maxWidth: 320,
                lineHeight: 1.6,
              }}
            >
              Configure {activeCat.label.toLowerCase()} parameters for your TRINETRA deployment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
