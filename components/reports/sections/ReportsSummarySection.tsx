import { ReportsSummary } from "@/components/reports/ui/ReportsSummary";

interface ReportsSummarySectionProps {
  stats: any[];
}

export function ReportsSummarySection({ stats }: ReportsSummarySectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-8 bg-primary rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">
          Summary Statistics
        </h2>
      </div>
      <ReportsSummary stats={stats} />
    </section>
  );
}
