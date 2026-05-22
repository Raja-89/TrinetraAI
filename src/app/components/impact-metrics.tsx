import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { TrendingUp, Users, Zap, Award } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const metrics = [
  {
    icon: TrendingUp,
    value: "92%",
    label: "Faster Underwriting",
    description: "Reduce decision time from hours to minutes",
    color: "#5227FF"
  },
  {
    icon: Users,
    value: "67%",
    label: "Fraud Reduction",
    description: "Catch sophisticated fraud patterns early",
    color: "#E85D75"
  },
  {
    icon: Zap,
    value: "40%",
    label: "Manual Work Reduced",
    description: "Automate repetitive verification tasks",
    color: "#00B3A4"
  },
  {
    icon: Award,
    value: "99.1%",
    label: "Accuracy Rate",
    description: "Industry-leading detection accuracy",
    color: "#2FBF71"
  }
];

interface ImpactMetricsProps {
  onScheduleDemo?: () => void;
  onContactSales?: () => void;
}

export function ImpactMetrics({ onScheduleDemo, onContactSales }: ImpactMetricsProps) {
  const { c, isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 md:px-12 lg:px-24" style={{ background: c.bg }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div
            className="inline-block px-4 py-2 rounded-full text-sm mb-6"
            style={{
              background: c.accentLight,
              color: c.accent,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              border: `1px solid ${c.accent}30`,
            }}
          >
            PROVEN IMPACT
          </div>

          <h2
            className="mb-6 leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              color: c.text,
            }}
          >
            Transform Your{" "}
            <span
              className="italic"
              style={{ fontFamily: "'DM Serif Display', serif", color: c.accent }}
            >
              Underwriting
            </span>
          </h2>

          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted }}
          >
            Join leading financial institutions using TRINETRA to revolutionize their fraud detection and underwriting processes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1593510987185-1ec2256148a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXRlY3RpdmUlMjBpbnZlc3RpZ2F0aW9uJTIwbW9kZXJufGVufDF8fHx8MTc3OTQyNzY0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Investigation Workspace"
                className="w-full h-[500px] object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(82,39,255,0.3), rgba(0,0,0,0.4))" }}
              />
            </div>

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center text-white">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "white", marginBottom: 12 }}
                >
                  Trusted by Leading Banks
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.85)", fontSize: "1rem" }}
                >
                  Processing millions of documents monthly
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Right - Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="p-8 rounded-2xl border transition-all cursor-pointer group hover:shadow-xl"
                  style={{
                    background: c.bgCard,
                    borderColor: c.border,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = metric.color + "60";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = c.border;
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                    style={{ background: metric.color + "20", border: `1px solid ${metric.color}40` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: metric.color }} />
                  </div>

                  <div
                    className="text-5xl mb-2"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: c.text }}
                  >
                    {metric.value}
                  </div>

                  <h3
                    className="text-lg mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: c.text }}
                  >
                    {metric.label}
                  </h3>

                  <p
                    className="text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted }}
                  >
                    {metric.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="rounded-3xl p-12 md:p-16 text-center border relative overflow-hidden"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #0D1117 0%, #0A0F1E 100%)"
              : "linear-gradient(135deg, #EEF2FF 0%, #F0F4FF 100%)",
            borderColor: isDark ? "rgba(82,39,255,0.3)" : "rgba(82,39,255,0.2)",
          }}
        >
          {/* Subtle accent glow */}
          <div
            style={{
              position: "absolute",
              top: -60,
              left: "50%",
              transform: "translateX(-50%)",
              width: 400,
              height: 200,
              background: "rgba(82,39,255,0.12)",
              filter: "blur(60px)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h3
              className="mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                color: c.text,
                lineHeight: 1.2,
              }}
            >
              Ready to{" "}
              <span
                className="italic"
                style={{ fontFamily: "'DM Serif Display', serif", color: c.accent }}
              >
                Revolutionize
              </span>
              {" "}Your Underwriting?
            </h3>

            <p
              className="text-xl mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textMuted }}
            >
              Join the next generation of fraud detection. Get started with TRINETRA today.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={onScheduleDemo}
                className="px-10 py-5 rounded-xl transition-all hover:scale-105 hover:shadow-xl"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "1rem",
                  background: "#5227FF",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 24px rgba(82,39,255,0.35)",
                }}
              >
                Schedule Demo
              </button>
              <button
                onClick={onContactSales}
                className="px-10 py-5 rounded-xl border-2 transition-all hover:scale-105"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderColor: "#5227FF",
                  color: c.accent,
                  background: c.accentLight,
                  cursor: "pointer",
                }}
              >
                Contact Sales
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
