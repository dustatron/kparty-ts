import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      privateKey: process.env.PRIVATE_KEY,
      clientEmail: process.env.CLIENT_EMAIL,
    }),
    databaseURL: process.env.DATABASE_URL,
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
