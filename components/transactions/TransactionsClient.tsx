"use client";

import { useState } from "react";
import { TransactionsNavigationSection } from "@/components/transactions/sections/TransactionsNavigationSection";
import { TransactionsSummarySection } from "@/components/transactions/sections/TransactionsSummarySection";
import { TransactionsContentSection } from "@/components/transactions/sections/TransactionsContentSection";
import { TransactionForm } from "@/components/transactions/ui/TransactionForm";
import { groupByDate, getSummary } from "@/lib/utils/transactions";
import { handlePrevTab, handleNextTab } from "@/lib/utils/navigation";
import type { Transaction, TransactionType } from "@/lib/utils/types";

interface TransactionsClientProps {
  transactions: Transaction[];
  monthlySummary: any;
}

export function TransactionsClient({
  transactions: initialTransactions,
  monthlySummary,
}: TransactionsClientProps) {
  const [transactions] = useState<Transaction[]>(initialTransactions);
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
    <>
      <TransactionsNavigationSection
        tab={tab}
        setTab={(v) => setTab(v as any)}
        onAdd={() => {
          setSelectedType("Expenses");
          setOpen(true);
        }}
        monthName={monthName}
        currentYear={currentYear}
        currentMonthlyYear={currentMonthlyYear}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <TransactionsSummarySection
        income={getSummary(filteredTransactions).income}
        expenses={getSummary(filteredTransactions).expenses}
        total={getSummary(filteredTransactions).total}
      />

      <TransactionsContentSection
        tab={tab}
        filteredTransactions={filteredTransactions}
        grouped={grouped}
        monthlySummary={monthlySummary}
        currentMonthlyYear={currentMonthlyYear}
        currentMonth={currentMonth}
        currentYear={currentYear}
        onUpdate={() => {}}
        onDelete={() => {}}
      />

      <TransactionForm
        open={open}
        setOpen={setOpen}
        defaultType={selectedType}
        onSubmit={() => {
          setOpen(false);
          window.location.reload();
        }}
      />
    </>
  );
}
