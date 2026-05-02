import { User, onAuthStateChanged, signOut } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth } from "@/lib/firebase";
import { AuthUser } from "@/types/Auth";
import { mapAuthError } from "@/utils/authErrors";
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
          (firebaseUser as unknown as { stsTokenManager?: { refreshToken?: string } })
            .stsTokenManager?.refreshToken ?? "";

        if (refreshToken) {
          await storeTokens(accessToken, refreshToken);
        }

        set({
          user: toAuthUser(firebaseUser),
          isAuthenticated: true,
          isGuest: false,
          loading: false,
          error: null,
        });
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
