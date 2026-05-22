import { useTheme } from "../context/ThemeContext";

export function StaticDotGrid() {
  const { isDark } = useTheme();
  const dotColor = isDark ? "rgba(255,255,255,0.055)" : "rgba(82,39,255,0.09)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage: `radial-gradient(circle, ${dotColor} 1.5px, transparent 1.5px)`,
        backgroundSize: "36px 36px",
      }}
    />
  );
}
