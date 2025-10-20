import type { Transaction } from "@/lib/types";

export function groupByDate(transactions: Transaction[]) {
  return transactions.reduce<Record<string, Transaction[]>>((acc, tx) => {
    if (!acc[tx.date]) acc[tx.date] = [];
    acc[tx.date].push(tx);
    return acc;
  }, {});
}

export function getSummary(transactions: Transaction[]) {
  let income = 0,
    expenses = 0;
  transactions.forEach((tx) => {
    if (tx.type === "Income") income += tx.amount;
    if (
      tx.type === "Expenses" ||
      (tx.type === "Transfer" && tx.transferTarget === "Other")
    )
      expenses += Math.abs(tx.amount);
    if (tx.type === "Transfer" && tx.hasFees && tx.feesAmount)
      expenses += tx.feesAmount;
  });
  return {
    income,
    expenses,
    total: income - expenses,
  };
}

export function getMonthlySummary(transactions: Transaction[]) {
  const months: Record<string, { income: number; expenses: number }> = {};
  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const key = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    if (!months[key]) months[key] = { income: 0, expenses: 0 };
    if (tx.type === "Income") months[key].income += tx.amount;
    if (
      tx.type === "Expenses" ||
      (tx.type === "Transfer" && tx.transferTarget === "Other")
    )
      months[key].expenses += Math.abs(tx.amount);
    if (tx.type === "Transfer" && tx.hasFees && tx.feesAmount)
      months[key].expenses += tx.feesAmount;
  });
  return months;
}

export function getAllMonthsSummary(
  monthly: Record<string, { income: number; expenses: number }>,
  year: number
) {
  const months: { month: number; income: number; expenses: number }[] = [];
  for (let m = 0; m < 12; m++) {
    const key = `${year}-${(m + 1).toString().padStart(2, "0")}`;
    const data = monthly[key] || { income: 0, expenses: 0 };
    months.push({ month: m, income: data.income, expenses: data.expenses });
  }
  return months;
}
