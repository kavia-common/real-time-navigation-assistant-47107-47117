export const OceanTheme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    error: "#EF4444",
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 10px rgba(0,0,0,0.08)",
  },
  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
  },
  transitions: {
    base: "all 200ms ease",
  },
};

// PUBLIC_INTERFACE
export function applyTheme(theme = OceanTheme) {
  /** Apply theme as CSS variables to document root. */
  const root = document.documentElement;
  root.style.setProperty("--ocn-primary", theme.colors.primary);
  root.style.setProperty("--ocn-secondary", theme.colors.secondary);
  root.style.setProperty("--ocn-bg", theme.colors.background);
  root.style.setProperty("--ocn-surface", theme.colors.surface);
  root.style.setProperty("--ocn-text", theme.colors.text);
  root.style.setProperty("--ocn-error", theme.colors.error);
  root.style.setProperty("--ocn-shadow-sm", theme.shadows.sm);
  root.style.setProperty("--ocn-shadow-md", theme.shadows.md);
  root.style.setProperty("--ocn-radius-sm", theme.radii.sm);
  root.style.setProperty("--ocn-radius-md", theme.radii.md);
  root.style.setProperty("--ocn-radius-lg", theme.radii.lg);
}
