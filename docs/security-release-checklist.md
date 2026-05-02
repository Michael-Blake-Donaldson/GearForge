# Security Release Checklist

## Must Pass Before Production
- [ ] No admin keys/service accounts in repository or mobile bundle.
- [ ] `.env` files with real values are not committed.
- [ ] Firebase Auth flows verified: signup, login, reset, guest mode, social login.
- [ ] Sensitive storage uses SecureStore wrappers only.
- [ ] Sign-out and account deletion clear user-local state.
- [ ] Firestore Rules deployed from `firestore.rules` and tested in staging.
- [ ] Cross-user reads/writes are denied.
- [ ] Protected fields (`role`, `isAdmin`, `subscriptionStatus`) cannot be client-written.
- [ ] App Check plan executed and enforcement staged.
- [ ] Privacy/Terms and account deletion entrypoint are visible in-app.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm audit --omit=dev` reviewed; unresolved risks documented.
- [ ] Monitoring and billing alerts are configured.

## Manual Attack Tests
- [ ] Attempt read/write on another UID path is denied.
- [ ] Unauthenticated Firestore read/write is denied.
- [ ] Client attempt to write premium/admin fields is denied.
- [ ] Huge XP write is rejected by rules/server validation path.
- [ ] Logout does not leave private user state on next app open.
- [ ] Delete account removes auth + cloud + local state.

## Pre-Submission Privacy Alignment
- [ ] App Store privacy labels match actual collection behavior.
- [ ] Notification payloads contain no personal/sensitive details.
- [ ] Contact/support and incident escalation owner is documented.
