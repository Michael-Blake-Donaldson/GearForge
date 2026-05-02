import { pullMergeAndPushProgress, uploadProgressToCloud } from "@/utils/progressSync";

export async function syncAfterAuthenticatedLogin(uid: string) {
  await pullMergeAndPushProgress(uid);
}

export async function upgradeGuestProgressToAccount(uid: string) {
  await uploadProgressToCloud(uid);
}
