import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    GoogleAuthProvider,
    OAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithCredential,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { auth } from "@/lib/firebase";
import { useProgressStore } from "@/store/useProgressStore";
import { AuthUser } from "@/types/Auth";
import { mapAuthError } from "@/utils/authErrors";
import {
    syncAfterAuthenticatedLogin,
    upgradeGuestProgressToAccount,
} from "@/utils/authSync";
import { deleteAllCloudUserData } from "@/utils/progressSync";
import { safeWarn } from "@/utils/safeLogger";
import { clearTokens, storeTokens } from "@/utils/secureTokens";

type AuthState = {
  status: "loading" | "guest" | "authenticated" | "signedOut";
  user: AuthUser | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  loading: boolean;
  error: string | null;
  authError: string | null;
  setUser: (user: User | null) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<boolean>;
  signupWithEmail: (email: string, password: string) => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  loginWithGoogleIdToken: (idToken: string) => Promise<boolean>;
  loginWithAppleIdentityToken: (identityToken: string) => Promise<boolean>;
  reauthenticateForSensitiveAction: (
    email: string,
    password: string,
  ) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  deleteAccountWithReauth: (
    email: string,
    password: string,
  ) => Promise<boolean>;
  syncNow: () => Promise<boolean>;
  continueAsGuest: () => void;
  clearError: () => void;
  initializeAuthListener: () => () => void;
};

const toAuthUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  providerId: user.providerData[0]?.providerId ?? "password",
});

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));

const isValidPassword = (password: string) => password.length >= 6;

const authMemoryStorage = new Map<string, string>();

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

const safeAuthStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return safeAsyncStorageCall(
      () => AsyncStorage.getItem(name),
      (error) => {
        const fallback = authMemoryStorage.get(name) ?? null;
      safeWarn("Auth storage read error", {
        storageKey: name,
        errorCode: (error as { code?: string })?.code ?? "unknown",
          fallbackMode: true,
      });
        return fallback;
      },
    );
  },
  setItem: async (name: string, value: string): Promise<void> => {
    return safeAsyncStorageCall(
      () => AsyncStorage.setItem(name, value),
      (error) => {
        authMemoryStorage.set(name, value);
      safeWarn("Auth storage write error", {
        storageKey: name,
        errorCode: (error as { code?: string })?.code ?? "unknown",
          fallbackMode: true,
      });
      },
    );
  },
  removeItem: async (name: string): Promise<void> => {
    return safeAsyncStorageCall(
      () => AsyncStorage.removeItem(name),
      (error) => {
        authMemoryStorage.delete(name);
      safeWarn("Auth storage remove error", {
        storageKey: name,
        errorCode: (error as { code?: string })?.code ?? "unknown",
          fallbackMode: true,
      });
      },
    );
  },
};

async function clearUserLocalState() {
  try {
    await clearTokens();
    await Promise.all([
      safeAuthStorage.removeItem("gearforge-analytics-events"),
      safeAuthStorage.removeItem("gearforge-progress-v2"),
      safeAuthStorage.removeItem("gearforge-auth-v1"),
    ]);
    useProgressStore.getState().resetProgress();
    await useProgressStore.persist.clearStorage();
  } catch (error) {
    safeWarn("Local auth cleanup failed", {
      errorCode: (error as { code?: string })?.code ?? "unknown",
    });
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      status: "loading",
      user: null,
      isAuthenticated: false,
      isGuest: false,
      loading: true,
      error: null,
      authError: null,

      setUser: async (firebaseUser: User | null) => {
        if (!firebaseUser) {
          await clearTokens();
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            status: "signedOut",
            authError: null,
          });
          return;
        }

        const accessToken = await firebaseUser.getIdToken();
        const refreshToken =
          (
            firebaseUser as unknown as {
              stsTokenManager?: { refreshToken?: string };
            }
          ).stsTokenManager?.refreshToken ?? "";

        if (refreshToken) {
          await storeTokens(accessToken, refreshToken);
        }

        const wasGuest = get().isGuest;

        set({
          user: toAuthUser(firebaseUser),
          isAuthenticated: true,
          isGuest: false,
          status: "authenticated",
          loading: false,
          error: null,
          authError: null,
        });

        if (wasGuest) {
          await upgradeGuestProgressToAccount(firebaseUser.uid);
          set({ isGuest: false });
        }

        await syncAfterAuthenticatedLogin(firebaseUser.uid);
      },

      signup: async (email: string, password: string) => {
        if (!isValidEmail(email)) {
          set({
            error: "Enter a valid email address.",
            authError: "Enter a valid email address.",
          });
          return false;
        }
        if (!isValidPassword(password)) {
          set({
            error: "Password must be at least 6 characters.",
            authError: "Password must be at least 6 characters.",
          });
          return false;
        }
        set({ loading: true, error: null });
        try {
          const credential = await createUserWithEmailAndPassword(
            auth,
            normalizeEmail(email),
            password,
          );
          await get().setUser(credential.user);
          return true;
        } catch (error) {
          const mapped = mapAuthError(error);
          set({
            error: mapped,
            authError: mapped,
            loading: false,
            status: "signedOut",
          });
          return false;
        }
      },

      login: async (email: string, password: string) => {
        if (!isValidEmail(email)) {
          set({
            error: "Enter a valid email address.",
            authError: "Enter a valid email address.",
          });
          return false;
        }
        if (!isValidPassword(password)) {
          set({
            error: "The email or password does not match.",
            authError: "The email or password does not match.",
          });
          return false;
        }
        set({ loading: true, error: null });
        try {
          const credential = await signInWithEmailAndPassword(
            auth,
            normalizeEmail(email),
            password,
          );
          await get().setUser(credential.user);
          return true;
        } catch (error) {
          const mapped = mapAuthError(error);
          set({
            error: mapped,
            authError: mapped,
            loading: false,
            status: "signedOut",
          });
          return false;
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await signOut(auth);
        } finally {
          await clearUserLocalState();
          set({
            user: null,
            isAuthenticated: false,
            isGuest: false,
            status: "signedOut",
            loading: false,
            error: null,
            authError: null,
          });
        }
      },

      resetPassword: async (email: string) => {
        if (!isValidEmail(email)) {
          set({
            error: "Enter a valid email address.",
            authError: "Enter a valid email address.",
          });
          return false;
        }
        set({ loading: true, error: null });
        try {
          await sendPasswordResetEmail(auth, normalizeEmail(email));
          set({ loading: false });
          return true;
        } catch (error) {
          const mapped = mapAuthError(error);
          set({ loading: false, error: mapped, authError: mapped });
          return false;
        }
      },

      loginWithGoogleIdToken: async (idToken: string) => {
        set({ loading: true, error: null });
        try {
          const credential = GoogleAuthProvider.credential(idToken);
          const result = await signInWithCredential(auth, credential);
          await get().setUser(result.user);
          return true;
        } catch (error) {
          const mapped = mapAuthError(error);
          set({ loading: false, error: mapped, authError: mapped });
          return false;
        }
      },

      loginWithAppleIdentityToken: async (identityToken: string) => {
        set({ loading: true, error: null });
        try {
          const provider = new OAuthProvider("apple.com");
          const credential = provider.credential({ idToken: identityToken });
          const result = await signInWithCredential(auth, credential);
          await get().setUser(result.user);
          return true;
        } catch (error) {
          const mapped = mapAuthError(error);
          set({ loading: false, error: mapped, authError: mapped });
          return false;
        }
      },

      reauthenticateForSensitiveAction: async (
        email: string,
        password: string,
      ) => {
        const current = auth.currentUser;
        if (!current) {
          set({
            error: "You are not signed in.",
            authError: "You are not signed in.",
          });
          return false;
        }

        try {
          const credential = EmailAuthProvider.credential(
            normalizeEmail(email),
            password,
          );
          await reauthenticateWithCredential(current, credential);
          set({ error: null, authError: null });
          return true;
        } catch (error) {
          const mapped = mapAuthError(error);
          set({ error: mapped, authError: mapped });
          return false;
        }
      },

      deleteAccount: async () => {
        const current = auth.currentUser;
        if (!current) {
          set({ error: "You are not signed in." });
          return false;
        }

        set({ loading: true, error: null });
        try {
          await deleteAllCloudUserData(current.uid);
          await deleteUser(current);
          await clearUserLocalState();
          set({
            user: null,
            isAuthenticated: false,
            isGuest: false,
            status: "signedOut",
            loading: false,
            authError: null,
          });
          return true;
        } catch (error) {
          const mapped = mapAuthError(error);
          set({ loading: false, error: mapped, authError: mapped });
          return false;
        }
      },

      deleteAccountWithReauth: async (email: string, password: string) => {
        const ok = await get().reauthenticateForSensitiveAction(
          email,
          password,
        );
        if (!ok) return false;
        return get().deleteAccount();
      },

      syncNow: async () => {
        const current = auth.currentUser;
        if (!current) return false;

        set({ loading: true, error: null });
        try {
          await syncAfterAuthenticatedLogin(current.uid);
          set({ loading: false });
          return true;
        } catch (error) {
          const mapped = mapAuthError(error);
          set({ loading: false, error: mapped, authError: mapped });
          return false;
        }
      },

      continueAsGuest: () => {
        set({
          isGuest: true,
          isAuthenticated: false,
          loading: false,
          status: "guest",
          error: null,
          authError: null,
        });
      },

      clearError: () => set({ error: null, authError: null }),

      loginWithEmail: async (email: string, password: string) =>
        get().login(email, password),

      signupWithEmail: async (email: string, password: string) =>
        get().signup(email, password),

      sendPasswordReset: async (email: string) => get().resetPassword(email),

      initializeAuthListener: () => {
        set({ loading: true, status: "loading" });
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          await get().setUser(firebaseUser);
        });
        return unsubscribe;
      },
    }),
    {
      name: "gearforge-auth-v1",
      storage: createJSONStorage(() => safeAuthStorage),
      partialize: (state) => ({ isGuest: state.isGuest }),
    },
  ),
);
