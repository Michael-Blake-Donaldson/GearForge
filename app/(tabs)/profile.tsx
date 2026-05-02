import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import Badge from "@/components/Badge";
import { theme } from "@/constants/theme";
import { useAuthStore } from "@/store/useAuthStore";
import { useProgressStore, validateUsername } from "@/store/useProgressStore";
import {
    cancelAllNotifications,
    requestPermissions,
    scheduleDailyReminder,
} from "@/utils/notifications";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const username = useProgressStore((state) => state.username);
  const xp = useProgressStore((state) => state.xp);
  const level = useProgressStore((state) => state.level);
  const streak = useProgressStore((state) => state.streak);
  const streakFreezeTokens = useProgressStore((s) => s.streakFreezeTokens);
  const getRank = useProgressStore((state) => state.getRank);
  const badges = useProgressStore((state) => state.badges);
  const setUsername = useProgressStore((state) => state.setUsername);
  const useStreakFreeze = useProgressStore((state) => state.useStreakFreeze);

  // Notification preferences
  const notificationPermission = useProgressStore(
    (s) => s.notificationPermission,
  );
  const notificationHour = useProgressStore((s) => s.notificationHour);
  const setNotificationPermission = useProgressStore(
    (s) => s.setNotificationPermission,
  );
  const setNotificationHour = useProgressStore((s) => s.setNotificationHour);
  const hapticsEnabled = useProgressStore((s) => s.hapticsEnabled);
  const audioCuesEnabled = useProgressStore((s) => s.audioCuesEnabled);
  const setHapticsEnabled = useProgressStore((s) => s.setHapticsEnabled);
  const setAudioCuesEnabled = useProgressStore((s) => s.setAudioCuesEnabled);

  const [draftName, setDraftName] = useState(username);
  // Validation error message shown below the input field
  const [nameError, setNameError] = useState<string | null>(null);
  const [nameSaved, setNameSaved] = useState(false);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isGuest = useAuthStore((s) => s.isGuest);
  const syncNow = useAuthStore((s) => s.syncNow);
  const logout = useAuthStore((s) => s.logout);
  const deleteAccount = useAuthStore((s) => s.deleteAccount);

  const handleSave = () => {
    const error = validateUsername(draftName);
    if (error) {
      setNameError(error);
      setNameSaved(false);
      return;
    }
    setNameError(null);
    setNameSaved(true);
    setUsername(draftName.trim());
    // Clear the "saved" confirmation after 2 seconds
    setTimeout(() => setNameSaved(false), 2000);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile</Text>

      {/* --- Username editor ------------------------------------------------ */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Username</Text>
        <TextInput
          style={[styles.input, nameError ? styles.inputError : null]}
          value={draftName}
          onChangeText={(text) => {
            setDraftName(text);
            // Clear error as soon as the user starts typing again
            if (nameError) setNameError(null);
          }}
          placeholder="Enter username"
          placeholderTextColor={theme.colors.textSecondary}
          maxLength={20}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {/* Show validation error or "saved" confirmation */}
        {nameError ? (
          <Text style={styles.errorText}>{nameError}</Text>
        ) : nameSaved ? (
          <Text style={styles.successText}>Username saved!</Text>
        ) : null}

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Name</Text>
        </Pressable>
      </View>

      {/* --- Stats grid ------------------------------------------------------ */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{xp}</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{streakFreezeTokens}</Text>
            <Text style={styles.statLabel}>Freezes</Text>
          </View>
        </View>
        <Text style={styles.rankLabel}>Rank</Text>
        <Text style={styles.rankValue}>{getRank()}</Text>
      </View>

      {/* --- Streak Freeze card ---------------------------------------------- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🧊 Streak Freeze</Text>
        <Text style={styles.freezeBody}>
          Streak freeze tokens protect your streak when you miss a day. You earn
          one token every 7 consecutive days.
        </Text>
        {/* Token row — shows up to 5 ice-cube icons */}
        <View style={styles.tokenRow}>
          {Array.from({ length: Math.max(streakFreezeTokens, 1) }).map(
            (_, i) => (
              <View
                key={i}
                style={[
                  styles.tokenIcon,
                  i >= streakFreezeTokens && styles.tokenIconEmpty,
                ]}
              >
                <Text style={styles.tokenEmoji}>
                  {i < streakFreezeTokens ? "🧊" : "⬜"}
                </Text>
              </View>
            ),
          )}
        </View>
        <Text style={styles.tokenCount}>
          {streakFreezeTokens} freeze{" "}
          {streakFreezeTokens === 1 ? "token" : "tokens"} available
        </Text>

        {/* Manual-use button — useful if streak is already broken */}
        <Pressable
          style={[
            styles.freezeButton,
            streakFreezeTokens === 0 && styles.freezeButtonDisabled,
          ]}
          onPress={() => {
            if (streakFreezeTokens === 0) return;
            Alert.alert(
              "Use Streak Freeze?",
              "Spend 1 token to protect your current streak. Tokens are spent automatically when you miss a day.",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Use Token",
                  onPress: () => {
                    const used = useStreakFreeze();
                    if (!used)
                      Alert.alert(
                        "No tokens",
                        "You have no freeze tokens left.",
                      );
                  },
                },
              ],
            );
          }}
          disabled={streakFreezeTokens === 0}
        >
          <Text
            style={[
              styles.freezeButtonText,
              streakFreezeTokens === 0 && styles.freezeButtonTextDisabled,
            ]}
          >
            {streakFreezeTokens > 0
              ? "Use a Freeze Token"
              : "No Tokens — Keep Streaking!"}
          </Text>
        </Pressable>
      </View>

      {/* --- Notifications card --------------------------------------------- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🔔 Notifications</Text>

        {/* Permission status row */}
        <View style={styles.notifRow}>
          <Text style={styles.notifLabel}>Daily reminder</Text>
          <Text
            style={[
              styles.notifStatus,
              notificationPermission === "granted"
                ? styles.notifGranted
                : notificationPermission === "denied"
                  ? styles.notifDenied
                  : styles.notifUndecided,
            ]}
          >
            {notificationPermission === "granted"
              ? "On"
              : notificationPermission === "denied"
                ? "Off"
                : "Not set"}
          </Text>
        </View>

        {/* Hour picker — preset buttons for common reminder times */}
        {notificationPermission === "granted" && (
          <View>
            <Text style={styles.notifHourLabel}>
              Reminder time:{" "}
              <Text style={styles.notifHourValue}>
                {notificationHour === 0
                  ? "12:00 AM"
                  : notificationHour < 12
                    ? `${notificationHour}:00 AM`
                    : notificationHour === 12
                      ? "12:00 PM"
                      : `${notificationHour - 12}:00 PM`}
              </Text>
            </Text>
            {/* Quick-select row: common times */}
            <View style={styles.hourRow}>
              {[8, 12, 18, 20, 22].map((h) => (
                <Pressable
                  key={h}
                  style={[
                    styles.hourChip,
                    notificationHour === h && styles.hourChipActive,
                  ]}
                  onPress={async () => {
                    setNotificationHour(h);
                    await scheduleDailyReminder(h, streak);
                  }}
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel={`Set reminder to ${h < 12 ? h + " AM" : h === 12 ? "12 PM" : h - 12 + " PM"}`}
                  accessibilityState={{ selected: notificationHour === h }}
                >
                  <Text
                    style={[
                      styles.hourChipText,
                      notificationHour === h && styles.hourChipTextActive,
                    ]}
                  >
                    {h < 12 ? `${h}AM` : h === 12 ? "12PM" : `${h - 12}PM`}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Enable / disable button */}
        <Pressable
          style={[
            styles.notifButton,
            notificationPermission === "granted" && styles.notifButtonOff,
          ]}
          onPress={async () => {
            if (notificationPermission === "granted") {
              // User wants to turn off — cancel all and update store
              await cancelAllNotifications();
              setNotificationPermission("denied");
            } else {
              // Request or re-request permission
              const result = await requestPermissions();
              setNotificationPermission(result);
              if (result === "granted") {
                await scheduleDailyReminder(notificationHour, streak);
              } else if (result === "denied") {
                Alert.alert(
                  "Permission denied",
                  "You can re-enable notifications from your device Settings → GearForge.",
                );
              }
            }
          }}
          accessible
          accessibilityRole="button"
          accessibilityLabel={
            notificationPermission === "granted"
              ? "Turn off notifications"
              : "Turn on notifications"
          }
        >
          <Text style={styles.notifButtonText}>
            {notificationPermission === "granted"
              ? "Turn Off Reminders"
              : "Enable Reminders"}
          </Text>
        </Pressable>
      </View>

      {/* --- Account and Cloud Sync ---------------------------------------- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>☁️ Account & Sync</Text>
        <Text style={styles.freezeBody}>
          {isGuest
            ? "You are in guest mode. Create an account to back up and sync progress across devices."
            : isAuthenticated
              ? "Your account can sync progress to cloud storage."
              : "Sign in to enable cloud sync."}
        </Text>

        {isGuest && (
          <Pressable
            style={styles.notifButton}
            onPress={() => router.push("/auth/signup" as never)}
          >
            <Text style={styles.notifButtonText}>Create Account</Text>
          </Pressable>
        )}

        {isAuthenticated && (
          <>
            <Pressable
              style={styles.notifButton}
              onPress={async () => {
                const ok = await syncNow();
                Alert.alert(
                  ok ? "Synced" : "Sync failed",
                  ok
                    ? "Progress synced to cloud successfully."
                    : "Could not sync right now. Please try again.",
                );
              }}
            >
              <Text style={styles.notifButtonText}>Sync Now</Text>
            </Pressable>

            <Pressable
              style={[styles.notifButton, styles.notifButtonOff]}
              onPress={() => {
                Alert.alert(
                  "Sign Out",
                  "Do you want to sign out of this account?",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Sign Out",
                      style: "destructive",
                      onPress: () => logout(),
                    },
                  ],
                );
              }}
            >
              <Text style={styles.notifButtonText}>Sign Out</Text>
            </Pressable>

            <Pressable
              style={[styles.notifButton, styles.deleteButton]}
              onPress={() => {
                Alert.alert(
                  "Delete Account",
                  "This permanently removes your account and cloud data. This action cannot be undone.",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: async () => {
                        const ok = await deleteAccount();
                        if (!ok) {
                          Alert.alert(
                            "Unable to delete account",
                            "Please sign in again and retry.",
                          );
                        }
                      },
                    },
                  ],
                );
              }}
            >
              <Text style={styles.notifButtonText}>Delete Account</Text>
            </Pressable>
          </>
        )}
      </View>

      {/* --- Feedback Settings --------------------------------------------- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🎛️ Feedback Settings</Text>
        <Text style={styles.freezeBody}>
          Configure tactile and audio response during quizzes and completion
          events.
        </Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Haptic feedback</Text>
          <Pressable
            style={[styles.toggleChip, hapticsEnabled && styles.toggleChipOn]}
            onPress={() => setHapticsEnabled(!hapticsEnabled)}
          >
            <Text style={styles.toggleText}>
              {hapticsEnabled ? "On" : "Off"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Audio cues</Text>
          <Pressable
            style={[styles.toggleChip, audioCuesEnabled && styles.toggleChipOn]}
            onPress={() => setAudioCuesEnabled(!audioCuesEnabled)}
          >
            <Text style={styles.toggleText}>
              {audioCuesEnabled ? "On" : "Off"}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* --- Achievement badges --------------------------------------------- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Achievements ({badges.length})</Text>{" "}
        <View style={styles.badgesWrap}>
          {badges.length === 0 ? (
            <Text style={styles.empty}>
              Complete lessons to unlock achievements.
            </Text>
          ) : (
            badges.map((badge) => <Badge key={badge} label={badge} />)
          )}
        </View>
      </View>

      {/* --- App info / privacy footer --------------------------------------- */}
      <View style={styles.appFooter}>
        <Text style={styles.appVersion}>GearForge v1.0.0</Text>
        <Pressable
          onPress={() => router.push("/privacy")}
          accessible
          accessibilityRole="link"
          accessibilityLabel="View Privacy Policy"
        >
          <Text style={styles.privacyLink}>Privacy Policy</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/terms" as never)}
          accessible
          accessibilityRole="link"
          accessibilityLabel="View Terms of Use"
        >
          <Text style={styles.privacyLink}>Terms of Use</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
    gap: 12,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
  },
  card: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 14,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    color: theme.colors.textPrimary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 4,
  },
  inputError: {
    borderColor: "#ff5c5c",
  },
  errorText: {
    color: "#ff5c5c",
    fontSize: 12,
    marginTop: 4,
  },
  successText: {
    color: theme.colors.neon,
    fontSize: 12,
    marginTop: 4,
  },
  saveButton: {
    marginTop: 10,
    borderRadius: theme.radii.md,
    alignItems: "center",
    backgroundColor: theme.colors.neon,
    paddingVertical: 10,
  },
  saveText: {
    color: "#07191b",
    fontWeight: "800",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    color: theme.colors.neon,
    fontSize: 22,
    fontWeight: "800",
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  rankLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
  rankValue: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  badgesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  empty: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  freezeBody: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  tokenRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  tokenIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  tokenIconEmpty: {
    opacity: 0.35,
  },
  tokenEmoji: {
    fontSize: 20,
  },
  tokenCount: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: 12,
  },
  freezeButton: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.neonAlt,
    backgroundColor: theme.colors.neonAlt + "22",
    paddingVertical: 10,
    alignItems: "center",
  },
  freezeButtonDisabled: {
    borderColor: theme.colors.border,
    backgroundColor: "transparent",
  },
  freezeButtonText: {
    color: theme.colors.neonAlt,
    fontWeight: "700",
    fontSize: 14,
  },
  freezeButtonTextDisabled: {
    color: theme.colors.textSecondary,
  },
  // Notification card
  notifRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  notifLabel: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  notifStatus: {
    fontSize: 13,
    fontWeight: "700",
  },
  notifGranted: { color: theme.colors.success },
  notifDenied: { color: theme.colors.danger },
  notifUndecided: { color: theme.colors.warning },
  notifHourLabel: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginBottom: 8,
  },
  notifHourValue: {
    color: theme.colors.neon,
    fontWeight: "700",
  },
  hourRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  hourChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
  },
  hourChipActive: {
    borderColor: theme.colors.neon,
    backgroundColor: theme.colors.neon + "22",
  },
  hourChipText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  hourChipTextActive: {
    color: theme.colors.neon,
  },
  notifButton: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.neon,
    backgroundColor: theme.colors.neon + "22",
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 4,
  },
  notifButtonOff: {
    borderColor: theme.colors.danger,
    backgroundColor: theme.colors.danger + "18",
  },
  notifButtonText: {
    color: theme.colors.neon,
    fontWeight: "700",
    fontSize: 14,
  },
  // App footer
  appFooter: {
    alignItems: "center",
    paddingTop: 8,
    gap: 6,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 10,
    marginTop: 10,
  },
  settingLabel: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  toggleChip: {
    minWidth: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  toggleChipOn: {
    borderColor: theme.colors.neon,
    backgroundColor: theme.colors.neon + "22",
  },
  toggleText: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: "800",
  },
  deleteButton: {
    backgroundColor: theme.colors.danger,
    borderColor: theme.colors.danger,
  },
  appVersion: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  privacyLink: {
    color: theme.colors.neonAlt,
    fontSize: 12,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
