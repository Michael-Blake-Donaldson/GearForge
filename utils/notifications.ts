/**
 * utils/notifications.ts
 *
 * Centralised helpers for expo-notifications.
 *
 * All notification logic lives here so that app code (layout, profile screen)
 * never imports expo-notifications directly — easy to swap or mock later.
 *
 * Notification IDs
 * ─────────────────
 * DAILY_REMINDER_ID  — the one repeating daily streak reminder
 * STREAK_AT_RISK_ID  — fired when the user hasn't studied by 1 hour before
 *                       their chosen reminder time (one-shot, rescheduled each day)
 *
 * iOS note: scheduling local notifications requires the "notifee" permission.
 * Android handles this automatically from API 33+; on older versions it is
 * always granted.  The `requestPermissions()` helper handles both platforms.
 */

import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// ─── Constants ───────────────────────────────────────────────────────────────

const DAILY_REMINDER_ID = "gearforge-daily-reminder";
const STREAK_AT_RISK_ID = "gearforge-streak-at-risk";

// ─── Notification handler (call once at app start) ───────────────────────────

/**
 * Configure how notifications behave when the app is in the foreground.
 * We show a banner, play a sound, and badge the icon.
 *
 * Call this at the top of the module so it executes immediately when imported.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// ─── Permission helper ────────────────────────────────────────────────────────

/**
 * Ask the OS for notification permission.
 *
 * Returns the final status string: "granted" | "denied" | "undetermined".
 * Maps `undetermined` to "undecided" so it matches the store's type.
 */
export async function requestPermissions(): Promise<
  "granted" | "denied" | "undecided"
> {
  // On iOS we must explicitly request; Android 13+ also needs a runtime prompt.
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
    finalStatus = status;
  }

  if (finalStatus === "granted") return "granted";
  if (finalStatus === "denied") return "denied";
  return "undecided";
}

// ─── Scheduling helpers ───────────────────────────────────────────────────────

/**
 * Schedule (or reschedule) a repeating daily reminder.
 *
 * The notification fires every day at `hour:00` local time.  Any previously
 * scheduled notification with DAILY_REMINDER_ID is cancelled first so we
 * never end up with duplicate reminders when the user changes their hour.
 *
 * @param hour   Hour in 24-hour local time (0–23).  Default: 20 (8 PM).
 * @param streak Current streak count to include in the body copy.
 */
export async function scheduleDailyReminder(
  hour: number = 20,
  streak: number = 0,
): Promise<void> {
  // Cancel any existing daily reminder before creating a fresh one.
  await cancelNotification(DAILY_REMINDER_ID);

  const streakText =
    streak > 0
      ? `🔥 Keep your ${streak}-day streak alive!`
      : "Start your streak today!";

  await Notifications.scheduleNotificationAsync({
    identifier: DAILY_REMINDER_ID,
    content: {
      title: "GearForge Daily Reminder 🏎️",
      body: `${streakText} Your next lesson is waiting.`,
      sound: true,
      // Badge count will be handled by the OS; we don't manage it manually.
    },
    trigger: {
      // Repeat every day at the chosen hour (minute 0, second 0).
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      repeats: true,
      hour,
      minute: 0,
    },
  });
}

/**
 * Schedule a one-shot "streak at risk" alert for 1 hour before the
 * user's daily reminder if they haven't completed a lesson that day.
 *
 * This should be called each time the app goes into the background (or at
 * login) and cancelled when the user completes a lesson (`cancelStreakAlert`).
 *
 * @param reminderHour  The user's preferred reminder hour (24-h).
 * @param streak        Current streak count.
 */
export async function scheduleStreakAtRiskAlert(
  reminderHour: number = 20,
  streak: number = 0,
): Promise<void> {
  // Cancel any existing streak alert first.
  await cancelNotification(STREAK_AT_RISK_ID);

  // Fire 1 hour before the daily reminder; clamp to 0 if reminder is at midnight.
  const alertHour = Math.max(0, reminderHour - 1);

  await Notifications.scheduleNotificationAsync({
    identifier: STREAK_AT_RISK_ID,
    content: {
      title: "Don't break your streak! ⚠️",
      body:
        streak > 0
          ? `Your ${streak}-day streak is at risk. Complete a quick lesson now.`
          : "One lesson a day keeps the rust away. Come back and learn!",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      repeats: false, // One-shot; rescheduled next day via AppState logic
      hour: alertHour,
      minute: 0,
    },
  });
}

/**
 * Cancel the daily reminder (e.g., when the user revokes permission).
 */
export async function cancelDailyReminder(): Promise<void> {
  await cancelNotification(DAILY_REMINDER_ID);
}

/**
 * Cancel the streak-at-risk alert (call after completing a lesson for the day).
 */
export async function cancelStreakAlert(): Promise<void> {
  await cancelNotification(STREAK_AT_RISK_ID);
}

/**
 * Cancel ALL scheduled GearForge notifications and clear the badge.
 */
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (Platform.OS === "ios") {
    await Notifications.setBadgeCountAsync(0);
  }
}

// ─── Internal utility ─────────────────────────────────────────────────────────

/** Cancel a single notification by identifier, silently ignoring errors. */
async function cancelNotification(id: string): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch {
    // Notification may not exist yet — that is fine.
  }
}
