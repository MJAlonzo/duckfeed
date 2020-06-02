import { initializeApp } from "firebase";
import { FIREBASE_INIT } from "./env";

const firebaseApp = initializeApp({
  apiKey: FIREBASE_INIT.API_KEY,
  authDomain: FIREBASE_INIT.AUTH_DOMAIN,
  databaseUrl: FIREBASE_INIT.DATABASE_URL,
  projectId: FIREBASE_INIT.PROJECT_ID,
  storageBucket: FIREBASE_INIT.STORAGE_BUCKET,
  messagingSenderId: FIREBASE_INIT.MESSAGING_SENDER_ID,
  appId: FIREBASE_INIT.APP_ID,
});

const db = firebaseApp.firestore();

export { db };
