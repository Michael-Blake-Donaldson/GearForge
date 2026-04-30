/**
 * app/privacy.tsx
 *
 * In-app Privacy Policy screen.
 *
 * Apple requires that any app collecting or handling personal data provide a
 * clearly accessible privacy policy.  Even though GearForge stores data only
 * locally on the device (AsyncStorage / no server), App Store Review expects
 * a privacy policy URL in App Store Connect AND the policy reachable inside
 * the app.
 *
 * This screen is linked from the Profile tab footer and from the onboarding
 * flow so users can review it before granting notification permission.
 *
 * ─── What GearForge collects ───────────────────────────────────────────────
 *  • Nothing sent to servers — all progress data is stored on-device only.
 *  • Notification tokens are handled entirely by Expo / APNs; GearForge never
 *    reads or transmits them.
 *  • No analytics, no advertising identifiers, no third-party SDKs.
 */

import { ScrollView, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";

export default function PrivacyScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      accessibilityLabel="Privacy policy"
    >
      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.updated}>Last updated: January 2025</Text>

      {/* ── Section 1 ───────────────────────────────────────────────────── */}
      <Section title="1. Overview">
        GearForge ("the App") is an offline automotive-education application.
        Your privacy is important to us.  This policy explains what data — if
        any — the App processes and how it is used.
      </Section>

      {/* ── Section 2 ───────────────────────────────────────────────────── */}
      <Section title="2. Data we collect">
        GearForge does NOT collect, transmit, or store any personal data on
        external servers.{"\n\n"}
        All user progress (XP, streaks, completed lessons, badges, username)
        is stored exclusively on your device using Apple's on-device storage
        APIs.  This data never leaves your device and is not shared with anyone.
      </Section>

      {/* ── Section 3 ───────────────────────────────────────────────────── */}
      <Section title="3. Notifications">
        If you grant notification permission, GearForge schedules local
        reminder notifications using Apple Push Notification service (APNs).
        These are local notifications generated on your device — no data is
        sent to GearForge servers.{"\n\n"}
        You may disable notifications at any time from:{"\n"}
        • The GearForge Profile tab → Notifications → Turn Off Reminders{"\n"}
        • Your device Settings → Notifications → GearForge
      </Section>

      {/* ── Section 4 ───────────────────────────────────────────────────── */}
      <Section title="4. Third-party services">
        GearForge uses the following open-source frameworks, none of which
        collect personal data:{"\n\n"}
        • Expo SDK — app runtime (expo.dev){"\n"}
        • React Native — UI framework (reactnative.dev){"\n"}
        • Zustand — local state management{"\n"}
        • AsyncStorage — on-device persistence{"\n\n"}
        None of these services receive your personal data from GearForge.
      </Section>

      {/* ── Section 5 ───────────────────────────────────────────────────── */}
      <Section title="5. Analytics and advertising">
        GearForge contains NO analytics SDKs, NO advertising SDKs, and does NOT
        use advertising identifiers (IDFA/GAID).  No tracking occurs.
      </Section>

      {/* ── Section 6 ───────────────────────────────────────────────────── */}
      <Section title="6. Children's privacy">
        GearForge does not knowingly collect data from children under 13.
        Because we collect no personal data at all, the App is safe for all
        age groups.
      </Section>

      {/* ── Section 7 ───────────────────────────────────────────────────── */}
      <Section title="7. Data deletion">
        To delete all app data, simply uninstall GearForge from your device.
        All locally-stored progress data is removed at uninstall time.
      </Section>

      {/* ── Section 8 ───────────────────────────────────────────────────── */}
      <Section title="8. Changes to this policy">
        We may update this policy as new features are added.  Significant
        changes will be communicated via an in-app notice.  Continued use of
        the App constitutes acceptance of the updated policy.
      </Section>

      {/* ── Section 9 ───────────────────────────────────────────────────── */}
      <Section title="9. Contact">
        Questions about this policy?  Contact us at:{"\n"}
        privacy@gearforge.app
      </Section>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 GearForge. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

// ─── Helper sub-component ─────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.body}>{children}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  heading: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  updated: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: theme.colors.neon,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },
  body: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 21,
  },
  footer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: "center",
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
});
