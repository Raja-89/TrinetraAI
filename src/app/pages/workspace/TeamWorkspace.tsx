import { motion } from "motion/react";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  MessageSquare,
  FileSearch,
  UserCheck,
  ChevronRight,
} from "lucide-react";
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

// ─── Analyst data ─────────────────────────────────────────────────────────────
const ANALYSTS = [
  {
    name: "Priya Kumar",
    role: "Senior Analyst",
    initials: "PK",
    avatarColor: C.accent,
    activeCases: 8,
    online: true,
  },
  {
    name: "Rohit Sharma",
    role: "Investigator",
    initials: "RS",
    avatarColor: C.teal,
    activeCases: 5,
    online: true,
  },
  {
    name: "Deepa Nair",
    role: "Compliance Lead",
    initials: "DN",
    avatarColor: C.amber,
    activeCases: 3,
    online: false,
  },
  {
    name: "Amit Verma",
    role: "Risk Assessor",
    initials: "AV",
    avatarColor: C.green,
    activeCases: 6,
    online: true,
  },
];

// ─── Case assignments ─────────────────────────────────────────────────────────
type CaseStatus = "Under Review" | "Escalated" | "Approved" | "Pending";
type Priority = "CRITICAL" | "HIGH" | "MEDIUM";

const CASES: {
  id: string;
  applicant: string;
  assignee: { initials: string; color: string; name: string };
  due: string;
  status: CaseStatus;
  priority: Priority;
}[] = [
  {
    id: "#4521",
    applicant: "Sunita Reddy",
    assignee: { initials: "PK", color: C.accent, name: "Priya Kumar" },
    due: "22 May",
    status: "Escalated",
    priority: "CRITICAL",
  },
  {
    id: "#4518",
    applicant: "Arvind Mehta",
    assignee: { initials: "RS", color: C.teal, name: "Rohit Sharma" },
    due: "23 May",
    status: "Under Review",
    priority: "HIGH",
  },
  {
    id: "#4509",
    applicant: "Kavitha Pillai",
    assignee: { initials: "AV", color: C.green, name: "Amit Verma" },
    due: "24 May",
    status: "Pending",
    priority: "HIGH",
  },
  {
    id: "#4489",
    applicant: "Deepak Joshi",
    assignee: { initials: "PK", color: C.accent, name: "Priya Kumar" },
    due: "20 May",
    status: "Approved",
    priority: "MEDIUM",
  },
  {
    id: "#4472",
    applicant: "Rahul Banerjee",
    assignee: { initials: "DN", color: C.amber, name: "Deepa Nair" },
    due: "21 May",
    status: "Under Review",
    priority: "MEDIUM",
  },
];

const caseStatusConfig: Record<CaseStatus, { color: string; bg: string }> = {
  Escalated: { color: C.red, bg: "rgba(232,93,117,0.1)" },
  "Under Review": { color: C.amber, bg: "rgba(245,158,11,0.1)" },
  Pending: { color: C.subtle, bg: "rgba(136,146,164,0.08)" },
  Approved: { color: C.green, bg: "rgba(47,191,113,0.1)" },
};

const priorityConfig: Record<Priority, { color: string }> = {
  CRITICAL: { color: C.red },
  HIGH: { color: C.amber },
  MEDIUM: { color: C.teal },
};

// ─── Activity stream ──────────────────────────────────────────────────────────
const ACTIVITIES: {
  actor: { initials: string; color: string };
  text: string;
  ts: string;
  icon: React.ReactNode;
}[] = [
  {
    actor: { initials: "PK", color: C.accent },
    text: "Priya Kumar escalated Case #4521 to CRITICAL — identity fraud confirmed",
    ts: "09:32",
    icon: <AlertTriangle size={13} color={C.red} />,
  },
  {
    actor: { initials: "RS", color: C.teal },
    text: "Rohit Sharma added income analysis note to Case #4518",
    ts: "09:17",
    icon: <MessageSquare size={13} color={C.teal} />,
  },
  {
    actor: { initials: "AV", color: C.green },
    text: "Amit Verma started risk assessment for Case #4509",
    ts: "08:55",
    icon: <FileSearch size={13} color={C.amber} />,
  },
  {
    actor: { initials: "PK", color: C.accent },
    text: "Priya Kumar approved final report for Case #4489",
    ts: "08:41",
    icon: <CheckCircle2 size={13} color={C.green} />,
  },
  {
    actor: { initials: "DN", color: C.amber },
    text: "Deepa Nair flagged AML concern on Case #4472 — watchlist match",
    ts: "08:20",
    icon: <AlertTriangle size={13} color={C.amber} />,
  },
  {
    actor: { initials: "RS", color: C.teal },
    text: "Rohit Sharma requested additional documents for Case #4461",
    ts: "Yesterday",
    icon: <MessageSquare size={13} color={C.teal} />,
  },
  {
    actor: { initials: "AV", color: C.green },
    text: "Amit Verma completed graph analysis — fraud ring linkage confirmed",
    ts: "Yesterday",
    icon: <ShieldCheck size={13} color={C.green} />,
  },
];

// ─── Approval workflow ────────────────────────────────────────────────────────
const STAGES = [
  {
    id: 1,
    label: "Evidence Review",
    icon: <FileSearch size={18} />,
    desc: "Document forensics & OCR validation",
    active: false,
    done: true,
  },
  {
    id: 2,
    label: "Risk Assessment",
    icon: <AlertTriangle size={18} />,
    desc: "AI scoring & graph analysis",
    active: true,
    done: false,
  },
  {
    id: 3,
    label: "Final Decision",
    icon: <UserCheck size={18} />,
    desc: "Senior analyst approval",
    active: false,
    done: false,
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function TeamWorkspace() {
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
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            margin: "0 0 4px",
            letterSpacing: "-0.01em",
          }}
        >
          Team Collaboration Workspace
        </h1>
        <p style={{ fontSize: 13, color: C.subtle, margin: 0 }}>
          Case assignments, team activity and approval workflow
        </p>
      </div>

      {/* Analyst cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {ANALYSTS.map((analyst, idx) => (
          <motion.div
            key={analyst.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.07 }}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: analyst.avatarColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {analyst.initials}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 1,
                    right: 1,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: analyst.online ? C.green : C.muted,
                    border: `2px solid ${C.surface}`,
                    boxShadow: analyst.online ? `0 0 6px ${C.green}` : "none",
                  }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    margin: "0 0 3px",
                    color: C.text,
                  }}
                >
                  {analyst.name}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: C.subtle,
                    margin: 0,
                  }}
                >
                  {analyst.role}
                </p>
              </div>
            </div>
            <div
              style={{
                borderTop: `1px solid ${C.border}`,
                paddingTop: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 12, color: C.subtle }}>Active Cases</span>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: analyst.avatarColor,
                }}
              >
                {analyst.activeCases}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main 2-col grid */}
      <div style={{ display: "grid", gridTemplateColumns: "55% 45%", gap: 20, marginBottom: 24 }}>
        {/* Case Assignments */}
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
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              Case Assignments
            </span>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: C.subtle,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              View all <ArrowUpRight size={12} />
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Case #", "Applicant", "Assigned To", "Due", "Status", "Priority"].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: "9px 16px",
                        textAlign: "left",
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 9,
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
                {CASES.map((c, i) => {
                  const sc = caseStatusConfig[c.status];
                  const pc = priorityConfig[c.priority];
                  return (
                    <tr
                      key={c.id}
                      style={{
                        borderBottom: i < CASES.length - 1 ? `1px solid ${C.border}` : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px 16px",
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 11,
                          color: C.accent,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.id}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 12,
                          color: C.text,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.applicant}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <div
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: c.assignee.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontFamily: "'Syne', sans-serif",
                              fontSize: 9,
                              fontWeight: 700,
                              color: "#fff",
                              flexShrink: 0,
                            }}
                          >
                            {c.assignee.initials}
                          </div>
                          <span style={{ fontSize: 11, color: C.subtle, whiteSpace: "nowrap" }}>
                            {c.assignee.name.split(" ")[0]}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 11,
                          color: C.muted,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.due}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: 9,
                            color: sc.color,
                            background: sc.bg,
                            border: `1px solid ${sc.color}30`,
                            borderRadius: 4,
                            padding: "2px 7px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: 9,
                            fontWeight: 700,
                            color: pc.color,
                            letterSpacing: "0.06em",
                          }}
                        >
                          {c.priority}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Stream */}
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
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              Activity Stream
            </span>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {ACTIVITIES.map((act, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "12px 22px",
                  borderBottom: i < ACTIVITIES.length - 1 ? `1px solid ${C.border}` : "none",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: act.actor.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {act.actor.initials}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: -1,
                      right: -1,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: C.surface,
                      border: `1px solid ${C.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {act.icon}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 12,
                      color: C.text,
                      margin: "0 0 3px",
                      lineHeight: 1.5,
                    }}
                  >
                    {act.text}
                  </p>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 10,
                      color: C.muted,
                    }}
                  >
                    {act.ts}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Approval Workflow */}
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: "22px 28px",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: C.text,
            }}
          >
            Approval Workflow
          </span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              color: C.subtle,
              marginLeft: 12,
            }}
          >
            Case #4521 — Active
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          {STAGES.map((stage, i) => (
            <div
              key={stage.id}
              style={{ display: "flex", alignItems: "center", flex: 1 }}
            >
              {/* Stage card */}
              <div
                style={{
                  flex: 1,
                  background: stage.active
                    ? `rgba(82,39,255,0.08)`
                    : stage.done
                    ? "rgba(47,191,113,0.06)"
                    : C.surface2,
                  border: `1px solid ${
                    stage.active ? C.accent + "55" : stage.done ? C.green + "40" : C.border
                  }`,
                  borderRadius: 10,
                  padding: "18px 20px",
                  position: "relative",
                }}
              >
                {stage.active && (
                  <div
                    style={{
                      position: "absolute",
                      top: -1,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: C.accent,
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: stage.active
                        ? "rgba(82,39,255,0.15)"
                        : stage.done
                        ? "rgba(47,191,113,0.12)"
                        : C.border,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: stage.active ? C.accent : stage.done ? C.green : C.muted,
                    }}
                  >
                    {stage.done ? <CheckCircle2 size={18} /> : stage.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        margin: "0 0 2px",
                        color: stage.active ? C.text : stage.done ? C.green : C.subtle,
                      }}
                    >
                      {stage.label}
                    </p>
                    {stage.active && (
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 9,
                          color: C.accent,
                          background: "rgba(82,39,255,0.12)",
                          border: "1px solid rgba(82,39,255,0.25)",
                          borderRadius: 3,
                          padding: "1px 6px",
                          letterSpacing: "0.06em",
                        }}
                      >
                        IN PROGRESS
                      </span>
                    )}
                    {stage.done && (
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 9,
                          color: C.green,
                          background: "rgba(47,191,113,0.1)",
                          border: "1px solid rgba(47,191,113,0.25)",
                          borderRadius: 3,
                          padding: "1px 6px",
                          letterSpacing: "0.06em",
                        }}
                      >
                        COMPLETE
                      </span>
                    )}
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 11,
                    color: C.muted,
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {stage.desc}
                </p>
              </div>

              {/* Connector arrow */}
              {i < STAGES.length - 1 && (
                <div
                  style={{
                    width: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ChevronRight
                    size={18}
                    color={STAGES[i].done ? C.green : C.border}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
