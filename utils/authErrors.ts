export function mapAuthError(error: unknown): string {
  const code =
    typeof error === "object" && error && "code" in error
      ? String((error as { code?: string }).code)
      : "";

  if (code.includes("invalid-credential")) return "Invalid email or password.";
  if (code.includes("wrong-password")) return "Invalid email or password.";
  if (code.includes("user-not-found"))
    return "No account found for this email.";
  if (code.includes("email-already-in-use"))
    return "An account with this email already exists.";
  if (code.includes("weak-password"))
    return "Password is too weak. Use at least 6 characters.";
  if (code.includes("network-request-failed"))
    return "Network issue. Check your internet and try again.";
  if (code.includes("too-many-requests"))
    return "Too many attempts. Please wait and try again.";
  if (code.includes("requires-recent-login"))
    return "Please sign in again to complete this action.";

  return "Something went wrong. Please try again.";
}
