"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { DashboardHeader } from "@/components/dashboard/sections/DashboardHeader";
import { FinancialOverviewSection } from "@/components/dashboard/sections/FinancialOverviewSection";
import { AnalyticsActivitySection } from "@/components/dashboard/sections/AnalyticsActivitySection";
import { QuickActionsSection } from "@/components/dashboard/sections/QuickActionsSection";
import {
  FinancialOverviewSkeleton,
  AnalyticsActivitySkeleton,
} from "@/components/dashboard/DashboardSkeleton";
import {
  getDashboardSummary,
  getDashboardCategoryData,
  getRecentTransactions,
} from "@/app/dashboard/actions";
import type { CategoryData } from "@/lib/utils/types";

interface DashboardTransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

export default function Dashboard() {
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [transactions, setTransactions] = useState<DashboardTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [summaryData, categoryDataResult, transactionsData] =
          await Promise.all([
            getDashboardSummary(),
            getDashboardCategoryData(),
            getRecentTransactions(),
          ]);

        setSummary(summaryData);
        setCategoryData(categoryDataResult);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <PageLayout>
      <DashboardHeader />

      {loading ? (
        <FinancialOverviewSkeleton />
      ) : (
        <FinancialOverviewSection summary={summary} />
      )}

      {loading ? (
        <AnalyticsActivitySkeleton />
      ) : (
        <AnalyticsActivitySection
          categoryData={categoryData}
          transactions={transactions}
          loading={false}
        />
      )}

      <QuickActionsSection />
    </PageLayout>
  );
}
