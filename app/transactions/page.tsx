"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, BarChart, CalendarDays, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MonthlySummary } from "@/components/transactions/MonthlySummary";
import { DailyTransactions } from "@/components/transactions/DailyTransactions";
import { SummaryCards } from "@/components/transactions/SummaryCards";
import { NavigationBar } from "@/components/transactions/NavigationBar";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import {
  groupByDate,
  getSummary,
  getMonthlySummary,
  getAllMonthsSummary,
} from "@/lib/transactions";
import { initialTransactions } from "@/lib/data";
import {
  getInitialForm,
  handleFormChange,
  handleFormSelect,
  handleTypeSelect,
} from "@/lib/form";
import { handlePrevTab, handleNextTab } from "@/lib/navigation";
import type {
  Transaction,
  TransactionMethod,
  TransactionType,
  TransferTarget,
} from "@/lib/types";

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
      <div className="flex items-center justify-between">
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as any)}
          className="w-auto"
        >
          <TabsList>
            <TabsTrigger value="daily">
              <BarChart className="w-4 h-4 mr-1" /> Daily
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarDays className="w-4 h-4 mr-1" /> Calendar
            </TabsTrigger>
            <TabsTrigger value="monthly">
              <List className="w-4 h-4 mr-1" /> Monthly
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

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
          <DailyTransactions grouped={grouped} />
        </TabsContent>
        <TabsContent value="calendar">
          <div className="flex items-center justify-center min-h-[200px] text-muted-foreground">
            Calendar view coming soon...
          </div>
        </TabsContent>
        <TabsContent value="monthly">
          {Object.values(
            getAllMonthsSummary(monthly, currentMonthlyYear)
          ).every((m) => m.income === 0 && m.expenses === 0) ? (
            <div className="text-center text-muted-foreground py-8">
              No data for {currentMonthlyYear}
            </div>
          ) : (
            <MonthlySummary
              months={getAllMonthsSummary(monthly, currentMonthlyYear)}
              year={currentMonthlyYear}
            />
          )}
        </TabsContent>
      </Tabs>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setSelectedType(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
          </DialogHeader>
          {!selectedType ? (
            <div className="flex flex-col gap-4">
              <Label className="mb-2">Choose Transaction Type</Label>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => onTypeSelect("Income")}
                >
                  Income
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onTypeSelect("Expenses")}
                >
                  Expenses
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onTypeSelect("Transfer")}
                >
                  Transfer
                </Button>
              </div>
            </div>
          ) : (
            <TransactionForm
              form={form}
              selectedType={selectedType}
              handleChange={onFormChange}
              handleSelect={onFormSelect}
              setForm={setForm}
              handleAdd={handleAdd}
              setSelectedType={setSelectedType}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
