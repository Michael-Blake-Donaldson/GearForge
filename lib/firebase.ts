import Constants from "expo-constants";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { safeWarn } from "@/utils/safeLogger";

type FirebaseExtraConfig = {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as {
  firebase?: FirebaseExtraConfig;
};

const env = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const firebaseConfig = {
  apiKey: env.apiKey ?? extra.firebase?.apiKey ?? "YOUR_FIREBASE_API_KEY",
  authDomain:
    env.authDomain ??
    extra.firebase?.authDomain ??
    "YOUR_PROJECT.firebaseapp.com",
  projectId:
    env.projectId ?? extra.firebase?.projectId ?? "YOUR_FIREBASE_PROJECT_ID",
  storageBucket:
    env.storageBucket ??
    extra.firebase?.storageBucket ??
    "YOUR_PROJECT.appspot.com",
  messagingSenderId:
    env.messagingSenderId ??
    extra.firebase?.messagingSenderId ??
    "YOUR_MESSAGING_SENDER_ID",
  appId: env.appId ?? extra.firebase?.appId ?? "YOUR_FIREBASE_APP_ID",
};

const hasPlaceholders = Object.values(firebaseConfig).some((value) =>
  String(value).startsWith("YOUR_"),
);

if (!__DEV__ && hasPlaceholders) {
  throw new Error("Firebase is not configured for production build.");
}

if (__DEV__ && hasPlaceholders) {
  safeWarn("Firebase placeholders detected in development config", {
    hasPlaceholders,
  });
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const firestore = getFirestore(app);

export const hasFirebasePlaceholders = (): boolean => {
  return hasPlaceholders;
};
