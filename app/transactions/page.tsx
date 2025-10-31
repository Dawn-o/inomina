"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MonthlySummary } from "@/components/transactions/MonthlySummary";
import { DailyTransactions } from "@/components/transactions/DailyTransactions";
import { SummaryCards } from "@/components/transactions/SummaryCards";
import { NavigationBar } from "@/components/transactions/NavigationBar";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { CalendarView } from "@/components/transactions/CalendarView";
import {
  groupByDate,
  getSummary,
  getMonthlySummary,
  getAllMonthsSummary,
} from "@/lib/utils/transactions";
import { handlePrevTab, handleNextTab } from "@/lib/utils/navigation";
import type { Transaction, TransactionType } from "@/lib/utils/types";
import { TransactionsHeader } from "@/components/transactions/TransactionsHeader";
import { EmptyState } from "@/components/display/EmptyState";

const staticTransactions: Transaction[] = [
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
    category: "Income",
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

export default function Transactions() {
  const [transactions] = useState<Transaction[]>(staticTransactions);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<TransactionType>("Expenses");
  const [tab, setTab] = useState<"daily" | "calendar" | "monthly">("daily");

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonthlyYear, setCurrentMonthlyYear] = useState(
    today.getFullYear(),
  );

  const filteredTransactions = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return tab === "daily" || tab === "calendar"
      ? d.getMonth() === currentMonth && d.getFullYear() === currentYear
      : true;
  });

  const grouped = groupByDate(filteredTransactions);
  const monthly = getMonthlySummary(transactions);

  const handlePrev = () =>
    handlePrevTab(
      tab,
      currentMonth,
      setCurrentMonth,
      setCurrentYear,
      setCurrentMonthlyYear,
    );
  const handleNext = () =>
    handleNextTab(
      tab,
      currentMonth,
      setCurrentMonth,
      setCurrentYear,
      setCurrentMonthlyYear,
    );

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "en-US",
    { month: "short" },
  );

  return (
    <div className="p-6 space-y-6">
      <TransactionsHeader
        tab={tab}
        setTab={(v) => setTab(v as any)}
        onAdd={() => {
          setSelectedType("Expenses");
          setOpen(true);
        }}
      />

      <NavigationBar
        tab={tab}
        monthName={monthName}
        currentYear={currentYear}
        currentMonthlyYear={currentMonthlyYear}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <SummaryCards
        income={getSummary(filteredTransactions).income}
        expenses={getSummary(filteredTransactions).expenses}
        total={getSummary(filteredTransactions).total}
      />

      <Tabs value={tab} className="w-full">
        <TabsContent value="daily">
          {filteredTransactions.length === 0 ? (
            <EmptyState
              title="No transactions found"
              description="Add a transaction to get started."
            />
          ) : (
            <DailyTransactions
              grouped={grouped}
              onUpdate={() => {}}
              onDelete={() => {}}
            />
          )}
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarView
            transactions={filteredTransactions}
            currentMonth={currentMonth}
            currentYear={currentYear}
          />
        </TabsContent>
        <TabsContent value="monthly">
          {Object.values(
            getAllMonthsSummary(monthly, currentMonthlyYear),
          ).every((m) => m.income === 0 && m.expenses === 0) ? (
            <EmptyState
              title="No monthly data found"
              description="Try adding transactions for this year."
            />
          ) : (
            <MonthlySummary
              months={getAllMonthsSummary(monthly, currentMonthlyYear)}
              year={currentMonthlyYear}
            />
          )}
        </TabsContent>
      </Tabs>

      <TransactionForm
        open={open}
        setOpen={setOpen}
        defaultType={selectedType}
        onSubmit={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
