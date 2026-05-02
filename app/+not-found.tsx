import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import ForgeCore from "@/components/ForgeCore";
import { theme } from "@/constants/theme";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Screen Not Found" }} />
      <View style={styles.container}>
        <ForgeCore state="error" size={52} />
        <Text style={styles.title}>Signal Lost</Text>
        <Text style={styles.body}>
          That route does not exist in the current build.
        </Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return to Command Center</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: theme.colors.bg,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.textPrimary,
    marginTop: 10,
  },
  body: {
    marginTop: 8,
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  link: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: `${theme.colors.neon}66`,
    backgroundColor: `${theme.colors.neon}14`,
  },
  linkText: {
    fontSize: 14,
    color: theme.colors.neon,
    fontWeight: "800",
  },
});
