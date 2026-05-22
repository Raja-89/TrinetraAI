import { Github, Linkedin } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function FooterLogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4L37 34H3L20 4Z" stroke="#5227FF" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M20 13L28 27H12L20 13Z" fill="#5227FF" opacity="0.15" />
      <circle cx="20" cy="22" r="4" fill="#5227FF" opacity="0.85" />
      <circle cx="21.5" cy="20.5" r="1.2" fill="white" opacity="0.9" />
      <circle cx="20" cy="4" r="1.5" fill="#5227FF" />
    </svg>
  );
}

export function Footer() {
  const { c } = useTheme();

  return (
    <footer
      className="border-t py-6 px-6 md:px-12 lg:px-24"
      style={{ background: c.bgSecondary, borderColor: c.border }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo + tagline */}
        <div className="flex items-center gap-2.5">
          <FooterLogoMark />
          <div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: c.text,
                letterSpacing: "-0.01em",
              }}
            >
              TRINETRA AI
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                color: c.textDim,
                marginLeft: "0.6rem",
              }}
            >
              // fraud intelligence workspace
            </span>
          </div>
        </div>

        {/* Center — hackathon tag */}
        <span
          className="px-3 py-1 rounded-full"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            color: "#5227FF",
            background: "rgba(82,39,255,0.12)",
            border: "1px solid rgba(82,39,255,0.2)",
            letterSpacing: "0.05em",
          }}
        >
          HACKATHON BUILD · 2026
        </span>

        {/* Right — social + copyright */}
        <div className="flex items-center gap-4">
          <a href="#" className="transition-opacity hover:opacity-60" aria-label="GitHub">
            <Github className="w-4 h-4" style={{ color: c.textDim }} />
          </a>
          <a href="#" className="transition-opacity hover:opacity-60" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" style={{ color: c.textDim }} />
          </a>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: c.textDim }}>
            © 2026 TRINETRA AI
          </span>
        </div>
      </div>
    </footer>
  );
}
