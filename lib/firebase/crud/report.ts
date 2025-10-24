import { db } from "@/lib/firebase/firebase.client";
import { Report } from "@/lib/types/models";
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";

// Create report
export async function createReport(report: Report) {
    await setDoc(doc(db, "reports", report.id), report);
}

// Get report by id
export async function getReport(id: string): Promise<Report | null> {
    const snap = await getDoc(doc(db, "reports", id));
    return snap.exists() ? (snap.data() as Report) : null;
}

// Get all reports for a user
export async function getReportsByUser(userId: string): Promise<Report[]> {
    const q = query(collection(db, "reports"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data() as Report);
}

// Update report
export async function updateReport(id: string, data: Partial<Report>) {
    await updateDoc(doc(db, "reports", id), data);
}

// Delete report
export async function deleteReport(id: string) {
    await deleteDoc(doc(db, "reports", id));
}
