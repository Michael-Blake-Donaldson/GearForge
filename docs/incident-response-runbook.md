# GearForge Incident Response Runbook

## 1) Identify

- Classify incident type: auth abuse, Firestore authorization bypass, function abuse, secret exposure, billing spike.
- Record start time, suspected blast radius, and affected user segment.

## 2) Contain

- Disable affected function endpoint or feature flag.
- Tighten/deploy emergency Firestore rules.
- Rotate exposed secrets and revoke compromised tokens.
- Temporarily disable compromised auth provider if needed.

## 3) Preserve

- Export logs for incident window.
- Avoid broad sharing of raw logs with user identifiers.
- Preserve commit IDs and deployment metadata.

## 4) Eradicate

- Patch code/rules/dependency root cause.
- Add regression validation proving the issue is blocked.

## 5) Recover

- Redeploy and monitor for recurrence.
- Communicate user impact if required by policy/law.

## 6) Postmortem

- Document root cause, timeline, blast radius, and prevention actions.
- Assign owner + due date for every follow-up task.
