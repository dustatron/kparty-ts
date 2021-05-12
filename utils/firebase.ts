import { initializeApp } from "firebase-admin";
import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

function initializeFirebase(keys) {
  if (!firebase.apps.length) {
    return firebase.initializeApp(keys);
  }
  return firebase;
}

const app = initializeFirebase(config);

export const auth = app.auth();
export default app;
