# GearForge App Store Submission Pack

This file contains launch metadata and placeholders that must be finalized before production submission.

## 1. Required Values You Need To Fill

- App Store Connect App ID in `eas.json`:
  - `submit.production.ios.ascAppId = "YOUR_APP_STORE_CONNECT_APP_ID"`
- Privacy Policy public URL (already set):
  - `https://gearforge.app/privacy`
- Terms of Use public URL (if external page is preferred in addition to in-app screen):
  - `https://gearforge.app/terms` (placeholder)
- Support email:
  - `support@gearforge.app` (placeholder)

## 2. App Store Listing Copy (Draft)

- App Name: GearForge
- Subtitle: Learn Automotive Engineering, One Lesson at a Time
- Promotional Text:
  - Build real automotive knowledge with bite-sized lessons, adaptive quizzes, and roadmap progression.
- Description:
  - GearForge helps beginners and enthusiasts learn vehicle systems like a language app: short lessons, checkpoint challenges, and final unit exams. Track XP, maintain streaks, review weak topics, and grow from Rookie to Pro across American, Japanese, European, Korean, EV/Hybrid, and Diesel/Heavy-Duty paths.

## 3. Keywords (Draft)

- automotive
- mechanic
- car learning
- diagnostics
- engine
- transmission
- EV
- diesel
- quiz
- education

## 4. Screenshot Checklist (6-8 Required)

Create and upload the following iPhone screenshots:

1. Onboarding + Mechanic Placement Test
2. Learn Roadmap with unit nodes/challenges/final exam
3. Lesson Step Flow (mini lessons + checkpoint)
4. Quiz Experience (mixed question types)
5. Practice Arena (SM-2 + weak topics)
6. Encyclopedia Search + category filters
7. Profile (streak freeze, badges, feedback settings)
8. Progress dashboard (optional extra)

## 5. App Review Notes (Draft)

- App is educational only.
- Includes in-app Privacy Policy and Terms of Use screens.
- No account creation required for base usage.
- Notifications are optional and requested with delayed prompt strategy.

## 6. Compliance Confirmation

- Safety disclaimer included in learning UI.
- Privacy policy screen exists in app.
- Terms of use screen exists in app.
- Notification permission descriptions configured in `app.json`.
- iOS privacy manifest declared in `app.json`.

## 7. Final Pre-Submit Runbook

1. Build release with EAS production profile.
2. Complete smoke test on physical iPhone.
3. Capture final screenshots from release build.
4. Fill `ascAppId` and submit via EAS.
5. Paste this listing copy into App Store Connect and finalize legal/contact fields.
