import type { Transaction } from "@/lib/utils/types";

export const staticTransactions: Transaction[] = [
  {
    id: 1,
    date: "2025-10-25",
    description: "Grocery",
    category: "Food",
    amount: -50,
    method: "Cash",
    type: "Expenses",
  },
  {
    id: 2,
    date: "2025-10-20",
    description: "Salary",
    category: "Salary",
    amount: 2000,
    method: "Account",
    type: "Income",
  },
  {
    id: 3,
    date: "2025-10-19",
    description: "Bus Ticket",
    category: "Transport",
    amount: -2.5,
    method: "Cash",
    type: "Expenses",
  },
];
