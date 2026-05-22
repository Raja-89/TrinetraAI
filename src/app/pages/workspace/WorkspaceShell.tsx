import { useState, useRef } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FolderSearch, FileText, GitMerge, Network, Activity,
  Bot, FileBarChart, ShieldCheck, Users, Settings, Search, Bell,
  ChevronDown, ChevronRight, Zap, Map, X, User, Mail, Shield, Building, FileUp, Upload, CheckCircle2
} from "lucide-react";
import { TrinetraLogoMark } from "../../components/navbar";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../../context/ThemeContext";
import { DocumentProvider, useDocument } from "../../context/DocumentContext";

const sidebarSections = [
  {
    group: "INTELLIGENCE",
    items: [
      { label: "Overview", icon: LayoutDashboard, path: "/workspace/hub" },
      { label: "Risk Pulse", icon: Activity, path: "/workspace/monitoring" },
      { label: "Heatmap", icon: Map, path: "/workspace/heatmap" },
    ],
  },
  {
    group: "INVESTIGATIONS",
    items: [
      { label: "Cases", icon: FolderSearch, path: "/workspace/investigations" },
      { label: "Document Forensics", icon: FileText, path: "/workspace/forensics" },
      { label: "Contradictions", icon: GitMerge, path: "/workspace/contradictions" },
    ],
  },
  {
    group: "ANALYTICS",
    items: [
      { label: "Fraud Graph", icon: Network, path: "/workspace/graph" },
      { label: "AI Investigator", icon: Bot, path: "/workspace/ai" },
    ],
  },
  {
    group: "OPERATIONS",
    items: [
      { label: "Reports", icon: FileBarChart, path: "/workspace/reports" },
      { label: "Compliance", icon: ShieldCheck, path: "/workspace/compliance" },
      { label: "Team", icon: Users, path: "/workspace/team" },
      { label: "Settings", icon: Settings, path: "/workspace/settings" },
    ],
  },
];

function SidebarItem({ item, c }: { item: { label: string; icon: React.ElementType; path: string }; c: ReturnType<typeof useTheme>["c"] }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      className="group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150"
      style={({ isActive }) =>
        isActive
          ? { background: "rgba(82,39,255,0.18)", borderLeft: "2px solid #5227FF", paddingLeft: "10px" }
          : { borderLeft: "2px solid transparent" }
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: isActive ? "#5227FF" : c.textDim }}
          />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: isActive ? 600 : 400,
              fontSize: "0.8rem",
              color: isActive ? c.text : c.textDim,
            }}
          >
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );
}

function WorkspaceShellInner() {
  const { c, isDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [riskLevel] = useState("Elevated");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const { mockUpload } = useDocument();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: c.bg }}>
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 56 : 220 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="flex-shrink-0 flex flex-col border-r overflow-hidden"
        style={{ borderColor: c.border, background: c.bgSecondary }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 px-4 h-14 border-b flex-shrink-0"
          style={{ borderColor: c.border }}
        >
          <button onClick={() => navigate("/")} className="flex-shrink-0">
            <TrinetraLogoMark size={28} />
          </button>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: c.text,
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                TRINETRA
              </motion.span>
            )}
          </AnimatePresence>
          <button
            className="ml-auto flex-shrink-0 p-1 rounded transition-colors"
            style={{ color: c.textDim }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed
              ? <ChevronRight className="w-3.5 h-3.5" />
              : <ChevronDown className="w-3.5 h-3.5 -rotate-90" />}
          </button>
        </div>

        {/* Nav Groups */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {sidebarSections.map((section) => (
            <div key={section.group}>
              {!collapsed && (
                <div
                  className="px-3 mb-1.5"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.14em",
                    color: c.textDim,
                    fontWeight: 500,
                  }}
                >
                  {section.group}
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) =>
                  collapsed ? (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="flex items-center justify-center w-full p-2 rounded-lg transition-all"
                      style={({ isActive }) =>
                        isActive ? { background: "rgba(82,39,255,0.18)" } : {}
                      }
                      title={item.label}
                    >
                      {({ isActive }) => {
                        const Icon = item.icon;
                        return <Icon className="w-4 h-4" style={{ color: isActive ? "#5227FF" : c.textDim }} />;
                      }}
                    </NavLink>
                  ) : (
                    <SidebarItem key={item.path} item={item} c={c} />
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        {!collapsed && (
          <div
            className="px-3 py-3 border-t"
            style={{ borderColor: c.border }}
          >
            <div
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
              style={{ background: "rgba(232,93,117,0.08)" }}
            >
              <Zap className="w-3 h-3" style={{ color: "#E85D75" }} />
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  color: "#E85D75",
                  letterSpacing: "0.04em",
                }}
              >
                Risk: {riskLevel}
              </span>
              <span className="ml-auto w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#E85D75" }} />
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Workspace Topbar */}
        <header
          className="h-14 flex items-center px-6 gap-4 border-b flex-shrink-0"
          style={{
            background: c.navBg,
            borderColor: c.border,
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 flex-1 max-w-xl px-3 py-2 rounded-lg"
            style={{ background: c.inputBg, border: `1px solid ${c.border}` }}
          >
            <Search className="w-3.5 h-3.5" style={{ color: c.textDim }} />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.8rem",
                color: c.textDim,
              }}
            >
              Search cases, anomalies, entities, documents...
            </span>
            <span
              className="ml-auto px-1.5 py-0.5 rounded"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                color: c.textDim,
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              }}
            >
              ⌘K
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Risk indicator */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
              style={{
                background: "rgba(232,93,117,0.1)",
                border: "1px solid rgba(232,93,117,0.2)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#E85D75" }} />
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.62rem",
                  color: "#E85D75",
                  letterSpacing: "0.06em",
                }}
              >
                RISK: {riskLevel.toUpperCase()}
              </span>
            </div>

            {/* Global Upload Button */}
            <button
              onClick={() => setShowUpload(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                background: "#5227FF",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: `0 0 10px rgba(82,39,255,0.4)`,
              }}
              className="hover:scale-105 transition-transform"
            >
              <FileUp size={14} color="#fff" />
              Upload
            </button>

            {/* Avatar */}
            <button
              onClick={() => setShowUserModal(true)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #5227FF, #7C3AED)",
                fontFamily: "'Syne', sans-serif",
                color: "white",
              }}
            >
              AN
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto" style={{ background: c.bg }}>
          <Outlet />
        </main>
      </div>

      {/* User Info Modal */}
      <AnimatePresence>
        {showUserModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl relative"
              style={{ background: c.bgCard, border: `1px solid ${c.border}` }}
            >
              {/* Cover Photo */}
              <div style={{ height: 100, background: "linear-gradient(135deg, #5227FF, #7C3AED)" }} />
              
              <button
                onClick={() => setShowUserModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-colors"
              >
                <X size={16} color="white" />
              </button>

              <div className="px-6 pb-6 relative">
                {/* Avatar Overlay */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg border-4 -mt-10 mb-4"
                  style={{
                    background: "linear-gradient(135deg, #2A1B54, #5227FF)",
                    borderColor: c.bgCard,
                    color: "white",
                    fontFamily: "'Syne', sans-serif"
                  }}
                >
                  AN
                </div>

                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24, color: c.text, margin: 0, letterSpacing: "-0.02em" }}>
                  Aman Nayak
                </h2>
                <p style={{ color: c.textDim, fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", marginTop: 2 }}>
                  Senior Fraud Investigator
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(82,39,255,0.1)" }}>
                      <Building size={15} color="#5227FF" />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: c.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>DEPARTMENT</div>
                      <div style={{ fontSize: 14, color: c.text, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>Risk & Compliance Unit</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(47,191,113,0.1)" }}>
                      <Shield size={15} color="#2FBF71" />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: c.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>CLEARANCE LEVEL</div>
                      <div style={{ fontSize: 14, color: c.text, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>Level 4 (High Security)</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(232,93,117,0.1)" }}>
                      <Activity size={15} color="#E85D75" />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: c.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>ACTIVE CASES</div>
                      <div style={{ fontSize: 14, color: c.text, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>14 Investigations</div>
                    </div>
                  </div>
                </div>

                <button
                  style={{
                    width: "100%",
                    marginTop: 24,
                    padding: "10px",
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${c.border}`,
                    borderRadius: 8,
                    color: c.text,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  className="hover:bg-white/5"
                  onClick={() => setShowUserModal(false)}
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            style={{ background: "rgba(0,0,0,0.6)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-md rounded-2xl shadow-2xl relative p-6"
              style={{ background: c.bgCard, border: `1px solid ${c.border}` }}
            >
              <button
                onClick={() => setShowUpload(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/10 transition-colors"
                style={{ color: c.textDim }}
              >
                <X size={18} />
              </button>
              
              {!isAnalyzing ? (
                <>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: c.text, margin: "0 0 16px 0" }}>
                    Upload Document
                  </h2>
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed rounded-xl flex flex-col p-6 cursor-pointer transition-colors"
                    style={{ borderColor: c.accent + "50", background: c.accentLight }}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setSelectedFileName(e.target.files[0].name);
                        }
                      }}
                    />
                    <div style={{ textAlign: "center", marginBottom: selectedFileName ? 20 : 0, color: c.accent }}>
                      <Upload size={28} style={{ margin: "0 auto 8px" }} />
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: c.textMuted, margin: 0 }}>
                        Drag documents here or click to browse
                      </p>
                      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: c.textDim, margin: "4px 0 0" }}>
                        PDF, JPG, PNG · Max 50MB per file
                      </p>
                    </div>

                    {selectedFileName && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: selectedFileName ? 8 : 0 }}>
                        <div
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
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: c.textMuted }}>
                            {selectedFileName}
                          </span>
                          <CheckCircle2 size={14} color="#2FBF71" style={{ marginLeft: "auto" }} />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button
                    style={{
                      width: "100%",
                      marginTop: 20,
                      padding: "12px",
                      background: "#5227FF",
                      border: "none",
                      borderRadius: 8,
                      color: "#fff",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: `0 0 15px rgba(82,39,255,0.4)`,
                    }}
                    onClick={() => {
                      setIsAnalyzing(true);
                      setTimeout(() => {
                        mockUpload(selectedFileName || undefined); // pass filename if it exists
                        setIsAnalyzing(false);
                        setShowUpload(false);
                        setSelectedFileName(null);
                        navigate("/workspace/forensics"); // Go to forensics to see result
                      }, 2500);
                    }}
                  >
                    Start Analysis
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-4 mb-6"
                    style={{ borderTopColor: "#5227FF", borderRightColor: "#5227FF", borderBottomColor: `rgba(82,39,255,0.4)`, borderLeftColor: `rgba(82,39,255,0.4)` }}
                  />
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, color: c.text, margin: "0 0 8px 0" }}>
                    Analyzing Document
                  </h3>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: c.textDim }}>
                    <motion.span
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Extracting metadata and signatures...
                    </motion.span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WorkspaceShell() {
  return (
    <DocumentProvider>
      <WorkspaceShellInner />
    </DocumentProvider>
  );
}
