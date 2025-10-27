"use client";

import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { SpendingByCategoryChart } from "@/components/dashboard/SpendingByCategoryChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Plus, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const summary = [
  { label: "Balance", value: "$5,000" },
  { label: "Income", value: "$2,000" },
  { label: "Expenses", value: "$1,200" },
];

const chartColors = [
  "#6366f1",
  "#f59e42",
  "#ef4444",
  "#10b981",
  "#eab308",
  "#a21caf",
];

const chartData = [
  { category: "Food", amount: 400, fill: chartColors[0] },
  { category: "Transport", amount: 200, fill: chartColors[1] },
  { category: "Shopping", amount: 300, fill: chartColors[2] },
];

const chartConfig = {};

const transactions = [
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

export default function Dashboard() {
  return (
    <div className="space-y-8 p-6">
      <SummaryCards data={summary} loading={false} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SpendingByCategoryChart
          chartData={chartData}
          chartConfig={chartConfig}
          loading={false}
        />
        <RecentTransactions
          transactions={transactions.slice(0, 5)}
          loading={false}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-start">
        <Link href="/transactions">
          <Button size="lg" className="w-full sm:w-auto">
            <Plus className="mr-2 h-5 w-5" />
            Add Transaction
          </Button>
        </Link>
        <Link href="/reports">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <BarChart3 className="mr-2 h-5 w-5" />
            View Reports
          </Button>
        </Link>
      </div>
    </div>
  );
}
