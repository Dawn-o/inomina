export interface User {
    uid: string;
    email: string;
    displayName?: string;
    currency: string;
    createdAt: number;
}

export interface Account {
    id: string;
    name: string;
    type: "cash" | "bank" | "credit";
    balance: number;
    userId: string;
    createdAt: number;
}

export interface Transaction {
    id: string;
    accountId: string;
    userId: string;
    amount: number;
    type: "income" | "expense" | "transfer";
    category: string;
    description?: string;
    date: number;
    createdAt: number;
}

export interface Report {
    id: string;
    userId: string;
    period: string;
    totalIncome: number;
    totalExpense: number;
    createdAt: number;
}
