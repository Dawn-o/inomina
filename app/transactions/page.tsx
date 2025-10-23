"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MonthlySummary } from "@/components/transactions/MonthlySummary";
import { DailyTransactions } from "@/components/transactions/DailyTransactions";
import { SummaryCards } from "@/components/transactions/SummaryCards";
import { NavigationBar } from "@/components/transactions/NavigationBar";
import { TransactionDialog } from "@/components/transactions/TransactionDialog";
import { groupByDate, getSummary, getMonthlySummary, getAllMonthsSummary} from "@/lib/transactions";
import { initialTransactions } from "@/lib/data";
import { getInitialForm, handleFormChange, handleFormSelect, handleTypeSelect} from "@/lib/form";
import { handlePrevTab, handleNextTab } from "@/lib/navigation";
import type { Transaction, TransactionType, TransferTarget } from "@/lib/types";
import { TransactionsHeader } from "@/components/transactions/TransactionsHeader";
import { EmptyState } from "@/components/display/EmptyState";

export default function Transactions() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<TransactionType | null>(
    null
  );
  const [form, setForm] = useState(getInitialForm());
  const [tab, setTab] = useState<"daily" | "calendar" | "monthly">("daily");

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonthlyYear, setCurrentMonthlyYear] = useState(
    today.getFullYear()
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
      setCurrentMonthlyYear
    );
  const handleNext = () =>
    handleNextTab(
      tab,
      currentMonth,
      setCurrentMonth,
      setCurrentYear,
      setCurrentMonthlyYear
    );

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "en-US",
    { month: "short" }
  );

  const onFormChange = handleFormChange(form, setForm);
  const onFormSelect = handleFormSelect(form, setForm);
  const onTypeSelect = handleTypeSelect(form, setForm, setSelectedType);

  function handleAdd() {
    if (
      !form.date ||
      !form.description ||
      !form.amount ||
      (selectedType !== "Transfer" && !form.category)
    )
      return;

    let amount = Math.abs(Number(form.amount));
    let type: TransactionType = form.type;
    let transferTarget: TransferTarget | undefined = undefined;

    if (selectedType === "Expenses") {
      amount = -amount;
    }

    if (selectedType === "Transfer") {
      transferTarget = form.transferTarget;
      if (transferTarget === "Other") {
        amount = -amount;
        type = "Expenses";
      } else {
        type = "Transfer";
      }
    }

    setTransactions([
      {
        id: transactions.length + 1,
        date: form.date,
        description: form.description,
        category: selectedType === "Transfer" ? undefined : form.category,
        amount,
        method: form.method,
        type,
        hasFees: selectedType === "Transfer" ? form.hasFees : undefined,
        feesAmount:
          selectedType === "Transfer" && form.hasFees && form.feesAmount
            ? Number(form.feesAmount)
            : undefined,
        transferTarget:
          selectedType === "Transfer" ? transferTarget : undefined,
      },
      ...transactions,
    ]);
    setForm(getInitialForm());
    setSelectedType(null);
    setOpen(false);
  }

  return (
    <div className="p-6 space-y-6">
      <TransactionsHeader
        tab={tab}
        setTab={(v) => setTab(v as any)}
        onAdd={() => setOpen(true)}
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
            <DailyTransactions grouped={grouped} />
          )}
        </TabsContent>
        <TabsContent value="calendar">
          <EmptyState
            title="Calendar view coming soon"
            description="This feature will be available in a future update."
          />
        </TabsContent>
        <TabsContent value="monthly">
          {Object.values(
            getAllMonthsSummary(monthly, currentMonthlyYear)
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

      <TransactionDialog
        open={open}
        setOpen={setOpen}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onTypeSelect={onTypeSelect}
        form={form}
        setForm={setForm}
        onFormChange={onFormChange}
        onFormSelect={onFormSelect}
        handleAdd={handleAdd}
      />
    </div>
  );
}
