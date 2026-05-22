import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export function TrinetraLogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4L37 34H3L20 4Z" stroke="#5227FF" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M20 13L28 27H12L20 13Z" fill="#5227FF" opacity="0.18" />
      <circle cx="20" cy="22" r="4.2" fill="#5227FF" opacity="0.9" />
      <circle cx="21.6" cy="20.5" r="1.3" fill="white" opacity="0.85" />
      <circle cx="20" cy="4" r="1.6" fill="#5227FF" />
    </svg>
  );
}

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Architecture", href: "/architecture" },
];

const SEARCH_INDEX = [
  { label: "Overview Dashboard", path: "/workspace/hub", category: "Workspace" },
  { label: "Investigation Cases", path: "/workspace/investigations", category: "Workspace" },
  { label: "Document Forensics", path: "/workspace/forensics", category: "Workspace" },
  { label: "Contradiction Engine", path: "/workspace/contradictions", category: "Workspace" },
  { label: "Fraud Graph", path: "/workspace/graph", category: "Workspace" },
  { label: "Risk Pulse Monitoring", path: "/workspace/monitoring", category: "Workspace" },
  { label: "Heatmap Analyzer", path: "/workspace/heatmap", category: "Workspace" },
  { label: "AI Investigator", path: "/workspace/ai", category: "Workspace" },
  { label: "Reports", path: "/workspace/reports", category: "Workspace" },
  { label: "Compliance Center", path: "/workspace/compliance", category: "Workspace" },
  { label: "Team Workspace", path: "/workspace/team", category: "Workspace" },
  { label: "Settings", path: "/workspace/settings", category: "Workspace" },
  { label: "Platform Features", path: "/features", category: "Pages" },
  { label: "How It Works", path: "/how-it-works", category: "Pages" },
  { label: "Architecture", path: "/architecture", category: "Pages" },
];

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return false;
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

function SearchBar({ c, isDark }: { c: ReturnType<typeof useTheme>["c"]; isDark: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.length > 0
    ? SEARCH_INDEX.filter((item) => fuzzyMatch(query, item.label) || fuzzyMatch(query, item.category))
    : [];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", width: 260 }}>
      <div
        onClick={() => { inputRef.current?.focus(); setOpen(true); }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: c.inputBg,
          border: `1px solid ${open ? "#5227FF60" : c.border}`,
          borderRadius: 8,
          padding: "6px 12px",
          cursor: "text",
          transition: "border-color 0.2s",
        }}
      >
        <Search style={{ width: 14, height: 14, color: c.textDim, flexShrink: 0 }} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search pages, features..."
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.8rem",
            color: c.text,
            width: "100%",
          }}
        />
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.58rem",
            color: c.textDim,
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
            padding: "2px 5px",
            borderRadius: 4,
            flexShrink: 0,
          }}
        >
          ⌘K
        </span>
      </div>
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              right: 0,
              background: isDark ? "#0D1117" : "#ffffff",
              border: `1px solid ${c.border}`,
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: isDark
                ? "0 16px 40px rgba(0,0,0,0.6)"
                : "0 16px 40px rgba(0,0,0,0.12)",
              zIndex: 200,
            }}
          >
            {results.slice(0, 7).map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setQuery("");
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  padding: "10px 14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: `1px solid ${c.border}`,
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = c.accentLight;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.82rem",
                    color: c.text,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    color: c.textDim,
                    background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}
                >
                  {item.category}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const { c, isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled
    ? c.navBg
    : isDark ? "transparent" : "rgba(240,244,255,0.0)";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: navBg,
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${c.border}` : "none",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <TrinetraLogoMark size={34} />
          <div className="flex flex-col leading-none">
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                letterSpacing: "0.04em",
                color: c.text,
                textTransform: "uppercase",
              }}
            >
              TRINETRA
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 400,
                fontSize: "0.55rem",
                letterSpacing: "0.14em",
                color: "#5227FF",
                textTransform: "uppercase",
              }}
            >
              AI Fraud Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: c.textMuted,
                textDecoration: "none",
              }}
              className="hover:opacity-80 transition-opacity duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search - desktop only */}
        <div className="hidden lg:block flex-1 max-w-[280px]">
          <SearchBar c={c} isDark={isDark} />
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {/* LIVE badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(232,93,117,0.12)",
              border: "1px solid rgba(232,93,117,0.25)",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              color: "#E85D75",
              fontWeight: 500,
              letterSpacing: "0.06em",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#E85D75" }} />
            LIVE SYSTEM
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-all hover:scale-105"
            style={{
              background: c.bgCard,
              border: `1px solid ${c.border}`,
              color: c.textMuted,
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun style={{ width: 15, height: 15 }} /> : <Moon style={{ width: 15, height: 15 }} />}
          </button>

          {/* Open Workspace */}
          <Link
            to="/workspace/hub"
            className="px-5 py-2 rounded-lg transition-all hover:scale-105"
            style={{
              background: "#5227FF",
              color: "white",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "0.825rem",
              letterSpacing: "0.02em",
              boxShadow: "0 0 16px rgba(82,39,255,0.3)",
              textDecoration: "none",
            }}
          >
            Open Workspace
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 flex-shrink-0" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen
            ? <X style={{ width: 20, height: 20, color: c.text }} />
            : <Menu style={{ width: 20, height: 20, color: c.text }} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t"
            style={{ background: isDark ? "rgba(6,8,15,0.97)" : c.bgSecondary, borderColor: c.border }}
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block py-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: c.textMuted, textDecoration: "none" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => { toggleTheme(); }}
                  className="flex items-center justify-center w-10 h-10 rounded-lg"
                  style={{ background: c.bgCard, border: `1px solid ${c.border}`, color: c.textMuted }}
                >
                  {isDark ? <Sun style={{ width: 16, height: 16 }} /> : <Moon style={{ width: 16, height: 16 }} />}
                </button>
                <Link
                  to="/workspace/hub"
                  className="flex-1 px-5 py-2.5 rounded-lg text-center"
                  style={{ background: "#5227FF", color: "white", fontFamily: "'Syne', sans-serif", fontWeight: 700, textDecoration: "none" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Open Workspace
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
