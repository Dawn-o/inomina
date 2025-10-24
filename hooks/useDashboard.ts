import { useEffect, useState } from "react";
import { getAccountsByUser } from "@/lib/firebase/crud/account";
import { getTransactionsByUser } from "@/lib/firebase/crud/transaction";

export function useDashboard(userId?: string) {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        Promise.all([getAccountsByUser(userId), getTransactionsByUser(userId)])
            .then(([accs, txs]) => {
                setAccounts(accs);
                setTransactions(txs);
            })
            .finally(() => setLoading(false));
    }, [userId]);

    const balance = accounts
        .filter((acc) => acc.active !== false)
        .reduce((sum, acc) => sum + (acc.balance || 0), 0);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const isCurrentMonth = (tx: any) => {
        const date = new Date(tx.date);
        return (
            date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
    };

    const income = transactions
        .filter((tx) => tx.type === "income" && isCurrentMonth(tx))
        .reduce((sum, tx) => sum + (tx.amount || 0), 0);

    const expenses = transactions
        .filter((tx) => tx.type === "expense" && isCurrentMonth(tx))
        .reduce((sum, tx) => sum + (tx.amount || 0), 0);

    const savings = income - expenses;

    const categoryMap: Record<string, number> = {};
    transactions
        .filter((tx) => tx.type === "expense" && isCurrentMonth(tx))
        .forEach((tx) => {
            categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
        });

    const chartColors = [
        "#6366f1",
        "#f59e42",
        "#ef4444",
        "#10b981",
        "#eab308",
        "#a21caf",
    ];

    const chartData = Object.entries(categoryMap).map(
        ([category, amount], i) => ({
            category,
            amount,
            fill: chartColors[i % chartColors.length],
        })
    );

    const chartConfig = {};

    return {
        accounts,
        transactions,
        loading,
        summary: { balance, income, expenses, savings },
        chartData,
        chartConfig,
    };
}
