import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FileText, Brain, Network, Lightbulb } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const steps = [
  {
    icon: FileText,
    title: "Documents",
    description: "Upload any financial document, ID proof, or land records",
    color: "#5227FF"
  },
  {
    icon: Brain,
    title: "AI Forensics",
    description: "Advanced OCR, metadata analysis, and pattern detection",
    color: "#00B3A4"
  },
  {
    icon: Network,
    title: "Cross-Document Engine",
    description: "Detects contradictions across multiple documents",
    color: "#E85D75"
  },
  {
    icon: Lightbulb,
    title: "Explainable Insights",
    description: "Clear reasoning with evidence and confidence scores",
    color: "#2FBF71"
  }
];

export function HowItWorks() {
  const { c } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 md:px-12 lg:px-24" style={{ background: c.bg }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:order-2"
          >
            <div
              className="inline-block px-4 py-2 rounded-full text-sm mb-4"
              style={{
                background: c.accentLight,
                color: c.accent,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                border: `1px solid ${c.accent}30`,
              }}
            >
              HOW IT WORKS
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
              How{" "}
              <span
                className="italic"
                style={{ fontFamily: "'DM Serif Display', serif", color: c.accent }}
              >
                TRINETRA
              </span>
              {" "}Thinks
            </h2>

            <p
              className="text-xl leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted }}
            >
              Our AI-powered pipeline analyzes documents at multiple levels—from pixel-level forensics to cross-document reasoning—delivering insights traditional systems miss.
            </p>

            {/* Process Steps */}
            <div className="space-y-6 pt-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    className="flex gap-4 items-start"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: step.color + "22", border: `1px solid ${step.color}40` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: step.color }} />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl mb-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: c.text }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-base"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Arrow Flow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-3 pt-6"
            >
              <div className="flex-1 h-1 rounded" style={{ background: "#5227FF" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#00B3A4" }} />
              <div className="flex-1 h-1 rounded" style={{ background: "#00B3A4" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#E85D75" }} />
              <div className="flex-1 h-1 rounded" style={{ background: "#E85D75" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#2FBF71" }} />
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:order-1"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwaW50ZWxsaWdlbmNlJTIwYW5hbHlzaXN8ZW58MXx8fHwxNzc5NDI3NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Banking Intelligence Analysis"
                className="w-full h-[500px] object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(0,179,164,0.15), rgba(82,39,255,0.15))" }}
              />
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -top-6 -left-6 p-5 rounded-2xl shadow-xl border"
              style={{ background: c.bgCardSolid, borderColor: c.border }}
            >
              <div
                className="text-3xl mb-1"
                style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: "#2FBF71" }}
              >
                &lt;2min
              </div>
              <div
                className="text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted }}
              >
                Analysis Time
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
