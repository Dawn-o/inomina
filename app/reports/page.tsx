"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ReportsHeader } from "@/components/reports/sections/ReportsHeader";
import { ReportsFiltersSection } from "@/components/reports/sections/ReportsFiltersSection";
import { ReportsSummarySection } from "@/components/reports/sections/ReportsSummarySection";
import { ReportsContentSection } from "@/components/reports/sections/ReportsContentSection";
import {
  summaryStats,
  monthlyData,
  categoryData,
  trendData,
} from "@/components/reports/data";

export default function Reports() {
  const [timeRange, setTimeRange] = useState("6months");
  const [reportType, setReportType] = useState("overview");

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting report...");
  };

  return (
    <PageLayout>
      <ReportsHeader />

      <ReportsFiltersSection
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onExport={handleExport}
      />

      <ReportsSummarySection stats={summaryStats} />

      <ReportsContentSection
        reportType={reportType}
        onReportTypeChange={setReportType}
        monthlyData={monthlyData}
        categoryData={categoryData}
        trendData={trendData}
      />
    </PageLayout>
  );
}
