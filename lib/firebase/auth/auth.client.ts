import { auth } from "@/lib/firebase/firebase.client";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";

export async function signIn(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    setCookie("firebase_token", idToken, { path: "/" });
    return userCredential;
}

export async function signUp(username: string, email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    const idToken = await userCredential.user.getIdToken();
    setCookie("firebase_token", idToken, { path: "/" });
    return userCredential;
}

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const idToken = await userCredential.user.getIdToken();
    setCookie("firebase_token", idToken, { path: "/" });
    return userCredential;
}

export async function logOut() {
    await signOut(auth);
    deleteCookie("firebase_token", { path: "/" });
}
