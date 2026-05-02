import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { theme } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { feedback } from "@/utils/feedback";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Return a motivational headline based on quiz accuracy. */
function getHeadline(accuracy: number): string {
  if (accuracy === 1) return "Perfect Score! 🎉";
  if (accuracy >= 0.8) return "Great Work! 🏆";
  if (accuracy >= 0.5) return "Good Effort! 💪";
  return "Keep Practicing! 🔧";
}

/** Return a short descriptive sub-message. */
function getMessage(accuracy: number): string {
  if (accuracy === 1)
    return "You answered every question correctly. Impressive!";
  if (accuracy >= 0.8) return "You're getting the hang of it. Keep building!";
  if (accuracy >= 0.5) return "Review the weak areas and retry when ready.";
  return "Don't worry — every expert started somewhere.";
}

// ── Screen ───────────────────────────────────────────────────────────────────

export default function LessonCompleteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    xp: string;
    correct: string;
    total: string;
    lessonId: string;
  }>();

  // Parse query params — all come through as strings
  const xp = parseInt(params.xp ?? "0", 10);
  const correct = parseInt(params.correct ?? "0", 10);
  const total = parseInt(params.total ?? "3", 10);
  const lessonId = Array.isArray(params.lessonId)
    ? params.lessonId[0]
    : params.lessonId;

  const accuracy = total > 0 ? correct / total : 0;

  // Look up next lesson in the same unit so we can offer a "Next Lesson" button
  const currentLesson = lessons.find((l) => l.id === lessonId);
  const nextLesson = lessons.find(
    (l) =>
      l.unitId === currentLesson?.unitId &&
      l.order === (currentLesson?.order ?? 0) + 1,
  );

  // ── Entrance animations ─────────────────────────────────────────────────
  // Trophy icon scale-bounces in; XP pill fades up; stat row slides up.
  const iconScale = useRef(new Animated.Value(0)).current;
  const xpOpacity = useRef(new Animated.Value(0)).current;
  const statsTranslate = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Icon pops in with overshoot
      Animated.spring(iconScale, {
        toValue: 1,
        friction: 4,
        tension: 120,
        useNativeDriver: true,
      }),
      // 2. XP pill fades in
      Animated.timing(xpOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // 3. Stats row slides up
      Animated.timing(statsTranslate, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    // Completion cue supports both haptics and spoken audio (user-toggleable).
    feedback.levelUp();
  }, []);

  return (
    <View style={styles.screen}>
      {/* Trophy icon */}
      <Animated.View
        style={[styles.iconWrap, { transform: [{ scale: iconScale }] }]}
      >
        <MaterialCommunityIcons
          name="trophy"
          size={72}
          color={theme.colors.neon}
        />
      </Animated.View>

      <Text style={styles.headline}>{getHeadline(accuracy)}</Text>
      <Text style={styles.message}>{getMessage(accuracy)}</Text>

      {/* XP earned badge */}
      <Animated.View style={[styles.xpPill, { opacity: xpOpacity }]}>
        <Text style={styles.xpText}>+{xp} XP earned</Text>
      </Animated.View>

      {/* Quiz result stats */}
      <Animated.View
        style={[
          styles.statsRow,
          { transform: [{ translateY: statsTranslate }] },
        ]}
      >
        <StatBox label="Correct" value={`${correct}/${total}`} />
        <StatBox label="Accuracy" value={`${Math.round(accuracy * 100)}%`} />
        <StatBox label="XP" value={`+${xp}`} />
      </Animated.View>

      {/* Action buttons */}
      <View style={styles.buttonStack}>
        {nextLesson && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace(`/lesson/${nextLesson.id}`)}
            activeOpacity={0.7}
          >
            <Text style={styles.primaryButtonText}>Next Lesson →</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace("/(tabs)/learn")}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>Back to Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ghostButton}
          onPress={() => router.replace("/(tabs)/progress")}
          activeOpacity={0.7}
        >
          <Text style={styles.ghostButtonText}>View Progress</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── StatBox sub-component ──────────────────────────────────────────────────

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.neon + "55",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  headline: {
    color: theme.colors.textPrimary,
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  xpPill: {
    backgroundColor: theme.colors.neon + "22",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.neon,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 28,
  },
  xpText: {
    color: theme.colors.neon,
    fontWeight: "800",
    fontSize: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 36,
  },
  statBox: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    alignItems: "center",
  },
  statValue: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: "800",
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  buttonStack: {
    alignSelf: "stretch",
    gap: 10,
  },
  primaryButton: {
    backgroundColor: theme.colors.neon,
    borderRadius: theme.radii.md,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  ghostButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  ghostButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
});
