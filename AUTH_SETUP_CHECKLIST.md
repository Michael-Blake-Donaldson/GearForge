# GearForge Auth Setup Checklist

This checklist captures all external configuration required to finish production authentication.

## Firebase Console
1. Create Firebase project.
2. Enable Authentication providers:
- Email/Password
- Google
- Apple
3. Create Firestore database in production mode.
4. Configure Firestore rules and indexes for:
- users
- progress
- lessons
- quizHistory
- badges
- settings

## App Config Placeholders To Replace
In [app.json](app.json) -> expo.extra:
- firebase.apiKey
- firebase.authDomain
- firebase.projectId
- firebase.storageBucket
- firebase.messagingSenderId
- firebase.appId
- oauth.googleWebClientId
- oauth.googleIosClientId
- oauth.googleAndroidClientId

## Apple Sign In
- Confirm Apple Sign In enabled in Apple Developer portal for bundle id.
- Confirm iOS app capability includes Sign in with Apple.

## Google OAuth
- Create OAuth client IDs in Google Cloud Console.
- Add iOS and Android bundle/package IDs exactly.
- Put client IDs into app.json extras placeholders.

## Account Deletion Compliance
Implemented in app:
- Profile -> Delete Account
Behavior:
- Deletes cloud collections and then removes Firebase user.

## Testing Matrix
- Email signup/login/logout/reset
- Google login
- Apple login
- Guest mode start
- Guest -> account upgrade and cloud migration
- Sync now/manual sync
- Account deletion
- Offline launch + retry sync when online

## Notes
- Until placeholders are replaced, auth screen still works for guest mode and email flow only if Firebase credentials are valid.
- If Firebase config remains placeholder values, authenticated flows will fail by design and surface user-friendly errors.
