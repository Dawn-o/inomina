"use client";

import { useAuth } from "@/lib/firebase/auth/AuthProvider";
import { useDashboard } from "@/hooks/useDashboard";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { SpendingByCategoryChart } from "@/components/dashboard/SpendingByCategoryChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Plus, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user } = useAuth();
  const { accounts, transactions, loading, summary, chartData, chartConfig } =
    useDashboard(user?.uid);

  return (
    <div className="space-y-8 p-6">
      <SummaryCards data={summary} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SpendingByCategoryChart
          chartData={chartData}
          chartConfig={chartConfig}
          loading={loading}
        />
        <RecentTransactions
          transactions={transactions.slice(0, 5)}
          loading={loading}
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
