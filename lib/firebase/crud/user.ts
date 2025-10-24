import { db } from "@/lib/firebase/firebase.client";
import { User } from "@/lib/types/models";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Create or update user
export async function upsertUser(user: User) {
    await setDoc(doc(db, "users", user.uid), user);
}

// Get user by uid
export async function getUser(uid: string): Promise<User | null> {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? (snap.data() as User) : null;
}

// Update user
export async function updateUser(uid: string, data: Partial<User>) {
    await updateDoc(doc(db, "users", uid), data);
}

// Delete user
export async function deleteUser(uid: string) {
    await deleteDoc(doc(db, "users", uid));
}
