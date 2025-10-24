import { db } from "@/lib/firebase/firebase.client";
import { Transaction } from "@/lib/types/models";
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";

// Create transaction
export async function createTransaction(transaction: Transaction) {
    await setDoc(doc(db, "transactions", transaction.id), transaction);
}

// Get transaction by id
export async function getTransaction(id: string): Promise<Transaction | null> {
    const snap = await getDoc(doc(db, "transactions", id));
    return snap.exists() ? (snap.data() as Transaction) : null;
}

// Get all transactions for a user
export async function getTransactionsByUser(userId: string): Promise<Transaction[]> {
    const q = query(collection(db, "transactions"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data() as Transaction);
}

// Update transaction
export async function updateTransaction(id: string, data: Partial<Transaction>) {
    await updateDoc(doc(db, "transactions", id), data);
}

// Delete transaction
export async function deleteTransaction(id: string) {
    await deleteDoc(doc(db, "transactions", id));
}
