import { db } from "@/lib/firebase/firebase.client";
import { Account } from "@/lib/types/models";
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";

// Create account
export async function createAccount(account: Account) {
    await setDoc(doc(db, "accounts", account.id), account);
}

// Get account by id
export async function getAccount(id: string): Promise<Account | null> {
    const snap = await getDoc(doc(db, "accounts", id));
    return snap.exists() ? (snap.data() as Account) : null;
}

// Get all accounts for a user
export async function getAccountsByUser(userId: string): Promise<Account[]> {
    const q = query(collection(db, "accounts"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data() as Account);
}

// Update account
export async function updateAccount(id: string, data: Partial<Account>) {
    await updateDoc(doc(db, "accounts", id), data);
}

// Delete account
export async function deleteAccount(id: string) {
    await deleteDoc(doc(db, "accounts", id));
}
