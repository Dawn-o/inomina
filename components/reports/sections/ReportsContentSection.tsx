import { ReportsTabs } from "@/components/reports/ui/ReportsTabs";
import { MonthlyData, CategoryData, TrendData } from "@/lib/utils/types";

interface ReportsContentSectionProps {
  reportType: string;
  onReportTypeChange: (reportType: string) => void;
  monthlyData: MonthlyData[];
  categoryData: CategoryData[];
  trendData: TrendData[];
}

export function ReportsContentSection({
  reportType,
  onReportTypeChange,
  monthlyData,
  categoryData,
  trendData,
}: ReportsContentSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-primary rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">
          Reports & Analytics
        </h2>
      </div>
      <ReportsTabs
        reportType={reportType}
        onReportTypeChange={onReportTypeChange}
        monthlyData={monthlyData}
        categoryData={categoryData}
        trendData={trendData}
      />
    </section>
  );
}
