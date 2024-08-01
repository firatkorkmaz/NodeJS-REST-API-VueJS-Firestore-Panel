require("dotenv").config();
const firebaseApp = require("firebase/app");
//const firebaseAnalytics = require("firebase/analytics");


const {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} = require("firebase/auth");


const admin = require('firebase-admin');
const serviceAccount = require("../firebaseService.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore()


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};


const app = firebaseApp.initializeApp(firebaseConfig);
//const analytics = firebaseAnalytics.getAnalytics(app);


module.exports = {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    admin,
	db
};