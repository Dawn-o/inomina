import { db } from "@/lib/firebase/firebase.client";
import { Transaction } from "@/lib/types/models";
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where, addDoc, Timestamp, orderBy } from "firebase/firestore";

export async function createTransaction(transaction: Transaction) {
    await setDoc(doc(db, "transactions", transaction.id), transaction);
}

export async function getTransaction(id: string): Promise<Transaction | null> {
    const snap = await getDoc(doc(db, "transactions", id));
    return snap.exists() ? (snap.data() as Transaction) : null;
}

export async function getTransactionsByUser(userId: string): Promise<Transaction[]> {
    const q = query(collection(db, "transactions"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data() as Transaction);
}

export async function updateTransaction(id: string, data: Partial<Transaction>) {
    await updateDoc(doc(db, "transactions", id), data);
}

export async function deleteTransaction(id: string) {
    await deleteDoc(doc(db, "transactions", id));
}

export async function addTransaction(userId: string, data: any) {
    const payload = {
        ...data,
        userId,
        date: data.date ? Timestamp.fromDate(new Date(data.date)) : Timestamp.now(),
        createdAt: Timestamp.now(),
    };
    const docRef = await addDoc(collection(db, "transactions"), payload);
    return docRef.id;
}

export async function fetchTransactions(userId: string) {
    const q = query(
        collection(db, "transactions"),
        where("userId", "==", userId),
        orderBy("date", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            date: data.date?.toDate ? data.date.toDate().toISOString().slice(0, 16) : data.date,
        };
    });
}
