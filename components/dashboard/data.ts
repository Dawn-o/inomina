export const summary = {
  balance: 5000,
  income: 2000,
  expenses: 1200,
};

export const chartColors = [
  "#6366f1",
  "#f59e42",
  "#ef4444",
  "#10b981",
  "#eab308",
  "#a21caf",
];

export const categoryData = [
  { name: "Food", value: 400, color: chartColors[0] },
  { name: "Transport", value: 200, color: chartColors[1] },
  { name: "Shopping", value: 300, color: chartColors[2] },
];

export const transactions = [
  {
    id: "1",
    date: "2025-10-25",
    description: "Grocery",
    category: "Food",
    amount: -50,
  },
  {
    id: "2",
    date: "2025-10-20",
    description: "Salary",
    category: "Income",
    amount: 2000,
  },
  {
    id: "3",
    date: "2025-10-19",
    description: "Bus Ticket",
    category: "Transport",
    amount: -2.5,
  },
  {
    id: "4",
    date: "2025-10-18",
    description: "Coffee",
    category: "Food",
    amount: -4,
  },
  {
    id: "5",
    date: "2025-10-17",
    description: "Book",
    category: "Shopping",
    amount: -15,
  },
];
