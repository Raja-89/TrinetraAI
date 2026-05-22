import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, Mail, Phone, Building2, User } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

function ModalShell({ open, onClose, children }: ModalProps & { children: React.ReactNode }) {
  const { c } = useTheme();
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            style={{
              background: c.bgCardSolid,
              border: `1px solid ${c.borderStrong}`,
              borderRadius: 20,
              width: "100%",
              maxWidth: 480,
              boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: c.textDim,
                padding: 4,
                borderRadius: 6,
              }}
            >
              <X style={{ width: 18, height: 18 }} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScheduleDemoModal({ open, onClose }: ModalProps) {
  const { c } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    background: c.inputBg,
    border: `1px solid ${c.border}`,
    borderRadius: 8,
    padding: "10px 14px",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "0.875rem",
    color: c.text,
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <ModalShell open={open} onClose={() => { onClose(); setSubmitted(false); setForm({ name: "", email: "", company: "", role: "" }); }}>
      <div style={{ padding: "32px 32px 28px" }}>
        {/* Accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #5227FF, #7C3AED)" }} />

        {submitted ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <CheckCircle style={{ width: 48, height: 48, color: "#2FBF71", margin: "0 auto 16px" }} />
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: c.text, marginBottom: 10 }}>
              You're on the list!
            </h3>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", color: c.textMuted, lineHeight: 1.6 }}>
              We'll reach out within 24 hours to schedule your personalized TRINETRA demo.
            </p>
          </div>
        ) : (
          <>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: c.text, marginBottom: 6 }}>
              Schedule a Demo
            </h3>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: c.textMuted, marginBottom: 24, lineHeight: 1.5 }}>
              See TRINETRA's full fraud intelligence stack in a 30-minute live walkthrough.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "10px 14px" }}>
                <User style={{ width: 15, height: 15, color: c.textDim, flexShrink: 0 }} />
                <input
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ ...inputStyle, background: "transparent", border: "none", padding: 0 }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "10px 14px" }}>
                <Mail style={{ width: 15, height: 15, color: c.textDim, flexShrink: 0 }} />
                <input
                  required
                  type="email"
                  placeholder="Work email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ ...inputStyle, background: "transparent", border: "none", padding: 0 }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "10px 14px" }}>
                <Building2 style={{ width: 15, height: 15, color: c.textDim, flexShrink: 0 }} />
                <input
                  required
                  placeholder="Company / Bank"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  style={{ ...inputStyle, background: "transparent", border: "none", padding: 0 }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "10px 14px" }}>
                <Phone style={{ width: 15, height: 15, color: c.textDim, flexShrink: 0 }} />
                <input
                  placeholder="Phone (optional)"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  style={{ ...inputStyle, background: "transparent", border: "none", padding: 0 }}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: 8,
                  background: "#5227FF",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "13px 24px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(82,39,255,0.35)",
                  transition: "transform 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
              >
                Request Demo →
              </button>
            </form>
          </>
        )}
      </div>
    </ModalShell>
  );
}

export function ContactSalesModal({ open, onClose }: ModalProps) {
  const { c } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <ModalShell open={open} onClose={() => { onClose(); setSubmitted(false); setMessage(""); setEmail(""); }}>
      <div style={{ padding: "32px 32px 28px" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #E85D75, #F59E0B)" }} />

        {submitted ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <CheckCircle style={{ width: 48, height: 48, color: "#2FBF71", margin: "0 auto 16px" }} />
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: c.text, marginBottom: 10 }}>
              Message received!
            </h3>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", color: c.textMuted, lineHeight: 1.6 }}>
              Our sales team will get back to you within 1 business day.
            </p>
          </div>
        ) : (
          <>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: c.text, marginBottom: 6 }}>
              Contact Sales
            </h3>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: c.textMuted, marginBottom: 24, lineHeight: 1.5 }}>
              Interested in enterprise pricing or custom deployments? We'd love to talk.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
                marginBottom: 20,
                padding: 16,
                borderRadius: 12,
                background: c.bgCard,
                border: `1px solid ${c.border}`,
              }}
            >
              {[
                { value: "50+", label: "Lenders" },
                { value: "₹2.4B+", label: "Protected" },
                { value: "99.1%", label: "Accuracy" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "1.1rem", color: c.accent }}>{s.value}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem", color: c.textDim }}>{s.label}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "10px 14px" }}>
                <Mail style={{ width: 15, height: 15, color: c.textDim, flexShrink: 0 }} />
                <input
                  required
                  type="email"
                  placeholder="Your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.875rem",
                    color: c.text,
                    width: "100%",
                  }}
                />
              </div>
              <textarea
                required
                placeholder="Tell us about your use case..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                style={{
                  background: c.inputBg,
                  border: `1px solid ${c.border}`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.875rem",
                  color: c.text,
                  outline: "none",
                  resize: "vertical",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                style={{
                  marginTop: 4,
                  background: "linear-gradient(90deg, #E85D75, #F59E0B)",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "13px 24px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "transform 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
              >
                Send Message →
              </button>
            </form>
          </>
        )}
      </div>
    </ModalShell>
  );
}
