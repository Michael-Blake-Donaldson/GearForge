# Firebase App Check Enforcement Plan

## Objective

Roll out App Check safely without locking out legitimate users.

## Plan

1. Enable App Check in Firebase console for supported services (Auth-adjacent endpoints, Firestore, Functions as available).
2. Add development debug token handling for local builds only.
3. Verify telemetry for at least one full QA cycle in staging.
4. Enable enforcement for Cloud Functions first.
5. Gradually enforce on Firestore/services after monitoring rejection rates.

## Development Rules

- Never ship debug tokens in production builds.
- Keep dev/staging/prod Firebase projects isolated.
- Document expected App Check rejection-rate baseline.

## Rollback

- If legitimate traffic drops after enforcement, revert to monitor-only mode.
- Investigate client integrity failures by platform and build channel.
