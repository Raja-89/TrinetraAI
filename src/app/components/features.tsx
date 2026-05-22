import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GitBranch, Clock, Shield, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const features = [
  {
    icon: GitBranch,
    title: "Cross-Document Reasoning",
    description: "Automatically detects contradictions between salary slips, bank statements, GST data, and property records."
  },
  {
    icon: Clock,
    title: "Timeline Intelligence",
    description: "Analyzes temporal patterns and financial behavior over time to spot anomalies invisible to manual review."
  },
  {
    icon: Shield,
    title: "Graph Fraud Mapping",
    description: "Visualizes relationships between accounts, locations, employers, and documents to uncover fraud rings."
  },
  {
    icon: Sparkles,
    title: "Agentic AI Investigation",
    description: "AI co-pilot that assists analysts with contextual recommendations and evidence-based insights."
  }
];

export function Features() {
  const { c } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 md:px-12 lg:px-24" style={{ background: c.bgSecondary }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div
              className="inline-block px-4 py-2 rounded-full text-sm mb-4"
              style={{
                background: "rgba(47,191,113,0.1)",
                color: "#2FBF71",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                border: "1px solid rgba(47,191,113,0.2)",
              }}
            >
              INTELLIGENT FEATURES
            </div>

            <h2
              className="leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                color: c.text,
              }}
            >
              Built for{" "}
              <span
                className="italic"
                style={{ fontFamily: "'DM Serif Display', serif", color: "#00B3A4" }}
              >
                Modern
              </span>
              {" "}Banking
            </h2>

            <p
              className="text-xl leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted }}
            >
              TRINETRA combines cutting-edge AI with forensic-grade analysis to deliver unprecedented accuracy in fraud detection and underwriting intelligence.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    className="p-6 rounded-2xl border transition-all hover:shadow-lg cursor-pointer group"
                    style={{ borderColor: c.border, background: c.bgCard }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ background: "rgba(82,39,255,0.15)", border: "1px solid rgba(82,39,255,0.25)" }}
                    >
                      <Icon className="w-6 h-6" style={{ color: "#5227FF" }} />
                    </div>
                    <h3
                      className="text-lg mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: c.text }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted }}
                    >
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1695388474402-ed805a890d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudCUyMHZlcmlmaWNhdGlvbiUyMGZyYXVkfGVufDF8fHx8MTc3OTQyNzY0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Document Verification"
                className="w-full h-[500px] object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(47,191,113,0.1), rgba(0,179,164,0.1))" }}
              />
            </div>

            {/* Floating Confidence Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-xl border"
              style={{ background: c.bgCardSolid, borderColor: c.border }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: "#2FBF71" }} />
                <span
                  className="text-sm"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted, fontWeight: 600 }}
                >
                  CONFIDENCE SCORE
                </span>
              </div>
              <div
                className="text-4xl"
                style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: "#2FBF71" }}
              >
                98.4%
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
