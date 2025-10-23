import admin, { ServiceAccount } from "firebase-admin";

// Only initialize once (Next.js hot reload safe)
if (!admin.apps.length) {
    const serviceAccount: ServiceAccount = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
    };

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
}

const firebaseAdmin = admin;
const db = admin.firestore();
const auth = admin.auth();

export { firebaseAdmin, db, auth };
