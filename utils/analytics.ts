import AsyncStorage from "@react-native-async-storage/async-storage";

import { safeWarn } from "@/utils/safeLogger";

type AnalyticsEvent = {
  name: string;
  timestamp: string;
  properties?: Record<string, string | number | boolean | null>;
};

const STORAGE_KEY = "gearforge-analytics-events";
const MAX_EVENTS = 500;
const analyticsMemoryStorage = new Map<string, string>();

const safeAsyncStorageCall = async <T>(
  operation: () => Promise<T>,
  onError: (error: unknown) => T,
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    return onError(error);
  }
};

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
    const raw = await safeAsyncStorageCall(
      () => AsyncStorage.getItem(STORAGE_KEY),
      () => analyticsMemoryStorage.get(STORAGE_KEY) ?? null,
    );
    const existing: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    const next = [...existing, nextEvent].slice(-MAX_EVENTS);
    const payload = JSON.stringify(next);
    await safeAsyncStorageCall(
      () => AsyncStorage.setItem(STORAGE_KEY, payload),
      () => analyticsMemoryStorage.set(STORAGE_KEY, payload),
    );
  } catch (error) {
    safeWarn("Analytics write failed", {
      storageKey: STORAGE_KEY,
      errorCode: (error as { code?: string })?.code ?? "unknown",
    });
  }
}

export async function getTrackedEvents(): Promise<AnalyticsEvent[]> {
  try {
    const raw = await safeAsyncStorageCall(
      () => AsyncStorage.getItem(STORAGE_KEY),
      () => analyticsMemoryStorage.get(STORAGE_KEY) ?? null,
    );
    return raw ? (JSON.parse(raw) as AnalyticsEvent[]) : [];
  } catch (error) {
    safeWarn("Analytics read failed", {
      storageKey: STORAGE_KEY,
      errorCode: (error as { code?: string })?.code ?? "unknown",
    });
    return [];
  }
}
