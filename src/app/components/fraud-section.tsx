import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export function FraudSection() {
  const { c, isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 md:px-12 lg:px-24" style={{ background: c.bgSecondary }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="relative overflow-hidden rounded-3xl p-8"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(232,93,117,0.08) 0%, rgba(82,39,255,0.08) 100%)"
                  : "linear-gradient(135deg, rgba(232,93,117,0.05) 0%, rgba(82,39,255,0.05) 100%)",
                border: `1px solid ${c.border}`,
              }}
            >
              {/* Fraud stat visualization */}
              <div className="space-y-4">
                {[
                  { title: "Synthetic Identity Fraud", stat: "+85%", color: "#E85D75", bar: 85 },
                  { title: "AI-Generated Documents", stat: "+320%", color: "#F59E0B", bar: 95 },
                  { title: "Forged Bank Statements", stat: "$1.2B", color: "#E85D75", bar: 72 },
                  { title: "Land Title Fraud", stat: "67% undetected", color: "#5227FF", bar: 67 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    className="p-4 rounded-xl"
                    style={{ background: c.bgCard, border: `1px solid ${c.border}` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted, fontWeight: 500, fontSize: "0.9rem" }}>
                        {item.title}
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: item.color, fontWeight: 600, fontSize: "0.85rem" }}>
                        {item.stat}
                      </span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: c.border }}>
                      <motion.div
                        className="h-1 rounded-full"
                        style={{ background: item.color }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.bar}%` } : {}}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -right-4 px-6 py-4 rounded-2xl"
                style={{
                  background: isDark ? "#0A0F1E" : c.bgCardSolid,
                  border: `1px solid ${c.borderStrong}`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
              >
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: "#E85D75", fontSize: "1.5rem" }}>$2.4B+</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textDim, fontSize: "0.75rem" }}>Annual Fraud Losses</div>
              </div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div
              className="inline-block px-4 py-2 rounded-full text-sm"
              style={{
                background: "rgba(232,93,117,0.12)",
                color: "#E85D75",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                border: "1px solid rgba(232,93,117,0.2)",
              }}
            >
              THE CHALLENGE
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: c.text,
              fontSize: "clamp(2.2rem, 4vw, 3.25rem)",
              lineHeight: 1.1,
            }}>
              Fraud Has{" "}
              <span className="italic" style={{ fontFamily: "'DM Serif Display', serif", color: "#E85D75" }}>Evolved</span>
            </h2>

            <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted, fontSize: "1.1rem", lineHeight: 1.7 }}>
              Traditional verification methods cannot keep up with sophisticated fraud. Synthetic identities, AI-generated documents, forged statements, and land fraud are becoming increasingly common — and increasingly invisible.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "Manual review misses 67% of document tampering",
                "Cross-document contradictions go undetected for weeks",
                "Fraud rings exploit human review bottlenecks",
                "No single system connects behavioral, document, and graph signals",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#E85D75" }} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted, fontSize: "0.95rem" }}>{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
