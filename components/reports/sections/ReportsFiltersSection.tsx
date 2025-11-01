import { ReportsFilters } from "@/components/reports/ui/ReportsFilters";

interface ReportsFiltersSectionProps {
  timeRange: string;
  onTimeRangeChange: (timeRange: string) => void;
  onExport: () => void;
}

export function ReportsFiltersSection({
  timeRange,
  onTimeRangeChange,
  onExport,
}: ReportsFiltersSectionProps) {
  return (
    <section>
      <ReportsFilters
        timeRange={timeRange}
        onTimeRangeChange={onTimeRangeChange}
        onExport={onExport}
      />
    </section>
  );
}
