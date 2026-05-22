import { useState } from "react";
import { motion } from "motion/react";
import { Network, Play, RefreshCw, Filter, AlertTriangle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const PURPLE = "#5227FF";
const RED = "#E85D75";
const TEAL = "#00B3A4";
const AMBER = "#F59E0B";
const GREEN = "#2FBF71";

interface INode {
  id: string;
  label: string;
  type: "user" | "pan" | "property" | "employer" | "account" | "phone";
  cx: number;
  cy: number;
  risk: number;
}

interface IEdge {
  from: string;
  to: string;
  suspicious?: boolean;
}

const nodeColors: Record<INode["type"], string> = {
  user: PURPLE, pan: "#7C3AED", property: TEAL, employer: AMBER, account: GREEN, phone: "#6B7280",
};
const nodeTypeLabels: Record<INode["type"], string> = {
  user: "Applicant", pan: "PAN Card", property: "Property", employer: "Employer", account: "Bank Account", phone: "Phone Number",
};

const nodes: INode[] = [
  { id: "u1", label: "Rajesh Kumar", type: "user", cx: 300, cy: 200, risk: 94 },
  { id: "u2", label: "Priya Mehta", type: "user", cx: 500, cy: 130, risk: 78 },
  { id: "u3", label: "Arjun Singh", type: "user", cx: 490, cy: 300, risk: 82 },
  { id: "u4", label: "Kavita Rao", type: "user", cx: 200, cy: 340, risk: 45 },
  { id: "p1", label: "PAN: ABCDE1234F", type: "pan", cx: 160, cy: 175, risk: 90 },
  { id: "p2", label: "PAN: XYZPQ5678G", type: "pan", cx: 640, cy: 195, risk: 73 },
  { id: "pr1", label: "Plot 44, Andheri", type: "property", cx: 345, cy: 385, risk: 65 },
  { id: "pr2", label: "Flat 12B, Powai", type: "property", cx: 580, cy: 400, risk: 71 },
  { id: "e1", label: "TechSolve Pvt Ltd", type: "employer", cx: 395, cy: 80, risk: 88 },
  { id: "a1", label: "Acct 4821", type: "account", cx: 115, cy: 285, risk: 92 },
  { id: "a2", label: "Acct 9943", type: "account", cx: 665, cy: 320, risk: 68 },
  { id: "ph1", label: "+91 98765 43210", type: "phone", cx: 255, cy: 105, risk: 55 },
];

const edges: IEdge[] = [
  { from: "u1", to: "p1", suspicious: true },
  { from: "u1", to: "e1", suspicious: true },
  { from: "u1", to: "pr1" },
  { from: "u1", to: "a1", suspicious: true },
  { from: "u2", to: "e1", suspicious: true },
  { from: "u2", to: "p2" },
  { from: "u2", to: "pr2" },
  { from: "u3", to: "e1", suspicious: true },
  { from: "u3", to: "a2" },
  { from: "u3", to: "pr2" },
  { from: "u4", to: "a1" },
  { from: "u4", to: "pr1" },
  { from: "u1", to: "ph1" },
];

const fraudRingNodes = new Set(["u1", "u2", "u3", "e1", "p1"]);

export function FraudGraph() {
  const { c } = useTheme();
  const [selectedNode, setSelectedNode] = useState<INode | null>(null);
  const [replayActive, setReplayActive] = useState(false);
  const [filter, setFilter] = useState<Record<INode["type"], boolean>>({
    user: true, pan: true, property: true, employer: true, account: true, phone: true,
  });

  const handleReplay = () => { setReplayActive(true); setTimeout(() => setReplayActive(false), 3000); };
  const getNode = (id: string) => nodes.find((n) => n.id === id)!;
  const riskColor = (r: number) => r > 85 ? RED : r > 65 ? AMBER : GREEN;
  const visibleNodes = nodes.filter((n) => filter[n.type]);
  const visibleIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = edges.filter((e) => visibleIds.has(e.from) && visibleIds.has(e.to));

  return (
    <div className="flex h-full" style={{ background: c.bg }}>
      {/* Left controls */}
      <div className="w-60 flex-shrink-0 border-r flex flex-col" style={{ borderColor: c.border, background: c.bgSecondary }}>
        <div className="p-4 border-b" style={{ borderColor: c.border }}>
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-3.5 h-3.5" style={{ color: "#6B7280" }} />
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: c.text, fontSize: "0.78rem", letterSpacing: "0.04em" }}>NODE FILTERS</span>
          </div>
          <div className="space-y-2.5">
            {(Object.keys(filter) as INode["type"][]).map((type) => (
              <div key={type} className="flex items-center gap-2.5 cursor-pointer" onClick={() => setFilter((f) => ({ ...f, [type]: !f[type] }))}>
                <div className="w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background: filter[type] ? nodeColors[type] : "rgba(255,255,255,0.06)", border: `1px solid ${filter[type] ? nodeColors[type] : "rgba(255,255,255,0.1)"}` }}>
                  {filter[type] && <div className="w-1.5 h-1.5 rounded-sm bg-white" />}
                </div>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.74rem", color: c.textMuted }}>{nodeTypeLabels[type]}</span>
                <div className="w-2 h-2 rounded-full ml-auto" style={{ background: nodeColors[type] }} />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-b" style={{ borderColor: c.border }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", color: c.textDim, letterSpacing: "0.1em", marginBottom: 10 }}>FRAUD CHAIN REPLAY</div>
          <button onClick={handleReplay} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg transition-all"
            style={{ background: replayActive ? `${RED}1A` : `${PURPLE}18`, border: `1px solid ${replayActive ? RED : PURPLE}40`, color: replayActive ? RED : "#A78BFA", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "0.78rem" }}>
            {replayActive ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            {replayActive ? "Replaying…" : "Replay Chain"}
          </button>
        </div>

        <div className="p-4">
          <div className="p-3 rounded-lg" style={{ background: `${RED}0D`, border: `1px solid ${RED}25` }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-3.5 h-3.5" style={{ color: RED }} />
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", color: RED, letterSpacing: "0.08em" }}>FRAUD RING DETECTED</span>
            </div>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.68rem", color: c.textMuted, lineHeight: 1.6 }}>
              3 applicants share employer TechSolve Pvt Ltd with cross-PAN linkage. Risk: Critical.
            </p>
          </div>
        </div>
      </div>

      {/* SVG canvas */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-5 left-5 z-10">
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: c.text, fontSize: "1rem", letterSpacing: "0.04em" }}>Fraud Graph Explorer</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.72rem", color: c.textDim }}>{visibleNodes.length} entities · {visibleEdges.length} connections</div>
        </div>
        <svg width="100%" height="100%" viewBox="0 0 800 500">
          <ellipse cx={400} cy={210} rx={168} ry={140} fill="none" stroke={`${RED}22`} strokeWidth={1} strokeDasharray="5 4" />
          <text x={400} y={68} textAnchor="middle" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 8, fill: `${RED}70`, letterSpacing: "0.1em" }}>SUSPECTED FRAUD RING</text>
          {replayActive && (
            <motion.ellipse cx={400} cy={210} rx={168} ry={140} fill="none" stroke={RED} strokeWidth={1.5} strokeDasharray="6 3"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0.3, 0.8, 0] }} transition={{ duration: 2.5 }} />
          )}
          {visibleEdges.map((edge, i) => {
            const from = getNode(edge.from); const to = getNode(edge.to);
            if (!from || !to) return null;
            const isAnimating = replayActive && edge.suspicious;
            return <line key={i} x1={from.cx} y1={from.cy} x2={to.cx} y2={to.cy}
              stroke={isAnimating ? RED : edge.suspicious ? `${RED}55` : "rgba(255,255,255,0.07)"}
              strokeWidth={isAnimating ? 2 : edge.suspicious ? 1.5 : 0.8}
              strokeDasharray={edge.suspicious ? "5 3" : undefined} />;
          })}
          {visibleNodes.map((node) => {
            const color = nodeColors[node.type];
            const r = node.type === "employer" ? 22 : 18;
            const selected = selectedNode?.id === node.id;
            return (
              <g key={node.id} style={{ cursor: "pointer" }} onClick={() => setSelectedNode(selected ? null : node)}>
                {replayActive && fraudRingNodes.has(node.id) && <circle cx={node.cx} cy={node.cy} r={r + 16} fill={RED} opacity={0.12} />}
                <circle cx={node.cx} cy={node.cy} r={r + 4} fill="none" stroke={color} strokeWidth={selected ? 2 : 0.8} opacity={selected ? 1 : 0.3} />
                <circle cx={node.cx} cy={node.cy} r={r} fill={`${color}1A`} stroke={color} strokeWidth={selected ? 2 : 1.5} />
                {node.risk > 80 && <circle cx={node.cx + r - 2} cy={node.cy - r + 2} r={4} fill={RED} />}
                <text x={node.cx} y={node.cy + r + 14} textAnchor="middle" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 8.5, fill: "#6B7280" }}>
                  {node.label.length > 15 ? node.label.slice(0, 14) + "…" : node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Right panel */}
      <div className="w-56 flex-shrink-0 border-l" style={{ borderColor: c.border, background: c.bgSecondary }}>
        {selectedNode ? (
          <div className="p-4">
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", color: c.textDim, letterSpacing: "0.1em", marginBottom: 14 }}>ENTITY DETAILS</div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${nodeColors[selectedNode.type]}18`, border: `1px solid ${nodeColors[selectedNode.type]}40` }}>
              <Network className="w-5 h-5" style={{ color: nodeColors[selectedNode.type] }} />
            </div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: c.text, fontSize: "0.85rem", marginBottom: 2 }}>{selectedNode.label}</div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.6rem", color: nodeColors[selectedNode.type], marginBottom: 18, letterSpacing: "0.08em" }}>
              {nodeTypeLabels[selectedNode.type].toUpperCase()}
            </div>
            <div className="space-y-4">
              {[
                { label: "Risk Score", value: `${selectedNode.risk}/100`, color: riskColor(selectedNode.risk) },
                { label: "Connections", value: `${edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).length} links` },
                { label: "Suspicious Links", value: `${edges.filter(e => (e.from === selectedNode.id || e.to === selectedNode.id) && e.suspicious).length}`, color: RED },
                { label: "In Fraud Ring", value: fraudRingNodes.has(selectedNode.id) ? "Yes" : "No", color: fraudRingNodes.has(selectedNode.id) ? RED : GREEN },
              ].map((row) => (
                <div key={row.label}>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.63rem", color: c.textDim, marginBottom: 2 }}>{row.label}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.82rem", color: row.color ?? c.textMuted, fontWeight: 600 }}>{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 p-4 text-center">
            <Network className="w-8 h-8 mb-3" style={{ color: "#1F2937" }} />
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.72rem", color: "#4B5563" }}>Select a node to inspect entity details</span>
          </div>
        )}
      </div>
    </div>
  );
}
