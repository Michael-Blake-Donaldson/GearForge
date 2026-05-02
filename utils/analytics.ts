import AsyncStorage from "@react-native-async-storage/async-storage";

import { safeWarn } from "@/utils/safeLogger";

type AnalyticsEvent = {
  name: string;
  timestamp: string;
  properties?: Record<string, string | number | boolean | null>;
};

const STORAGE_KEY = "gearforge-analytics-events";
const MAX_EVENTS = 500;

export async function trackEvent(
  name: string,
  properties?: AnalyticsEvent["properties"],
): Promise<void> {
  const nextEvent: AnalyticsEvent = {
    name,
    timestamp: new Date().toISOString(),
    properties,
  };

  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const existing: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    const next = [...existing, nextEvent].slice(-MAX_EVENTS);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    safeWarn("Analytics write failed", {
      storageKey: STORAGE_KEY,
      errorCode: (error as { code?: string })?.code ?? "unknown",
    });
  }
}

export async function getTrackedEvents(): Promise<AnalyticsEvent[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AnalyticsEvent[]) : [];
  } catch (error) {
    safeWarn("Analytics read failed", {
      storageKey: STORAGE_KEY,
      errorCode: (error as { code?: string })?.code ?? "unknown",
    });
    return [];
  }
}
