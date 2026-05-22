import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  c: typeof darkColors;
}

export const darkColors = {
  bg: "#06080F",
  bgSecondary: "#09090F",
  bgCard: "rgba(255,255,255,0.04)",
  bgCardSolid: "#0D1117",
  text: "#F9FAFB",
  textMuted: "#9CA3AF",
  textDim: "#6B7280",
  border: "rgba(255,255,255,0.07)",
  borderStrong: "rgba(255,255,255,0.12)",
  accent: "#5227FF",
  accentLight: "rgba(82,39,255,0.15)",
  red: "#E85D75",
  redLight: "rgba(232,93,117,0.12)",
  teal: "#00B3A4",
  green: "#2FBF71",
  amber: "#F59E0B",
  dot: "rgba(255,255,255,0.055)",
  navBg: "rgba(6,8,15,0.88)",
  inputBg: "rgba(255,255,255,0.04)",
  badgeBg: "rgba(82,39,255,0.12)",
};

export const lightColors = {
  bg: "#FFFFFF",
  bgSecondary: "#F9FAFB",
  bgCard: "rgba(255,255,255,0.85)",
  bgCardSolid: "#FFFFFF",
  text: "#111827",
  textMuted: "#374151",
  textDim: "#6B7280",
  border: "rgba(0,0,0,0.09)",
  borderStrong: "rgba(0,0,0,0.15)",
  accent: "#5227FF",
  accentLight: "rgba(82,39,255,0.1)",
  red: "#DC2626",
  redLight: "rgba(220,38,38,0.08)",
  teal: "#0891B2",
  green: "#16A34A",
  amber: "#D97706",
  dot: "rgba(0,0,0,0.06)",
  navBg: "rgba(255,255,255,0.92)",
  inputBg: "rgba(0,0,0,0.04)",
  badgeBg: "rgba(82,39,255,0.08)",
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  isDark: true,
  toggleTheme: () => {},
  c: darkColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Enforce dark mode as the default for all users/sessions
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    try { localStorage.setItem("trinetra-theme", theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  const c = theme === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme, c }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
