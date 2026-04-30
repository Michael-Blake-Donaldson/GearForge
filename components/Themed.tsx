/**
 * Themed View and Text components that respect the GearForge dark theme.
 * These are thin wrappers kept for compatibility; most screens use theme.ts directly.
 */

import { Text as DefaultText, View as DefaultView } from "react-native";

import { theme } from "@/constants/theme";

export type TextProps = DefaultText["props"];
export type ViewProps = DefaultView["props"];

export function Text(props: TextProps) {
  const { style, ...rest } = props;
  return (
    <DefaultText
      style={[{ color: theme.colors.textPrimary }, style]}
      {...rest}
    />
  );
}

export function View(props: ViewProps) {
  const { style, ...rest } = props;
  return (
    <DefaultView
      style={[{ backgroundColor: theme.colors.surface }, style]}
      {...rest}
    />
  );
}
