import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Lock,
  Users,
  CheckSquare,
  Sun,
  Moon,
  ArrowRight,
  Cpu,
  Database,
  Globe,
  Code2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

// ─── Data ─────────────────────────────────────────────────────────────────────

const LATENCY_DATA = [
  { module: "Metadata Scan", ms: 120 },
  { module: "OCR Engine", ms: 340 },
  { module: "Report Gen", ms: 450 },
  { module: "Cross-Doc Engine", ms: 890 },
  { module: "Fraud Graph", ms: 1200 },
];

const TECH_STACK = [
  {
    icon: <Globe size={20} />,
    label: "Frontend",
    color: "#5227FF",
    items: [
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "GSAP",
      "React Router v7",
    ],
  },
  {
    icon: <Cpu size={20} />,
    label: "AI / ML",
    color: "#E85D75",
    items: [
      "Python FastAPI",
      "LangChain",
      "GPT-4V",
      "Tesseract OCR",
      "Custom CNN models",
    ],
  },
  {
    icon: <Database size={20} />,
    label: "Data",
    color: "#00B3A4",
    items: [
      "PostgreSQL",
      "Neo4j (graph)",
      "Redis",
      "MinIO (docs)",
      "Elasticsearch",
    ],
  },
  {
    icon: <Code2 size={20} />,
    label: "Infrastructure",
    color: "#F59E0B",
    items: [
      "Docker",
      "Kubernetes",
      "AWS",
      "GitHub Actions (CI/CD)",
      "Prometheus monitoring",
    ],
  },
];

const SECURITY_CARDS = [
  {
    icon: <Lock size={22} />,
    title: "Encryption",
    color: "#5227FF",
    points: [
      "AES-256 at rest for all document storage",
      "TLS 1.3 enforced for all API connections",
      "Field-level encryption for PAN and Aadhaar",
      "Key rotation every 90 days via AWS KMS",
    ],
  },
  {
    icon: <Users size={22} />,
    title: "Access Control",
    color: "#00B3A4",
    points: [
      "Role-Based Access Control (RBAC) with 5 tiers",
      "JWT with short-lived tokens (15 min expiry)",
      "Full audit log — every API call, every view",
      "IP allowlisting for enterprise deployments",
    ],
  },
  {
    icon: <CheckSquare size={22} />,
    title: "Compliance",
    color: "#2FBF71",
    points: [
      "RBI Master Circular on KYC — fully mapped",
      "PMLA / AML obligation tracking",
      "GDPR-compatible data residency controls",
      "SOC 2 Type II readiness audit in progress",
    ],
  },
];

const DATA_FLOW_STEPS = [
  {
    step: "01",
    label: "Document Upload",
    detail: "PDFs and images land in MinIO object storage. SHA-256 hash computed for integrity.",
  },
  {
    step: "02",
    label: "OCR Processing",
    detail: "Tesseract + custom CNN pipeline extracts text, tables, and image regions per page.",
  },
  {
    step: "03",
    label: "AI Analysis",
    detail: "GPT-4V and forensic models run on extracted content. Forgery scores computed per field.",
  },
  {
    step: "04",
    label: "Contradiction Engine",
    detail: "Normalized entities projected onto unified timeline. 12-point matrix evaluated in parallel.",
  },
  {
    step: "05",
    label: "Fraud Graph Update",
    detail: "Neo4j graph updated with new nodes and edges. Community detection re-runs on affected subgraph.",
  },
  {
    step: "06",
    label: "Report Generated",
    detail: "Structured JSON report persisted to PostgreSQL. PDF export rendered and signed. Webhook fired.",
  },
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
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
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
            <Cpu size={14} color={c.accent} />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                color: c.accent,
                fontWeight: 500,
              }}
            >
              System Architecture
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
            Enterprise-Grade
            <br />
            <span style={{ color: c.accent }}>AI Architecture</span>
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
            A layered, cloud-native stack purpose-built for sub-2-minute fraud investigations —
            from FastAPI intelligence engine to Neo4j fraud graph to React frontend.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// SVG Architecture Diagram
function ArchitectureDiagram() {
  const { c, isDark } = useTheme();

  const panelBg = isDark ? "#0D1117" : "#F8FAFF";
  const boxBg = isDark ? "#131B2E" : "#EEF2FF";
  const boxBorder = c.accent + "50";
  const lineColor = c.accent + "40";
  const textColor = c.text;
  const monoColor = c.textMuted;
  const labelColor = c.textDim;

  // Layout constants
  const W = 800;
  const H = 520;
  const COL_W = 160;
  const BOX_H = 38;
  const BOX_R = 6;

  // Layer Y positions
  const L_CLIENT = 40;
  const L_GATEWAY = 160;
  const L_CORE = 280;
  const L_DATA = 400;

  const layerLabel = (y: number, text: string, accent: string) => (
    <g>
      <text
        x={14}
        y={y + 22}
        fontFamily="'IBM Plex Mono', monospace"
        fontSize={10}
        fill={accent}
        fontWeight="700"
        letterSpacing="0.08em"
      >
        {text}
      </text>
    </g>
  );

  const box = (
    x: number,
    y: number,
    label: string,
    sub: string,
    color: string
  ) => (
    <g key={`${x}-${y}-${label}`}>
      <rect
        x={x}
        y={y}
        width={COL_W - 8}
        height={BOX_H + 16}
        rx={BOX_R}
        ry={BOX_R}
        fill={boxBg}
        stroke={color + "60"}
        strokeWidth={1.2}
      />
      <text
        x={x + (COL_W - 8) / 2}
        y={y + 18}
        fontFamily="'Syne', sans-serif"
        fontSize={12}
        fontWeight="700"
        fill={textColor}
        textAnchor="middle"
      >
        {label}
      </text>
      <text
        x={x + (COL_W - 8) / 2}
        y={y + 34}
        fontFamily="'IBM Plex Mono', monospace"
        fontSize={9}
        fill={monoColor}
        textAnchor="middle"
      >
        {sub}
      </text>
    </g>
  );

  const line = (x1: number, y1: number, x2: number, y2: number) => (
    <line
      key={`${x1}-${y1}-${x2}-${y2}`}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={lineColor}
      strokeWidth={1.5}
      strokeDasharray="4 3"
    />
  );

  const hLine = (x1: number, x2: number, y: number) => (
    <line
      key={`h-${x1}-${x2}-${y}`}
      x1={x1}
      y1={y}
      x2={x2}
      y2={y}
      stroke={lineColor}
      strokeWidth={1}
    />
  );

  // Client layer: Browser (x=100), Mobile (x=280)
  const clientBoxes = [
    { x: 100, label: "Browser", sub: "React 18 / TS" },
    { x: 280, label: "Mobile", sub: "PWA / RN" },
  ];
  // Gateway layer: Auth (x=40), FastAPI (x=200), Rate Limit (x=360)
  const gatewayBoxes = [
    { x: 40, label: "Auth", sub: "JWT / RBAC" },
    { x: 210, label: "FastAPI", sub: "Python 3.11" },
    { x: 380, label: "Rate Limit", sub: "Redis / Token" },
  ];
  // Core layer: 4 boxes across
  const coreBoxes = [
    { x: 20, label: "OCR Module", sub: "Tesseract + CNN" },
    { x: 200, label: "Contra. Engine", sub: "12-point matrix" },
    { x: 380, label: "Fraud Graph", sub: "Neo4j + Louvain" },
    { x: 560, label: "AI Investigator", sub: "GPT-4V + LoRA" },
  ];
  // Data layer: 4 boxes across
  const dataBoxes = [
    { x: 20, label: "PostgreSQL", sub: "Cases / Reports" },
    { x: 200, label: "Neo4j", sub: "Entity Graph" },
    { x: 380, label: "MinIO", sub: "Document Store" },
    { x: 560, label: "Redis Cache", sub: "Sessions / Queue" },
  ];

  // Layer band backgrounds
  const layerBand = (y: number, h: number, color: string) => (
    <rect
      key={`band-${y}`}
      x={0}
      y={y - 10}
      width={W}
      height={h}
      rx={8}
      ry={8}
      fill={color}
      opacity={0.4}
    />
  );

  return (
    <div
      style={{
        background: panelBg,
        border: `1px solid ${c.border}`,
        borderRadius: 16,
        overflow: "hidden",
        padding: 24,
      }}
    >
      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          color: c.textDim,
          margin: "0 0 16px",
        }}
      >
        // trinetra_system_architecture.svg · layered view
      </p>
      <div style={{ overflowX: "auto" }}>
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          style={{ display: "block" }}
        >
          {/* Layer bands */}
          {layerBand(L_CLIENT, 80, isDark ? "#5227FF10" : "#EEF2FF")}
          {layerBand(L_GATEWAY, 80, isDark ? "#00B3A410" : "#ECFEFF")}
          {layerBand(L_CORE, 90, isDark ? "#E85D7510" : "#FFF1F2")}
          {layerBand(L_DATA, 90, isDark ? "#F59E0B10" : "#FFFBEB")}

          {/* Layer labels */}
          {layerLabel(L_CLIENT - 10, "CLIENT LAYER", isDark ? "#5227FF" : "#7C3AED")}
          {layerLabel(L_GATEWAY - 10, "API GATEWAY", isDark ? "#00B3A4" : "#0891B2")}
          {layerLabel(L_CORE - 10, "INTELLIGENCE ENGINE", isDark ? "#E85D75" : "#DC2626")}
          {layerLabel(L_DATA - 10, "DATA LAYER", isDark ? "#F59E0B" : "#D97706")}

          {/* Client → Gateway vertical lines */}
          {line(clientBoxes[0].x + 76, L_CLIENT + BOX_H + 16, 210 + 76, L_GATEWAY)}
          {line(clientBoxes[1].x + 76, L_CLIENT + BOX_H + 16, 210 + 76, L_GATEWAY)}

          {/* Client boxes */}
          {clientBoxes.map((b) =>
            box(b.x + 80, L_CLIENT, b.label, b.sub, c.accent)
          )}

          {/* Gateway → Core lines */}
          {line(40 + 76, L_GATEWAY + BOX_H + 16, 20 + 76, L_CORE)}
          {line(210 + 76, L_GATEWAY + BOX_H + 16, 200 + 76, L_CORE)}
          {line(380 + 76, L_GATEWAY + BOX_H + 16, 380 + 76, L_CORE)}

          {/* Gateway boxes */}
          {gatewayBoxes.map((b) =>
            box(b.x + 80, L_GATEWAY, b.label, b.sub, isDark ? "#00B3A4" : "#0891B2")
          )}

          {/* Core horizontal connector */}
          {hLine(20 + 76, 560 + 76, L_CORE + (BOX_H + 16) / 2)}

          {/* Core → Data lines */}
          {coreBoxes.map((b) =>
            line(b.x + 76, L_CORE + BOX_H + 16, b.x + 76, L_DATA)
          )}

          {/* Core boxes */}
          {coreBoxes.map((b) =>
            box(b.x, L_CORE, b.label, b.sub, isDark ? "#E85D75" : "#DC2626")
          )}

          {/* Data horizontal connector */}
          {hLine(20 + 76, 560 + 76, L_DATA + (BOX_H + 16) / 2)}

          {/* Data boxes */}
          {dataBoxes.map((b) =>
            box(b.x, L_DATA, b.label, b.sub, isDark ? "#F59E0B" : "#D97706")
          )}

          {/* Legend */}
          <g transform={`translate(0, ${H - 30})`}>
            <text
              fontFamily="'IBM Plex Mono', monospace"
              fontSize={10}
              fill={labelColor}
              x={0}
              y={14}
            >
              ── Request flow
            </text>
            <text
              fontFamily="'IBM Plex Mono', monospace"
              fontSize={10}
              fill={labelColor}
              x={120}
              y={14}
            >
              --- Async / event-driven
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

function SystemArchitecture() {
  const { c } = useTheme();
  return (
    <section style={{ background: c.bgSecondary, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
            System Architecture
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 16,
              color: c.textMuted,
            }}
          >
            A four-layer architecture designed for horizontal scale and investigative throughput.
          </p>
        </div>
        <ArchitectureDiagram />
      </div>
    </section>
  );
}

function TechStack() {
  const { c } = useTheme();
  return (
    <section style={{ background: c.bg, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
            Technology Stack
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 16,
              color: c.textMuted,
            }}
          >
            Best-in-class tools selected for the demands of real-time fraud intelligence.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {TECH_STACK.map((stack, i) => (
            <motion.div
              key={stack.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: c.bgCard,
                border: `1px solid ${c.border}`,
                borderTop: `3px solid ${stack.color}`,
                borderRadius: 12,
                padding: 24,
              }}
            >
              <div style={{ color: stack.color, marginBottom: 12 }}>{stack.icon}</div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: c.text,
                  marginBottom: 16,
                }}
              >
                {stack.label}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {stack.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 13,
                      color: c.textMuted,
                      padding: "6px 0",
                      borderBottom: `1px solid ${c.border}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: stack.color,
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataFlow() {
  const { c } = useTheme();
  return (
    <section style={{ background: c.bgSecondary, padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
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
            Data Flow
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 16,
              color: c.textMuted,
            }}
          >
            How data moves through the TRINETRA pipeline — from upload to verdict.
          </p>
        </div>
        <div style={{ position: "relative" }}>
          {/* Vertical rail */}
          <div
            style={{
              position: "absolute",
              left: 23,
              top: 0,
              bottom: 0,
              width: 2,
              background: `linear-gradient(to bottom, ${c.accent}, ${c.teal})`,
              opacity: 0.25,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {DATA_FLOW_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  display: "flex",
                  gap: 24,
                  paddingBottom: 32,
                  alignItems: "flex-start",
                }}
              >
                {/* Step number bubble */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: c.accentLight,
                    border: `2px solid ${c.accent}50`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontWeight: 700,
                      fontSize: 13,
                      color: c.accent,
                    }}
                  >
                    {step.step}
                  </span>
                </div>
                {/* Content */}
                <div
                  style={{
                    background: c.bgCard,
                    border: `1px solid ${c.border}`,
                    borderRadius: 10,
                    padding: "16px 20px",
                    flex: 1,
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      color: c.text,
                      margin: "0 0 6px",
                    }}
                  >
                    {step.label}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 14,
                      color: c.textMuted,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SecurityCompliance() {
  const { c } = useTheme();
  return (
    <section style={{ background: c.bg, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
            Security & Compliance
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 16,
              color: c.textMuted,
            }}
          >
            Enterprise security posture built in from day one — not bolted on.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {SECURITY_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: c.bgCard,
                border: `1px solid ${c.border}`,
                borderRadius: 16,
                padding: 28,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: card.color + "18",
                  border: `1px solid ${card.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: card.color,
                  marginBottom: 16,
                }}
              >
                {card.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: c.text,
                  marginBottom: 16,
                }}
              >
                {card.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {card.points.map((pt) => (
                  <li
                    key={pt}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 14,
                      color: c.textMuted,
                      padding: "8px 0",
                      borderBottom: `1px solid ${c.border}`,
                      lineHeight: 1.5,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: card.color,
                        flexShrink: 0,
                        marginTop: 6,
                      }}
                    />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Custom tooltip for the bar chart
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  const { c } = useTheme();
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: c.bgCardSolid,
        border: `1px solid ${c.border}`,
        borderRadius: 8,
        padding: "10px 14px",
      }}
    >
      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          color: c.textMuted,
          margin: 0,
        }}
      >
        {label}: {payload[0].value}ms
      </p>
    </div>
  );
}

function PerformanceMetrics() {
  const { c } = useTheme();

  const getBarColor = (ms: number) => {
    if (ms < 300) return "#2FBF71";
    if (ms < 600) return c.accent;
    if (ms < 1000) return "#F59E0B";
    return "#E85D75";
  };

  return (
    <section style={{ background: c.bgSecondary, padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
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
            Performance Metrics
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 16,
              color: c.textMuted,
            }}
          >
            Median module latency measured across 10,000 production investigations.
          </p>
        </div>
        <div
          style={{
            background: c.bgCard,
            border: `1px solid ${c.border}`,
            borderRadius: 16,
            padding: "32px 24px",
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: c.textDim,
              }}
            >
              // module_latency_p50.json · production · Jan 2024
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={LATENCY_DATA}
              layout="vertical"
              margin={{ top: 8, right: 60, left: 20, bottom: 8 }}
            >
              <CartesianGrid
                horizontal={false}
                stroke={c.border}
                strokeDasharray="3 3"
              />
              <XAxis
                type="number"
                tick={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  fill: c.textDim,
                }}
                tickFormatter={(v) => `${v}ms`}
                axisLine={{ stroke: c.border }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="module"
                tick={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  fill: c.textMuted,
                }}
                axisLine={false}
                tickLine={false}
                width={130}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: c.border, opacity: 0.5 }}
              />
              <Bar dataKey="ms" radius={[0, 4, 4, 0]} maxBarSize={28}>
                {LATENCY_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(entry.ms)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              marginTop: 16,
              paddingTop: 16,
              borderTop: `1px solid ${c.border}`,
            }}
          >
            {[
              { color: "#2FBF71", label: "< 300ms — Excellent" },
              { color: c.accent, label: "300–600ms — Good" },
              { color: "#F59E0B", label: "600–1000ms — Acceptable" },
              { color: "#E85D75", label: "> 1000ms — Optimize" },
            ].map((item) => (
              <span
                key={item.label}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: item.color,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    color: c.textDim,
                  }}
                >
                  {item.label}
                </span>
              </span>
            ))}
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
          See It Running Live
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
          Every layer of this architecture is live in the workspace. Open an investigation
          and watch the full pipeline execute in real time.
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

export function ArchitecturePage() {
  const { c } = useTheme();
  return (
    <div style={{ background: c.bg, minHeight: "100vh" }}>
      <PageNav />
      <Hero />
      <SystemArchitecture />
      <TechStack />
      <DataFlow />
      <SecurityCompliance />
      <PerformanceMetrics />
      <CTA />
    </div>
  );
}
