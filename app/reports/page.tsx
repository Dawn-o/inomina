"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ReportsHeader } from "@/components/reports/sections/ReportsHeader";
import { ReportsFiltersSection } from "@/components/reports/sections/ReportsFiltersSection";
import { ReportsSummarySection } from "@/components/reports/sections/ReportsSummarySection";
import { ReportsContentSection } from "@/components/reports/sections/ReportsContentSection";
import {
  getReportsSummaryStats,
  getReportsMonthlyData,
  getReportsCategoryData,
  getReportsTrendData,
} from "@/app/reports/actions";
import {
  ReportsSummarySkeleton,
  ReportsContentSkeleton,
} from "@/components/reports/ReportsSkeleton";
import type {
  SummaryStat,
  MonthlyData,
  CategoryData,
  TrendData,
} from "@/lib/utils/types";

export default function Reports() {
  const [timeRange, setTimeRange] = useState("6months");
  const [reportType, setReportType] = useState("overview");
  const [summaryStats, setSummaryStats] = useState<SummaryStat[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        setLoading(true);
        const [
          summaryData,
          monthlyDataResult,
          categoryDataResult,
          trendDataResult,
        ] = await Promise.all([
          getReportsSummaryStats(timeRange),
          getReportsMonthlyData(timeRange),
          getReportsCategoryData(timeRange),
          getReportsTrendData(timeRange),
        ]);

        setSummaryStats(summaryData);
        setMonthlyData(monthlyDataResult);
        setCategoryData(categoryDataResult);
        setTrendData(trendDataResult);
      } catch (error) {
        console.error("Failed to fetch reports data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportsData();
  }, [timeRange]);

  const handleExport = () => {};

  return (
    <PageLayout>
      <ReportsHeader />

      <ReportsFiltersSection
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onExport={handleExport}
      />

      {loading ? (
        <ReportsSummarySkeleton />
      ) : (
        <ReportsSummarySection stats={summaryStats} />
      )}

      {loading ? (
        <ReportsContentSkeleton />
      ) : (
        <ReportsContentSection
          reportType={reportType}
          onReportTypeChange={setReportType}
          monthlyData={monthlyData}
          categoryData={categoryData}
          trendData={trendData}
        />
      )}
    </PageLayout>
  );
}
