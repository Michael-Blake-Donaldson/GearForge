import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";

type Props = {
  label: string;
};

export default function Badge({ label }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.neonAlt,
    backgroundColor: "rgba(57,160,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: "600",
  },
});
