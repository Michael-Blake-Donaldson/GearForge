import {
    deleteDoc,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

import { firestore } from "@/lib/firebase";
import { useProgressStore } from "@/store/useProgressStore";
import { UserProgress } from "@/types/UserProgress";

type CloudProgressShape = Partial<UserProgress> & {
  completedLessons?: string[];
  completedUnits?: string[];
  unlockedUnitIds?: string[];
  badges?: string[];
};

const latestDate = (a: string | null, b: string | null): string | null => {
  if (!a) return b;
  if (!b) return a;
  return new Date(a).getTime() >= new Date(b).getTime() ? a : b;
};

const unique = (values: string[] = []): string[] => [...new Set(values)];

export function mergeProgress(
  local: UserProgress,
  cloud: CloudProgressShape | null,
): UserProgress {
  if (!cloud) return local;

  return {
    ...local,
    username: cloud.username ?? local.username,
    xp: Math.max(local.xp, cloud.xp ?? 0),
    level: Math.max(local.level, cloud.level ?? 1),
    streak: Math.max(local.streak, cloud.streak ?? 0),
    streakFreezeTokens: Math.max(
      local.streakFreezeTokens,
      cloud.streakFreezeTokens ?? 0,
    ),
    lastLessonDate: latestDate(
      local.lastLessonDate,
      cloud.lastLessonDate ?? null,
    ),
    completedLessons: unique([
      ...local.completedLessons,
      ...(cloud.completedLessons ?? []),
    ]),
    completedUnits: unique([
      ...local.completedUnits,
      ...(cloud.completedUnits ?? []),
    ]),
    unlockedUnitIds: unique([
      ...local.unlockedUnitIds,
      ...(cloud.unlockedUnitIds ?? []),
    ]),
    quizHistory: [...local.quizHistory, ...(cloud.quizHistory ?? [])]
      .sort(
        (a, b) =>
          new Date(a.answeredAt).getTime() - new Date(b.answeredAt).getTime(),
      )
      .filter(
        (value, index, arr) =>
          index ===
          arr.findIndex(
            (item) =>
              item.quizId === value.quizId &&
              item.lessonId === value.lessonId &&
              item.answeredAt === value.answeredAt,
          ),
      ),
    incorrectQuestionIds: unique([
      ...local.incorrectQuestionIds,
      ...(cloud.incorrectQuestionIds ?? []),
    ]),
    badges: unique([...local.badges, ...(cloud.badges ?? [])]),
    preferredRegionId: cloud.preferredRegionId ?? local.preferredRegionId,
    notificationPermission:
      cloud.notificationPermission ?? local.notificationPermission,
    notificationHour: cloud.notificationHour ?? local.notificationHour,
    hasTakenMechanicTest:
      cloud.hasTakenMechanicTest ?? local.hasTakenMechanicTest,
    mechanicPlacementTier:
      cloud.mechanicPlacementTier ?? local.mechanicPlacementTier,
    hapticsEnabled: cloud.hapticsEnabled ?? local.hapticsEnabled,
    audioCuesEnabled: cloud.audioCuesEnabled ?? local.audioCuesEnabled,
  };
}

export async function uploadProgressToCloud(uid: string): Promise<void> {
  const state = useProgressStore.getState();

  await Promise.all([
    setDoc(
      doc(firestore, "users", uid),
      {
        uid,
        username: state.username,
        preferredRegionId: state.preferredRegionId,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    ),
    setDoc(
      doc(firestore, "progress", uid),
      {
        xp: state.xp,
        level: state.level,
        streak: state.streak,
        streakFreezeTokens: state.streakFreezeTokens,
        lastLessonDate: state.lastLessonDate,
        hasTakenMechanicTest: state.hasTakenMechanicTest,
        mechanicPlacementTier: state.mechanicPlacementTier,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    ),
    setDoc(
      doc(firestore, "lessons", uid),
      {
        completedLessons: state.completedLessons,
        completedUnits: state.completedUnits,
        unlockedUnitIds: state.unlockedUnitIds,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    ),
    setDoc(
      doc(firestore, "quizHistory", uid),
      {
        quizHistory: state.quizHistory,
        incorrectQuestionIds: state.incorrectQuestionIds,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    ),
    setDoc(
      doc(firestore, "badges", uid),
      {
        badges: state.badges,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    ),
    setDoc(
      doc(firestore, "settings", uid),
      {
        notificationPermission: state.notificationPermission,
        notificationHour: state.notificationHour,
        hapticsEnabled: state.hapticsEnabled,
        audioCuesEnabled: state.audioCuesEnabled,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    ),
  ]);
}

export async function fetchCloudProgress(
  uid: string,
): Promise<CloudProgressShape | null> {
  const [
    usersSnap,
    progressSnap,
    lessonsSnap,
    quizSnap,
    badgesSnap,
    settingsSnap,
  ] = await Promise.all([
    getDoc(doc(firestore, "users", uid)),
    getDoc(doc(firestore, "progress", uid)),
    getDoc(doc(firestore, "lessons", uid)),
    getDoc(doc(firestore, "quizHistory", uid)),
    getDoc(doc(firestore, "badges", uid)),
    getDoc(doc(firestore, "settings", uid)),
  ]);

  if (
    !usersSnap.exists() &&
    !progressSnap.exists() &&
    !lessonsSnap.exists() &&
    !quizSnap.exists() &&
    !badgesSnap.exists() &&
    !settingsSnap.exists()
  ) {
    return null;
  }

  return {
    ...(usersSnap.data() ?? {}),
    ...(progressSnap.data() ?? {}),
    ...(lessonsSnap.data() ?? {}),
    ...(quizSnap.data() ?? {}),
    ...(badgesSnap.data() ?? {}),
    ...(settingsSnap.data() ?? {}),
  } as CloudProgressShape;
}

export async function pullMergeAndPushProgress(uid: string): Promise<void> {
  const local = useProgressStore.getState();
  const cloud = await fetchCloudProgress(uid);
  const merged = mergeProgress(local, cloud);

  useProgressStore.setState(merged);
  await uploadProgressToCloud(uid);
}

export async function deleteAllCloudUserData(uid: string): Promise<void> {
  await Promise.all([
    deleteDoc(doc(firestore, "users", uid)),
    deleteDoc(doc(firestore, "progress", uid)),
    deleteDoc(doc(firestore, "lessons", uid)),
    deleteDoc(doc(firestore, "quizHistory", uid)),
    deleteDoc(doc(firestore, "badges", uid)),
    deleteDoc(doc(firestore, "settings", uid)),
  ]);
}
