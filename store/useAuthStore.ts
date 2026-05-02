import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    GoogleAuthProvider,
    OAuthProvider, onAuthStateChanged, sendPasswordResetEmail,
    signInWithCredential,
    signInWithEmailAndPassword, signOut, User
} from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { auth } from "@/lib/firebase";
import { AuthUser } from "@/types/Auth";
import { mapAuthError } from "@/utils/authErrors";
import {
    syncAfterAuthenticatedLogin,
    upgradeGuestProgressToAccount,
} from "@/utils/authSync";
import { deleteAllCloudUserData } from "@/utils/progressSync";
import { clearTokens, storeTokens } from "@/utils/secureTokens";

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => Promise<void>;
  signup: (email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  loginWithGoogleIdToken: (idToken: string) => Promise<boolean>;
  loginWithAppleIdentityToken: (identityToken: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isGuest: false,
      loading: true,
      error: null,

      setUser: async (firebaseUser: User | null) => {
        if (!firebaseUser) {
          await clearTokens();
          set({ user: null, isAuthenticated: false, loading: false });
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
          loading: false,
          error: null,
        });

        if (wasGuest) {
          await upgradeGuestProgressToAccount(firebaseUser.uid);
          set({ isGuest: false });
        }

        await syncAfterAuthenticatedLogin(firebaseUser.uid);
      },

      signup: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const credential = await createUserWithEmailAndPassword(
            auth,
            email.trim(),
            password,
          );
          await get().setUser(credential.user);
          return true;
        } catch (error) {
          set({ error: mapAuthError(error), loading: false });
          return false;
        }
      },

      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const credential = await signInWithEmailAndPassword(
            auth,
            email.trim(),
            password,
          );
          await get().setUser(credential.user);
          return true;
        } catch (error) {
          set({ error: mapAuthError(error), loading: false });
          return false;
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await signOut(auth);
        } finally {
          await clearTokens();
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });
        }
      },

      resetPassword: async (email: string) => {
        set({ loading: true, error: null });
        try {
          await sendPasswordResetEmail(auth, email.trim());
          set({ loading: false });
          return true;
        } catch (error) {
          set({ loading: false, error: mapAuthError(error) });
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
          set({ loading: false, error: mapAuthError(error) });
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
          set({ loading: false, error: mapAuthError(error) });
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
          await clearTokens();
          set({
            user: null,
            isAuthenticated: false,
            isGuest: false,
            loading: false,
          });
          return true;
        } catch (error) {
          set({ loading: false, error: mapAuthError(error) });
          return false;
        }
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
          set({ loading: false, error: mapAuthError(error) });
          return false;
        }
      },

      continueAsGuest: () => {
        set({ isGuest: true, loading: false, error: null });
      },

      clearError: () => set({ error: null }),

      initializeAuthListener: () => {
        set({ loading: true });
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          await get().setUser(firebaseUser);
        });
        return unsubscribe;
      },
    }),
    {
      name: "gearforge-auth-v1",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ isGuest: state.isGuest }),
    },
  ),
);
