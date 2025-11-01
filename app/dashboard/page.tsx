"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { DashboardHeader } from "@/components/dashboard/sections/DashboardHeader";
import { FinancialOverviewSection } from "@/components/dashboard/sections/FinancialOverviewSection";
import { AnalyticsActivitySection } from "@/components/dashboard/sections/AnalyticsActivitySection";
import { QuickActionsSection } from "@/components/dashboard/sections/QuickActionsSection";
import {
  summary,
  categoryData,
  transactions,
} from "@/components/dashboard/data";

export default function Dashboard() {
  return (
    <PageLayout>
      <DashboardHeader />

      <FinancialOverviewSection summary={summary} loading={false} />

      <AnalyticsActivitySection
        categoryData={categoryData}
        transactions={transactions}
        loading={false}
      />

      <QuickActionsSection />
    </PageLayout>
  );
}
