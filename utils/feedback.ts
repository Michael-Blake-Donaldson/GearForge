import * as Haptics from "expo-haptics";
import * as Speech from "expo-speech";

import { useProgressStore } from "@/store/useProgressStore";

const speak = (text: string) => {
  const { audioCuesEnabled } = useProgressStore.getState();
  if (!audioCuesEnabled) return;

  Speech.speak(text, {
    rate: 1.0,
    pitch: 1.0,
    language: "en-US",
  });
};

const canHaptic = () => useProgressStore.getState().hapticsEnabled;

export const feedback = {
  selection: async () => {
    if (!canHaptic()) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },
  correct: async () => {
    if (canHaptic()) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    speak("Correct");
  },
  incorrect: async () => {
    if (canHaptic()) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    speak("Incorrect");
  },
  levelUp: async () => {
    if (canHaptic()) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    speak("Level up");
  },
};
