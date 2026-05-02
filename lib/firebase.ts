import Constants from "expo-constants";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

const firebaseConfig = {
  apiKey: extra.firebase?.apiKey ?? "YOUR_FIREBASE_API_KEY",
  authDomain: extra.firebase?.authDomain ?? "YOUR_PROJECT.firebaseapp.com",
  projectId: extra.firebase?.projectId ?? "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: extra.firebase?.storageBucket ?? "YOUR_PROJECT.appspot.com",
  messagingSenderId:
    extra.firebase?.messagingSenderId ?? "YOUR_MESSAGING_SENDER_ID",
  appId: extra.firebase?.appId ?? "YOUR_FIREBASE_APP_ID",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const firestore = getFirestore(app);

export const hasFirebasePlaceholders = (): boolean => {
  return Object.values(firebaseConfig).some((value) =>
    String(value).startsWith("YOUR_"),
  );
};
