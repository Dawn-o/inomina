import { Suspense } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { TransactionsPageHeader } from "@/components/transactions/sections/TransactionsPageHeader";
import { TransactionsSummarySection } from "@/components/transactions/sections/TransactionsSummarySection";
import { TransactionsContentSection } from "@/components/transactions/sections/TransactionsContentSection";
import { getSummary, getMonthlySummary } from "@/lib/utils/transactions";
import { getTransactions } from "@/app/transactions/actions";
import type { Transaction } from "@/lib/utils/types";
import { TransactionsClient } from "@/components/transactions/TransactionsClient";
import { TransactionsSkeleton } from "@/components/transactions/TransactionsSkeleton";

export default async function Transactions() {
  let transactions: Transaction[] = [];

  try {
    transactions = await getTransactions();
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
  }

  const monthly = getMonthlySummary(transactions);

  return (
    <PageLayout>
      <TransactionsPageHeader />

      <Suspense fallback={<TransactionsSkeleton />}>
        <TransactionsClient
          transactions={transactions}
          monthlySummary={monthly}
        />
      </Suspense>
    </PageLayout>
  );
}
