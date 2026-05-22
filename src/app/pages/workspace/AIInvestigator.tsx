import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  User,
  Cpu,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  FileText,
  Activity,
  Zap,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// ─── Design tokens (brand accent colors, not theme-dependent) ──────────────────
const PURPLE = "#5227FF";
const RED = "#E85D75";
const TEAL = "#00B3A4";
const GREEN = "#2FBF71";
const AMBER = "#F59E0B";
// BG, PANEL, PANEL_STRONG, BORDER, TEXT_DIM, TEXT_MID computed from useTheme in main export

// ─── Confidence arc SVG ───────────────────────────────────────────────────────
function ConfidenceArc({ value }: { value: number }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const TEXT_DIM = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const TEXT_MID = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)";

  const radius = 54;
  const cx = 80;
  const cy = 80;
  const circumference = Math.PI * radius; // half-circle
  const dashOffset = circumference * (1 - value / 100);

  const arcColor = value >= 85 ? RED : value >= 60 ? AMBER : GREEN;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "16px 0" }}>
      <div style={{ position: "relative", width: 160, height: 90, flexShrink: 0 }}>
        <svg width="160" height="100" viewBox="0 0 160 100">
          {/* Track */}
          <path
            d={`M ${cx - radius},${cy} A ${radius},${radius} 0 0,1 ${cx + radius},${cy}`}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={10}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <motion.path
            d={`M ${cx - radius},${cy} A ${radius},${radius} 0 0,1 ${cx + radius},${cy}`}
            fill="none"
            stroke={arcColor}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const angle = Math.PI * (tick / 100);
            const tx = cx - radius * Math.cos(angle);
            const ty = cy - radius * Math.sin(angle);
            return (
              <circle key={tick} cx={tx} cy={ty} r={2} fill="rgba(255,255,255,0.2)" />
            );
          })}
        </svg>
        {/* Center label */}
        <div style={{ position: "absolute", bottom: 4, left: 0, right: 0, textAlign: "center" }}>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 26, fontWeight: 800, color: arcColor, letterSpacing: "-0.03em" }}>
            {value}%
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, fontFamily: "IBM Plex Mono, monospace" }}>
          Contributing factors
        </div>
        {[
          { label: "Document Forgery", weight: 38, color: RED },
          { label: "Income Mismatch", weight: 27, color: AMBER },
          { label: "Fraud Ring Link", weight: 20, color: PURPLE },
          { label: "Behavioral Anomaly", weight: 9, color: TEAL },
        ].map(({ label, weight, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
            <div style={{ fontSize: 11, color: TEXT_MID, width: 130, flexShrink: 0 }}>{label}</div>
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${weight}%` }}
                transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
                style={{ height: "100%", borderRadius: 2, background: color }}
              />
            </div>
            <div style={{ fontSize: 11, fontFamily: "IBM Plex Mono, monospace", color, minWidth: 28, textAlign: "right" }}>{weight}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Reasoning tree ───────────────────────────────────────────────────────────
interface TreeNode {
  id: string;
  label: string;
  sublabel?: string;
  color: string;
  severity: "low" | "medium" | "high" | "critical";
  x: number;
  y: number;
}

const treeNodes: TreeNode[] = [
  { id: "obs", label: "Observation", sublabel: "Case #4521 flagged", color: TEAL, severity: "low", x: 120, y: 20 },
  { id: "inc", label: "Income Mismatch", sublabel: "₹14L stated vs ₹3.2L verified", color: AMBER, severity: "medium", x: 120, y: 110 },
  { id: "doc", label: "Document Forgery", sublabel: "OCR metadata altered", color: RED, severity: "critical", x: 120, y: 200 },
  { id: "ring", label: "Fraud Ring Link", sublabel: "6 connected entities", color: RED, severity: "critical", x: 120, y: 290 },
  { id: "prob", label: "Fraud Probability", sublabel: "94% confidence", color: RED, severity: "critical", x: 120, y: 380 },
  { id: "esc", label: "Recommended: ESCALATE", sublabel: "Immediate review required", color: "#E85D75", severity: "critical", x: 120, y: 470 },
];

const treeEdges = [
  { from: "obs", to: "inc" },
  { from: "inc", to: "doc" },
  { from: "doc", to: "ring" },
  { from: "ring", to: "prob" },
  { from: "prob", to: "esc" },
];

const severityBg: Record<string, string> = {
  low: `${TEAL}15`,
  medium: `${AMBER}15`,
  high: `${RED}12`,
  critical: `${RED}18`,
};

function ReasoningTree() {
  const { c } = useTheme();
  const TEXT_DIM = c.textDim;
  const svgH = 540;
  const nodeById = Object.fromEntries(treeNodes.map((n) => [n.id, n]));

  return (
    <div style={{ position: "relative", height: svgH + 20 }}>
      <svg width="100%" height={svgH} viewBox={`0 0 260 ${svgH}`} preserveAspectRatio="xMidYMin meet">
        {/* Edges with arrowheads */}
        <defs>
          <marker id="treeArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(255,255,255,0.2)" />
          </marker>
        </defs>
        {treeEdges.map((e) => {
          const a = nodeById[e.from];
          const b = nodeById[e.to];
          const ax = a.x + 110;
          const ay = a.y + 36;
          const bx = b.x + 110;
          const by = b.y + 4;
          return (
            <motion.line
              key={`${e.from}-${e.to}`}
              x1={ax} y1={ay} x2={bx} y2={by}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={1.5}
              markerEnd="url(#treeArrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: treeNodes.findIndex((n) => n.id === e.from) * 0.15 + 0.3 }}
            />
          );
        })}

        {/* Nodes */}
        {treeNodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.15 + 0.1 }}
          >
            {/* Pulse for critical nodes */}
            {node.severity === "critical" && (
              <motion.rect
                x={node.x - 3} y={node.y - 3}
                width={226} height={46}
                rx={11}
                fill="none"
                stroke={node.color}
                strokeWidth={1}
                animate={{ opacity: [0.15, 0.45, 0.15] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
              />
            )}

            {/* Node box */}
            <rect
              x={node.x} y={node.y}
              width={220} height={40}
              rx={8}
              fill={severityBg[node.severity]}
              stroke={`${node.color}50`}
              strokeWidth={1}
            />

            {/* Severity indicator bar */}
            <rect
              x={node.x} y={node.y}
              width={3} height={40}
              rx={8}
              fill={node.color}
            />

            {/* Label */}
            <text x={node.x + 14} y={node.y + 15} fontSize={10} fontWeight={700} fill={c.text} fontFamily="Syne, sans-serif" letterSpacing="-0.01em">
              {node.label}
            </text>
            <text x={node.x + 14} y={node.y + 29} fontSize={9} fill={TEXT_DIM} fontFamily="IBM Plex Mono, monospace">
              {node.sublabel}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

// ─── Message types ────────────────────────────────────────────────────────────
type MessageRole = "analyst" | "ai";

interface SectionFinding {
  icon: React.ReactNode;
  title: string;
  color: string;
  text: string;
}

interface Message {
  id: string;
  role: MessageRole;
  text?: string;
  sections?: SectionFinding[];
  hasConfidence?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    role: "analyst",
    text: "Analyze case #4521 — Rajesh Kumar loan application",
  },
  {
    id: "m2",
    role: "ai",
    sections: [
      {
        icon: <TrendingUp size={13} />,
        title: "Income Analysis",
        color: AMBER,
        text: "Stated monthly income of ₹1,17,000 is inconsistent with ITR filings showing ₹26,500/mo average over 3 years. Bank statements reflect irregular deposits with no recurring salary credit pattern.",
      },
      {
        icon: <FileText size={13} />,
        title: "Document Integrity",
        color: RED,
        text: "Form 16 shows metadata anomalies — creation timestamp post-dates the purported financial year. OCR hidden-layer analysis detected 3 regions of probable pixel manipulation with 97.3% confidence. Digital signature chain is broken.",
      },
      {
        icon: <Activity size={13} />,
        title: "Behavioral Pattern",
        color: PURPLE,
        text: "Login originated from IP 103.21.58.142, flagged in 6 prior fraud investigations. Application submitted at 02:34 IST — outside normal applicant hours. Same device fingerprint linked to PAN AAABK2190K, a known compromised identity.",
      },
    ],
  },
  {
    id: "m3",
    role: "analyst",
    text: "What's the fraud probability for this case?",
  },
  {
    id: "m4",
    role: "ai",
    hasConfidence: true,
  },
];

const MOCK_RESPONSES = [
  "Based on the transaction history, there are 4 anomalous transfers exceeding ₹50,000 sent to newly created accounts. These accounts share a common IP address.",
  "The provided GST number appears to be fake. It does not exist in the official GST portal registry.",
  "I've cross-referenced the phone number against known fraud databases. It has been flagged 12 times in the past month for phishing.",
  "Looking at the device fingerprint, the application was submitted using an Android emulator, which is a strong indicator of automated fraud.",
  "The applicant's income stated on the application does not match the ITR filings. There is a 75% discrepancy.",
  "I found a linked account belonging to 'Suresh Kumar' which was previously suspended for synthetic identity fraud.",
  "The utility bill submitted as proof of address has signs of digital tampering near the billing date and amount.",
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function AIInvestigator() {
  const { c, isDark } = useTheme();
  const BG = c.bg;
  const PANEL = c.bgCard;
  const PANEL_STRONG = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const BORDER = c.border;
  const TEXT_DIM = c.textDim;
  const TEXT_MID = c.textMuted;
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["Income Analysis", "Document Integrity", "Behavioral Pattern"]));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMsg: Message = { id: Date.now().toString(), role: "analyst", text: inputValue.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    
    setTimeout(() => {
      const aiText = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "ai", text: aiText };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  return (
    <div style={{ height: "100vh", background: BG, display: "flex", flexDirection: "column", fontFamily: "Space Grotesk, sans-serif", color: c.text }}>
      {/* Header */}
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: c.text }}>
            AI Investigator
          </h1>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: TEXT_DIM }}>Case #4521 — Rajesh Kumar · Reasoning Workspace</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: `${PURPLE}18`, border: `1px solid ${PURPLE}40`, borderRadius: 8, padding: "6px 12px", fontSize: 12, color: PURPLE, fontFamily: "IBM Plex Mono, monospace" }}>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: PURPLE }}
          />
          AI Active
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* ── Left: conversation (60%) ────────────────────────────────────── */}
        <div style={{ flex: "0 0 60%", display: "flex", flexDirection: "column", borderRight: `1px solid ${BORDER}` }}>
          {/* Messages scroll area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.12 }}
                >
                  {msg.role === "analyst" ? (
                    /* Analyst message */
                    <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                      <div style={{ maxWidth: "72%", background: `${PURPLE}20`, border: `1px solid ${PURPLE}35`, borderRadius: "14px 14px 4px 14px", padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${PURPLE}30`, border: `1px solid ${PURPLE}60`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <User size={10} style={{ color: PURPLE }} />
                          </div>
                          <span style={{ fontSize: 11, color: PURPLE, fontFamily: "IBM Plex Mono, monospace" }}>Analyst</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 13, color: TEXT_MID, lineHeight: 1.5 }}>{msg.text}</p>
                      </div>
                    </div>
                  ) : (
                    /* AI message */
                    <div style={{ display: "flex", gap: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: `${TEAL}20`, border: `1px solid ${TEAL}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <Cpu size={12} style={{ color: TEAL }} />
                      </div>
                      <div style={{ flex: 1, background: PANEL, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${PURPLE}`, borderRadius: "4px 14px 14px 14px", padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                          <span style={{ fontSize: 11, color: TEAL, fontFamily: "IBM Plex Mono, monospace" }}>TRINETRA AI</span>
                          <span style={{ fontSize: 10, color: TEXT_DIM, fontFamily: "IBM Plex Mono, monospace" }}>· Reasoning complete</span>
                        </div>

                        {msg.text && (
                          <div style={{ fontSize: 13, color: TEXT_MID, lineHeight: 1.6, marginBottom: msg.sections || msg.hasConfidence ? 12 : 0 }}>
                            {msg.text}
                          </div>
                        )}

                        {/* Sectioned response */}
                        {msg.sections && (
                          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {msg.sections.map((section) => {
                              const expanded = expandedSections.has(section.title);
                              return (
                                <div
                                  key={section.title}
                                  style={{ background: PANEL_STRONG, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: "hidden" }}
                                >
                                  <div
                                    onClick={() => toggleSection(section.title)}
                                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", cursor: "pointer" }}
                                  >
                                    <span style={{ color: section.color }}>{section.icon}</span>
                                    <span style={{ fontFamily: "Syne, sans-serif", fontSize: 12, fontWeight: 700, flex: 1 }}>{section.title}</span>
                                    <motion.span
                                      animate={{ rotate: expanded ? 180 : 0 }}
                                      transition={{ duration: 0.2 }}
                                      style={{ color: TEXT_DIM, display: "flex" }}
                                    >
                                      <ChevronDown size={14} />
                                    </motion.span>
                                  </div>
                                  <AnimatePresence>
                                    {expanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.22 }}
                                        style={{ overflow: "hidden" }}
                                      >
                                        <div style={{ padding: "0 14px 12px", fontSize: 12, color: TEXT_MID, lineHeight: 1.6, borderTop: `1px solid ${BORDER}`, paddingTop: 10 }}>
                                          {section.text}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Confidence visualization */}
                        {msg.hasConfidence && (
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                              <Zap size={12} style={{ color: RED }} />
                              <span style={{ fontFamily: "Syne, sans-serif", fontSize: 13, fontWeight: 700, color: c.text }}>
                                Fraud Probability Assessment
                              </span>
                            </div>
                            <ConfidenceArc value={94} />
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 14, background: `${RED}12`, border: `1px solid ${RED}35`, borderRadius: 10, padding: "10px 12px" }}>
                              <AlertTriangle size={14} style={{ color: RED, flexShrink: 0, marginTop: 1 }} />
                              <p style={{ margin: 0, fontSize: 12, color: TEXT_MID, lineHeight: 1.5 }}>
                                With 94% confidence, this case presents a high-probability fraud scenario. Immediate escalation to the Fraud Investigation Unit is recommended. Do not disburse.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input bar */}
          <div style={{ padding: "16px 24px", borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "10px 14px" }}>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask the AI investigator..."
                style={{ flex: 1, background: "none", border: "none", outline: "none", color: c.text, fontSize: 13, fontFamily: "Space Grotesk, sans-serif" }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                style={{ width: 34, height: 34, borderRadius: 8, background: `${PURPLE}30`, border: `1px solid ${PURPLE}50`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
              >
                <Send size={14} style={{ color: PURPLE }} />
              </motion.button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
              <CheckCircle size={10} style={{ color: GREEN }} />
              <span style={{ fontSize: 11, color: TEXT_DIM, fontFamily: "IBM Plex Mono, monospace" }}>
                All reasoning is logged and auditable · Case #4521 context loaded
              </span>
            </div>
          </div>
        </div>

        {/* ── Right: Reasoning Tree (40%) ─────────────────────────────────── */}
        <div style={{ flex: "0 0 40%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 3, height: 14, borderRadius: 2, background: PURPLE }} />
              <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 13, fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Reasoning Tree
              </h3>
            </div>
            <p style={{ margin: "4px 0 0 11px", fontSize: 11, color: TEXT_DIM }}>
              AI inference chain · Case #4521
            </p>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
            <ReasoningTree />
          </div>

          {/* Verdict */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            style={{ margin: "0 20px 20px", padding: "14px 16px", background: `${RED}12`, border: `1px solid ${RED}40`, borderRadius: 12, flexShrink: 0 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <AlertTriangle size={14} style={{ color: RED }} />
              </motion.div>
              <span style={{ fontFamily: "Syne, sans-serif", fontSize: 12, fontWeight: 800, color: RED, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Verdict: Escalate
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 11, color: TEXT_DIM, lineHeight: 1.5 }}>
              AI chain complete. 6/6 risk signals confirmed. Refer to Fraud Investigations Unit immediately.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
