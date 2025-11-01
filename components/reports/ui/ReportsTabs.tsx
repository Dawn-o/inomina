"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { OverviewTab } from "@/components/reports/tabs/OverviewTab";
import { IncomeTab } from "@/components/reports/tabs/IncomeTab";
import { ExpensesTab } from "@/components/reports/tabs/ExpensesTab";
import { TrendsTab } from "@/components/reports/tabs/TrendsTab";
import { MonthlyData, CategoryData, TrendData } from "@/lib/utils/types";

interface ReportsTabsProps {
  reportType: string;
  onReportTypeChange: (value: string) => void;
  monthlyData: MonthlyData[];
  categoryData: CategoryData[];
  trendData: TrendData[];
}

export function ReportsTabs({
  reportType,
  onReportTypeChange,
  monthlyData,
  categoryData,
  trendData,
}: ReportsTabsProps) {
  return (
    <Tabs
      value={reportType}
      onValueChange={onReportTypeChange}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-4 h-12 p-1 bg-muted/50">
        <TabsTrigger
          value="overview"
          className="flex items-center gap-2 h-10 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
        >
          <BarChart3 className="w-4 h-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger
          value="income"
          className="flex items-center gap-2 h-10 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
        >
          <TrendingUp className="w-4 h-4" />
          <span className="hidden sm:inline">Income</span>
        </TabsTrigger>
        <TabsTrigger
          value="expenses"
          className="flex items-center gap-2 h-10 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
        >
          <TrendingDown className="w-4 h-4" />
          <span className="hidden sm:inline">Expenses</span>
        </TabsTrigger>
        <TabsTrigger
          value="trends"
          className="flex items-center gap-2 h-10 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
        >
          <Activity className="w-4 h-4" />
          <span className="hidden sm:inline">Trends</span>
        </TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6 mt-6">
        <OverviewTab monthlyData={monthlyData} categoryData={categoryData} />
      </TabsContent>

      {/* Income Tab */}
      <TabsContent value="income" className="space-y-6 mt-6">
        <IncomeTab trendData={trendData} />
      </TabsContent>

      {/* Expenses Tab */}
      <TabsContent value="expenses" className="space-y-6 mt-6">
        <ExpensesTab categoryData={categoryData} />
      </TabsContent>

      {/* Trends Tab */}
      <TabsContent value="trends" className="space-y-6 mt-6">
        <TrendsTab trendData={trendData} />
      </TabsContent>
    </Tabs>
  );
}
