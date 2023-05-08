// The Firebase Admin SDK to access Firebase Features from within Cloud Functions.
import * as admin from 'firebase-admin';
admin.initializeApp();

// Set up extra settings. Since May 29, 2020, Firebase Firebase Added support for
// calling FirebaseFirestore.settings with { ignoreUndefinedProperties: true }.
// When this parameter is set, Cloud Firestore ignores undefined properties
// inside objects rather than rejecting the API call.
admin.firestore().settings({
  ignoreUndefinedProperties: true,
});

export * from './chatgpt';
export * from './newWeeklyPosts';
export * from './newPosts';
export * from './newSession/newSession';
