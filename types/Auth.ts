export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  providerId: string;
};

export type AuthErrorCode =
  | "invalid-credentials"
  | "email-already-in-use"
  | "weak-password"
  | "network-error"
  | "too-many-requests"
  | "requires-recent-login"
  | "unknown";
