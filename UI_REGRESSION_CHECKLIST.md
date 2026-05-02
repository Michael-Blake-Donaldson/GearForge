# GearForge UI Regression Checklist

## Scope

- Pass type: manual screen-by-screen UI regression + visual polish
- Focus: font-family unification, Neon Core depth consistency, branded copy alignment, accessibility/touch-target sanity checks
- Date: 2026-05-02

## Checklist Results

- [x] Root navigation headers
      : Updated to branded labels (Calibration, Diagnostics, Operator Placement Diagnostics) and stronger title weight.
- [x] Command Center tab shell
      : Verified custom glow indicator remains stable with updated tab naming.
- [x] Progress/telemetry surface
      : Converted to Operator Telemetry language, stronger glow cards, and Energy/Diagnostics terminology consistency.
- [x] Onboarding flow (3 slides)
      : Updated copy language, improved visual depth on feature/region cards, and aligned CTA language to Command Center.
- [x] Placement diagnostics screen
      : Added Forge guidance presence, top progress bar, and shared button component usage.
- [x] Auth login
      : Removed stale roadmap copy, unified component styling with Button + Forge visual anchor.
- [x] Auth signup
      : Unified with shared components and visual rhythm.
- [x] Auth forgot password
      : Unified with shared components and visual rhythm.
- [x] Privacy policy screen
      : Updated stale date, improved card depth and readability.
- [x] Terms of use screen
      : Updated terminology consistency (diagnostics history), improved card depth.
- [x] Not found screen
      : Replaced Expo template style with branded Neon Core error state and recovery CTA.

## Accessibility / UX Sanity Checks

- [x] Primary actionable controls remain >= 44px minimum touch target via shared Button component.
- [x] Progress indicators include accessibility labels on newly added ProgressBar placements.
- [x] Critical error route provides a clear recovery action (Return to Command Center).

## Fixes Applied During Sweep

1. Corrected outdated auth copy that still claimed social sign-in was a future iteration.
2. Normalized terminology drift (Lesson/Quiz/XP) on remaining untuned surfaces to Calibration/Diagnostics/Energy where appropriate.
3. Removed default Expo not-found visual mismatch and replaced with branded fallback.
4. Added consistent depth treatment (neon-shadow card hierarchy) to legal and onboarding region/feature cards.
5. Applied typography-family token usage on major headers/body styles across tuned screens.

## Validation

- TypeScript: `npx tsc --noEmit` (pass)
