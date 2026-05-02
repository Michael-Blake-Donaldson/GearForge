import { colors } from "@/constants/colors";

export const theme = {
  colors: {
    background: colors.background,
    card: colors.card,
    accentPrimary: colors.accentPrimary,
    accentSecondary: colors.accentSecondary,
    textPrimary: colors.textPrimary,
    textSecondary: colors.textSecondary,
    bg: colors.background,
    surface: colors.card,
    surfaceAlt: colors.cardAlt,
    border: colors.border,
    neon: colors.accentPrimary,
    neonAlt: colors.accentSecondary,
    danger: colors.danger,
    success: colors.success,
    warning: colors.warning,
    tabInactive: colors.tabInactive,
  },
  typography: {
    h1: {
      fontFamily: "System",
      fontSize: 28,
      fontWeight: "800" as const,
      lineHeight: 34,
    },
    h2: {
      fontFamily: "System",
      fontSize: 22,
      fontWeight: "800" as const,
      lineHeight: 28,
    },
    body: {
      fontFamily: "System",
      fontSize: 16,
      fontWeight: "500" as const,
      lineHeight: 24,
    },
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    lg: 18,
    md: 12,
    sm: 8,
    pill: 999,
  },
};
