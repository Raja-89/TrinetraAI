import { motion } from "motion/react";
import { ArrowRight, Activity, FileSearch, GitMerge, Brain } from "lucide-react";
import CardSwap, { Card } from "./CardSwap";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const cardData = [
  {
    label: "DOCUMENT FORENSICS",
    title: "Forgery Detected",
    badge: "HIGH RISK",
    badgeColor: "#E85D75",
    icon: FileSearch,
    accent: "#E85D75",
    lines: [
      { label: "OCR Layer Mismatch", val: "87%", color: "#E85D75" },
      { label: "Metadata Anomaly", val: "Detected", color: "#E85D75" },
      { label: "Creation Timestamp", val: "Modified", color: "#F59E0B" },
    ],
    chartBars: [30, 55, 40, 80, 95, 70, 85],
  },
  {
    label: "CROSS-DOCUMENT ENGINE",
    title: "Income Contradiction",
    badge: "MISMATCH",
    badgeColor: "#F59E0B",
    icon: GitMerge,
    accent: "#2B5CFF",
    lines: [
      { label: "Salary Slip", val: "₹1.2L/mo", color: "dim" },
      { label: "Bank Inflow", val: "₹38K/mo", color: "#E85D75" },
      { label: "GST Turnover", val: "₹4.8L/yr", color: "#E85D75" },
    ],
    chartBars: [90, 85, 88, 82, 86, 84, 87],
  },
  {
    label: "REAL-TIME MONITORING",
    title: "Fraud Ring Detected",
    badge: "CRITICAL",
    badgeColor: "#E85D75",
    icon: Activity,
    accent: "#00B3A4",
    lines: [
      { label: "Linked Entities", val: "14 nodes", color: "#00B3A4" },
      { label: "Shared PAN", val: "3 accounts", color: "#E85D75" },
      { label: "Common Employer", val: "Flagged", color: "#F59E0B" },
    ],
    chartBars: [20, 35, 28, 60, 95, 88, 92],
  },
  {
    label: "AI INVESTIGATOR",
    title: "Risk Score: 94/100",
    badge: "AI ANALYSIS",
    badgeColor: "#7C3AED",
    icon: Brain,
    accent: "#7C3AED",
    lines: [
      { label: "Fraud Probability", val: "94%", color: "#E85D75" },
      { label: "Evidence Points", val: "23", color: "dim" },
      { label: "Recommended", val: "Escalate", color: "#2FBF71" },
    ],
    chartBars: [40, 52, 65, 70, 78, 88, 94],
  },
];

interface HeroProps {
  onWatchDemo?: () => void;
}

export function Hero({ onWatchDemo }: HeroProps) {
  const { c, isDark } = useTheme();

  return (
    <section
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-28 pb-16 relative"
      style={{ background: "transparent" }}
    >
      {/* Gradient overlay — only in dark mode, fades dots near text */}
      {isDark && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 30% 50%, rgba(6,8,15,0.8) 0%, rgba(6,8,15,0.3) 60%, transparent 100%)",
          }}
        />
      )}

      <div className="relative max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="space-y-8 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="flex items-center gap-2"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#E85D75" }}
            />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                color: "#E85D75",
                fontWeight: 500,
              }}
            >
              LIVE FRAUD INTELLIGENCE SYSTEM
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="leading-[1.05]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              color: c.text,
            }}
          >
            See What Traditional
            <span
              className="italic block mt-2"
              style={{ fontFamily: "'DM Serif Display', serif", color: "#5227FF" }}
            >
              Verification Misses.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg leading-relaxed max-w-xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted, fontWeight: 400 }}
          >
            AI-powered underwriting intelligence that detects fraud, forged documents,
            and financial contradictions in real time — before approval.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link
              to="/workspace/hub"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-base transition-all hover:scale-105 hover:shadow-2xl"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                background: "#5227FF",
                color: "white",
                boxShadow: "0 0 30px rgba(82,39,255,0.35)",
                textDecoration: "none",
              }}
            >
              Open Workspace
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/how-it-works"
              onClick={onWatchDemo}
              className="px-7 py-3.5 rounded-xl text-base border transition-all hover:scale-105"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                borderColor: c.borderStrong,
                color: c.textMuted,
                background: c.bgCard,
                textDecoration: "none",
              }}
            >
              Watch Demo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="flex gap-10 pt-4 border-t"
            style={{ borderColor: c.border }}
          >
            {[
              { val: "92%", label: "Faster Underwriting" },
              { val: "67%", label: "Fraud Reduction" },
              { val: "99.1%", label: "Detection Accuracy" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-3xl mb-0.5"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: c.text }}
                >
                  {s.val}
                </div>
                <div
                  className="text-xs"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textDim }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side — CardSwap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative h-[520px] hidden lg:block"
        >
          <CardSwap
            width={380}
            height={280}
            cardDistance={55}
            verticalDistance={65}
            delay={4000}
            pauseOnHover
            skewAmount={5}
            easing="elastic"
          >
            {cardData.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Card key={idx}>
                  <div 
                    className="p-6 h-full flex flex-col border transition-colors shadow-xl" 
                    style={{ background: c.bgCard, borderColor: c.border }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: `${card.accent}22` }}
                        >
                          <Icon className="w-3.5 h-3.5" style={{ color: card.accent }} />
                        </div>
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "0.55rem",
                            color: c.textDim,
                            letterSpacing: "0.1em",
                          }}
                        >
                          {card.label}
                        </span>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded-md text-white"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.5rem",
                          background: card.badgeColor,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <h3
                      className="mb-4"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: c.text,
                      }}
                    >
                      {card.title}
                    </h3>

                    <div className="flex items-end gap-1 mb-4 h-10">
                      {card.chartBars.map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm"
                          style={{
                            height: `${h}%`,
                            background: i === card.chartBars.length - 1
                              ? card.accent
                              : `${card.accent}40`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="space-y-2 mt-auto">
                      {card.lines.map((line, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: "0.65rem",
                              color: c.textMuted,
                            }}
                          >
                            {line.label}
                          </span>
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontSize: "0.65rem",
                              color: line.color === "dim" ? c.textDim : line.color,
                              fontWeight: 600,
                            }}
                          >
                            {line.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </CardSwap>
        </motion.div>
      </div>
    </section>
  );
}
